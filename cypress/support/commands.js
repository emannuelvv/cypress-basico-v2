Cypress.Commands.add('enviarFormsSucesso',function(){
        cy.get('#firstName').type('Emannuel')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('emannuelvv@gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
})