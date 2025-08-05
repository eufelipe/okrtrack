/** @type {import("prettier").Config} */
module.exports = {
    // Core formatting
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
    
    // Line handling
    printWidth: 80,
    endOfLine: 'lf',
    
    // Trailing commas (ES5 = objects/arrays, not functions)
    trailingComma: 'es5',
    
    // Brackets and spacing
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    
    // Quote handling
    quoteProps: 'as-needed',
    jsxSingleQuote: true,
    
    // Prose formatting
    proseWrap: 'preserve',
    
    // Embedded languages
    embeddedLanguageFormatting: 'auto',
    
    // File specific overrides
    overrides: [
      {
        files: '*.md',
        options: {
          printWidth: 100,
          proseWrap: 'always',
        },
      },
      {
        files: '*.json',
        options: {
          printWidth: 120,
        },
      },
      {
        files: ['*.yml', '*.yaml'],
        options: {
          singleQuote: false,
        },
      },
    ],
  };