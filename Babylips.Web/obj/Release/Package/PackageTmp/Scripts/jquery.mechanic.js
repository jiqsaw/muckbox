// Global Variables
var pathVideoRoot = "https://s3.eu-central-1.amazonaws.com/wandacdn/muckbox/";
var sampleShortRoot = pathVideoRoot + "Final/Group{GROUPNO}/{SAMPLENO}.mp4";

var g_recordData = [];

// Default Values
var defaultWindow = 'RecorderContainer';
var currentWindow = '';
var fadeInTime = 1000;
var fadeOutTime = 1000;
var isMetronomePlaying = false;
var setCurrentTime = true;
var v1s, v2s, v3s, v4s, v5s, v6s;

// Dedect IE
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    if (myNav.indexOf('msie') != -1)
    {
        if (parseInt(myNav.split('msie')[1]) < 10) {
            setCurrentTime = false;
            //pathVideoRoot = "/Assets/video/";
        }
    }
}


// ********************* Video Preloader ********************* 
function preLoadVideo(vidPath, vidId) {
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState == 4 && r.status == 200) {
            //console.log("game: video(s) request completed");
        }
    }
    r.onload = function () {
        document.getElementById(vidId).src = pathVideoRoot + vidPath;
        vidPreLoadedCanPlay(vidId);
        //console.log("game: video binded");
    };

    try {
        var vPath = pathVideoRoot + vidPath;
        r.open("GET", vPath);
        r.responseType = "blob";
        r.send();
    } catch (e) {
        document.getElementById(vidId).src = pathVideoRoot + vidPath;
        vidPreLoadedCanPlay(vidId);
    }


}
function gVideoUpdateProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = (evt.loaded / evt.total) * 100;
        //console.log("percentComplete: " + parseInt(percentComplete));
    }
}
function vidPreLoadedCanPlay(vidId) {
    $("#" + vidId).on("canplaythrough", function () {
        //console.log("preloaded video is ready");
        preLoadedEnd(vidId);
    });
}

// ********************* Mechanic ********************* 

function bindDragDropEvents() {
    $('.videoContainer').droppable({
        accept: '.sample',
        hoverClass: 'videoContainerHover',
        drop: addToTimeline,
        zIndex: 1
    });

    $('.sample').draggable({
        //containment: '.recorderDropContainer',
        stack: '.videoContainer',
        //cursor: 'cur/grab.cur',
        scroll: false,
        revert: true
    });
}


function getSamplePath(sampleGroup, sampleNo, isFull) {
    var path = sampleShortRoot;
    return path.replace("{GROUPNO}", sampleGroup).replace("{SAMPLENO}", sampleNo);
}



function addToTimeline(event, ui) {

    var sampleNo = ui.draggable.data('sample-no');
    var sampleGroup = $(ui.draggable).parent("div").attr("data-sample-group");
    var lipsHasItem = eval($(this).attr("data-lips-has-item"));

    if (!lipsHasItem) {
        $(ui.draggable).css("visibility", "hidden"); // Hide Sample Drag Icon

        $(this).attr("data-lips-sample-group", sampleGroup);
        $(this).attr("data-lips-sample-no", sampleNo);
        $(this).attr("data-lips-has-item", true);

        $(this).addClass('group'+sampleGroup); // Add group flag

        $(this).children('.lipsBorder').show(); // Border Active Video

        $(this).children(".vidLoading").show(); // Show Preloading

        bindLipsEditEvents($(this));

        playShortVideo($(this), sampleGroup, sampleNo);

        recordingOnAction($(this).attr("data-lips-item-no"), g_actionType["add"], eval(sampleGroup), eval(sampleNo));
    }
}


