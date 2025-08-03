# @okrtrack/ts-config

Shared TypeScript configurations for the OKRTrack monorepo.

## 🚀 Features

- **TypeScript 5.6+** with modern configurations
- **Node.js** optimized (ES2022 + NodeNext)
- **Strict mode** for maximum type safety
- **Clean Architecture** ready with path mapping
- **Modular** - Base + specialized configs

## 📦 Available Configurations

### Base (`@okrtrack/ts-config/base`)
Fundamental configuration with strict mode and ES modules.

### Node.js (`@okrtrack/ts-config/node`) 
Complete configuration for Node.js APIs with optimized build.

### Test (`@okrtrack/ts-config/test`)
Configuration for tests with relaxed rules.

## 🎯 Usage

### 1. Install
```bash 
pnpm add -D @okrtrack/ts-config
```

### 2. Create tsconfig.json
```json
{
  "extends": "@okrtrack/ts-config/node",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

### 3. Add scripts to package.json
```json
{
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "dev": "tsx watch src/server.ts"
  }
}
```

## 🔧 Main Configurations

### tsconfig.base.json
```json
{
  "target": "ES2022",
  "module": "NodeNext",
  "moduleResolution": "NodeNext",
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "verbatimModuleSyntax": true
}
```

### tsconfig.node.json
```json
{
  "extends": "./tsconfig.base.json",
  "lib": ["ES2022"],
  "types": ["node"],
  "declaration": true,
  "sourceMap": true
}
```

## 🏗️ Clean Architecture Support

### Recommended Path Mapping
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/domain/*": ["./domain/*"],
      "@/application/*": ["./application/*"],
      "@/infrastructure/*": ["./infrastructure/*"],
      "@/presentation/*": ["./presentation/*"]
    }
  }
}
```

### Clean Imports
```typescript
// ✅ Instead of:
import { User } from '../../../domain/entities/user';

// ✅ Use:
import { User } from '@/domain/entities/user';
```

## 🧪 Test Configuration

### tsconfig.test.json
```json
{
  "extends": "@okrtrack/ts-config/test",
  "compilerOptions": {
    "types": ["node", "vitest/globals"]
  }
}
```

### Usage with Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node'
  }
});
```

## ⚡ Configuration Benefits

### Maximum Type Safety
- **noUncheckedIndexedAccess** - Prevents runtime errors
- **exactOptionalPropertyTypes** - Strict type safety
- **strict** - All checks enabled

### Performance
- **verbatimModuleSyntax** - Better tree-shaking
- **incremental** - Incremental builds
- **NodeNext** - Modern module resolution

### Developer Experience
- **Source maps** for debugging
- **Declaration files** for IntelliSense
- **Path mapping** for clean imports

## 🎨 Tool Integration

### ESLint
```js
// eslint.config.mjs
import nodeConfig from '@okrtrack/eslint-config/node';
export default nodeConfig;
```

### Prettier
```json
{
  "prettier": "@okrtrack/prettier-config"
}
```

### Vitest
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      tsconfig: './tsconfig.test.json'
    }
  }
});
```

## 🔄 Build Workflow

```bash
# Type checking
pnpm type-check

# Build for production
pnpm build

# Development with watch
pnpm dev
```

## 📋 Recommended Project Structure

```
apps/api/
├── src/
│   ├── domain/           # @/domain/*
│   ├── application/      # @/application/*
│   ├── infrastructure/   # @/infrastructure/*
│   ├── presentation/     # @/presentation/*
│   └── server.ts
├── tests/
├── tsconfig.json         # extends node
├── tsconfig.test.json    # extends test  
└── package.json
```

## 🚨 Troubleshooting

### Module resolution error
```bash
# Check if you have "type": "module" in package.json
{
  "type": "module"
}
```

### Path mapping not working
```bash
# Install tsx for development
pnpm add -D tsx

# Use tsx instead of ts-node
"dev": "tsx watch src/server.ts"
```