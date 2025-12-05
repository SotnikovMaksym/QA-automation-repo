@demoqa @form @smoke
Feature: DemoQA Text Box Form Submission
  As a user
  I want to fill and submit the text box form
  So that I can verify form data submission

  Background:
    Given I open DemoQA text box page

  @positive @form-submit
  Scenario: Submit complete text box form
    When I fill "Full Name" with "John Doe"
    And I fill "Email" with "john.doe@example.com"
    And I fill "Current Address" with "123 Main Street, New York, NY 10001"
    And I fill "Permanent Address" with "456 Oak Avenue, Los Angeles, CA 90001"
    And I click Submit button
    Then I should see submitted output
    And output should contain "John Doe"
    And output should contain "john.doe@example.com"

  @positive @form-submit
  Scenario Outline: Submit form with different user data
    When I fill "Full Name" with "<fullName>"
    And I fill "Email" with "<email>"
    And I fill "Current Address" with "<currentAddress>"
    And I click Submit button
    Then I should see submitted output
    And output should contain "<fullName>"

    Examples:
      | fullName        | email                | currentAddress           |
      | Alice Smith     | alice@test.com       | 789 Pine St, Boston      |
      | Bob Johnson     | bob.j@company.com    | 321 Elm St, Chicago      |
      | Charlie Brown   | charlie@example.org  | 555 Maple Ave, Seattle   |

  @negative @validation
  Scenario: Submit form with invalid email
    When I fill "Full Name" with "Test User"
    And I fill "Email" with "invalid-email"
    And I click Submit button
    Then email field should show validation error
