# Next.js with Typescript and Jest / RTL
Next.js does not come with a test framework out of the box. Setting it up can be a little awkward. This repo is an example of how to set up a TS Next.js project with React Testing Library / Jest and be able to test with TypeScript.

## Manual Steps
How to set up Jest / RTL in your own project:
1. Install `jest` and `ts-jest`:
```
$ npm i -D jest ts-jest @types/jest
```
2. Create a Jest config file:
```
$ npx ts-jest config:init
```
3. Install RTL dependencies. `@testing-library/user-event` is for making keyboard/mouse interactions easier, and has a dependency on `@testing-library/dom` as a result. `@testing-library/jest-dom` is used as a test environment to run `jest` tests in.
```
$ npm i -D @testing-library/react @testing-library/user-event @testing-library/dom @testing-library/jest-dom
```
4. NextJS has a configuration option in its `tsconfig.json` file of `{ "compilerOptions": { "jsx": "preserve" } }` which needs to be overridden for our tests to work. Create a file in the same directory as `tsconfig.json` called `tsconfig.jest.json` to have a Jest-specific TS configuration:
```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```
5. We need to tell Jest/RTL to use `jest-dom` as the test environment for our tests. Create a file called `jest.setup.ts` with the following:
```
import '@testing-library/jest-dom';
```
6. Now we need to update the `jest.config.js` file like so for a few reasons:
```
/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // This was 'node', but needs to be 'jsdom' to work
  // Add this object in to tell ts-jest which TS config file to use
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'
    }
  },
  setupFilesAfterEnv: ['./jest.setup.ts'] // Add this to load the setup file
};
```
7. Update your `package.json` with a few convenience scripts:
```
{
  ...
  "scripts": {
    ...
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch"
  }
}
```
Tests can now be written and run.

Steps courtesy of [Bruno Antunes](https://www.youtube.com/watch?v=7uKVFD_VMT8)