module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverageFrom: ['services/**/*.ts', 'api-objects/**/*.ts', '!**/node_modules/**', '!**/dist/**'],
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: false
            }
        ]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    extensionsToTreatAsEsm: [],
    maxWorkers: 1,
    testTimeout: 30000
};
