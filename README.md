## Getting started

- Install dependencies with npm
```
$ npm i
```
- Run the project
```
"npm run cy:open" or "npx cypress open"
```
- to run all tests headless and create mochawesome.html report as merged html file with junit and mochawesome reports
```
"npm run cy:e2e"
```

## BEFORE RUN

- If possible, my account's all videos can be made uninitialized to see all cases, or account can be changed to a new one with the same privilege, or just run with my account.
- Account info(ID,Pwd) can be changed in cypress.json > env

**../integrations/page-objects/pages has 3 .js files.**
**../integrations/page-objects/pages/basePage.js includes general base page functions.**
**../integrations/page-objects/pages/exercisePage.js includes functions that related with exercise.**
**../integrations/page-objects/pages/stepPage.js includes functions that related with step.**

**../integrations/tests has 2 test files.**
**../integrations/tests/today.spec.js includes most critical user flows on Today page.**
**../integrations/tests/myWeek.spec.js includes most critical user flows on My Week page.**

**../support/command files has functions that can be reachable from anywhere.**

**.prettierrc file has format settings.**
**Under the mochawesome-report folder, mochawesome.html report can be found.**
**Under the cypress/results folder there are junit and mochawesome folders which have .xml and .json files created seperately, each file represents a spec file.**

## Most critical user flows

- Login
- Completing daily traning from Today page 
- Adding daily step from Today page
- Completing exercise from My Week page 
- Adding daily step from My Week page
- Sync Device
- Logout

## Most critical functions

- Checking repetition if exist
- Checking sets number if exist
- Checking the total daily step number
- Checking total weekly step number
- Pause-continue on video

**These are the main functionality and flows, therefore needs to be tested.**
**My tests cover these important flows and function checks.**
**Due to content's dynamism I tried to handle most cases, but maybe there are some cases I have not handled yet.**
**There are also some bugs in the app, and I only defined one of them in myWeek test file second test.**

## Other bugs

- Video keywords does not display properly
- In some videos, sets numbers works unstable

