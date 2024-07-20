/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatorios e envia o formulario',function(){
        const textoSatisfacao='aiushdaiushdaiushdiaushdiaushduiashdiuashduiashdaiushdaiushdaiushdiaushdiaushduiashdiuashduiashdaiushdaiushdaiushdiaushdiaushduiashdiuashduiashd'
        cy.get('#firstName').type('Emannuel')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('emannuelvv@gmail.com')
        cy.get('#phone').type('49991632')
        cy.get('#open-text-area').type(textoSatisfacao,{delay: 100})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('Exibe mensagem de erro quando email incorreto', function() {
        cy.get('#firstName').type('Emannuel')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('emannuelvv@12312,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Verificando campo de telefone', function() {
        cy.get('#phone').type('asdasdasd').should('have.value','')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Deve selecionar o telefone porém o usuario esqueceu de digitar', function(){
        cy.get('#firstName').type('Emannuel')
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('emannuelvv@12312.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Digitar nos campos',function(){
        cy.get('#firstName').type('Emannuel').should('have.value','Emannuel').clear().should('have.value','')
    })
    it('Validar erro sem preencher os campos',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Enviar formulario porém com sucesso',function(){
        cy.enviarFormsSucesso()
        cy.get('.success').should('be.visible')
    })
  })
  
