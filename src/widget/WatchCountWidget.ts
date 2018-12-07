import {Widget} from "./Widget";
import {getCookieItem, setCookieItem} from "../util/CookieHelper";

export class WatchCountWidget implements Widget {
  static get watchTime() {
    return getCookieItem('watch_times');
  }

  static resetWatchTimes() {
    setCookieItem("watch_times", String(0));
  }

  render() {
    return `<button id="watchCount">观看次数：${WatchCountWidget.watchTime}</button>`
  }

  mount() {
    document.getElementById("watchCount").addEventListener("click", () => {
      WatchCountWidget.resetWatchTimes();
      history.go(0);
    })
  }
}
