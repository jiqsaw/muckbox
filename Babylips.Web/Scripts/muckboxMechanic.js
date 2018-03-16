// Global Variables
var pathVideoRoot = "http://s3.eu-central-1.amazonaws.com/wandacdn/muckbox/";
var sampleShortRoot = pathVideoRoot + "Final/Group{GROUPNO}/{SAMPLENO}.mp4";

var g_recordData = [];

// Default Values
var currentWindow = '';
var fadeInTime = 1000;
var fadeOutTime = 1000;
var v1s, v2s, v3s, v4s, v5s, v6s;

// Dedect IE
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    if (myNav.indexOf('msie') != -1) {
        if (parseInt(myNav.split('msie')[1]) < 10) {
            setCurrentTime = false;
            pathVideoRoot = "/Assets/video/";
            sampleShortRoot = pathVideoRoot + "Final/Group{GROUPNO}/{SAMPLENO}.mp4";
        }
    }
}

// ********************* Document Ready *********************
$(function () {
    isIE();

    v1s = $('#video1').children("source");
    v2s = $('#video2').children("source");
    v3s = $('#video3').children("source");
    v4s = $('#video4').children("source");
    v5s = $('#video5').children("source");
    v6s = $('#video6').children("source");

    vTrack();

    preLoadVideo("metronome.mp4", "videoMetronome"); // Preload Metronome
});

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
function preLoadedEnd(vidId) {
    if (vidId == "videoMetronome") {
        $('.mechanicPageContainer').show();
        //$('#videoMetronome')[0].play();
        $('#' + vidId).unbind("canplaythrough");
    }
}


// ********************* Mechanic ********************* 

function getSamplePath(sampleGroup, sampleNo, isFull) {
    var path = sampleShortRoot;
    return path.replace("{GROUPNO}", sampleGroup).replace("{SAMPLENO}", sampleNo);
}


function playShortVideo(e, sampleGroup, sampleNo) {
    var videoObj = $(e).children("video");
    var videoObjId = videoObj.attr('id');

    var src = getSamplePath(sampleGroup, sampleNo, false);
    $(videoObj).children("source").attr("src", src)

    //console.log("src: " + src);

    //$(videoObj).show();

    document.getElementById(videoObjId).load();
    //$(videoObj)[0].load();

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
    
        videoMetronome.addEventListener('ended', function () {
       //console.log("metronomeend");
        vLoopEnd();

        // Not IE9
        if (setCurrentTime) {

            this.currentTime = 0;
            this.play();

            if ($(v1s).attr("src") != "") { video1.currentTime = 0; video1.play(); }
            if ($(v2s).attr("src") != "") { video2.currentTime = 0; video2.play(); }
            if ($(v3s).attr("src") != "") { video3.currentTime = 0; video3.play(); }
            if ($(v4s).attr("src") != "") { video4.currentTime = 0; video4.play(); }
            if ($(v5s).attr("src") != "") { video5.currentTime = 0; video5.play(); }
            if ($(v6s).attr("src") != "") { video6.currentTime = 0; video6.play(); }
        }
        else {

            this.pause();
            this.play();

            if ($('#video1').children('source').attr('src') != "") { video1.currentTime = 0; video1.play(); }
            if ($('#video2').children('source').attr('src') != "") { video2.currentTime = 0; video2.play(); }
            if ($('#video3').children('source').attr('src') != "") { video3.currentTime = 0; video3.play(); }
            if ($('#video4').children('source').attr('src') != "") { video4.currentTime = 0; video4.play(); }
            if ($('#video5').children('source').attr('src') != "") { video5.currentTime = 0; video5.play(); }
            if ($('#video6').children('source').attr('src') != "") { video6.currentTime = 0; video6.play(); }
        }
    });
}

function vLoopEnd() {
   //console.log("play time");
    for (var i = 1; i <= 6; i++) {
        if (eval($('#video' + i).parent("div").attr("data-lips-has-item"))) {
            if (!eval($('#video' + i).parent("div").attr("data-playing"))) {
                if (eval($('#video' + i).attr("data-loaded"))) {
                    $('#video' + i).next(".vidLoading").hide();
                    $('#video' + i).show();
                    document.getElementById('video' + i).play();
                    //$('#video' + i)[0].play();
                    $('#video' + i).parent("div").attr("data-playing", true);
                }
            }
        }
    }
}

