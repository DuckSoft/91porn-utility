export function removeAds() {
  // 清除 iframe 广告，但不破坏页面结构
  document.querySelectorAll("iframe").forEach(e => {
    // 清除各种组件广告
    if (e.src.includes("fans.91p20.space/fans/")) {
      e.replaceWith("广告已移除owo")
    }

    // 清除高清视频广告
    if (e.src.includes("fans.bestvogue.com/fans/")) {
      e.replaceWith("广告已移除quq")
    }
  });

  // 清除顶栏浮动广告
  document.querySelectorAll("#topbar").forEach(e => e.remove());
}
