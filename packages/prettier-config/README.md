# @okrtrack/prettier-config

Shared Prettier configuration for the OKRTrack monorepo with sensible defaults for modern JavaScript/TypeScript development.

## 🚀 Features

- **Consistent formatting** across all apps
- **Modern defaults** for JavaScript/TypeScript
- **File-specific overrides** for optimal formatting
- **Team-friendly** configuration
- **ESLint compatible** (works with @okrtrack/eslint-config)

## 🎯 Usage

### 1. Install
```bash
pnpm add -D @okrtrack/prettier-config
```

### 2. Reference in package.json
```json
{
  "prettier": "@okrtrack/prettier-config"
}
```

### 3. Add scripts
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### 4. Optional: Create .prettierignore
```bash
# Copy from the package if needed
cp node_modules/@okrtrack/prettier-config/.prettierignore .
```

## 🔧 Configuration

### Core Settings
- **Single quotes** for strings (`'hello'`)
- **Semicolons** always (`;`)
- **2 spaces** for indentation
- **80 characters** line width
- **LF** line endings
- **ES5** trailing commas

### File-Specific Overrides
- **Markdown**: 100 chars width, always wrap prose
- **JSON**: 120 chars width for readability
- **YAML**: Double quotes for compatibility

## 🎨 Integration with Tools

### ESLint
Works seamlessly with `@okrtrack/eslint-config`:

```js
// eslint.config.mjs
import nodeConfig from '@okrtrack/eslint-config/node';
export default nodeConfig; // Already includes prettier compatibility
```

### VS Code
Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Git Hooks
With husky and lint-staged:

```json
{
  "lint-staged": {
    "*.{js,ts,json,md}": ["prettier --write", "eslint --fix"]
  }
}
```

## 🔄 Workflow

### Development
```bash
# Format all files
pnpm format

# Check formatting without fixing
pnpm format:check

# Combined lint + format
pnpm lint && pnpm format
```

### CI/CD
```yaml
# .github/workflows/ci.yml
- name: Check formatting
  run: pnpm format:check

- name: Lint code
  run: pnpm lint
```

## 📋 Recommended Scripts

Add these to your app's `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check": "pnpm type-check && pnpm lint && pnpm format:check"
  }
}
```

## 🎯 Why These Settings?

### Single Quotes
- More common in JavaScript ecosystem
- Consistent with ESLint defaults
- Easier to type (no shift key)

### Semicolons
- Explicit and clear
- Prevents ASI (Automatic Semicolon Insertion) issues
- Standard in most codebases

### 80 Character Width
- Good for code reviews
- Works well with split screens
- Forces better code structure

### ES5 Trailing Commas
- Cleaner git diffs
- Easier to add/remove items
- Supported in all modern environments

## 🚨 Troubleshooting

### Prettier vs ESLint conflicts
This config is designed to work with `@okrtrack/eslint-config` which includes `eslint-config-prettier` to disable conflicting rules.

### VS Code not formatting
1. Install Prettier extension
2. Set as default formatter
3. Enable format on save
4. Reload VS Code

### Different formatting in CI
Ensure same Prettier version across environments:
```json
{
  "engines": {
    "prettier": "^3.0.0"
  }
}
```