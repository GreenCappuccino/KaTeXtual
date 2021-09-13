import puppeteer from 'puppeteer';
import {Browser, Page} from 'puppeteer';
import {InitHtmlGenerator} from './initHtmlGenerator';

export class Screenshotter {

	private browser: Browser;
	private page: Page;

	constructor(browser: Browser, page: Page) {
		this.browser = browser;
		this.page = page;
	}

	public static async createScreenshotter(): Promise<Screenshotter> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(await InitHtmlGenerator.genHtml());
		return new Screenshotter(browser, page);
	}

	public async screenshot(html: string): Promise<Buffer> {
		html = html.replace('class="katex-html"', 'class="katex-html" style="display:inline-block;"');
		await this.page.evaluate((html) => {
			/* istanbul ignore next */
			document.querySelector('#katexString')!.innerHTML = html;
		}, html);

		const base = await this.page.$('#katexString > span > span > span.katex-html');
		return await base?.screenshot() as Buffer;
	}
}
