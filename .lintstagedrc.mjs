export default {
  '*.{css,json,js}': 'prettier --write',
  '*.{ts,tsx}': ['eslint --fix', 'tsc-files --noEmit'],
}