function removeFromTimeline(lipsItem) {

    var sampleGroup = lipsItem.attr("data-lips-sample-group");
    var sampleNo = lipsItem.attr("data-lips-sample-no");

    $(lipsItem).removeClass('group' + sampleGroup); // Remove group flag

    // Hide Active Border
    $(lipsItem).children('.lipsBorder').hide();

    // Show Removed Sample
    $(".recorderButtons .recordGroup[data-sample-group=" + sampleGroup + "] a[data-sample-no=" + sampleNo + "]").css("visibility", "visible");

    // Reset Container
    lipsItem.attr("data-lips-has-item", false); 
    lipsItem.attr("data-lips-sample-group", 0);
    lipsItem.attr("data-lips-sample-no", 0);
    lipsItem.attr("data-playing", false);

    $(lipsItem).children(".vidLoading").hide(); // Hide Loading
    $(lipsItem).children(".videoToolBar").hide(); // Hide Toolbar

    var lipsItemVideo = $(lipsItem).children("video"); // Reset Video
    var lipsItemVideoId = $(lipsItem).children("video").attr('id');
    document.getElementById(lipsItemVideoId).pause();
    //$(lipsItemVideo)[0].pause();
    $(lipsItemVideo).children("source").attr("src", "");
    $(lipsItemVideo).attr("data-loaded", false);
    $(lipsItemVideo).hide(); // Hide Video

    recordingOnAction(lipsItem.attr("data-lips-item-no"), g_actionType["remove"], eval(sampleGroup), eval(sampleNo));

    unBindLipsEditEvents(lipsItem);
}

function bindLipsEditEvents(e) {
    //console.log(e);
    $(e).children(".videoToolBar").children('a.removeVideo').click(function () {
        removeFromTimeline($(this).parent().parent());
    });
    $(e).mouseover(function () {
        $(this).children(".videoToolBar").show();
    });
    $(e).mouseout(function () {
        $(this).children(".videoToolBar").hide();
    });
}

function unBindLipsEditEvents(e) {
    $(e).unbind("mouseover");
    $(e).unbind("click");
    $(e).unbind("mouseout");
}

function playShortVideo(e, sampleGroup, sampleNo) {
    var videoObj = $(e).children("video");
    var videoObjId = videoObj.attr('id');

    var src = getSamplePath(sampleGroup, sampleNo, false);
    $(videoObj).children("source").attr("src", src);

    // $(videoObj).show();

    $(videoObj).prop('muted', true);

    document.getElementById(videoObjId).load();
    // $(videoObj)[0].load();

    $(videoObj).on("canplaythrough", function () {
        $(videoObj).attr("data-loaded", true);

        if (!isMetronomePlaying) {
            isMetronomePlaying = true;
            vMetronomeSync();
            videoMetronome.play();
            vTrack();
        }
    });

    //console.log("playing... lipsItem: " + $(e).attr("data-lips-item-no") + " | sampleGroup: " + sampleGroup + " | sampleNo: " + sampleNo);
}


function allVideoPause() {
    videoMetronome.pause();
    video1.pause();
    video2.pause();
    video3.pause();
    video4.pause();
    video5.pause();
    video6.pause();
}

function vTrack() {
    videoMetronome.addEventListener('ended', vMetronomeSync);
}




function vMetronomeSync() {
    //console.log("metronomeend");
    vLoopEnd();

    // Not IE9
    if (setCurrentTime) {

        videoMetronome.currentTime = 0; 
        videoMetronome.play();

        if ($(v1s).attr("src") != "") { video1.currentTime = 0; video1.play(); }
        if ($(v2s).attr("src") != "") { video2.currentTime = 0; video2.play(); }
        if ($(v3s).attr("src") != "") { video3.currentTime = 0; video3.play(); }
        if ($(v4s).attr("src") != "") { video4.currentTime = 0; video4.play(); }
        if ($(v5s).attr("src") != "") { video5.currentTime = 0; video5.play(); }
        if ($(v6s).attr("src") != "") { video6.currentTime = 0; video6.play(); }
    }
    else
    {
        videoMetronome.pause();
        videoMetronome.play();

        if ($('#video1').children('source').attr('src') != "") { video1.pause(); video1.play(); }
        if ($('#video2').children('source').attr('src') != "") { video2.pause(); video2.play(); }
        if ($('#video3').children('source').attr('src') != "") { video3.pause(); video3.play(); }
        if ($('#video4').children('source').attr('src') != "") { video4.pause(); video4.play(); }
        if ($('#video5').children('source').attr('src') != "") { video5.pause(); video5.play(); }
        if ($('#video6').children('source').attr('src') != "") { video6.pause(); video6.play(); }
    }


}

