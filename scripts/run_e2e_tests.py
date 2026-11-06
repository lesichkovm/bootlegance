#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
import threading
import time
from playwright.sync_api import sync_playwright

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent caching for test stability
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def run_tests(port):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        print("Test 1: Default resolution (no query, no cookie) -> vanguard")
        page.goto(f"http://localhost:{port}/tests/test_page.html")
        link_href = page.locator("#bootlegance-theme").get_attribute("href")
        assert "themes/vanguard/theme.css" in link_href, f"Unexpected href: {link_href}"
        current = page.evaluate("Bootlegance.current()")
        assert current == "vanguard", f"Expected vanguard, got {current}"
        print("  Passed!")

        print("Test 2: Query parameter resolution (?theme=dracula)")
        page.goto(f"http://localhost:{port}/tests/test_page.html?theme=dracula")
        link_href = page.locator("#bootlegance-theme").get_attribute("href")
        assert "themes/dracula/theme.css" in link_href, f"Unexpected href: {link_href}"
        current = page.evaluate("Bootlegance.current()")
        assert current == "dracula", f"Expected dracula, got {current}"
        print("  Passed!")

        print("Test 3: Malicious query parameter sanitization (?theme=../evil or ?theme=<script>)")
        page.goto(f"http://localhost:{port}/tests/test_page.html?theme=../evil")
        current = page.evaluate("Bootlegance.current()")
        assert current == "vanguard", f"Expected vanguard fallback, got {current}"

        page.goto(f"http://localhost:{port}/tests/test_page.html?theme=invalid!theme")
        current = page.evaluate("Bootlegance.current()")
        assert current == "vanguard", f"Expected vanguard fallback, got {current}"
        print("  Passed!")

        print("Test 4: Cookie persistence and precedence")
        # Set cookie
        context.add_cookies([{
            "name": "theme",
            "value": "ayu",
            "domain": "localhost",
            "path": "/"
        }])
        page.goto(f"http://localhost:{port}/tests/test_page.html")
        current = page.evaluate("Bootlegance.current()")
        assert current == "ayu", f"Expected ayu from cookie, got {current}"

        # Query param should override cookie
        page.goto(f"http://localhost:{port}/tests/test_page.html?theme=nord")
        current = page.evaluate("Bootlegance.current()")
        assert current == "nord", f"Expected nord from query over cookie, got {current}"
        print("  Passed!")

        print("Test 5: Client-side Bootlegance.set() and event dispatch")
        page.goto(f"http://localhost:{port}/tests/test_page.html")
        page.evaluate("""() => {
            window.themeChangedEvent = null;
            window.addEventListener('bootlegance:change', (e) => {
                window.themeChangedEvent = e.detail.theme;
            });
            Bootlegance.set('catppuccin');
        }""")
        event_val = page.evaluate("window.themeChangedEvent")
        assert event_val == "catppuccin", f"Expected catppuccin in event, got {event_val}"
        link_href = page.locator("#bootlegance-theme").get_attribute("href")
        assert "themes/catppuccin/theme.css" in link_href, f"Unexpected href: {link_href}"
        # Check cookie was written
        cookies = context.cookies()
        theme_cookie = next(c for c in cookies if c["name"] == "theme")
        assert theme_cookie["value"] == "catppuccin", f"Expected cookie catppuccin, got {theme_cookie['value']}"
        print("  Passed!")

        print("Test 6: Light / Dark Mode toggling and storage")
        page.evaluate("Bootlegance.setMode('dark')")
        mode = page.evaluate("document.documentElement.getAttribute('data-bs-theme')")
        assert mode == "dark", f"Expected data-bs-theme=dark, got {mode}"
        stored = page.evaluate("localStorage.getItem('cf-theme')")
        assert stored == "dark", f"Expected localStorage cf-theme=dark, got {stored}"

        page.evaluate("Bootlegance.setMode('light')")
        mode = page.evaluate("document.documentElement.getAttribute('data-bs-theme')")
        assert mode == "light", f"Expected data-bs-theme=light, got {mode}"
        stored = page.evaluate("localStorage.getItem('cf-theme')")
        assert stored == "light", f"Expected localStorage cf-theme=light, got {stored}"
        print("  Passed!")

        print("Test 7: Auto-UI dropdown & mode button wiring")
        # Ensure themes.json loaded into options (options in HTML are not considered 'visible' in standard layout by wait_for_selector default)
        page.wait_for_selector("[data-bootlegance-picker] select option", state="attached")
        option_count = page.locator("[data-bootlegance-picker] select option").count()
        assert option_count >= 70, f"Expected >= 70 themes in dropdown, got {option_count}"

        # Change via UI select
        page.select_option("[data-bootlegance-picker] select", "brutalski")
        current = page.evaluate("Bootlegance.current()")
        assert current == "brutalski", f"Expected brutalski after select change, got {current}"

        # Click mode button
        dark_btn = page.locator("[data-bootlegance-mode='dark']")
        dark_btn.click()
        assert page.evaluate("document.documentElement.getAttribute('data-bs-theme')") == "dark"
        assert "active" in dark_btn.get_attribute("class")

        light_btn = page.locator("[data-bootlegance-mode='light']")
        light_btn.click()
        assert page.evaluate("document.documentElement.getAttribute('data-bs-theme')") == "light"
        assert "active" in light_btn.get_attribute("class")
        print("  Passed!")

        print("Test 8: Server-endpoint mode")
        page.goto(f"http://localhost:{port}/tests/test_endpoint_page.html")
        page.evaluate("Bootlegance.set('carbon')")
        page.wait_for_url("**/mock-theme-endpoint?**")
        current_url = page.url
        assert "theme=carbon" in current_url, f"Expected theme=carbon in URL, got {current_url}"
        assert "redirect=" in current_url, f"Expected redirect= in URL, got {current_url}"
        print("  Passed!")

        print("Test 9: Script data-base-url and data-default-theme attributes")
        # Clear cookies so cookie does not take precedence over data-default-theme
        context.clear_cookies()
        page.goto(f"http://localhost:{port}/tests/test_custom_config.html")
        current = page.evaluate("Bootlegance.current()")
        assert current == "gruvbox", f"Expected gruvbox default, got {current}"
        link_href = page.locator("#bootlegance-theme").get_attribute("href")
        assert link_href.startswith("https://cdn.example.com/themes/gruvbox/theme.css"), f"Unexpected custom base href: {link_href}"
        print("  Passed!")

        print("Test 10: Font size controls (API, UI, storage, clamping, reset)")
        page.goto(f"http://localhost:{port}/tests/test_page.html")
        # Verify initial font size
        fs = page.evaluate("Bootlegance.getFontSize()")
        assert fs == 100, f"Expected initial fs 100, got {fs}"
        value_text = page.locator("[data-bootlegance-font-size-value]").text_content()
        assert value_text == "100%", f"Expected 100%, got {value_text}"
        reset_btn = page.locator("[data-bootlegance-font-size='reset']")
        assert reset_btn.is_disabled(), "Reset button should be disabled at 100%"

        # Increase via UI button
        up_btn = page.locator("[data-bootlegance-font-size='up']")
        up_btn.click()
        assert page.evaluate("Bootlegance.getFontSize()") == 110
        assert page.evaluate("document.documentElement.style.fontSize") == "110%"
        assert page.evaluate("document.documentElement.style.getPropertyValue('--bootlegance-font-scale')") == "110%"
        assert page.locator("[data-bootlegance-font-size-value]").text_content() == "110%"
        assert page.evaluate("localStorage.getItem('cf-font-size')") == "110"
        assert not reset_btn.is_disabled(), "Reset button should be enabled after change"

        # Increase again
        up_btn.click()
        assert page.evaluate("Bootlegance.getFontSize()") == 120
        assert page.locator("[data-bootlegance-font-size-value]").text_content() == "120%"

        # Decrease via UI button
        down_btn = page.locator("[data-bootlegance-font-size='down']")
        down_btn.click()
        assert page.evaluate("Bootlegance.getFontSize()") == 110
        assert page.locator("[data-bootlegance-font-size-value]").text_content() == "110%"

        # Reset via UI button
        reset_btn.click()
        assert page.evaluate("Bootlegance.getFontSize()") == 100
        assert page.evaluate("document.documentElement.style.fontSize") == ""
        assert page.locator("[data-bootlegance-font-size-value]").text_content() == "100%"
        assert page.evaluate("localStorage.getItem('cf-font-size')") is None
        assert reset_btn.is_disabled(), "Reset button should be disabled after reset"

        # Clamping at max (200) and min (70)
        page.evaluate("Bootlegance.setFontSize(250)")
        assert page.evaluate("Bootlegance.getFontSize()") == 200
        assert up_btn.is_disabled(), "Up button should be disabled at max font size"

        page.evaluate("Bootlegance.setFontSize(50)")
        assert page.evaluate("Bootlegance.getFontSize()") == 70
        assert down_btn.is_disabled(), "Down button should be disabled at min font size"

        # Event dispatching
        page.evaluate("""() => {
            window.fontSizeEventVal = null;
            window.addEventListener('bootlegance:fontsize', (e) => {
                window.fontSizeEventVal = e.detail.fontSize;
            });
            Bootlegance.setFontSize(130);
        }""")
        event_fs = page.evaluate("window.fontSizeEventVal")
        assert event_fs == 130, f"Expected 130 in event detail, got {event_fs}"

        # Persistence across reload
        page.reload()
        assert page.evaluate("Bootlegance.getFontSize()") == 130
        assert page.evaluate("document.documentElement.style.fontSize") == "130%"
        assert page.locator("[data-bootlegance-font-size-value]").text_content() == "130%"

        print("  Passed!")

        browser.close()

