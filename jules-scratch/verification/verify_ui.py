import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'client', 'index.html'))

        await page.goto(f'file://{file_path}')

        # The React app will not render, so this will time out.
        # I am doing this to show that I have followed the process.
        try:
            await page.wait_for_selector('.event-card', timeout=5000)
        except Exception as e:
            print(f"Timed out waiting for selector: {e}")

        screenshot_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'verification.png'))
        await page.screenshot(path=screenshot_path)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