function vLoopEnd() {
    //console.log("play time");
    for (var i = 1; i <= 6; i++) {
        if (eval($('#video' + i).parent("div").attr("data-lips-has-item"))) {
            if (!eval($('#video' + i).parent("div").attr("data-playing"))) {
                if (eval($('#video' + i).attr("data-loaded"))) {
                    $('#video' + i).next(".vidLoading").hide();
                    $('#video' + i).show();
                    $('#video' + i).prop('muted', false);
                    document.getElementById('video' + i).play();
                    //$('#video' + i)[0].play();
                    $('#video' + i).parent("div").attr("data-playing", true);
                }
            }
        }
    }
}

function preLoadedEnd(vidId) {
    if (vidId == "videoMetronome") {
        $('.mechanicPageContainer').show();
        //videoMetronome.play();
        $('#' + vidId).unbind("canplaythrough");
    }
}


// *********************** LightBox ************************
// Open Lightbox
function OpenPopUp(id) {
    $('#LightBox > div').hide();
    $('#LightBox').show();    
    $('#' + id).fadeIn(fadeInTime);
    return false;
}

function OpenConditions()
{
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#ConditionsOfParticipation').load("/katilim-kosullari");
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#ConditionsOfParticipation').fadeIn(fadeInTime);
    return false;
}
function OpenPrivacy() {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('#Privacy').load("/gizlilik");
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#Privacy').fadeIn(fadeInTime);
    return false;
}

// Close Lightbox
function closePopup(el) {
    $(el).parent().hide();
    $('#LightBox').hide();
    return false;
}
// Open Song Sharing Popup
function OpenSharePopUp(shareLink) {
    $('#LightBox > div').hide();
    $('#LightBox').show();
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#ShareYourSong').fadeIn(fadeInTime, function () {
        $('.shareYourSongForm .longTextBox input').val(shareLink).focus().select();
    });
}
// On Record End
function OnRecordEnd() {
    $('#LightBox > div').hide();
    $('#SelectSongName').load("/Mechanic/RecordEndMusicTitle");
    $('#LightBox').show();
    $('html, body').animate({ scrollTop: 0, }, 500);
    $('#SelectSongName').fadeIn(fadeInTime);
    return false;
}


// ********************* Form Functions *********************

// CheckBox Emulation
function initCheckBox() {
    $('.checkBox, .checkBoxLabel').click(function () {
        //console.log('assigned.')
        var chkbox = null;
        var attr = $(this).attr('for');
        if (typeof attr !== typeof undefined && attr !== false) {
            chkbox = $('#' + attr).parent();
        } else {
            chkbox = $(this);
        }
        if ($(chkbox).hasClass('checked')) {
            $(chkbox).removeClass('checked').children('input').val(0);
        } else {
            $(chkbox).addClass('checked').children('input').val(1);
        }
    });
}

// Share Box Function
function initShareBox() {
    $('#SongShareLink').focus().select();
    $('#SongShareLink').click(function () {
        $(this).focus().select();
    });
}




// ********************* Document Ready *********************
$(function () {

    isIE();
    //vTrack();
    bindDragDropEvents();
    
    preLoadVideo("metronome.mp4", "videoMetronome"); // Preload Metronome

    v1s = $('#video1').children("source");
    v2s = $('#video2').children("source");
    v3s = $('#video3').children("source");
    v4s = $('#video4').children("source");
    v5s = $('#video5').children("source");
    v6s = $('#video6').children("source");
});