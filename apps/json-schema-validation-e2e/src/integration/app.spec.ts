import { getGreeting } from '../support/app.po';

describe('json-schema-validation', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to json-schema-validation!');
  });

  it('should be able to upload a file', () => {
    cy.get('#csv-upload').attachFile('agency.txt', { force: true });
  });

  it('should contain all file options in dropdown', () => {
    cy.get('select')
      .should('contain', 'Agency')
      .and('contain', 'Calendar')
      .and('contain', 'Calendar Dates')
      .and('contain', 'Fare Attributes')
      .and('contain', 'Fare Rules')
      .and('contain', 'Feed Info')
      .and('contain', 'Frequencies')
      .and('contain', 'Routes')
      .and('contain', 'Shapes')
      .and('contain', 'Stop Times')
      .and('contain', 'Stops')
      .and('contain', 'Transfers')
      .and('contain', 'Trips')
  })

  it('should display errors in UI');
  it('should no error message for valid files');
});
