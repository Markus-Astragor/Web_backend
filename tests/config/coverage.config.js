/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
 rootDir: '../../src',
 clearMocks: true,
 collectCoverage: true,
 coverageDirectory: "coverage",
 coverageProvider: "v8",
 testRegex: '.*\\.(it-spec|spec)\\.js$',
 globalSetup: '../tests/jest.globalSetup.js',
 globalTeardown: '../tests/jest.globalTeardown.js',
};