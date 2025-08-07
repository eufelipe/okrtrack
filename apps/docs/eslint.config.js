import baseConfig from '@okrtrack/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**'],
  },
];
