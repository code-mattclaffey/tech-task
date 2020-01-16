module.exports = {
    preset: 'ts-jest',
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    globals: {
        'ts-jest': {
            'tsConfigFile': 'tsconfig.jest.json'
        }
    }
};
