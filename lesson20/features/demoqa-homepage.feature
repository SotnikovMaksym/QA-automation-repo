@demoqa @smoke
Feature: DemoQA Homepage Navigation
  As a user
  I want to navigate the DemoQA homepage
  So that I can access different testing sections

  Background:
    Given I open DemoQA homepage

  @positive @homepage
  Scenario: Verify homepage loads successfully
    Then I should see the main header

  @positive @navigation  
  Scenario: Navigate to Forms section
    When I click on "Forms" category card
    Then I should be on Forms page
    And the page URL should contain "forms"
