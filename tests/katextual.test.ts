import {KaTeXtual} from '../dist/katextual';
import {expect} from 'chai';

describe('KaTeXtual unit tests', () => {
	it('generating simple finite integral', () => {
		const katextual = KaTeXtual.getInstance();
		const promise = new Promise((res) => {
			res(KaTeXtual.renderPng('\\int_0^{2Pi}{\\sin{\\theta}}'));
		});
		promise.then((res) => {
			console.log(res.toString('base64'));
		}).catch();
		expect(true);
	});
});
