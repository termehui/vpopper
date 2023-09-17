import { reactive } from "vue";
import { PopperOptions } from "./types";

/**
 * Default popper options
 */
export const GlobalOptions = reactive<PopperOptions>({
    enterAnimation: {
        top: {
            translateY: [-20, 0],
            opacity: [0, 1],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
        left: {
            translateX: [-20, 0],
            opacity: [0, 1],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
        bottom: {
            translateY: [20, 0],
            opacity: [0, 1],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
        right: {
            translateX: [20, 0],
            opacity: [0, 1],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
    },
    leaveAnimation: {
        top: {
            translateY: [0, -20],
            opacity: [1, 0],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
        left: {
            translateX: [0, -20],
            opacity: [1, 0],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
        bottom: {
            translateY: [0, 20],
            opacity: [1, 0],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
        right: {
            translateX: [0, 20],
            opacity: [1, 0],
            easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
            duration: 200,
        },
    },
});

/**
 * set global popper options
 * @param option new options
 */
export function setGlobalOptions(option: PopperOptions): void {
    const res = mergeOptions(GlobalOptions, option);
    GlobalOptions.enterAnimation = res.enterAnimation;
    GlobalOptions.leaveAnimation = res.leaveAnimation;
}

/**
 * merge multiple popper options
 * ignore undefined value
 * latest option value is selected
 *
 * @param options options list to merge
 * @returns merged options
 */
export function mergeOptions(...options: PopperOptions[]): PopperOptions {
    const res: PopperOptions = {};
    for (const option of options) {
        if (option.enterAnimation) {
            res.enterAnimation = option.enterAnimation;
        }
        if (option.leaveAnimation) {
            res.leaveAnimation = option.leaveAnimation;
        }
    }
    return res;
}
