import { AnimeParams } from "animejs";

/**
 * Simple function
 */
export type MinimalFunction = () => void;

/**
 * Action handler callback
 */
export type ActionHandler = (key: string, data?: unknown) => Promise<boolean>;

/**
 * Close handler callback
 */
export type CloseHandler = (mode: "blur" | "click" | "action") => void;

/**
 * Placement types
 */
export type Placement = "top" | "left" | "right" | "bottom";

/**
 * Popup full animation
 */
export interface PopperFullAnimation {
    top: AnimeParams;
    left: AnimeParams;
    bottom: AnimeParams;
    right: AnimeParams;
}

/**
 * Popup Animation
 */
export type PopperAnimation = PopperFullAnimation | AnimeParams | undefined;

// Popup options interface
export interface PopperOptions {
    enterAnimation?: PopperAnimation;
    leaveAnimation?: PopperAnimation;
}
