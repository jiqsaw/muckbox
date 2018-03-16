
if (!_fbIsWebSite) {
    if (!_isLocal) {
        if (_fbForceSsl) {
            if ("https:" != document.location.protocol)
                top.location.href = _fbPageTab;
        }
    }

    if (_fbOnlyInFb)
        fbOnlyInFb();

    if (_fbForcePageTab == true && _fbCanvasPage == false)
        fbForcePageTab();
}

window.fbAsyncInit = function () {
    FB._secure = _fbForceSsl;
    FB.init({
        appId: _fbAppId, // App ID
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true,  // parse XFBML
        chversion: 'v2.2',
        channelUrl: _urlWeb + '/channel.html'
    });

    fbConsole("initalized");

    if (!_fbIsWebSite) {

        //FB.Canvas.setAutoGrow(true);
        setTimeout(iFrameHeightRender, 1000);

        if (!_fbFullCanvas)
            setTimeout(iFrameHeightRender, 1000);

        FB.Event.subscribe('edge.create', function () {

            fbConsole("like click");
            fbGASend('Like_OK');

            if (_fbLikeTriggerLogin)
                fbLogin();
            else
                if (typeof window[_fbFuncOnPageLiked] == 'function')
                    window[_fbFuncOnPageLiked]();

        });

    }

    if (typeof window[_fbFuncOnInit] == 'function')
        window[_fbFuncOnInit]();

    if (typeof window["fbOnInitDefault"] == 'function')
        window["fbOnInitDefault"]();
};

// Load the SDK Asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fbOnlyInFb() {
    if (self == top)
        top.location.href = _fbPageTab;
}

function fbForcePageTab() {
    if ((window.name == "iframe_canvas") || (window.name == "iframe_canvas_fb_https"))
        top.location.href = _fbPageTab;
}

function fbSendRequestToRecipients(fbIds) {
    FB.ui({
        method: 'apprequests',
        message: _fbInviteMsg,
        to: fbIds
    }, inviteRequestCallback);
}

function fbSendRequestViaMultiFriendSelector() {
    FB.ui({
        method: 'apprequests',
        message: _fbInviteMsg
    }, inviteRequestCallback);
}

function inviteRequestCallback(response) {
    if (response.request && response.to)
        fbGASend('Invite_OK');
    else
        fbGASend('Invite_Cancel');
}

function fbShare(fbShareName, fbShareCaption, fbShareDescription, fbLink, fbAppImg) {

    if (fbShareName == null || fbShareName == "") fbShareName = _fbShareName;
    if (fbShareCaption == null || fbShareCaption == "") fbShareCaption = _fbShareCaption;
    if (fbShareDescription == null || fbShareDescription == "") fbShareDescription = _fbShareDescription;
    if (fbLink == null || fbLink == "") fbLink = _fbCanvasPage + '/?request_ids=' + request_id;
    if (fbAppImg == null || fbAppImg == "") fbAppImg = _fbAppImg;

    FB.ui(
      {
          method: 'feed',
          name: fbShareName,
          caption: fbShareCaption,
          description: fbShareDescription,
          link: fbLink,
          picture: fbAppImg
      },
      function (response) {
          if (response && response.post_id) {
              fbGASend('Share_OK');
          } else {
              fbGASend('Share_Cancel');
          }
         /* if (typeof window['redirectMainPage'] == 'function')
              redirectMainPage();*/
      }
    );
}

//function fbGetUserInfo(fbId) {
//    FB.api(
//        "/" + fbId + "?fields=first_name,last_name,id,name,picture.type(normal),link",
//        function (response) {
//            if (response && !response.error) {
//               //console.log(response);
//            }
//        }
//    );
//}

function fbGASend(eventLabel) {
    if (typeof window["GATracker"] == 'function')
        window["GATracker"](eventLabel);
}

function iFrameHeightRender() {
    fbConsole("render");
    if (FB != null && _fbIsWebSite == false && _fbFullCanvas == false) {
        FB.Canvas.setSize({ width: 900, height: 810 });
        fbConsole("render içeri girdi");
    }
}

function fbConsole(desc) {
    //if (_fbConsole)
        //console.log("fb: " + desc);
}