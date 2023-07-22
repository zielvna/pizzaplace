import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['src/__tests__/utils.ts'],
};

export default createJestConfig(config);
