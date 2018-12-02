// ==UserScript==
// @name         91Porn Video Address Extractor
// @namespace    http://github.com/DuckSoft/
// @version      1.0
// @description  Not only the addresses!
// @author       DuckSoft
// @match        *://*.91porn.com/view_video.php?*
// @match        *://*.91porn.com/view_video_hd.php?*
// @match        *://91porn.com/view_video.php?*
// @match        *://91porn.com/view_video_hd.php?*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    let getCookieItem = (key) => ('; ' + document.cookie).split('; ' + key + '=').pop().split(';').shift();

    let isLoggedIn = () => document.querySelector("div#head>h3>a").href.endsWith("my_profile.php");
    let ui_isLoggedIn = `<span id="logged_in">登陆状态：${isLoggedIn() && "已登录" || "未登录"}</span>`;
    let inject_isLoggedIn = () => {
    };

    let isVip = () => getCookieItem("level") !== '1';
    let setVip = () => {
        document.cookie = 'level=5; user_level=5; '
    };
    let ui_isVip = `<button id="setVip">VIP：${isVip() && "已开启" || "未开启"}</button>`;
    let inject_isVip = () => {
        document.querySelector("#setVip").addEventListener("click", () => {
            if (!isVip()) {
                setVip();
                history.go(0);
            } else {
                alert("你已经是VIP了！");
            }
        })
    };

    let getWatchTimes = () => parseInt(getCookieItem("watch_times"));
    let resetWatchTimes = () => {
        document.cookie = 'watch_times=0; '
    };
    let ui_watchTimes = `<button id="watch_time">观看次数：${getWatchTimes()}</button>`;
    let inject_watchTimes = () => {
        document.querySelector("#watch_time").addEventListener("click", () => {
            resetWatchTimes();
            history.go(0);
        })
    };

    let getVideoAddress = () => {
        let source = document.querySelector("source");
        if (source) return source.src;
    };
    let ui_videoAddress = `<button id="get-video">直接下载</button>`;
    let inject_videoAddress = () => {
        document.querySelector("#get-video").addEventListener("click", () => {
            let address = getVideoAddress();
            if (address) {
                window.location.href = address;
            } else {
                alert("获取不到地址！");
            }
        })
    };

    let detectHdVideo = () => {
        let img = document.querySelector("div.videoplayer>img");
        if (img) {
            return img.src.endsWith("hd.png");
        } else {
            return false;
        }
    };

    let fetchHdVideoPageUrl = () => document.querySelector("div.videoplayer>a").href;
    let gotoHdVideo = () => {
        window.location.href = fetchHdVideoPageUrl()
    };
    let ui_hdVideo = (() => {
        if (detectHdVideo()) {
            return `<button id="gohd">转到高清</button>`
        } else {
            return `<span>暂无高清</span>`
        }
    })();
    let inject_hdVideo = () => {
        if (detectHdVideo()) {
            document.querySelector("#gohd").addEventListener("click", () => {
                if (detectHdVideo()) {
                    gotoHdVideo();
                }
            })
        }
    };

    let ui = (() => `<div class="i_love_91porn">${
        [ui_isLoggedIn, ui_isVip, ui_hdVideo, ui_videoAddress, ui_watchTimes].join(" | ")
        }</div>`)();

    let registerUiEvents = () => {
        inject_isLoggedIn();
        inject_isVip();
        inject_hdVideo();
        inject_videoAddress();
        inject_watchTimes();
    };

    let detectUi = () => !!document.querySelector(".i_love_91porn");
    let injectUi = () => {
        if (!detectUi()) {
            document.body.insertAdjacentHTML("afterbegin", ui);
            registerUiEvents();
        }
    };

    let runAfterLoaded = (f) => {
        if (document.addEventListener) window.addEventListener("load", f, false);
        else if (window.attachEvent) window.attachEvent("onload", f);
    };

    runAfterLoaded(injectUi());
})();
