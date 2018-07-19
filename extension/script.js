// replace original playDashMovie by new one
// copied from PlayMovie.js
playDashMovie = function (defaultPlay, contentId, playlistId, playlistIndex, loginParams) {
    var width = 0;
    var height = 0;

    // パラメータ設定
    var url = "/animestore/sc_pc?";
    var initParamFlag = true;
    var partId = contentId;

    if (contentId != null && contentId != "") {
        // contentIdが10桁の場合話IDを切り出す
        if (contentId.length == 10) {
            partId = contentId.toString().substr(0,8);
        }
        url += "partId=" + partId;
        initParamFlag = false;
    }
    // playlistIdが設定されていた場合プレイリスト再生
    if (playlistId != null && playlistId != "") {
        if (!initParamFlag) {
            url += "&";
        }
        url += "playlistId=" + playlistId;
        if (playlistIndex != null && playlistIndex != "") {
            url += "&playlistIndex=" + playlistIndex;
        }
    }

    // 途中から再生用再生開始位置(PCでフリーページから途中から再生の場合、作品indexの初期処理(contentIndex_pc.js)で設定済み)
    // 対象の話IDと一致した場合再生開始位置を更新
    if (paramPartId != null && paramPartId == partId && paramStartPosition != null) {
        startPosition = paramStartPosition;
    }

    // 途中から再生用再生開始位置が設定されている場合
    if (startPosition != null && startPosition != "") {
        url += "&startPosition=" + startPosition;
    }

    // 画面サイズ設定
    // Cookieから取得
    var widthCookie = getCookieParam('PC030011_window_width');
    if (widthCookie != "") {
        width = parseInt(widthCookie, 10);
    }
    var heightCookie = getCookieParam('PC030011_window_height');
    if (heightCookie != "") {
        height = parseInt(heightCookie, 10);
    }

    // Cookieで取得できなかった場合
    if (width <= 0 || height <= 0) {
        // 「HD」の場合
        if (defaultPlay == "4") {
            width = 1280;
            height = 720;
        } else {
            // HD以外(=SD)は854×486
            defaultPlay = "3";
            width = 854;
            height = 486;
        }
    }

    // 要ログインかを判定
    if (!loginParams) {
        window.location.href = url;
    } else {
        // 画面サイズをCookieに保存
        window.COMMON.setCookie('PC030011_window_width', width, "/");
        window.COMMON.setCookie('PC030011_window_height', height, "/");

        // 有料話で非会員の場合はログイン画面を表示する
        loginParams.nextUrlC = url;
        window.popupLogin(loginParams, null, true); // forcePopup=trueでポップアップする
    }

    // 途中から再生用再生開始位置を初期化
    startPosition = null;
    paramStartPosition = null;
}
