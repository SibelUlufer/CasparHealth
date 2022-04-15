class exercisePage{
    //checks the repeat number whether exist or not
    static repetitions(){
        cy.get('.settings-container').then( box =>{
            if(box.find('[data-cy="repetitions-count-box"]').is(':visible')){//if repetition count box is visible before the video
                cy.get('[data-cy="repetitions-count-box"]').then ( rptBox =>{
                    const repeat = rptBox.text()//takes its text
                    Cypress.env('repeatNumber', repeat)//and keeps it env var. to use later on
                    cy.log(repeat).as('repetition')//enables to see what is the repeat number  
                })
            }else{
                cy.log('There is no repetition.')//else, will write this text
            }
        })  
    }
    //enables to check repeat number is exist on video screen and equal to each other with the repeat number before the video 
    static isRepetable(){
        cy.get('.left-pane').then( left=>{
            if(left.find('[data-cy="exercise-execution-repetitions-left"]').is(':visible')){//if repetition count box is visible on video page
                cy.isContain('[data-cy="exercise-execution-repetitions-left"]', Cypress.env('repeatNumber'))//will check the repeat numbers are equal
            }else{
                cy.log('There is no repetition.')//else, will write this text
            }
        })
    }
    //checks the set number whether exist or not
    static setCount(){
        cy.get('.settings-container').then( box =>{
            if(box.find('[data-cy="sets-count-box"]').is(':visible')){//if set count box is visible before the video
                cy.get('[data-cy="sets-count-box"]').then ( setBox =>{
                    const setS = Number(setBox.text())//takes its text
                    Cypress.env('setNumber', setS)//and keeps it env var. to use later on
                    cy.log(setS).as('setNumber')//enables to see what is the set number    
                })
            }else{
            cy.log('There is no set.')//else, will write this text
            }
        }) 
    }
    //enables to check repeat number is exist on video screen and equal to each other with the repeat number before the video 
    static hasSet(){
        cy.get('.left-pane').then( left =>{
            if(left.find('[data-cy="sets-container-bars"]').is(':visible')){//if set count bar is visible on video page
                cy.get('.set').then( setBar=>{
                    if(setBar.is(':visible')){
                        cy.wrap(setBar).its('length').should('eq', Cypress.env('setNumber'))//will check the set numbers are equal
                    }
                })
            }else{
                cy.log('There is no set.')//else, will write this text
            }
        })
    }
    //this function is for showing that set number is displaying only in video page, not previouse page
    static setIsNotStable(){
        cy.get('.left-pane').then( left=>{
            if(left.find('[data-cy="sets-container-bars"]').is(':visible')){//if set count box is visible on video page
                cy.log('Sets are only displaying here, it didn\'t displayed on previous page!.')//will write this text to show the error case
            }
        })
    }
    //this fuctions is e2e test for showing that in a video, set number is displaying only in video page, not previouse page
    static testFailSetCount(){
        cy.get('[data-cy="exercises-box"]').then( eBox=>{
            if(eBox.find('.content-box > .count').length > 0){//checks if there is any active video
                cy.contains('[data-cy="every-step-counts"]', 'Go to exercises').click({force:true})//clicks on "Go to exercices"
                cy.get('app-video-preview').then (vd =>{
                    if(vd.eq(1).find(('mat-icon')).length > 0){
                        cy.log('The required video is already completed!')
                    }else{
                        cy.get('app-video-preview').eq(1).click()//clicks on a specific video
                        this.setCount()//checks the set number whether exist or not
                        this.clickStart()//clicks on "START TRAINING" button
                        cy.wait(9000)
                        this.setIsNotStable()//shows that set number is displaying only in video page, not previouse page
                        cy.wait(4000)
                        cy.get('[data-cy="pause-button"]').should('be.visible').click()//clicks pause button on video
                    }
                }) 
            }else{
                cy.log('All exercises are already completed!')//else, will write this text
            }
        })
        
    }
    static testSuccessfulSetCount(){
        cy.get('[data-cy="exercises-box"]').then(eBox =>{
            if(eBox.find('.content-box > .count').length > 0){//checks if there is any active video
                cy.contains('[data-cy="every-step-counts"]', 'Go to exercises').click({force:true})//clicks on "Go to exercices"
                cy.get('app-video-preview').then( vd=>{
                    if(vd.eq(2).find(('mat-icon')).length > 0){
                        cy.log('The required video is already completed!') 
                    }else{
                        cy.get('app-video-preview').eq(2).click()//clicks on a specific video
                        this.setCount()//checks the set number whether exist or not
                        this.clickStart()//clicks on "START TRAINING" button
                        cy.wait(9000)
                        this.hasSet()//shows that set number is displaying only in video page, not previouse page
                        cy.wait(4000)
                        cy.get('[data-cy="pause-button"]').should('be.visible').click()//clicks pause button on video
                    } 
                })
            }else{
                cy.log('All exercises are already completed!')//else, will write this text
            }
        })
    }
    //enables to watch video before training
    static watchVideo(){
        cy.clickButton('[data-cy="watch-video-btn"]',{force:true})//clicks on start button
        this.repetitions()//checks the repeat number whether exist or not
        this.setCount()
        cy.wait(5000)
        cy.clickButton('vg-play-pause')//clicks on pause button 
    }
    //enables to done exercise and checks
    static doneExercise(){
        cy.interceptAs('https://backend.caspar-health.com/api/v1/exercise_results.json?lang=en', 'POST', 'done')//enables to intercept to make sure training is done
        cy.wait(4000)
        cy.get('[data-cy="pause-button"]').should('be.visible').click()//clicks on pause button to check the video is stopped
        cy.wait(2000)
        cy.get('[data-cy="continue-button"]').should('be.visible').click()//clicks on continu button to check the video is continues
        this.isRepetable()//enables to check repeat number is exist on video screen and equal to each other with the repeat number before the video 
        cy.wait('@done',{timeout: 1500000})//waits for intercept to understand that the video is ended
        cy.isVisible('[data-cy="exercise-complete"]')//checks if trainig completed 
        //these conditions are for testing different buttons behaviour
        cy.get('app-button').then( btn =>{
            if(btn.text().includes('NEXT')){//this is for NEXT button
                cy.isContain('[icon="arrow_forward"]', 'NEXT')//checks buttons text
                cy.isContain('[data-cy="exercise-complete"] > .title', 'Well done!')//checks text of the page title
                cy.get('app-close').click()//clicks "X" button
                cy.isVisible('.cancel', 'YES, QUIT').click()//checks the pop-up's visibility and clicks on "YES, QUIT"
            }else if(btn.text().includes('FINISH')){//this is for FINISH button
                cy.isContain('[icon="arrow_forward"]', 'FINISH')//checks buttons text
                cy.isContain('[data-cy="exercise-complete"] > .title', 'You made it.')//checks text of the page title
                cy.get('[icon="arrow_forward"]').click()//clicks on "FINISH" button
            }else{//this is for COMPLETE button
                cy.isContain('[icon="arrow_forward"]', 'COMPLETE')//checks buttons text
                cy.get('[icon="arrow_forward"]').click()//clicks on "COMPLETE" button
                cy.isVisible('app-video-preview')//checks visibility of video preview page
                cy.url().should('contain', 'week/exercises')//checks that url is changed correctly
                cy.get('.navigation__back').click()//clicks on "GO BACK" link
            }
        })
    }
    //this functions is e2e test for starting training and complete by checking active exercise number
    static goToExercise(){ 
        cy.get('[data-cy="exercises-box" ]').then( box =>{
            if(box.find('.content-box > .count').is(':visible')){//checks if there is any active video
                this.getActiveExerciseNumber()//enables to get active exercises number on exercises box
                cy.contains('[data-cy="every-step-counts"]', 'Go to exercises').click({force:true})//clicks on "Go to exercices"
                this.checkActiveVideoNumber()//checks whether the active video number on the video preview screen is equal to the active video number in the exercise box
                this.whatIsNext()//enables to find active video on video preview screen and open it
                this.watchVideo()//watchs video before traning by checking pause-continue func.
                this.clickStart()//clicks on "START TRAINING" button
                cy.wait(9000)
                this.doneExercise()//enables to complete the traning and check
            }else{
                cy.log('All exercises are already completed!')//else, will write this
            }
        })
    }
    //enables to find active video on video preview screen and open it
    static whatIsNext(){
        cy.get('app-video-preview').as('videos')
        cy.get('@videos').each( $video =>{
            if($video.find(('mat-icon')).length > 0){//if a video has check icon
                cy.log('completed')//will write this text
            }else{
                cy.wrap($video).click()//else, will click video
            return false
            }      
        })
    }
    //enables to get active exercises number on exercises box
    static getActiveExerciseNumber(){
        cy.get('[data-cy="exercises-box"] > .content-box > .count').then( activeVideos=>{
            let activeVideo = Number(activeVideos.text())//takes the number on exercises box
            cy.log(activeVideo).as('numberOntheBox')//write it to see what is it
            Cypress.env('activeVideoNumber', activeVideo)//keeps it in env var. to use later on
        })
    }
    //checks whether the active video number on the video preview screen is equal to the active video number in the exercise box
    static checkActiveVideoNumber(){
        cy.get('app-video-preview').then( videos =>{
            cy.wrap(videos).its('length').then(allVideos=>{//finds all videos
                if(videos.find('mat-icon').is(':visible')){
                    cy.wrap(videos).find('mat-icon').its('length').then( completedVideos=>{//finds completed videos
                        let activeVideos = allVideos - completedVideos//finds active videos
                        cy.log(activeVideos).as('activeVideos')
                        cy.wrap(activeVideos).should('eq', Cypress.env('activeVideoNumber'))//will check the active video numbers are equal
                    })
                }else{
                     cy.log('All videos are available!')
                }
            })
        })
    }
    //manages training box context
    static checkExerciseBox(){
        cy.isContain('[data-cy="my-training-title"]', 'My training')//checks title
        cy.get('[data-cy="exercises-box"]').then(box=>{
            if(box.text().includes('Congrats!')){//checks if the context includes "Congrats!"
                this.goToExercise()//due to training is completed, will go to exercise page via My Week menu
            }else{//else, there are active tranings to do
                this.clickStart()//clicks on "START TRAINING" button
                this.watchVideo()//watchs video before traning by checking pause-continue func.
                this.clickStart()//clicks on "START TRAINING" button to start training
                cy.wait(9000)
                this.doneExercise()//enables to complete the traning
            }
        })
    }
    //clicks on "START TRANINING" button
    static clickStart(){
        cy.clickButton('[data-cy="start-training-button"]')
    }
}
export default exercisePage