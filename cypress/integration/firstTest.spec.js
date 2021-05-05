/// <reference types="cypress" />

describe('Our First Suite', () => {

    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //by Tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attributre name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get(['class="input-full-width size-medium shape-rectangle"'])

        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by 2 different Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by Tag name, Attribure with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //the most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="SignInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign In')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign In')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })

    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')


        //selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')


        //cypress style
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                //const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find(' [for="exampleInputPassword1"]').should('contain', 'Password')
            })




        })



    })

    //INVOIKE

    it('invoke command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //how to work with text in Cypress ex.1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //how to work with text in Cypress ex.2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        // how to get text value from invoke command ex.3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked')
            .then(value => {
                //or expect(value).to.equal('custom-checkbox checked')
                expect(value).to.contain('checked')
            })

    })


    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click()
                //cy.get('nb-calendar-day-picker .day-cell').contains('1').click()
                cy.get('[class="day-cell ng-star-inserted"]').contains('1').click()
                //or cy.get('.day-cell').not('.bounding-month').contains('1').click()
                cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 1, 2021')

            })

    })

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')

        })

    })

    it('checkbox', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(2).check({ force: true })

    })

    it.only('lists and dropdowns', () => {
        cy.visit('/')
        //#1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('.nb-theme-dark nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //#2 how to loop through the dropdown list 
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                
                    const color = {
                        "Light": "rgb(255, 255, 255)",
                        "Dark": "rgb(34, 43, 69)",
                        "Cosmic": "rgb(50, 50, 89)",
                        "Corporate": "rgb(255, 255, 255)"
                    }
                
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', color[itemText])
                    if(index <3){
                        cy.wrap(dropdown).click()
                    }
            })
            


        })

    })


})