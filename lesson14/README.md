# API Testing Framework - TypeScript# API Testing Framework - TypeScript# Official Joke API



Lesson 14 - Automated API testing with Jest, Axios, and TypeScript.Lesson 14 - Automated API testing with Jest, Axios, and TypeScript.## Endpoints:



## Quick Start## Quick Start### Grab a random joke



```bash[https://official-joke-api.appspot.com/random_joke](https://official-joke-api.appspot.com/random_joke)

npm install          # Install dependencies

npx tsc --noEmit    # Check TypeScript````bash

npm test            # Run all tests

npm run lint        # Check code stylenpm install          # Install dependencies

npm run format      # Format code

```npx tsc --noEmit    # Check TypeScript[https://official-joke-api.appspot.com/jokes/random](https://official-joke-api.appspot.com/jokes/random)



## Safe Tests (No API calls)npm test            # Run all tests

```bash

npx jest tests/simple.test.ts tests/mocked-api.test.ts```### Get joke types

```

[https://official-joke-api.appspot.com/types](https://official-joke-api.appspot.com/types)

## Structure

## Safe Tests (No API calls)

- `api-objects/` - API client classes

- `services/` - HTTP client```bash### Grab ten random jokes

- `types/` - TypeScript interfaces

- `tests/` - Test suitesnpx jest tests/simple.test.ts tests/mocked-api.test.ts[https://official-joke-api.appspot.com/random_ten](https://official-joke-api.appspot.com/random_ten)



## Features````



✅ TypeScript 4.9  ## Structure[https://official-joke-api.appspot.com/jokes/ten](https://official-joke-api.appspot.com/jokes/ten)

✅ Jest 29 with ts-jest  

✅ API Objects pattern  - `api-objects/` - API client classes### Grab any number of random jokes

✅ Custom matchers  

✅ Mock tests  - `services/` - HTTP client

✅ ESLint + Prettier  

✅ 100% API Objects coverage  - `types/` - TypeScript interfacesUsage: `https://official-joke-api.appspot.com/jokes/random/<any-number>`



## Code Quality- `tests/` - Test suites



- **ESLint** - Static code analysisFor example:

- **Prettier** - Code formatting

- **TypeScript** - Type checking## Features\* [https://official-joke-api.appspot.com/jokes/random/5](https://official-joke-api.appspot.com/jokes/random/5)



## Jokes API Endpoints- [https://official-joke-api.appspot.com/jokes/random/25](https://official-joke-api.appspot.com/jokes/random/25)



- `GET /jokes/random` - Random joke✅ TypeScript 4.9 \* [https://official-joke-api.appspot.com/jokes/random/250](https://official-joke-api.appspot.com/jokes/random/250)

- `GET /jokes/ten` - 10 jokes

- `GET /ping` - Health check✅ Jest 29 with ts-jest

✅ API Objects pattern ### Grab jokes by type

✅ Custom matchers

✅ Mock tests The endpoints are `jokes/:type/random` or `jokes/:type/ten`. For example:

✅ 100% API Objects coverage

[https://official-joke-api.appspot.com/jokes/programming/random](https://official-joke-api.appspot.com/jokes/programming/random)

## Jokes API Endpoints

[https://official-joke-api.appspot.com/jokes/programming/ten](https://official-joke-api.appspot.com/jokes/programming/ten)

- `GET /jokes/random` - Random joke

- `GET /jokes/ten` - 10 jokes

- `GET /ping` - Health check### Grab joke by id

Use endpoint `/jokes/:id`

---

## How these jokes were collected

The majority of these jokes were contributed by joke-loving coders around the world!

### Make a contribution!

Submit a Pull Request, with your joke added to the jokes/index.json file. Make sure the joke is in this format:

```javascript
{
  "type": "programming",
  "setup": "What's the best thing about a Boolean?",
  "punchline": "Even if you're wrong, you're only off by a bit."
}
```

---

### Run Locally

- Clone the repo
- `npm i && npm run dev`
- Visit `localhost:3005/jokes/random` or `localhost:3005/jokes/ten` on your browser
