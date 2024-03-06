Cypress.Commands.add('login',({email,password})=>{
    cy.request('POST','http://localhost:3001/api/login',{
        email,
        password
    }).then(response=>{
        localStorage.setItem(
            'loggedNoteAppUser',JSON.stringify(response.body)
        )
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createNote',({content,important})=>{
    cy.request({
        method:'POST',
        url:'http://localhost:3001/api/notes',
        body:{content:'A note created from cypress', important:false},
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
        }
    })
    cy.visit('http://localhost:3000')
})