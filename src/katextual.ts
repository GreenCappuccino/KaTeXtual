import * as katex from 'katex';
import nodeHtmlToImage from 'node-html-to-image';
import * as fs from 'fs';
import * as path from 'path';
import {FontUrlEncoder} from './fontUrlEncoder';

export class KaTeXtual {
	private static _instance: KaTeXtual;

	private static stylesheet: string;

	private constructor() {
		KaTeXtual.stylesheet = fs.readFileSync(path.join(path.dirname(require.resolve('katex')), 'katex.min.css')).toString();
	}

	public static getInstance(): KaTeXtual {
		return this._instance || (this._instance = new this());
	}

	private static woff2ToUrl(path: string): string {
		return `data:application/font-woff2;charset=utf-8;base64,${fs.readFileSync(path).toString('base64')}`;
	}

	public static async renderPng(data: string): Promise<Buffer> {
		return nodeHtmlToImage({
			html: `<!DOCTYPE html>
				<html>
					<head>
						<style>${FontUrlEncoder.familesToCSS()}</style>
						<style>${this.stylesheet}</style>
					</head>
					<body>
						${katex.renderToString(data)}
					</body>
				</html>`,
		}) as Promise<Buffer>;
	}

	public static initMhChem(): void {
		require('katex/dist/contrib/mhchem');
	}
}
