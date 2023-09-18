/* eslint-env node */
module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'prettier'],
    plugins: ['@typescript-eslint'],
};
