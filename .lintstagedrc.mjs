export default {
  '!(*.{ts,tsx})': 'prettier --write',
  '*.{ts,tsx}': (stagedFiles) => [
    `eslint --fix ${stagedFiles.join(' ')}`,
    `npm run check-types`,
  ],
}
