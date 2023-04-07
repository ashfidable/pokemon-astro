import Swup from "swup";
import SwupPreloadPlugin from '@swup/preload-plugin';

export const swup = new Swup({
    animationSelector: '[class*="swup-transition-"]',
    animateHistoryBrowsing: true,
    plugins: [new SwupPreloadPlugin()]
})