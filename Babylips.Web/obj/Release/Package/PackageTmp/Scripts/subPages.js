/// <reference path="subPages.js" />
// Global Variables
var fadeInTime = 1000;
var fadeOutTime = 1000;

// Document Ready
$(function () {
    initSelectedNav();
});

// Close Lightbox
function closePopup(el) {
    $(el).parent().hide();
    $('#LightBox').hide();
    return false;
}

// Open Conditions
function OpenConditions() {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#ConditionsOfParticipation').load("/katilim-kosullari");
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#ConditionsOfParticipation').fadeIn(fadeInTime);
    return false;
}

// Open Privacy
function OpenPrivacy() {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#Privacy').load("/gizlilik");
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#Privacy').fadeIn(fadeInTime);
    return false;
}


// Init Selection
function initSelectedNav() {
    var selectedID = $('#SubNavigation').attr('data-selected');
    if (selectedID != 'None') {
        $('#' + selectedID).addClass('selected' + selectedID);
    }
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
