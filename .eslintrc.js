module.exports = {
    env: {
        jest: true,
    },
    extends: 'airbnb-base',
    rules: {
        'comma-dangle': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-return-assign': 0,
        "max-len": [2, {"code": 200, "tabWidth": 4, "ignoreUrls": true}],
        semi: [2, "never"],
        camelcase: 0
    }
};
