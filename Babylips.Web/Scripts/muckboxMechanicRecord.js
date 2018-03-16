var recordDuration = 40;
var second = 0;
var setTimeoutTimer;
var isRecording = false;

$(function () {

    defineRecordActionTypes();
})

function recordBarLoading() {
    $('.recordFill').css("width", second * 18);
}

function recordBarReset() {
    $('.recordFill').css("width", 0);
}

function timerUpdate() {

    timerOnChange();

    second++;    

    if (second <= recordDuration)
        setTimeoutTimer = setTimeout(timerUpdate, 1000);
    else {
       //console.log("time is up");
        timerEnd();
    }
}

function timerOnChange() {
    $('.timeTooltip').html("00:" + second.toString().padLeft(2, '0'));
    $('.timeLeft').html("00:" + (recordDuration - second.toString()).toString().padLeft(2, '0'));
    recordBarLoading();
    timerOnChangeFire(); //**
}

function timerEnd() {
    clearTimeout(setTimeoutTimer);
    second = 0;
    //recordEnd();
    playbackEnd(); //**
}


var g_actionType;

function defineRecordActionTypes() {
    g_actionType = {
        add: 1,
        remove: 2,
        muteOff: 3,
        muteOn: 4,

        recordEnd: 5
    }
}
