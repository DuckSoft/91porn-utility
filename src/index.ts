// ==UserScript==
// @name         91Porn Utility
// @namespace    http://github.com/DuckSoft/
// @version      1.0
// @description  Not only the addresses!
// @author       DuckSoft
// @match        *://*.91porn.com/*
// @match        *://91porn.com/*
// @grant        none
// ==/UserScript==

import {WidgetInjector} from "./util/WidgetInjector";
import {LoggedInWidget} from "./widget/LoggedInWidget";
import {VipWidget} from "./widget/VipWidget";
import {HDVideoWidget} from "./widget/HDVideoWidget";
import {VideoAddressWidget} from "./widget/VideoAddressWidget";
import {WatchCountWidget} from "./widget/WatchCountWidget";
import {removeAds} from "./util/SanityHelper";

let trigger = () => {
    let injector = new WidgetInjector([
        new LoggedInWidget(),
        new VipWidget(),
        new HDVideoWidget(),
        new VideoAddressWidget(),
        new WatchCountWidget(),
    ], "ducksoft_helper");

    injector.inject(document.body);
};

window.addEventListener("load", trigger, false);
window.setTimeout(removeAds);

document.body.addEventListener("dblclick", () => {
    removeAds();
    trigger();
});
