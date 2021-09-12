import * as katex from 'katex';
import {Screenshotter} from './screenshotter';

export class KaTeXtual {
	private static instance: KaTeXtual;

	private screenshotter: Screenshotter;

	private constructor(screenshotter: Screenshotter) {
		this.screenshotter = screenshotter;
	}

	public static async getInstance(): Promise<KaTeXtual> {
		return this.instance ||
			(this.instance = new this(await Screenshotter.createScreenshotter()));
	}

	public async renderPng(commands: string): Promise<Buffer> {
		return await this.screenshotter.screenshot(
			katex.renderToString(
				commands, {
					displayMode: true,
				}));
	}

	public initMhChem(): void {
		require('katex/dist/contrib/mhchem');
	}
}
