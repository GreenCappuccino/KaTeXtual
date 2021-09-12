# KaTeXtual
...is a simple package with only one goal: render compatible TeX commands
using [KaTeX](https://katex.org/) to image formats in a fast and customizable
manner.
```typescript
import {KaTeXtual} from '@greencap/katextual';

katextual = KaTeXtual.getInstance();

katextual.renderPng('\\int_0^{2Pi}{\\sin{\\theta}}');
```
