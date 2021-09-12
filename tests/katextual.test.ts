import {KaTeXtual} from '../src/katextual';
import assert from 'assert';

describe('KaTeXtual unit tests', () => {
	it('generating simple finite integral', (done) => {
		KaTeXtual.getInstance().then((katextual) => {
			return katextual.renderPng('\\int_0^{2\\pi}{\\sin{\\theta}}');
		}).then((buff) => {
			buff.toString('base64');
		}).then(() => {
			assert(true);
			done();
		}).catch(() => {
			assert(false);
			done();
		});
	});
});

