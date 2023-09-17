import { inject, Ref, ref } from "vue";
import { CloseHandler, MinimalFunction } from "./types";

export function usePopup() {
    // Stats
    const fallbackCB = () =>
        console.error("Use popup plugin inside popper component!");

    // injects
    const close = inject<CloseHandler>("v-popper-close", fallbackCB);
    const action = inject<(key: string, data?: unknown) => void>(
        "v-popper-action",
        fallbackCB
    );
    const loading = inject<Ref<boolean>>("v-popper-loading", ref(false));
    const onShow = inject<(cb: MinimalFunction) => void>(
        "v-popper-on-show",
        fallbackCB
    );
    const onHide = inject<(cb: CloseHandler) => void>(
        "v-popper-on-hide",
        fallbackCB
    );

    return { close, action, loading, onShow, onHide };
}
