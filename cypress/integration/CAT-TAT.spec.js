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
    it('Usando o select para escolher o Youtube',function(){
       cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('Usando o select para escolher o Mentoria',function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
     })
     it('Usando o select para escolher o Blog',function(){
        cy.get('#product').select(1).should('have.value', 'blog')
     })
     it('Usando o radio buttom "Feedback"',function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
     })
     it('Marcando todos os radios"',function(){
        cy.get('input[type="radio"]').should('have.length',3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
     })
     it('Trabalhando com check e uncheck, modelo facil',function(){
        cy.get('input[type="checkbox"][value="email"]').check().should('be.enabled')
        cy.get('input[type="checkbox"][value="phone"]').check().last().uncheck().should('not.be.checked')
     })
     it('Habilitar telefone e nao preencher campos',function(){
        cy.get('input[type="checkbox"][value="phone"]').check().should('be.enabled')
        cy.enviarFormsSucesso()
        cy.get('.error').should('be.visible')
     })
     it('Fazer o upload de um arquivo',function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     })
     it('Fazer o upload de um arquivo drag e drop, arrasta e solta',function(){
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     })
     it('Fazer o upload de um arquivo drag e drop, usando fixture',function(){
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
     })
     it('Explorando outra aba usando cypress',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
     })
     it('Acessando outra tela no cypress',function(){
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.contains('Talking About Testing').should('be.visible')
     })
  })
  
