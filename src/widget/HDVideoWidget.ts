import {Widget} from "./Widget";

export class HDVideoWidget implements Widget {
    static isAlreadyHD() {
        return window.location.href.includes("view_video_hd.php");
    }

    static hasHD(): boolean {
        let img: HTMLImageElement | null = document.querySelector("div.videoplayer>img");
        return img && img.src.endsWith("hd.png");
    }

    static fetchHDVideoURL(): string | null {
        let anchor: HTMLAnchorElement | null = document.querySelector("div.videoplayer>a");
        return anchor.href || null;
    }

    render() {
        let isHD = HDVideoWidget.isAlreadyHD();
        let hasHD = HDVideoWidget.hasHD();

        let disabled: string = (isHD || !(isHD || hasHD)) ? `disabled="disabled"` : "";
        let statusText: string = isHD ? "已为高清" : !isHD && hasHD ? "转到高清" : "暂无高清";
        return `<button id="toggleHD" disabled=${disabled}>${statusText}</button>`;
    }

    mount() {
        document.querySelector("#toggleHD").addEventListener("click", () => {
            if (HDVideoWidget.hasHD()) {
                let hdURL = HDVideoWidget.fetchHDVideoURL();
                if (hdURL) {
                    window.location.href = hdURL
                } else {
                    alert("无法获取视频地址！")
                }
            }
        });
    }
}
