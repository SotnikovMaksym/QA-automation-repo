export const TEST_DATA = {
    expense: {
        amounts: {
            default: '2500',
            cash: '1500',
            usd: '100'
        },
        comments: {
            automated: 'E2E Test - Automated expense creation',
            cash: 'Cash expense - E2E Test',
            usd: 'USD expense - E2E Test',
            validation: 'Test validation'
        },
        currencies: {
            uah: 'UAH',
            usd: 'USD',
            eur: 'EUR'
        }
    },
    income: {
        amounts: {
            default: '5000',
            cash: '3000',
            usd: '200',
            eur: '150'
        },
        comments: {
            automated: 'E2E Test - Automated income creation',
            cash: 'Cash income - E2E Test',
            usd: 'USD income - E2E Test',
            eur: 'EUR income - E2E Test'
        },
        currencies: {
            uah: 'UAH',
            usd: 'USD',
            eur: 'EUR'
        }
    }
};

export const ROUTES = {
    expenses: '/expenses',
    incomes: '/incomes',
    home: '/'
};
