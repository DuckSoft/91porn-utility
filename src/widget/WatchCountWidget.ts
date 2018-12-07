import {Widget} from "./Widget";
import {getCookieItem, setCookieItem} from "../util/CookieHelper";

export class WatchCountWidget implements Widget {
    static get watchTime() {
        return getCookieItem('watch_times');
    }

    static resetWatchTimes() {
        setCookieItem("watch_count", String(0));
    }

    render() {
        return `<button id="watch_count">观看次数：${WatchCountWidget.watchTime}</button>`
    }

    mount() {
        document.querySelector("#watch_count").addEventListener("click", () => {
            WatchCountWidget.resetWatchTimes();
            history.go(0);
        })
    }
}
