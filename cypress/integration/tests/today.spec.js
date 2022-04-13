/// <reference types="cypress" />

import BasePage from "../page-objects/pages/basePage"
import exercisePage from "../page-objects/pages/exercisePage"
import stepPage from "../page-objects/pages/stepPage"


describe('Most crucial tests on today page', ()=>{
    beforeEach(() => {
        cy.logintoApp(Cypress.env('id'), Cypress.env('password'))
        stepPage.checkDailyStepBox()
        })
    it('should start training and complete by checking repetition number, and logout', ()=>{
        exercisePage.checkExerciseBox()
        BasePage.logOut()
    })
    it('should add step and check the total step, and SYNC', ()=>{
        stepPage.assertDailyStep()
        stepPage.clickSync()
    })
})