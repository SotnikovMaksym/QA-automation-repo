FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /tests

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install --with-deps
RUN mkdir -p test-results allure-results

CMD ["npm", "test"]
