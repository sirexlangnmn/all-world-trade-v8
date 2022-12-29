let agreeInTermsAndConditions = req.body.agreeInTermsAndConditions;

        console.log('agreeInTermsAndConditions', agreeInTermsAndConditions);
        if (agreeInTermsAndConditions) {
            console.log('agreeInTermsAndConditions YES');
        } else {
            console.log('agreeInTermsAndConditions NO' );
            let responseData = {
                message: 'must agree in terms and conditions',
            };

            res.send(responseData);
        }





         if (res.message === 'must agree in terms and conditions') {
                Swal.fire('Warning', 'Must agree in terms and conditions', 'warning');
            }



            res.message !== 'must agree in terms and conditions' &&