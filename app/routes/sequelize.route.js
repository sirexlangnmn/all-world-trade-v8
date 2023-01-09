module.exports = (app) => {
    const controllers = require('../db_controllers');
    const middleware = require('../middleware');

    const smallScaleCompanyRegistrationValidation = middleware.smallScaleCompanyRegistrationValidation;
    const smallScaleCompanyRegistrationController = controllers.small_scale_company_registration;

    const mediumScaleCompanyRegistrationValidation = middleware.mediumScaleCompanyRegistrationValidation;
    const mediumScaleCompanyRegistrationController = controllers.medium_scale_company_registration;

    const largeScaleCompanyRegistrationValidation = middleware.largeScaleCompanyRegistrationValidation;
    const largeScaleCompanyRegistrationController = controllers.large_scale_company_registration;

    const traderScaleCompanyRegistrationValidation = middleware.traderScaleCompanyRegistrationValidation;
    const traderScaleCompanyRegistrationController = controllers.trader_scale_company_registration;

    const helpAndSupportRegistrationController = controllers.help_and_support_registration;
    const supportLinksController = controllers.support_links;
    const communicatorController = controllers.communicator;

    app.post(
        ['/api/v2/post/small-scale-company-registration'],
        smallScaleCompanyRegistrationValidation,
        smallScaleCompanyRegistrationController.create,
    );

    app.post(
        ['/api/v2/post/medium-scale-company-registration'],
        mediumScaleCompanyRegistrationValidation,
        mediumScaleCompanyRegistrationController.create,
    );

    app.post(
        ['/api/v2/post/large-scale-company-registration'],
        largeScaleCompanyRegistrationValidation,
        largeScaleCompanyRegistrationController.create,
    );

    app.post(
        ['/api/v2/post/trader-scale-company-registration'],
        traderScaleCompanyRegistrationValidation,
        traderScaleCompanyRegistrationController.create,
    );

    app.post(
        ['/api/v2/post/trader-scale-company-registration'],
        traderScaleCompanyRegistrationValidation,
        traderScaleCompanyRegistrationController.create,
    );

    app.post(
        ['/api/post/help-and-support-registration-process'],
        helpAndSupportRegistrationController.create
    );

    app.post(
        ['/api/get/create-help-and-support-communicator-link'],
        supportLinksController.create
    );

    app.post(
        ['/api/post/go-to-help-and-suggestion-page'],
        supportLinksController.getSupportLinks 
    );

    app.get('/api/get/communicator-link/:link', communicatorController.findCommunicator);
    
};
