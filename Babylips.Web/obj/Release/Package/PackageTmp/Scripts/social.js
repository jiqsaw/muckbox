function shortenUrl(longUrl) {

    var apiPath = 'https://www.googleapis.com/urlshortener/v1/url';

    //clear-coyote-795

    //var postData = { longUrl: longUrl };
    //$.ajax({
    //    url: apiPath,
    //    type: "POST",
    //    data: postData,
    //    dataType: 'json',
    //    success: function (response) {

    //        var shortUrl = response.id;

    //    },
    //    error: function (response) {

           
    //    }
    //});

}

// Facebook Share
function fbShareMyMusic(shareUrl) {
    var width = 575,
        height = 400,
        left = ($(window).width() - width) / 2,
        top = ($(window).height() - height) / 2,
        url = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl,
        opts = 'status=1' +
                 ',width=' + width +
                 ',height=' + height +
                 ',top=' + top +
                 ',left=' + left;

    window.open(url, 'facebook', opts);
}

function fbShareMusic(shareLink, musicTitle)
{
    FB.ui(
        {
            method: 'feed',
            name:    'Kendi Müziğimi Yaptım!',
            link:    shareLink,
            picture: 'http://babylips.maybelline.com.tr/Assets/img/470x247.jpg',
            caption: 'babylips.maybelline.com.tr',
            description: 'Maybelline Baby Lips Muckbox ile kendi müziğimi yaptım. Adı: ' + musicTitle + '. Dinlemek için tıkla; hatta sen de kendi müziğini yap!'
        },
        function(response)
        {
            if (response && response.post_id)
            {
               
 
            }
            else
            {
                
            }
        }
    );
}

// Fabook Invite Friend
function Invite() {
    FB.ui({
        method: 'apprequests',
        message: 'Arkadaşın Muckbox ile kendi müziğini oluşturdu. Tıkla, sen de oluştur!',
    });
}

// Twitter Share
function twShareMyMusic(shareUrl, shareText) {

    var width = 575,
        height = 400,
        left = ($(window).width() - width) / 2,
        top = ($(window).height() - height) / 2,
        url = "https://twitter.com/intent/tweet?text=" + shareText + "&url=" + shareUrl,
        opts = 'status=1' +
                 ',width=' + width +
                 ',height=' + height +
                 ',top=' + top +
                 ',left=' + left;
    window.open(encodeURI(url), 'twitter', opts);
}