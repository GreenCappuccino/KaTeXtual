import {KaTeXtual} from '../src/katextual';
import assert from 'assert';

describe('KaTeXtual unit tests', () => {
	it('generating simple finite integral', (done) => {
		KaTeXtual.getInstance().then((katextual) => {
			return katextual.renderPng('\\frac{d}{dx}\\left( \\int_{0}^{x} f(u)\\,du\\right)=f(x)');
		}).then((buff) => {
			console.log(buff.toString('base64'));
		}).then(() => {
			assert(true);
			done();
		}).catch(() => {
			assert(false);
			done();
		});
	});
});

