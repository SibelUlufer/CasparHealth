/// <reference types="cypress" />

import BasePage from "../page-objects/pages/basePage"
import exercisePage from "../page-objects/pages/exercisePage"
import stepPage from "../page-objects/pages/stepPage"

describe('Most crucial tests on My Week page', ()=>{
    beforeEach(() => {
        cy.logintoApp(Cypress.env('id'), Cypress.env('password'))
        BasePage.clickSideMenu('My Week')
        })
    it('should fail if SETS number is only visible on exercise page', ()=>{
        exercisePage.testFailSetCount()//occurs only in specific video, therefore I seperated this test to show it
    })
    it('should have same the SETS number on both previous video and video page', ()=>{
        exercisePage.testSuccessfulSetCount()//occurs only in specific video, therefore I seperated this test to show it
    })
    it('should start training and complete by checking active exercise number, and logout', ()=>{
        exercisePage.goToExercise()
        BasePage.logOut()
    })
    it('should add step and check the weekly&daily total step, and SYNC',()=>{
        stepPage.goToSteps()
        stepPage.assertDailyStep()
        stepPage.assertWeeklyStep()
        stepPage.clickSync()
    })
    
})