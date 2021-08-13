module.exports = {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__test__/*.[jt]s?(x)']
    }
  ],
  coverageDirectory: './coverage',
  collectCoverage: false
}
