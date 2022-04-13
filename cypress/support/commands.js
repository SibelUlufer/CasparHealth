//enables to login to app 
Cypress.Commands.add('logintoApp',(id, password)=>{
    cy.visit('/', {
        onbeforeunload(win){win.localStorage.setItem('token',accessToken)} 
    })
    cy.typeCommand('[data-cy="login-id"]', id)//types id to the ID field
    cy.typeCommand('[data-cy="login-pwd"]', password)//types password to the password field
    cy.get('[data-cy="login-id"]').invoke('prop', 'value')
    .should('contain', id)//enables to check if ID is written
    cy.get('[data-cy="login-submit"]').should('be.enabled')//checks that login button is enabled
    cy.clickButton('[data-cy="login-submit"]')//clicks on login button
    cy.interceptAs('https://hlg.tokbox.com/prod/logging/ClientEvent','POST', 'ClientEvent')//enables to intercept ClientEvent 
    cy.wait('@ClientEvent',{timeout: 15000})//waits until logging in
    cy.url().should('include', 'patient/dashboard')//checks url after login
})
//enables to make intercept
Cypress.Commands.add('interceptAs', (url, method, text) =>{
    cy.intercept({
        method: method,
        url:url
      }).as(text)
})
//enables to check an element if visible
Cypress.Commands.add('isVisible', selector =>{
    cy.get(selector).should('be.visible')
})
//enables to check text if contains
Cypress.Commands.add('isContain', (selector, text) =>{
    cy.get(selector).should('contain', text)
})
//enables to click
Cypress.Commands.add('clickButton', selector =>{
    cy.get(selector).click()
})
//enables to type
Cypress.Commands.add('typeCommand', (selector, text)=>{
    cy.get(selector).type(text)
})
//enables to click left menu 
Cypress.Commands.add('clickLink', (label) => {
    cy.get('.menu-items').contains(label).click()
})