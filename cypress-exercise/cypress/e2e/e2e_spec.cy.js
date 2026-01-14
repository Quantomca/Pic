describe('End-to-End: Login to Checkout', () => {
  it('Should complete full journey from login to checkout confirmation', () => {
    // Visit the saucedemo website
    cy.visit('https://www.saucedemo.com');
    
    // Login with valid credentials
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    
    // Verify login successful - should be on inventory page
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
    
    // Add first product to cart
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    
    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    
    // Proceed to checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    
    // Fill checkout information
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    
    // Continue to step two
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
    
    // Verify order summary
    cy.get('.inventory_item_name').should('be.visible');
    cy.get('.summary_info').should('be.visible');
    
    // Finish the order
    cy.get('[data-test="finish"]').click();
    
    // Verify order confirmation
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'Thank you');
  });
});
