function validate() {
    let $isCompany = $('#company');
    let $companyInfo = $('#companyInfo');
    let $submit = $('#submit');
    let $result = $('#valid');

    $isCompany.change(function () {
        if ($isCompany.prop( "checked" )) {
            $companyInfo.removeAttr('style');
        }else{
            $companyInfo.attr('style', 'display: none;');
        }
    });


    $submit.on('click', function (e) {
         e.preventDefault();
        // $result.attr('style', 'display: none;');

        let $username = $('#username');
        // $username.css('border', 'none');

        let $email = $('#email');
        // $email.css('border', 'none');

        let $password = $('#password');
        // $password.css('border', 'none');
        let $confirmPassword = $('#confirm-password');
        // $confirmPassword.css('border', 'none');

        console.log($username);
        let namePattern = /^[A-Za-z0-9]{3,20}$/;
        // let emailPattern = /^\w+@(\w+\.)+\w+$/;
        let emailPattern = /^(.)*@(.)*\.(.)*$/;
        let passwordPattern = /^\w{5,15}$/;

        let nameBool =namePattern.test($username.val());
        if(!nameBool){
            $username.css('border', 'solid red');
        }


        let emailBool =emailPattern.test($email.val());
        if(!emailBool){
            $email.css('border', 'solid red');
        }

        let passwordBool =passwordPattern.test($password.val());
        let confirmedPasswordBool = (passwordBool && $password.val()=== $confirmPassword.val());
        if(!confirmedPasswordBool){
            $password.css('border', 'solid red');
            $confirmPassword.css('border', 'solid red');
        }

        if ($isCompany.prop( "checked" )){
            let $companyNumber = $('#companyNumber');
            let number = +$companyNumber.val();
            let companyBool = false;
            if (1000 <= number && number <= 9999){
                companyBool = true;
            }else{
                $companyNumber.css('border', 'solid red');
            }

            if (nameBool && emailBool && confirmedPasswordBool && companyBool){
                $result.removeAttr('style')
            }

        }else{
            if (nameBool && emailBool && confirmedPasswordBool){
                $result.removeAttr('style')
            }
        }






    })


}