/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/privacy.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
    it('Acessando outra tela no cypress',function(){
        cy.contains('Talking About Testing').should('be.visible')
     })
})