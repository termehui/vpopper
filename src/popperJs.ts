import {
    popperOffsets,
    preventOverflow,
    arrow,
    flip,
    computeStyles,
    applyStyles,
    eventListeners,
    popperGenerator,
} from "@popperjs/core";

// default create function
let instance = popperGenerator();

/**
 * register popperjs creator instance
 * @param instance createFunction instance
 */
export function registerCreator(ins = popperGenerator()) {
    instance = ins;
}

/**
 * get default create function
 */
export function createFunction() {
    return instance;
}

/**
 * Create default popperJs instance
 * this instance includes this modifiers:
 *  popperOffsets
 *  preventOverflow
 *  arrow
 *  flip
 *  computeStyles
 *  applyStyles
 *  eventListeners
 */
export function createDefaultPopper(): void {
    registerCreator(
        popperGenerator({
            defaultOptions: {
                modifiers: [
                    {
                        name: "arrow",
                        options: {
                            padding: 7,
                        },
                    },
                ],
            },
            defaultModifiers: [
                popperOffsets,
                preventOverflow,
                arrow,
                flip,
                computeStyles,
                applyStyles,
                eventListeners,
            ],
        })
    );
}
