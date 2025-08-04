/**
 * @type {import('lint-staged').Config}
 */
export default {
  "*.{js,ts,tsx}": [
    "pnpm lint:fix --filter='./packages/*' --filter='./apps/*'",
    "pnpm format --filter='./packages/*' --filter='./apps/*'"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
};
