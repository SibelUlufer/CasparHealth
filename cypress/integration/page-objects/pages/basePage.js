class BasePage{
    //enables to logout
    static logOut(){
        cy.isContain('.logout','Logout',{force:true})//checks logout css and text
        cy.clickButton('.logout')//clicks on logout link
        cy.url().should('contain', 'user/sign_in')//checks the url after logout
    }
    //enables to click "today", "my week","messages", "profile" menus
    static clickSideMenu(label){
        cy.clickLink(label)
    } 
}
export default BasePage