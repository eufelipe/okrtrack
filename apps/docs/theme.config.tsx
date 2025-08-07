import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <>OKRTrack</>,
  project: {
    link: 'https://github.com/eufelipe/okrtrack'
  },
  docsRepositoryBase: 'https://github.com/eufelipe/okrtrack/tree/main/apps/docs',
  footer: {
    content: 'OKRTrack Documentation'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  toc: {
    backToTop: true
  }
}

export default config