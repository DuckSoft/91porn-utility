import {Widget} from "./Widget";
import {LoggedInWidget} from "./LoggedInWidget";
import {getCookieItem} from "../util/CookieHelper";

export class VipWidget implements Widget {
    static isVip(): boolean {
        if (!LoggedInWidget.isLoggedIn()) {
            return false;
        }

        return getCookieItem("level") !== '1';
    }

    static setVip(toVip: boolean) {
        if (!LoggedInWidget.isLoggedIn()) {
            return;
        }

        if (toVip) {
            document.cookie = 'level=5; user_level=5; ';
        } else {
            document.cookie = 'level=1; user_level=1; ';
        }
    }

    render() {
        let loggedIn = LoggedInWidget.isLoggedIn();
        let isVipText = VipWidget.isVip() && "已开启" || "未开启";

        if (!loggedIn) {
            return `<span>尚未登陆</span>`
        } else {
            return `<button id="toggleVip">VIP：${isVipText}</button>`
        }
    }

    mount() {
        document.querySelector("#toggleVip").addEventListener("click", () => {
            if (!VipWidget.isVip()) {
                VipWidget.setVip(true);
            } else if (confirm("您当前处于 VIP 用户身份。确定要解除 VIP 吗？")) {
                VipWidget.setVip(false);
            } else {
                return;
            }
            history.go(0);
        })
    }
}
