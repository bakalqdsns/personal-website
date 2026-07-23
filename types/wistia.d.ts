/* eslint-disable @typescript-eslint/no-namespace */
// Augment React 19's JSX.IntrinsicElements with the Wistia web-component tag.
//
// React 19 dropped the legacy global `JSX` namespace in favour of
// `React.JSX`. The augmentation MUST live inside `declare module 'react'`
// for module-augmentation rules; the `import 'react'` side-effect import
// promotes this file to a module so the augmentation is actually picked up.
//
// If you ever see "Property 'wistia-player' does not exist on type
// 'JSX.IntrinsicElements'" again after a React major bump, check the
// migration notes for that version — the augmentation site might move.

import type * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'media-id'?: string;
          'aspect'?: string;
          'player-color'?: string;
        },
        HTMLElement
      >;
    }
  }
}
