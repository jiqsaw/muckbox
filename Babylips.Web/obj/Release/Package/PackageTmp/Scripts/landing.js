// Global Variables
var fadeInTime = 1000;
var fadeOutTime = 1000;

// Document Ready
$(document).ready(function () {
    // Init Plax
    $('.babylips1').plaxify({ "xRange": 70, "yRange": 70, "invert": true });
    $('.babylips2').plaxify({ "xRange": 90, "yRange": 90 });
    $('.babylips3').plaxify({ "xRange": 20, "yRange": 20, "invert": true });
    $('.babylips4').plaxify({ "xRange": 15, "yRange": 15 });
    $('.babylips5').plaxify({ "xRange": 10, "yRange": 10, "invert": true });
    $('.babylips6').plaxify({ "xRange": 10, "yRange": 10 });
    $('.logo').plaxify({ "xRange": 10, "yRange": 10 });
    $.plax.enable({ "activityTarget": $('body') });
    $.plax.enable();
});

// Close Lightbox
function closePopup(el) {
    $(el).parent().hide().html('');
    $('#LightBox').hide();
    return false;
}

// Open Conditions
function OpenConditions() {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#ConditionsOfParticipation').load("/katilim-kosullari");
    $('#ConditionsOfParticipation').fadeIn(fadeInTime);
    return false;
}

// Open Privacy
function OpenPrivacy() {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#Privacy').load("/gizlilik");
    $('#Privacy').fadeIn(fadeInTime);
    return false;
}


// Open Video
function OpenLandingVideo() {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#LandingVideo').load("/izle");
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#LandingVideo').fadeIn(fadeInTime);
    return false;
}

function hideButtons() {
    $('#btnLandingVideo').hide();
    $('#fbBtnLogin').hide();
}