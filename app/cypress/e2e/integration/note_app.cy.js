
describe('Note App',()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/')
        /* cy.request('POST','http://localhost:3001/api/reset')
        const user={
            username:'UserName1',
            email:'UserNameTest1@gmail.com',
            password:'UserPass1'
        }
        cy.request('POST','http://localhost:3001/api/users',user) */
    })

    it('frontpage can be oppened',()=>{
        cy.contains('Notes')
    })
    it('login form can be opened',()=>{
        cy.contains('Show Login').click()
    })

    it('user can login',()=>{
        cy.contains('Show Login').click()
        cy.get('input[name="Email"]').type('UserNameTest1@gmail.com')
        cy.get('input[name="Password"]').type('UserPass1')
        cy.get('#form-login-button').click()  

    })
    it.only('login fails with wrong password',()=>{
        cy.contains('Show Login').click()
        cy.get('input[name="Email"]').type('UserNameTest1@gmail.com')
        cy.get('input[name="Password"]').type('incorressscta')
        cy.get('#form-login-button').click()

        cy.get('.error')
            .should('contain','Wrong Credentials')

    })

    describe('when logged in',()=>{
        beforeEach(()=>{
            cy.login({email:'UserNameTest1@gmail.com', password:'UserPass1'})
        })

        it('a new note can be created',()=>{
            const noteContent='a note created by cypress'
            cy.contains('Show Create Note').click()
            cy.get('input').type(noteContent)
            cy.contains('save').click()
            cy.contains(noteContent)
        })
        
        describe.only('and a note exists',()=>{
            beforeEach(()=>{
                cy.createNote({
                    content:'This is the first note',
                    important:false
                })
                cy.createNote({
                    content:'This is the second note',
                    important:false
                })
                cy.createNote({
                    content:'This is the third note',
                    important:false
                })
            })
            it('it can be made important',()=>{
                cy.contains('This is the second note').as('theNote')

                cy.get('@theNote')
                    .contains('Make Important')
                    .click()
                cy.get('@theNote')
                    .contains('make not important')
            })
        }) 
    })
    
})