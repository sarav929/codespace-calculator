// SARA //

describe('Test calculator functionality', () => {
  it('Calculator page loads correctly', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
  });

  // Test continuous operations after pressing = (e.g., 5 + 5 = 10, then + 2 = 12).

  it('After calculating 5 + 5 you can add 2 to the result (10) and get 12', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#5').click();
    cy.get('#plus').click();
    cy.get('#5').click();
    cy.get('#equal').click();
    cy.get('#plus').click();
    cy.get('#2').click();
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '12');
  });

  // Ensure entering numbers like 007 displays correctly as 7.
  it('First number gets rounded correctly without leading zeros', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#0').click();
    cy.get('#0').click();
    cy.get('#7').click();
    cy.get('#plus').click();
    cy.get('.screen').should('have.text', '7+');
  });

  // Verify decimal operations (e.g., 2.5 + 0.5 = 3).
  it('Verify that operations with decimals are handles correctly (2.5 + 0.5 = 3)', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#2').click();
    cy.get('#decimal').click();
    cy.get('#5').click();
    cy.get('#plus').click();
    cy.get('#0').click();
    cy.get('#decimal').click();
    cy.get('#5').click();
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '3');
  });

  // Test large numbers and ensure the display handles them appropriately.

  it('Verify that large numbers are handled correctly', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#1').click();
    for (let n = 0; n < 5; n++) {
      cy.get('#0').click();
    }
    cy.get('#multiply').click();
    for (let n = 0; n < 5; n++) {
      cy.get('#2').click();
    }
    for (let n = 0; n < 5; n++) {
      cy.get('#1').click();
    }
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '222221111100000');
  });

  // Ensure invalid input sequences (e.g., +, /, or = at the start) are handled gracefully
  // Check that minus can still be clicked to allow negative numbers

  it('Verify that operators as clicked first they don`t display on the screen except for minus', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#plus').click();
    cy.get('.screen').should('have.text', '');
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '');
    cy.get('#minus').click();
    cy.get('.screen').should('have.text', '-');
  });

  // Test with a long sequence of inputs to verify app responsiveness (20+ inputs)

  it('Calculator is able to handle 20 inputs in sequence and display correct result', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#5').click();
    cy.get('#plus').click();
    cy.get('#5').click();
    cy.get('#equal').click();
    cy.get('#plus').click();
    cy.get('#2').click();
    cy.get('#equal').click();
    cy.get('#clear').click();
    cy.get('#plus').click();
    cy.get('#equal').click();
    cy.get('#2').click();
    cy.get('#decimal').click();
    cy.get('#5').click();
    cy.get('#plus').click();
    cy.get('#0').click();
    cy.get('#decimal').click();
    cy.get('#5').click();
    cy.get('#equal').click();
    cy.get('#plus').click();
    cy.get('#1').click();
    cy.get('#0').click();
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '13');
  });

  // Test simple multiplication (e.g., 6 x 7 = 42).

  it('Calculator can handle multiplication operations', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#6').click();
    cy.get('#multiply').click();
    cy.get('#7').click();
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '42');
  });

  // Verify multiplication with zero (e.g., 0 x 8 = 0).

  it('Calculator handles multiplications with 0 giving 0 as a result', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#0').click();
    cy.get('#multiply').click();
    cy.get('#8').click();
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '0');
  });

  // Test simple division (e.g., 8 / 2 = 4).

  it('Calculator can handle division operations', () => {
    cy.visit('http://127.0.0.1:3000/home.html');
    cy.get('#8').click();
    cy.get('#divide').click();
    cy.get('#2').click();
    cy.get('#equal').click();
    cy.get('.screen').should('have.text', '4');
  });
});
