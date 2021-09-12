import * as Handlebars from 'handlebars';
import * as fsPromises from 'fs/promises';
import path from 'path';
import {FontUrlEncoder} from './fontUrlEncoder';

export class InitHtmlGenerator {
	public static async genHtml(): Promise<string> {
		const source = (await fsPromises.readFile(
			path.join(__dirname, 'puppeteerTemplate.hbs'),
		)).toString();
		const template = Handlebars.compile(source, {noEscape: true});
		let stylesheet = (await fsPromises.readFile(
			path.join(path.dirname(require.resolve('katex')), 'katex.min.css'),
		)).toString();
		// The fonts are loaded in as base64 in another style, so the @font-face rules are removed here.
		stylesheet = stylesheet.replace(/\r\n|\n|\r/gm, '');
		stylesheet = stylesheet.replace(/@font-face.*?{.*?}+/g, '');

		return template({
			fontFamilies: await FontUrlEncoder.buildCSS(),
			katexStylesheet: stylesheet,
		});
	}
}
