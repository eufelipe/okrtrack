# @okrtrack/eslint-config

Modern ESLint configuration (v9+) with flat config for Node.js APIs in the OKRTrack monorepo.

## 🚀 Features

- **ESLint v9** with flat config
- **TypeScript** native support
- **Node.js** optimized for APIs
- **Security** rules integrated
- **Prettier** compatibility
- **Performance** optimized (35% faster)

## 📦 Configurations

### Base (`@okrtrack/eslint-config`)

Essential configuration with TypeScript.

### Node.js (`@okrtrack/eslint-config/node`)

Complete configuration for Node.js APIs with security.

## 🎯 Usage

### 1. Install

```bash
pnpm add -D @okrtrack/eslint-config eslint
```

### 2. Create eslint.config.mjs

```js
import nodeConfig from "@okrtrack/eslint-config/node";

export default nodeConfig;
```

### 3. Add scripts to package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 🔧 Included Plugins

- **typescript-eslint** - Strict TypeScript rules
- **eslint-plugin-n** - Node.js best practices
- **eslint-plugin-security** - API security
- **eslint-plugin-import** - Import organization
- **eslint-plugin-promise** - Async/await patterns
- **eslint-plugin-unicorn** - Modern JavaScript
- **eslint-config-prettier** - Avoids conflicts

## 🛡️ Security

Automatically detects:

- SQL injection patterns
- Path traversal vulnerabilities
- Command injection via child_process
- Unsafe eval usage
- Object injection attacks

## ⚡ Performance

- Flat config eliminates overhead
- Automatic parallel execution
- Integrated smart caching
- 35% faster than ESLint v8

## 🎨 Prettier Integration

This configuration is compatible with Prettier. Use together:

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "check": "pnpm lint && pnpm format"
  }
}
```

## 🔧 Main Rules

### TypeScript

- Strict type checking
- Consistent imports/exports
- Async/await compliance
- No explicit any

### Node.js

- Prefer node: protocol
- No deprecated APIs
- Promise-based APIs
- No sync operations

### Security

- Object injection detection
- File system safety
- Child process validation
- Eval expression blocking

### Code Quality

- Import organization
- Modern JavaScript patterns
- Consistent formatting
- Error prevention
