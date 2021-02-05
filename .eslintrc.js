module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'prettier'
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 'tab'],
        "vue/html-indent": ["error", "tab"],
        "vue/max-attributes-per-line": [1, {
                "singleline": 4,
                "multiline": {
                    "max": 1,
                    "allowFirstLine": true
                }
            }
        ],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "any",
                "component": "any"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/component-name-in-template-casing": [
            "error",
            "PascalCase",
            {
                "ignores": [
                    "nuxt",
                    "nuxt-link",
                    "nuxt-child",
                    "transition"
                ]
            }
        ],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "space-before-function-paren": ["error", "always"],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};
