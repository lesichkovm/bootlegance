#!/usr/bin/env python3
import sys
import os
import glob
from playwright.sync_api import sync_playwright

def capture_theme(theme_path, page):
    abs_path = os.path.abspath(os.path.join(theme_path, "index.html"))
    if not os.path.exists(abs_path):
        print(f"File not found: {abs_path}")
        return

    url = f"file://{abs_path}"
    print(f"Capturing screenshots for {theme_path}...")

    # 1. Dark Mode Screenshot (default mode)
    page.goto(url)
    page.evaluate("document.documentElement.setAttribute('data-bs-theme', 'dark')")
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(theme_path, "screenshot.png"), full_page=False)

    # 2. Light Mode Screenshot
    page.evaluate("document.documentElement.setAttribute('data-bs-theme', 'light')")
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(theme_path, "screenshot-light.png"), full_page=False)

def main():
    targets = sys.argv[1:]
    if not targets:
        targets = glob.glob("themes/*")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        for target in targets:
            if os.path.isdir(target):
                capture_theme(target, page)

        browser.close()

if __name__ == "__main__":
    main()
