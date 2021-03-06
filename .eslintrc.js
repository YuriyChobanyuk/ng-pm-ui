module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['tsconfig.app.json', 'tsconfig.json'],
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      plugins: [
        'eslint-plugin-import',
        'eslint-plugin-jsdoc',
        '@angular-eslint/eslint-plugin',
        '@angular-eslint/eslint-plugin-template',
        'eslint-plugin-prefer-arrow',
        '@typescript-eslint',
        '@typescript-eslint/tslint',
        'simple-import-sort',
      ],
      rules: {
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/contextual-lifecycle': 'error',
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-output-native': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Object: {
                message:
                  'Avoid using the `Object` type. Did you mean `object`?',
              },
              Function: {
                message:
                  'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
              },
              Boolean: {
                message:
                  'Avoid using the `Boolean` type. Did you mean `boolean`?',
              },
              Number: {
                message:
                  'Avoid using the `Number` type. Did you mean `number`?',
              },
              String: {
                message:
                  'Avoid using the `String` type. Did you mean `string`?',
              },
              Symbol: {
                message:
                  'Avoid using the `Symbol` type. Did you mean `symbol`?',
              },
            },
          },
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
          },
        ],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': [
          'error',
          {
            hoist: 'all',
          },
        ],
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/triple-slash-reference': [
          'error',
          {
            path: 'always',
            types: 'prefer-import',
            lib: 'always',
          },
        ],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': ['error', 'always'],
        complexity: 'off',
        'constructor-super': 'error',
        curly: 'error',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': [
          'error',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'max-classes-per-file': 'off',
        'max-len': [
          'error',
          {
            code: 140,
          },
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': [
          'error',
          {
            allow: [
              'log',
              'warn',
              'dir',
              'timeLog',
              'assert',
              'clear',
              'count',
              'countReset',
              'group',
              'groupEnd',
              'table',
              'dirxml',
              'error',
              'groupCollapsed',
              'Console',
              'profile',
              'profileEnd',
              'timeStamp',
              'context',
            ],
          },
        ],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-new-wrappers': 'error',
        'no-restricted-imports': ['error', 'rxjs/Rx'],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        'quote-props': ['error', 'as-needed'],
        radix: 'error',
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never',
          },
        ],
        'spaced-comment': [
          'error',
          'always',
          {
            markers: ['/'],
          },
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
        '@typescript-eslint/tslint/config': [
          'error',
          {
            rules: {
              'import-spacing': true,
              typedef: [true, 'call-signature'],
              whitespace: [
                true,
                'check-branch',
                'check-decl',
                'check-operator',
                'check-separator',
                'check-type',
                'check-typecast',
              ],
            },
          },
        ],
        'sort-imports': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Packages.
              ['^@?(?!mediu@nrwl/eslint-plugin-nxm-stories)\\w'],
              ['^@medium-stories?\\w'],
              ['^[^.]'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
            ],
          },
        ],
      },
      overrides: [
        {
          files: ['*.spec.ts'],
          // Правила для линтера
          extends: ['plugin:jasmine/recommended'],
          // Плагин для запуска правил
          plugins: ['jasmine'],
          parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            project: ['tsconfig.spec.json'],
          },
          rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-assignmentall': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
          },
        },
      ],
    },
    {
      files: ['*.html'],
      parser: '@angular-eslint/template-parser',
      plugins: [
        '@angular-eslint/template',
        '@angular-eslint/eslint-plugin-template',
      ],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};
