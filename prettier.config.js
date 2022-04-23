module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  importOrder: [
    '^@utils/(.*)$',
    '^@firebase-config$',
    '^@hooks/(.*)$',
    '^@styles/(.*)$',
    '^@components/(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
}
