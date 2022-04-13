import './commands'
//enables to continue if there is uncaught errors
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    })
    //enables to hide XHR on cypress test runner
 if (Cypress.config('hideXHR')) {
     const app = window.top;
   
     if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
       const style = app.document.createElement('style');
       style.innerHTML =
         '.command-name-request, .command-name-xhr { display: none }';
       style.setAttribute('data-hide-command-log-request', '');
   
       app.document.head.appendChild(style);
     }
   }