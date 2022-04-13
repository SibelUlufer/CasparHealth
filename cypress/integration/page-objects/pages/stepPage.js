
class stepPage{
    //checks daily stepbox visibility
    static checkDailyStepBox(){
        cy.get('[data-cy="today-activity-box"]').find('.counter').and('be.visible')
        cy.isVisible('[data-cy="completed-daily-steps"]')
        .and('have.css', 'background-color', 'rgb(255, 230, 220)')//checks completed steps background
        cy.isVisible('[data-cy="total-daily-steps"]')
        .and('have.css', 'background-color', 'rgb(255, 190, 95)')//checks total daily steps background
        cy.get('[data-cy="total-daily-steps"]').invoke('text').then( totalSteps=>{
        cy.isContain('.subtitle', totalSteps)//checks the total daily step is in the text
        })
    }
    //creates random step number and types to the field
    static createStepNumber(){
        let number 
        number = Math.floor(Math.random() * 100) + 50
        cy.get('[data-cy="add-steps-steps"]').type(number,{force:true})
        Cypress.env('createdStepNumber',number)//keeps it as env var. to use later on
        cy.log(number).as('willBeAddedStepNumber')//write it to see what it is
    }
    //checks daily steps in "Today" and "My Week > Steps" page after added daily step
    static assertDailyStep(){
        cy.get('.menu-items .active').then( menuS =>{
                if(menuS.text().includes('Today')){//if the page is Today
                    cy.get('[data-cy="completed-daily-steps"]').then(currentStepNumber=>{
                        const currentStepNumberS= currentStepNumber.text()//take current daily step number
                        cy.log(currentStepNumberS).as('currentStepNumber')//write it to see what it is
                        cy.clickButton('[data-cy="add-steps"]').and('be.visible', '[data-cy="add-steps-dialog"]')//check "ADD STEPS" button visibility and click 
                        this.createStepNumber()//creates random step number
                        let total
                        total = Number(currentStepNumberS) + Cypress.env('createdStepNumber')//adds it to current daily step number
                        cy.log(total).as('totalStepNumber')//write total daily step number to see what it is
                        this.checkStepSaveButton()//check "SAVE" button's visibility
                        cy.clickButton('[data-cy="confirm-adding-steps"]')//clicks on "SAVE" button
                        cy.isContain('[data-cy="completed-daily-steps"]', total)//check if total daily step is displaying correctly
                    }) 
                }else{//if the page is "My Week > Steps"
                    cy.get('.table__cell_highlighted > .steps').then( currentStepNumber =>{
                        const currentStepNumberS = currentStepNumber.text()//take current daily step number
                        cy.log(currentStepNumberS)//write it to see what it is
                        cy.clickButton('[data-cy="add-steps"]').and('be.visible', '[data-cy="add-steps-dialog"]')//check "ADD STEPS" button visibility and click 
                        this.createStepNumber()//creates random step number
                        let total
                        total = Number(currentStepNumberS) + Cypress.env('createdStepNumber')//adds it to current daily step number
                        cy.log(total)//write total daily step number to see what it is
                        this.checkStepSaveButton()//check "SAVE" button's visibility
                        cy.clickButton('[data-cy="confirm-adding-steps"]')//clicks on "SAVE" button
                        cy.isContain('.table__cell_highlighted > .steps', total)//check if total daily step is displaying correctly
                    })
                }   
        })    
    }
    //checks weekly steps in "My Week > Steps" page after added daily step
    static assertWeeklyStep(){
        cy.get('[data-cy="my-week-steps-done"]').then( currentWeeklyStepNumber=>{
            const currentWeeklyStepNumberS = currentWeeklyStepNumber.text()//take current weekly step number
            cy.log(currentWeeklyStepNumberS).as('currentWeeklyStepNumber')//write it to see what it is
            cy.clickButton('[data-cy="add-steps"]').and('be.visible', '[data-cy="add-steps-dialog"]')//check "ADD STEPS" button visibility and click 
            this.createStepNumber()//creates random step number
            let weeklyTotal
            weeklyTotal = Number(currentWeeklyStepNumberS) + Cypress.env('createdStepNumber')//adds it to current weekly step number
            cy.log(weeklyTotal).as('newTotalWeeklyStepNumber')//write total weekly step number to see what it is
            this.checkStepSaveButton()//check "SAVE" button's visibility
            cy.clickButton('[data-cy="confirm-adding-steps"]')//clicks on "SAVE" button
            cy.isContain('[data-cy="my-week-steps-done"]', weeklyTotal)//check if total weekly step is displaying correctly
        })
    }
    //check "SAVE" button's visibility
    static checkStepSaveButton(){
        cy.get('[data-cy="confirm-adding-steps"]').then(btn=>{
            if(btn.is(':disabled')){//if button is disabled
                cy.wrap(btn).should('be.disabled')//check it is disabled
            }else{
                cy.wrap(btn).should('be.enabled')//else, check it is enabled
            }
        })
    }
    //manages successful click on "SYNC DEVICE" via "Today" or "My Week > Steps" pages
    static clickSync(){
        cy.get('.menu-items .active').then( menuS =>{
            if(menuS.text().includes('Today')){//if the page is Today
            cy.clickButton('.counter-action', 'SYNC DEVICE')//click the link
            const token = localStorage.getItem('accessToken')//takes token from local storage
            cy.request({//makes a request for checking SYNC page opens successfully
            headers:{ Authorization: 'Bearer ' + token},//uses token here
            method: 'POST',
            url: 'https://backend.caspar-health.com/api/v2/patients/data_source_integrations?lang=en',
            }).then( (response) => {
            expect(response.status).to.eq(200)//checks that SYNC page opened successfully
            cy.wait(4000)
            })
            }else{//if the page is "My Week > Steps"
                cy.clickButton('.info-box__actions > a', 'Sync device')//click the link
                const token = localStorage.getItem('accessToken')//takes token from local storage
                cy.request({//makes a request for checking SYNC page opens successfully
                    headers:{ Authorization: 'Bearer ' + token},//uses token here
                    method: 'POST',
                    url: 'https://backend.caspar-health.com/api/v2/patients/data_source_integrations?lang=en',
                    }).then( (response) => {
                    expect(response.status).to.eq(200)//checks that SYNC page opened successfully 
                    cy.wait(4000)
                    })
            } 
        })
    }
    //clicks on "GO TO STEPS" from My Week > Steps Box"
    static goToSteps(){
        cy.contains('[data-cy="every-step-counts"]', ' Go to steps').click()
    }
}
export default stepPage