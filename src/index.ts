import { App } from "vue";
import Popper from "./Popper.vue";
import Popup from "./Popup.vue";
import Tooltip from "./Tooltip.vue";
import { createDefaultPopper } from "./popperJs";
import "./style.scss";

/**
 * Create default popperJs instance by default
 */
createDefaultPopper();

/**
 * install popper plugin
 */
export default {
    install: (app: App): void => {
        app.component("popper", Popper);
        app.component("popup", Popup);
        app.component("tooltip", Tooltip);
    },
};

export { Popper, Popup, Tooltip };
export { setGlobalOptions } from "./options";
export {
    createDefaultPopper,
    registerCreator,
    createFunction,
} from "./popperJs";
export type {
    ActionHandler,
    MinimalFunction,
    Placement,
    PopperOptions,
    CloseHandler,
    PopperAnimation,
    PopperFullAnimation,
} from "./types";
export { usePopup } from "./usePopup";
