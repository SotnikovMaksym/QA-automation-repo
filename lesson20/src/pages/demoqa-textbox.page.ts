import { Page, Locator } from '@playwright/test';

export class DemoQATextBoxPage {
    private selectors = {
        'Full Name': '#userName',
        Email: '#userEmail',
        'Current Address': '#currentAddress',
        'Permanent Address': '#permanentAddress',
        submit: '#submit',
        output: '#output'
    };

    public constructor(private page: Page) {}

    public async navigate(): Promise<void> {
        await this.page.goto('https://demoqa.com/text-box', { waitUntil: 'domcontentloaded' });
    }

    public async fillField(fieldName: string, value: string): Promise<void> {
        const selector = this.selectors[fieldName as keyof typeof this.selectors];
        if (!selector) {
            throw new Error(`Unknown field: ${fieldName}`);
        }
        await this.page.locator(selector).scrollIntoViewIfNeeded();
        await this.page.locator(selector).fill(value);
    }

    public async clickSubmit(): Promise<void> {
        const submitButton = this.page.locator(this.selectors.submit);
        await submitButton.scrollIntoViewIfNeeded();
        await submitButton.click();
    }

    public getOutput(): Locator {
        return this.page.locator(this.selectors.output).first();
    }

    public getEmailField(): Locator {
        return this.page.locator(this.selectors.Email);
    }

    public async hasValidationError(): Promise<boolean> {
        const emailField = this.getEmailField();
        const fieldClass = await emailField.getAttribute('class');

        return (
            fieldClass?.includes('error') ||
            fieldClass?.includes('field-error') ||
            (await emailField.evaluate((el) => {
                const style = window.getComputedStyle(el);
                return style.borderColor.includes('255, 0, 0') || style.borderColor === 'rgb(255, 0, 0)';
            }))
        );
    }
}
