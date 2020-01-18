module.exports = {
    preset: 'ts-jest',
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json',
            diagnostics: {
                ignoreCodes: [2531, 2345]
            }
        }
    }
};
