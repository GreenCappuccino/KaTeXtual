import * as fontData from './fontData.json';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

interface CssStyle {
	style: string,
	weight: string,
}

export class FontUrlEncoder {

	public static async buildCSS(): Promise<string> {
		const katexPath = path.dirname(require.resolve('katex'));

		let css = '';

		for (let i = 0; i < fontData.fonts.length; i++) {
			css += `@font-face{font-family:'${fontData.fonts[i].family}';\
				src:url(${await this.woff2ToUrl(path.join(katexPath, 'fonts', fontData.fonts[i].filename))}) format('woff2');\
				${this.mapStyleToProperty(fontData.fonts[i].style)}}`;
		}

		return css;
	}

	private static mapStyleToProperty(style: string): string {
		const styleCssMap = new Map<string, CssStyle>([
			['regular', {
				style: 'normal',
				weight: '400',
			}],
			['bolditalic', {
				style: 'italic',
				weight: '700',
			}],
			['bold', {
				style: 'normal',
				weight: '700',
			}],
			['italic', {
				style: 'italic',
				weight: '400',
			}],
		]);
		const styleVal = styleCssMap.get(style) as CssStyle;
		return `font-style: ${styleVal.style};font-weight: ${styleVal.weight};`;
	}

	private static async woff2ToUrl(path: string): Promise<string> {
		return `data:application/font-woff2;charset=utf-8;base64,${
			(await fsPromises.readFile(path)).toString('base64')}`;
	}
}
