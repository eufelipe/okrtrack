import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: false,
  search: false,
  defaultShowCopyCode: false,
  staticImage: true,
  readingTime: false,
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  output: 'export' as const,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['nextra-theme-docs'],
  },
  transpilePackages: ['nextra', 'nextra-theme-docs'],
};

export default withNextra(nextConfig);
