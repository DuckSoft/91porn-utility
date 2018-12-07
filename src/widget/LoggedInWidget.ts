import {Widget} from "./Widget";

export class LoggedInWidget implements Widget {
  static isLoggedIn(): boolean {
    let login_link = document.querySelector("div#head>h3>a");

    if (login_link instanceof HTMLAnchorElement) {
      return login_link.href.endsWith("my_profile.php");
    } else {
      return false;
    }
  }

  render() {
    let statusText = LoggedInWidget.isLoggedIn() ? "已登陆" : "尚未登陆";
    return `<span id="logged_in">登陆状态：${statusText}</span>`;
  }

  mount() {
  }
}
