module.exports = {
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['node_modules', 'cjs', 'esm', 'esnext', '.husky', '__test__'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
        printWidth: 120,
        semicolons: false,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: 'always',
        endOfLine: 'lf',
        trailingComma: 'none',
        semi: false
      }
    ]
  }
}