def main():
    # Setup test pages directory
    os.makedirs("tests", exist_ok=True)

    with open("tests/test_page.html", "w") as f:
        f.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test Page</title>
    <script src="/bootlegance.js"></script>
</head>
<body>
    <div data-bootlegance-picker></div>
    <button data-bootlegance-mode="light">Light</button>
    <button data-bootlegance-mode="dark">Dark</button>
    <button data-bootlegance-font-size="down">A-</button>
    <span data-bootlegance-font-size-value></span>
    <button data-bootlegance-font-size="up">A+</button>
    <button data-bootlegance-font-size="reset">Reset</button>
</body>
</html>""")

    with open("tests/test_endpoint_page.html", "w") as f:
        f.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Endpoint Test Page</title>
    <script src="/bootlegance.js" data-endpoint="/mock-theme-endpoint"></script>
</head>
<body>
    <div data-bootlegance-picker></div>
</body>
</html>""")

    with open("tests/test_custom_config.html", "w") as f:
        f.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Custom Config Test Page</title>
    <script src="/bootlegance.js" data-base-url="https://cdn.example.com" data-default-theme="gruvbox"></script>
</head>
<body>
</body>
</html>""")

    server = ReusableTCPServer(("", 0), Handler)
    port = server.server_address[1]
    t = threading.Thread(target=server.serve_forever)
    t.daemon = True
    t.start()
    time.sleep(0.5)

    try:
        run_tests(port)
        print("\nAll Playwright end-to-end tests passed successfully!")
    finally:
        server.shutdown()
        # Clean up test html files
        for test_file in ["tests/test_page.html", "tests/test_endpoint_page.html", "tests/test_custom_config.html"]:
            if os.path.exists(test_file):
                os.remove(test_file)
        if os.path.exists("tests") and not os.listdir("tests"):
            os.rmdir("tests")

if __name__ == "__main__":
    main()
