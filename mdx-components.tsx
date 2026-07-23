import type { MDXComponents } from 'mdx/types';

// This file is required by `@next/mdx` in Next.js 15.
// It lets us register custom component mappings for MDX content (e.g. headings,
// code blocks, links). The current project ships no MDX pages, so we return the
// pass-through mapping and rely on Tailwind's typography defaults.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
