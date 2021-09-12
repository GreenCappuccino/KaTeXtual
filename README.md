# KaTeXtual
...is a simple package with only one goal: render compatible TeX commands
using [KaTeX](https://katex.org/) to image formats in a fast and customizable
manner.
```typescript
import {KaTeXtual} from 'katextual';

// singleton with async initialization
katextual = await KaTeXtual.getInstance();

// renders as buffer in PNG format
const png: Buffer = await katextual.renderPng('\\int_0^{2\\pi}{\\sin{\\theta}}');
```
