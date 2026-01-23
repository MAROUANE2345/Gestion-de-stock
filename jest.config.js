const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './'
})

// Custom configuration
const customJestConfig = {
    setupFilesAfterEnv : ['<rootDir>/jest.setup.js'],
    testEnvironment : 'jest-environment-jsdom', // <-- fixed typo
    moduleNameMapper: {
        // handle module aliases
        '^@/(.*)$': '<rootDir>/$1',
    }
}

module.exports = createJestConfig(customJestConfig)
