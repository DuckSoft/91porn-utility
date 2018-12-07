export function removeAds() {
    document.querySelectorAll("iframe").forEach(e => {
        if (e.src.includes("fans.91p20.space/fans/")) {
            e.replaceWith("广告已移除owo")
        }
    });
}
