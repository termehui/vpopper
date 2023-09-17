import { Placement as PopperPlc } from "@popperjs/core";
import { AnimeParams } from "animejs";
import { Placement, PopperAnimation, PopperFullAnimation } from "./types";

/**
 * check if animation object is of type PopupFullAnimation
 * @param obj popup animation object
 */
function isPopperFullAnimation(
    obj: PopperAnimation
): obj is PopperFullAnimation {
    return (
        obj &&
        obj.top &&
        typeof obj.top === "object" &&
        obj.left &&
        typeof obj.left === "object" &&
        obj.bottom &&
        typeof obj.bottom === "object" &&
        obj.right &&
        typeof obj.right === "object"
    );
}

/**
 * get popperJs placement and return vPopper placement
 * for auto and default state returns bottom
 *
 * @param placement popperJs placement
 */
export function resolvePlacement(placement: PopperPlc): Placement {
    if (placement.includes("top")) return "top";
    if (placement.includes("left")) return "left";
    if (placement.includes("right")) return "right";
    return "bottom";
}

/**
 * get current animation based on placement
 * undefined animation skipped
 *
 * @param placement popper placement
 * @param animations animations list to search for animation state
 */
export function resolveAnimation(
    placement: PopperPlc,
    ...animations: PopperAnimation[]
): AnimeParams {
    let animation: PopperAnimation = {};
    for (const anim of animations) {
        if (anim) {
            animation = anim;
        }
    }

    if (isPopperFullAnimation(animation)) {
        return animation[resolvePlacement(placement)];
    }

    return animation || {};
}
