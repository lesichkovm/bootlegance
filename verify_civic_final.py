import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Open the kitchen sink page
        file_path = os.path.abspath("themes/civic/index.html")
        await page.goto(f"file://{file_path}")

        # Wait for fonts to load
        await page.wait_for_timeout(2000)

        # Take full page screenshot for light mode
        await page.screenshot(path="themes/civic/screenshot.png", full_page=True)
        print("Generated themes/civic/screenshot.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
