//import * as loginDataEmpleado from 'fixtures/colaboradorInfo.json'

describe('Test Suite - Check RFCs with user: DZ (Zone Director)', () => {

  before(function () {
    cy.fixture('new_users_1').then(function (loginData) {
      globalThis.loginData = loginData;
      cy.fixture('colaboradorInfo').then(function (colaboradorData) {
        globalThis.colaboradorData = colaboradorData
      })
    });
  })

  it('Cross Domain', () => {
    //Visit the URL of the page you want to test
    cy.visit('https://preprod.idpdecathlon.oxylane.com/as/authorization.oauth2?client_id=e2&response_type=code&redirect_uri=https://qa-mex.decathlon.net/e2-mx-front/develop/login&scope=openid%20profile%20email');
    cy.wait(500)

    //Register user credentials.
    cy.get("#username").should("be.visible").type(loginData.Users.username_DZ)
    cy.get("#password").should("be.visible").type(loginData.Users.password_1)
    cy.get("#cnxbton").should("be.visible").click()
    cy.wait(500)
    //To pass multiple domain
    cy.origin('https://qa-mex.decathlon.net/e2-mx-front/develop/map', { args: { colaboradorData } }, ({ colaboradorData }) => {
      cy.get('.el-input__wrapper').click()
      cy.wait(500)
      //Choose Interlomas MX1982 Store
      cy.get(':nth-child(9) > span').should("not.be.visible").click()
      cy.wait(500)
      //Select Collaborator
      cy.get(':nth-child(1) > #navbarDropdown').should("be.visible").click()
      cy.wait(1000)
      //Contratar colaborador/a
      cy.get('[href="/e2-mx-front/develop/mx/MX1982/hiring"] > .dropdown-item').should("be.visible").click()
      cy.wait(3000)
      cy.get('.el-input__inner[name="rfc"][type="text"][autocomplete="off"][placeholder="RFC"]')      //Check RFC ("Success")
        .should("be.visible").type(colaboradorData.Fiscal.rfc)
      cy.wait(3000)
      cy.get('.el-button > span').should("be.visible").click()
      cy.wait(3000)
      cy.get("#notification_1 > div > i > svg").should("be.visible").click()
      cy.wait(3000)
      cy.get('.el-input__inner').eq(1).click()
        .should("be.visible").type(colaboradorData.Personal.identityAccessUser)
      cy.wait(500)
      cy.get('.el-input__inner').eq(2).click()                                               //Name
        .should("be.visible").type(colaboradorData.Personal.name)
      cy.wait(500)
      cy.get('.el-input__inner').eq(3).click()
        .should("be.visible").type(colaboradorData.Personal.firstLastName)   //Apellido_1
      cy.wait(500)
      cy.get('.el-input__inner').eq(4).click()    //Apellido_2
        .should("be.visible").type(colaboradorData.Personal.secondLastName)
      cy.wait(500)

      cy.get('.el-input__inner').eq(5).click()    //Fecha de Nacimiento 
        .should("be.visible")
        .type(colaboradorData.Personal.birthdate).click({ force: true })
      cy.wait(500)

      cy.get('.el-input__wrapper').eq(6).click()    //Email 
        .should("be.visible")
        ///// Write email /////
        .type(colaboradorData.Contact.personalEmail)
      cy.wait(500)

      //continue hiring
      cy.get('.row > .el-button--primary > span')
        .should("be.visible")
        .click()
      cy.wait(500)

      cy.get('input.el-input__inner[name="gender"]').should('be.visible')
        .click({ force: true })
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)
      /// Write gender ///
      cy.contains(colaboradorData.Personal.genderName).click()
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página    
      cy.wait(1000)
      //Personal phone
      cy.get('input.el-input__inner[name="personalPhone"][placeholder="Número de celular"]')
        .should('be.visible')
        .click({ force: true })
        ///// Write Personal phone /////
        .type(colaboradorData.Contact.personalPhone)
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(3000)
      //Correspnde a Estado civil
      cy.get('input.el-input__inner[name="civilStatus"]').should('be.visible')
        .click({ force: true })
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)
      cy.contains(colaboradorData.Personal.civilStatus).click()
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página    
      cy.wait(1000)
      //Nacionalidad
      cy.get('input.el-input__inner[name="nationality"][placeholder="Nacionalidad"]').should('be.visible')
        .click({ force: true })
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)
      //cy.contains(colaboradorData.Personal.country).click()
      cy.contains(colaboradorData.Personal.countryOfNationality).click()
      cy.scrollTo('top')     // Desplazarse a la parte superior de la página    
      cy.wait(1000)
      //Correspnde a Beneficiario
      cy.get('input.el-input__inner[name="beneficiary"][placeholder="Beneficiario"]')
        .should('be.visible')
        .click({ force: true })
        .type(colaboradorData.Personal.beneficiary)
      //Corresponde a telefono del beneficiario
      cy.get('input.el-input__inner[name="beneficiaryPhone"][placeholder="Teléfono del Beneficiario"]')
        .should('be.visible')
        .click({ force: true })
        ///// Write phone beneficiary /////  
        .type(colaboradorData.Personal.beneficiaryPhone)
      //Corresponde a Estudios
      cy.get('input.el-input__inner[name="education"][placeholder="Estudios"]')
        .should('be.visible')
        .click({ force: true })
      //cy.scrollTo('top')     // Desplazarse a la parte superior de la página
      cy.wait(1000)
      cy.contains(colaboradorData.PersonalAbility.educationDataDto.educationName).click()
      cy.wait(1000)
      //Corresponde a estudios finalizados
      cy.get('input.el-input__inner[name="educationCompleted"][placeholder="Estudios finalizados"]')
        .should('be.visible')
        .click()
      cy.contains(colaboradorData.PersonalAbility.educationDataDto.educationCompleted).click({ force: true })
      cy.wait(1000)
      // Esto corresponde a Disciplina deportiva 1
      cy.get('input.el-input__inner[name="sportDisciplineMandatory"][placeholder="Seleccionar"]')
        .should('be.visible')
        .click({ force: true })
      cy.contains(colaboradorData.PersonalAbility.sportDisciplineDataDtoMandatory.sportDisciplineName).click()
      cy.wait(1000)
      //Nivel 1
      cy.get('input.el-input__inner[name="sportDisciplineLevelMandatory"][placeholder="Seleccionar"]')
        .should('be.visible')
        .click()
      //// Write nivel ////
      /// Alto      1
      /// Medio     2
      /// Bajo      3
      cy.contains(colaboradorData.PersonalAbility.sportDisciplineDataDtoMandatory.sportDisciplineLevel).click()
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
      cy.contains(colaboradorData.PersonalAbility.sportDisciplineDataDtoMandatory.sportDisciplineFrequency).click()
      cy.wait(1000)
      //Save and continue
      cy.get("#hiringInitialDataForm > div.el-form-item.asterisk-left > div > div > div > button:nth-child(2) > span")
        .should('be.visible')
        .click()

      /// page 2: Hiring Process - Set Address
      cy.get('input.el-input__inner[name="postalCode"][placeholder="Código postal"]')
        .should('be.visible')
        .click()
        .type(colaboradorData.Address.postalCode)
      cy.wait(1000)

      //Municipality
      cy.get('input.el-input__inner[name="municipality"][placeholder="Municipio"]')
        .should('be.visible')
        .click()
      ///// Write municipalityName /////
      cy.contains(colaboradorData.Address.municipalityName).click()
      cy.wait(1000)

      //Settlement (Asentamiento)
      cy.get('input.el-input__inner[name="settlement"][placeholder="Asentamiento"]')
        .should('be.visible')
        .click()
      ///// Write settlementName (Asentamiento) /////
      //cy.contains(colaboradorData.Address.settlementName).click()
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
      cy.get('.el-scrollbar__view.el-select-dropdown__list').contains(colaboradorData.Address.streetTypeName).click();

      /* // Verificar que la opción seleccionada se refleje en el campo de entrada
      cy.get('.el-input__inner[name="streetType"][placeholder="Tipo de vía"]').should('have.value', 'Calle'); */

      /// address
      cy.get('input.el-input__inner[name="address"][placeholder="Dirección"]')
        .should('be.visible')
        .click()
        //// Write address
        .type(colaboradorData.Address.address).click()
      cy.wait(1000)

      /// N. ext.
      cy.get('input.el-input__inner[name="numberExterior"][placeholder="N. ext."]')
        .should('be.visible')
        .click()
        //// Write numberExterior.
        .type(colaboradorData.Address.numberExterior).click()
      cy.wait(1000)

      /// N. int.
      cy.get('input.el-input__inner[name="numberInterior"][placeholder="N. int."]')
        .should('be.visible')
        .click()
        //// Write numberInterior.
        .type(colaboradorData.Address.numberInterior).click()
      cy.wait(1000)

      /// Save and contninue  ////
      cy.get('.get-address-data-form_saveButton__zaa0 > :nth-child(3) > span').click()

      /// Contracting Process - Establish Tax Data

      // CURP
      cy.get('input.el-input__inner[name="curp"][placeholder="CURP"]')
        .should('be.visible')
        .click()
        //// Write CURP.
        .type(colaboradorData.Fiscal.curp)
      cy.wait(1000)

      // NSS (Nº de Seguridad Social)
      cy.get('input.el-input__inner[name="socialSecurityNumber"][placeholder="NSS (Nº de Seguridad Social)"]')
        .should('be.visible')
        .click()
        //// Write NSS.
        .type(colaboradorData.Personal.identification.nss)
      cy.wait(1000)

      /// Nombre fiscal ==>   Se rellena de forma automática.

      // Dirección fiscal ==> Se rellena de forma automática.

      // Regimen fiscal   ==> Se rellena de forma automática.

      // Save and continue
      cy.get('.get-fiscal-data-form_saveButton_BHpzL > :nth-child(3)')
        .should('be.visible')
        .click()

      /// Recruitment process - Set bank details

      ///// Select Bank /////
      //cy.get('.el-input__inner[placeholder="Banco"][id="bank"]')
      cy.get("#bank")
        .should('be.visible')
        .click()
        .type(colaboradorData.Bank.bankName);
      cy.wait(2000)
        .contains(colaboradorData.Bank.bankName)
        .click()

      /// Clabe
      cy.get('input.el-input__inner[name="interbankCode"][placeholder="CLABE"]')
        .should('be.visible')
        .click()
        ///// Write clabe /////
        .type(colaboradorData.Bank.interbankCode)
      cy.wait(1000)

      cy.get('input.el-input__inner[name="accountNumber"][placeholder="Número de cuenta"]')
        .should('be.visible')
        .click()
      cy.wait(1000)

      /// Save and continue
      cy.get('.get-bank-data-form_saveButton_jGDz6 > :nth-child(3) > span')
        .should('be.visible')
        .click()
      cy.wait(6000)

      /// Hiring Process - Establish Employment Data
      ///Job
      cy.get('.el-input__inner[name="position"][type="text"][autocomplete="off"][tabindex="0"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.oficio)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.oficio)
        .click()
      cy.wait(5000)
      ///team
      cy.get('.el-input__inner[name="team"][type="text"][autocomplete="off"][tabindex="0"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.equipo)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.equipo)
        .click()
      cy.wait(5000)
      /// Pattern
      cy.get('.el-input__inner[name="patron"][type="text"][autocomplete="off"][placeholder="Patrón"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.patrón)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.patrón)
        .click()
      cy.wait(5000)
      //Legal representative
      cy.get('.el-input__inner[name="legalRepresentative"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.representantelegal)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.representantelegal)
        .click()
      cy.wait(5000)
      //Type of contract
      cy.get('.el-input__inner[name="contractType"][type="text"][autocomplete="off"][placeholder="Tipo de contrato"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.tipodecontrato)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.tipodecontrato)
        .click()
      cy.wait(5000)
      // monthly premium
      cy.get('.el-input__inner[name="positionMonthlyRate"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.primamensual)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.primamensual)
        .click()
      cy.wait(5000)
      /// email
      cy.get('.el-input__inner[name="email"][type="text"][autocomplete="off"][placeholder="Email"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.email)
      cy.wait(2000)
      // sport that leads
      cy.get('.el-input__inner[name="sport"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.deportequelidera)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.deportequelidera)
        .click()
      cy.wait(5000)
      /// Start date
      cy.get('.el-input__inner[name="startDate"][type="text"][autocomplete="off"][placeholder="Fecha de inicio"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.fechadeinicio)
        .click({ force: true })
      cy.wait(2000)
      /// End date
      cy.get('.el-input__inner[name="endDate"][type="text"][autocomplete="off"][placeholder="Fecha de fin"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.Fechadefin)
        .click({ force: true })
      cy.wait(2000)
      /// Type of day
      cy.get('.el-input__inner[name="workdayType"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.tipodejornada)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.tipodejornada)
        .click()
      /// Holidays
      cy.get('.el-input__inner[name="selectedHolidays"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.vacaciones)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.vacaciones)
        .click()
      cy.wait(5000)
      /// Bonus
      cy.get('.el-input__inner[name="compensationDays"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.aguinaldo)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.aguinaldo)
        .click()
      cy.wait(5000)
      /// vacation bonus
      cy.get('.el-input__inner[name="holidaysRate"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.primavacacional)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.primavacacional)
        .click()
      /// Antiquity.
      cy.get('.el-input__inner[name="seniorityDate"][type="text"][autocomplete="off"][placeholder="Antigüedad"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.antigüedad)
        .click({ force: true })
      cy.wait(2000)
      /// Salary
      cy.get('.el-input__inner[name="salary"][type="text"][autocomplete="off"][placeholder="Salario"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.salario)
      cy.wait(2000)
      /// Payroll group.
      cy.get('.el-input__inner[name="paysheetGroup"][type="text"][autocomplete="off"]')
        .should('be.visible')
        .scrollIntoView()
        .click({ force: true })
        .type(colaboradorData.Laboral.grupodenomina)
      cy.wait(2000)
        .contains(colaboradorData.Laboral.grupodenomina)
        .click()

      cy.get('#hiringLaborDataForm > div.el-form-item.asterisk-left > div > div > div > button.el-button.el-button--primary > span')
        .should('be.visible')
        .click()

      cy.log('User DZ (Zone Director) New Hiring (Centro MX1982)');

    })

  })

});
