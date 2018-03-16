var recordDuration = 40;
var second = 0;
var setTimeoutTimer;
var isRecording = false;
var g_actionType = { add: 1, remove: 2, muteOff: 3, muteOn: 4, recordEnd: 5 }

$(function () {

    bindBtnRecordEvents();

    //defineRecordActionTypes();
})

function recordBarLoading() {
    $('.recordFill').css("width", second * 18);
    //$('.timeTooltip').css("right", 708 - (second * 18));

    //$(".recordFill").animate({ width: second * 18 }, 900);
    //$(".timeTooltip").animate({ right: (708 - (second * 18))}, 900);

}

function recordBarReset() {
    $('.recordFill').css("width", 0);
    //$('.timeTooltip').css("right", 708);
}

function bindBtnRecordEvents() {
    $('.startRecord').on("click", function () {
        $(this).css("display", "none");
        $('.stopRecord').css("display", "block");
        recordStart();
    });
    $('.stopRecord').on("click", function () {
        $(this).css("display", "none");
        $('.startRecord').css("display", "block");
        timerEnd();
    } );
}

function timerUpdate() {

    second++;

    timerOnChange();

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
}

function timerEnd() {
    clearTimeout(setTimeoutTimer);
    recordEnd();
    second = 0;
}


function recordStart() {
    isRecording = true;
    timerUpdate();
   //console.log("record started");
}

function recordEnd() {
    recordingOnAction(-1, g_actionType.recordEnd);
    isRecording = false;
    recordBarReset();
    allVideoPause();
   //console.log("record end");
    
    $('.mechanicLb').fadeIn();

    OnRecordEnd();

    GATracker('muckbox-record-end');
}








//function defineRecordActionTypes() {
//    g_actionType = { add: 1, remove: 2, muteOff: 3, muteOn: 4, recordEnd: 5 }
//}
function recordingOnAction(videoIndex, actionType, sampleGroup, sampleNo) {
    var gameDataItem = {
        videoIndex: videoIndex,
        second: second,
        actionType: actionType
    }

    if (sampleNo) {
        gameDataItem.sampleGroup = sampleGroup;
        gameDataItem.sampleNo = sampleNo;
    }

    g_recordData.push(gameDataItem);

}

