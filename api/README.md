# DaalBot API (Wrapper)
This is a wrapper for the DaalBot API. It provides a simple typed interface to interact with DaalBot's API. The API is built using TypeScript and is designed to be easy to use and understand.

## Installation
```bash
npm install @daalbot/api
```
## Usage
```typescript
import { DBAPI, modules } from '@daalbot/api';

const api = new DBAPI({
    auth: {
        type: 'User', // or 'Guild'
        token: 'Your Token Here'
    },
    guildId: 'Your Guild ID Here' // Required, even if only using routes that don't require a guild, if that's the case, this isn't validated just put 0
});

const user = await modules.getCurrentUser(api);
console.log(user);
```

## Contributing
If you want to contribute to this project, please fork the repository and create a pull request. All contributions are welcome!

### Writing Tests
To write tests for the API wrapper, you can simply create a new file in the `tests` directory that ends with `.test.ts`. Once you have written your tests, you can run them using the following command:
```bash
npm test
```
This will run all tests in the `tests` directory and output the results to the console.

### File Structure
The current file structure is as follows:
* `src/` - Contains the source code for the API wrapper.
* `tests/` - Contains the tests for the API wrapper.
* `src/modules/*` (Alias `$mod/`) - Contains the categories of routes for the API wrapper (events, autoroles, xp, etc).
* `src/*` (Alias `@/`) - Files in the root of the src directory are general files are commonly used across the API wrapper.
