export function removeAds() {
  // 清除 iframe 广告，但不破坏页面结构
  document.querySelectorAll("iframe").forEach(e => {
    if (e.src.includes("fans.91p20.space/fans/")) {
      e.replaceWith("广告已移除owo")
    }
  });

  // 清除顶栏浮动广告
  document.querySelectorAll("#topbar").forEach(e => e.remove());
}
