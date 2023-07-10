// You can read more here:
// https://on.cypress.io/configuration
//************************************************

//Import comands.js using Es2015 syntax:

beforeEach(function () {
    cy.fixture('new_1').then(function (data) {
        cy.wrap(data).as('testData');
    });
    cy.fixture('RFC_1').then(function (data1) {
        globalThis.data1 = data1
      })
});

import './commands';
import "./commands"

// Alternatively you con use CommonJS syntax:
// require("./commands")
require("cypress-xpath");
require("cypress-plugin-tab");