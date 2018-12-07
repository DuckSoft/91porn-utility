import {Widget} from "./Widget";

export class VideoAddressWidget implements Widget {
  static fetchVideoElement(): HTMLSourceElement | null {
    return document.querySelector("source");
  }

  static fetchVideoAddress(): string | null {
    let source = this.fetchVideoElement();
    if (!source) {
      return null;
    }
    return source.src;
  }

  render() {
    let hasVideo = !!VideoAddressWidget.fetchVideoElement();
    let disabled = hasVideo || 'disabled="disabled"';
    let statusText = hasVideo && "直接下载" || "无法下载";

    return `<button id="fetch_address" ${disabled}>${statusText}</button>`;
  }

  mount() {
    document.getElementById("fetch_address").addEventListener("click", () => {
      console.log("Clicked");
      let videoAddress = VideoAddressWidget.fetchVideoAddress();
      if (videoAddress) {
        console.log(videoAddress);
        window.location.href = videoAddress;
      } else {
        alert("无法获取视频地址！")
      }
    })
  }
}
