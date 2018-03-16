function fbOnInitDefault() {

    if ($('#' + _fbLoginButtonId).length) {
        $('#' + _fbLoginButtonId).on("click", function () {
            fbLogin();
        });

        if ((_fbAutoLogin) && (!_fbIsLogin))
            fbAutoLogin();


    }
    else {
        if ($('#' + _fbLoginProcessHideElementId).length)
            $('#' + _fbLoginProcessHideElementId).css({ "visibility": "visible" }).hide().fadeIn();
    }
}


function fbLogin() {
    FB.login(function (response) {
        fbLoginResponse(response);

    }, { scope: _fbExtPerms });
}

function fbLoginResponse(response) {

    fbConsole("login starts");

    if (response.authResponse) {

        var access_token = FB.getAuthResponse()['accessToken'];

        fbLoginStart();

        FB.api(_fbGraphUrl, function (response) {
            var postData = { JsonData: $.toJSON(response), AccessToken: access_token };
            $.ajax({
                url: _fbLoginUrl,
                type: "POST",
                data: postData,
                dataType: 'json',
                success: function (response) {

                    fbConsole("login success");
                    fbConsole(response);

                    fbConsole(response.result);

                    if (response.result == "OK") {

                        if (_fbFullCanvas)
                            top.location.href = _fbCanvasPage;
                        else
                            location.href = _fbLoginCallBack + '?fbLogin=true';
                    }
                    else {
                        //console.log(response.error);
                        location.href = _fbErrorPage;
                    }

                },
                error: function (response) {

                    fbConsole("login error");
                    fbConsole(response);
                    // location.href = _errorPage + '?result=FbLoginErr-' + response.result;

                }
            });

            // location.href = _errorPage + '?result=FbApiErr-' + response.result;

        });

    }
    else
        fbConsole('User cancelled login or did not fully authorize.');
}

function fbLoginStart() {
    if ($('#' + _fbLoginProcessHideElementId).length)
        $('#' + _fbLoginProcessHideElementId).fadeOut('slow');

    if ($('#' + _fbLoginProcessElementId).length)
        $('#' + _fbLoginProcessElementId).fadeIn('slow').css('display','inline-block');
}

function fbAutoLogin() {

    fbConsole("auto login starts");

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            fbConsole("auto login connected");
            fbLoginResponse(response);
        }
        else {

            fbConsole("auto login NOT connected");

            if ($('#' + _fbLoginProcessHideElementId).length)
                $('#' + _fbLoginProcessHideElementId).css({ "visibility": "visible" }).hide().fadeIn();

            if (typeof window[_fbFuncOnAutoLoginFail] == 'function')
                window[_fbFuncOnAutoLoginFail]();
        }
    });
}

function deleteRequest(requestId) {
    FB.api(
    "/" + requestId,
    function (response) {
        if (response && !response.error) {
            //console.log(response);
        }
    }
);
}