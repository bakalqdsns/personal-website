/* eslint-disable @typescript-eslint/no-namespace */
declare global {
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
