module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'airbnb-base',
        'prettier',
        'prettier/vue',
        'plugin:nuxt/recommended',
        'plugin:vue/recommended',
        'plugin:prettier/recommended',
    ],
    globals: {
        $nuxt: true,
    },
    plugins: ['prettier', 'vue', 'nuxt'],
    // add your custom rules here
    rules: {
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'prettier/prettier': 'error',
        'vue/singleline-html-element-content-newline': 0,
        'import/no-extraneous-dependencies': 0,
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'no-plusplus': 0,
        'no-unused-expressions': 0,
        camelcase: 0,
        'no-param-reassign': ['error', { props: false }],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'no-multi-assign': 0,
    },
};
