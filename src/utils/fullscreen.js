export const isFullscreen = () => !!document.fullscreenElement;

export const toggleFullscreen = () => {
    if (!isFullscreen()) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn("Fullscreen request failed:", err);
        });
    } else {
        document.exitFullscreen().catch(err => {
            console.warn("Exit fullscreen failed:", err);
        });
    }
};
