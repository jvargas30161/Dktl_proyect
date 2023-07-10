/// <reference types = "Cypress" />

require('cypress-xpath')
require('cypress-plugin-tab')

describe("Carga por fixture", () => {

  before(function () {
    cy.fixture('new_1').then(function (data) {
      this.data = data
    })
  })

  it('passes with cy.origin()', () => {
    //Visit the URL of the page you want to test
    //cy.viewport(1690, 950)
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type("Z26CDELV")
    cy.get("#password").should("be.visible").type("Cmsv1976_*")

    //Click in Sing on. 
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)

    //To pass multiple domain
    //cy.viewport(1690, 950)
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', () => {
      cy.get('.el-input__wrapper').click()
      cy.wait(500)

      //Choose Polanco Store Not enabled
      //cy.get(':nth-child(4) > span').should("be.visible").click()
      //cy.wait(500)

      //Choose Interlomas MX1982 Store
      //To modify this search option, just change the number.
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      //To scroll down
      //.type("{pagedown}")
      cy.wait(500)

      //Select Collaborator
      cy.get(':nth-child(1) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)
      //Contratar colaborador/a
      cy.get('[href="/e2-mx-front/develop/mx/MX1982/hiring"] > .dropdown-item').should("be.visible").click()
      cy.wait(1000)

      //Check RFC ("Success")
      cy.get('.el-input__wrapper').should("be.visible")
        /////  Write RFC ////
        .type("DIMT020802I36")
      cy.wait(1000)
      //Next botton.
      cy.get('.el-button > span').should("be.visible").click()
      cy.wait(1000)
      //Return anterior page
      //cy.go(-1);              //Return to previous screen

      //Click in notification
      cy.get("#notification_1 > div > i > svg").should("be.visible").click()
      cy.wait(1000)

      //add data in contract options fields
      cy.get('.el-input__inner').eq(1).click()    //Identity/Access
        .should("be.visible")
        /////  Write identityAccessUser ////
        .type("HOTWLLTNEP")
      cy.wait(500)
      //.click({ multiple: true, force: true });

      cy.get('.el-input__inner').eq(2).click()    //Nombre
        .should("be.visible")
        ///// Write Name /////
        .type("Tifany")
      cy.wait(500)

      cy.get('.el-input__inner').eq(3).click()    //Apellido_1
        .should("be.visible")
        ///// Write Last name  /////
        .type("Diez")
      cy.wait(500)

      cy.get('.el-input__inner').eq(4).click()    //Apellido_2
        .should("be.visible")
        ///// Write second last name /////
        .type("Mora")
      cy.wait(500)

      cy.get('.el-input__inner').eq(5).click()    //Fecha de Nacimiento 
        .should("be.visible")
        .type("02-08-2002").click()
      cy.wait(500)

      cy.get('.el-input__wrapper').eq(6).click()    //Email 
        .should("be.visible")
        ///// Write email /////
        .type("HOTWLLTNEP@example.comm")
      cy.wait(500)

      //continue hiring
      cy.get('.row > .el-button--primary > span')
        .should("be.visible")
        .click()
      cy.wait(500)

      /// genero esta Ok, falta lectura json
      cy.get('input.el-input__inner[name="gender"]').should('be.visible')
        .click({ force: true })
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)

      ///// Write sexo /////
      // Masculino    1
      // Femenino     2
      cy.contains("Femenino").click()
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página    
      cy.wait(1000)

      /// esto corresponde para json
      //.type(data.personal.gender)

      //Correspnde al telefono movil OK
      cy.get('input.el-input__inner[name="personalPhone"][placeholder="Número de celular"]')
        .should('be.visible')
        .click({ force: true })
        ///// Write Personal phone /////
        .type("0892696359")
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(3000)

      /// esto corresponde para json
      /* cy.get('input.el-input__inner[name="personalPhone"][placeholder="Número de celular"]')
        .click({ force: true }).type(this.data.personal.personalPhone) */

      //Correspnde a Estado civil
      cy.get('input.el-input__inner[name="civilStatus"]').should('be.visible')
        .click({ force: true })
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)

      ///// Write estado civil /////
      //  Soltero(a)    1
      //  Casado(a)     2    
      //  Unión libre   3
      //  Divorciado(a) 4
      //  Viudo(a)      5
      ///// Write civil status ////      
      cy.contains("Viudo(a)").click()
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página    
      cy.wait(1000)

      //Nacionalidad
      cy.get('input.el-input__inner[name="nationality"][placeholder="Nacionalidad"]').should('be.visible')
        .click({ force: true })
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)

      ///// Write country //// 
      cy.contains("Mexico").click()
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página    
      cy.wait(1000)

      //Correspnde a Beneficiario
      cy.get('input.el-input__inner[name="beneficiary"][placeholder="Beneficiario"]')
        .should('be.visible')
        .click({ force: true })
        ///// Write beneficiary /////
        .type("Víctor Cruz Esteban")

      //Corresponde a telefono del beneficiario
      cy.get('input.el-input__inner[name="beneficiaryPhone"][placeholder="Teléfono del Beneficiario"]')
        .should('be.visible')
        .click({ force: true })
        ///// Write phone beneficiary /////  
        .type("0892696359")

      //Corresponde a Estudios
      cy.get('input.el-input__inner[name="education"][placeholder="Estudios"]')
        .should('be.visible')
        .click({ force: true })
      //cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)

      //Estudios
      /// Write study /////
      /// Sin estudios  1
      /// Doctorado     2
      /// Maestría      3
      /// Licenciatura  4
      /// Preparatoria  5
      /// Secundaria    6
      /// Primaria      7
      cy.contains("Secundaria").click()
      cy.wait(1000)

      //Corresponde a estudios finalizados
      cy.get('input.el-input__inner[name="educationCompleted"][placeholder="Estudios finalizados"]')
        .should('be.visible')
        .click()
      // cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)
      ///// Write estudios finalizados
      /// Sí      True
      /// No      False
      cy.contains("Sí").click({ force: true })
      cy.wait(1000)

      // Esto corresponde a Disciplina deportiva 1
      cy.get('input.el-input__inner[name="sportDisciplineMandatory"][placeholder="Seleccionar"]')
        .should('be.visible')
        .click({ force: true })

      cy.contains("Rugby").click()
      cy.wait(1000)

      //Nivel 1
      cy.get('input.el-input__inner[name="sportDisciplineLevelMandatory"][placeholder="Seleccionar"]')
        .should('be.visible')
        .click()
      //// Write nivel ////
      /// Alto      1
      /// Medio     2
      /// Bajo      3
      cy.contains("Bajo").click()
      cy.wait(1000)

      //Frecuencia 1
      cy.get('input.el-input__inner[name="sportDisciplineFrequencyMandatory"][placeholder="Seleccionar"]')
        .should('be.visible')
        .click()
      ///// Write freecuencia 1 /////
      /// En este momento no lo practico    /// 1 
      /// Esporádico (1 o 2 veces al mes)  ///  2
      /// 1 o 2 dias a la semana           ///  3
      /// + 3 dias a la semana             ///  4
      cy.contains("Esporádico (1 o 2 veces al mes)").click()
      cy.wait(1000)

      //Save and continue
      cy.get("#hiringInitialDataForm > div.el-form-item.asterisk-left > div > div > div > button:nth-child(2) > span")
        .should('be.visible')
        .click()

      /// page 2: Hiring Process - Set Address
      cy.get('input.el-input__inner[name="postalCode"][placeholder="Código postal"]')
        .should('be.visible')
        .click()

        ///// Write postalCode /////
        .type("79450")
      cy.wait(1000)

      //Municipality
      cy.get('input.el-input__inner[name="municipality"][placeholder="Municipio"]')
        .should('be.visible')
        .click()

      ///// Write municipalityName /////
      cy.contains("Villa Juárez").click()
      cy.wait(1000)

      //Settlement (Asentamiento)
      cy.get('input.el-input__inner[name="settlement"][placeholder="Asentamiento"]')
        .should('be.visible')
        .click()

      ///// Write settlementName (Asentamiento) /////
      cy.contains("Sin nombre de colonia").click()
      cy.wait(1000)

      /// streetType
      //cy.get('.el-icon el-select__caret el-select__icon')
      cy.get('.el-input__inner[name="streetType"][placeholder="Tipo de vía"]')
        // .should('not.be.visible')
        .click()
      //  Calle             1
      //  Avenida           2
      //  Boulevard         3
      //  Carretera         4
      //  Camino            5
      //  Paseo             6
      //  Galerías          7  
      ///// Write settlementName /////
      //cy.contains("Galerías").click()
      cy.wait(1000)


      // Esperar a que aparezca la lista de valores desplegable
      cy.get('.el-scrollbar__view.el-select-dropdown__list').should('be.visible');

      // Seleccionar la opción deseada de la lista de valores
      cy.get('.el-scrollbar__view.el-select-dropdown__list').contains('Calle').click();

      // Verificar que la opción seleccionada se refleje en el campo de entrada
      cy.get('.el-input__inner[name="streetType"][placeholder="Tipo de vía"]').should('have.value', 'Calle');


      /// address
      cy.get('input.el-input__inner[name="address"][placeholder="Dirección"]')
        .should('be.visible')
        .click()

        //// Write address
        .type("Diaz Molina").click()
      cy.wait(1000)

      /// N. ext.
      cy.get('input.el-input__inner[name="numberExterior"][placeholder="N. ext."]')
        .should('be.visible')
        .click()

        //// Write numberExterior.
        .type("43").click()
      cy.wait(1000)

      /// N. int.
      cy.get('input.el-input__inner[name="numberInterior"][placeholder="N. int."]')
        .should('be.visible')
        .click()

        //// Write numberInterior.
        .type("38").click()
      cy.wait(1000)

      /// Save and contninue  ////
      cy.get('.get-address-data-form_saveButton__zaa0 > :nth-child(3) > span').click()

      /// Contracting Process - Establish Tax Data

      // CURP
      cy.get('input.el-input__inner[name="curp"][placeholder="CURP"]')
        .should('be.visible')
        .click()

        //// Write CURP.
        .type("DIMT020802MSPXRF03")
      cy.wait(1000)

      // NSS (Nº de Seguridad Social)
      cy.get('input.el-input__inner[name="socialSecurityNumber"][placeholder="NSS (Nº de Seguridad Social)"]')
        .should('be.visible')
        .click()

        //// Write NSS.
        .type("97220285346")
      cy.wait(1000)

      /// Nombre fiscal ==>   Se rellana de forma automática.

      // Dirección fiscal ==> Se rellana de forma automática.

      // Regimen fiscal   ==> Se rellana de forma automática.


      /// Recruitment process - Set bank details
      cy.get('input.el-input__inner[type="text"][placeholder="Banco"]')
        .should('be.visible')
        .click()

      ///// Select Bank /////
      cy.contains("EVERCORE").click()
      cy.wait(1000)

      /// Clabe
      cy.get('input.el-input__inner[name="interbankCode"][placeholder="CLABE"]')
        .should('be.visible')
        .click()

        ///// Write clabe /////
        .type("648047748943628010")
      cy.wait(1000)

      /* /// accountNumber       Este dato se rellena automáticamente.
      cy.get('input.el-input__inner[name="accountNumber"][placeholder="Número de cuenta"]')
        .should('be.visible')
        .click()

        ///// Write accountNumber /////   Este dato se rellena automáticamente.
        .type("5000697347")
      cy.wait(1000)
 */

      /// Hiring Process - Establish Employment Data
      // Identity Access   ==>     Se rellena automáticamente.

      // Oficio             ==>     Por defecto aparece Lider Deporte.

      // Team
      cy.get('input.el-input__inner[name="team"][placeholder="Equipo"]')
        .should('be.visible')
        .click()

      ///   Team Interlomas 0
      ///   Team Interlomas 1
      ///   Team Interlomas 2
      /////  Select team /////
      cy.contains("Team Interlomas 0").click()
      cy.wait(1000)


      // Patrón
      cy.get('input.el-input__inner[name="patron"][placeholder="Patrón"]')
        .should('be.visible')
        .click()

      ///   Team Interlomas 0
      ///   Team Interlomas 1
      ///   Team Interlomas 2
      /////  Select team /////
      cy.contains("Sara Gallego Cano").click()
      cy.wait(1000)


      cy.log('User DZ (Zone Director) New Hiring (Centro MX1982)');

    })

  })

});
