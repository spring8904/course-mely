export default {
  '*.{css,json,js}': 'prettier --write',
  '*.{ts,tsx}': (files) => [
    `eslint --fix --quiet ${files.join(' ')}`,
    'tsc --noEmit --pretty',
  ],
}
