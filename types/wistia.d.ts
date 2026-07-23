/* eslint-disable @typescript-eslint/no-namespace */
import 'react';

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

export {};
