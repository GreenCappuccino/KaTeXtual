import {InitHtmlGenerator} from '../src/initHtmlGenerator';
import assert from 'assert';

describe('InitHtmlGenerator unit tests', () => {
	it('generating initial html', (done) => {
		InitHtmlGenerator.genHtml().then((html) => {
			assert(true);
			done();
		}).catch(() => {
			assert(false);
			done();
		});
	});
});

