import * as fontData from './fontData.json';
import * as fs from 'fs';
import * as path from 'path';

interface FontFamily {
	name: string,
	fonts: Font[],
}
interface Font {
	style: string,
	data: string,
}

export class FontUrlEncoder {

	public static familesToCSS(): string {
		const families = this.buildFamilies();

		let css = '';

		for (let i = 0; i < families.length; i++) {
			for (let j = 0; j < families[i].fonts.length; j++) {
				css += `@font-face{font-family:'${families[i].name}';src:url(${families[i].fonts[j].data}) format('woff2');}`;
			}
		}

		return css;
	}

	private static mapStyleToProperty(style: string): string {
		return '';
	}

	private static buildFamilies(): FontFamily[] {
		const katexPath = path.dirname(require.resolve('katex'));

		const fontFamilies: FontFamily[] = [];
		const familyMap = new Map<string, number>();
		for (let i = 0; i < fontData.fonts.length; i++) {
			const fontUrlEncode = this.woff2ToUrl(path.join(katexPath, fontData.fonts[i].relpath));
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
	private static woff2ToUrl(path: string): string {
		return `data:application/font-woff2;charset=utf-8;base64,${fs.readFileSync(path).toString('base64')}`;
	}
}
