import * as fontData from './fontData.json';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

interface FontFamily {
	name: string,
	fonts: Font[],
}

interface Font {
	style: string,
	data: string,
}

interface CssStyle {
	style: string,
	weight: string,
}

export class FontUrlEncoder {

	public static async familesToCSS(): Promise<string> {
		const families = await this.buildFamilies();

		let css = '';

		for (let i = 0; i < families.length; i++) {
			for (let j = 0; j < families[i].fonts.length; j++) {
				css += `@font-face{font-family:'${families[i].name}';\
				src:url(${families[i].fonts[j].data}) format('woff2');\
				${this.mapStyleToProperty(families[i].fonts[j].style)}}`;
			}
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

	private static async buildFamilies(): Promise<FontFamily[]> {
		const katexPath = path.dirname(require.resolve('katex'));

		const fontFamilies: FontFamily[] = [];
		const familyMap = new Map<string, number>();
		for (let i = 0; i < fontData.fonts.length; i++) {
			const fontUrlEncode = await this.woff2ToUrl(path.join(katexPath, fontData.fonts[i].relpath));
			const font = {
				style: fontData.fonts[i].style,
				data: fontUrlEncode,
			};
			if (fontData.fonts[i].family in familyMap)
				fontFamilies[familyMap.get(fontData.fonts[i].family) as number].fonts.push(font);
			else
				fontFamilies.push({
					name: fontData.fonts[i].family,
					fonts: [font],
				});
		}
		return fontFamilies;
	}

	private static async woff2ToUrl(path: string): Promise<string> {
		return `data:application/font-woff2;charset=utf-8;base64,${
			(await fsPromises.readFile(path)).toString('base64')}`;
	}
}
