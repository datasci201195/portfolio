import { defineConfig } from 'astro/config';
import writingMetadata from './src/writing-metadata.mjs';

export default defineConfig({
  site: 'https://rupeshpatel.dev',
  output: 'static',
  trailingSlash: 'always',
  markdown: { remarkPlugins: [writingMetadata] },
});
