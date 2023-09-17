<script lang="ts">
import {
    computed,
    defineComponent,
    h,
    onMounted,
    onUnmounted,
    provide,
    ref,
    toRaw,
    withModifiers,
} from "vue";
import { Options } from "@popperjs/core";
import { CloseHandler, MinimalFunction, PopperOptions } from "./types";
import { GlobalOptions, mergeOptions } from "./options";
import { createFunction } from "./popperJs";
import anime, { AnimeInstance } from "animejs";
import { resolveAnimation } from "./animation";
export default defineComponent({
    name: "vPopper",
    inheritAttrs: false,
    emits: ["initialized", "show", "hide"],
    props: {
        tag: String,
        trigger: String as () => "click" | "focus" | "hover" | "manualy",
        onAction: Function,
        closable: {
            type: Boolean,
            default: true,
        },
        options: Object as () => PopperOptions,
        config: Object as () => Options,
    },
    setup(props, { attrs, slots, emit }) {
        // Stats and refs
        const target = ref<HTMLElement>();
        const popup = ref<HTMLElement>();
        const animWrapper = ref<HTMLElement>();
        const shown = ref(false);
        const loading = ref(false);
        const trigger = computed(() => props.trigger || "hover");
        const option = computed(() =>
            mergeOptions(
                toRaw(GlobalOptions) as PopperOptions,
                props.options || {}
            )
        );

        // Animations
        let showAnim: AnimeInstance;
        let hideAnim: AnimeInstance;
        onMounted(() => {
            if (!target.value || !popup.value || !animWrapper.value) return;
            const instance = createFunction()(
                target.value,
                popup.value,
                toRaw(props.config || {})
            );
            emit("initialized", instance);
            showAnim = anime({
                ...resolveAnimation(
                    instance.state.options.placement,
                    option.value.enterAnimation
                ),
                ...{
                    targets: animWrapper.value,
                    autoplay: false,
                },
            });
            hideAnim = anime({
                ...resolveAnimation(
                    instance.state.options.placement,
                    option.value.leaveAnimation
                ),
                ...{
                    targets: animWrapper.value,
                    autoplay: false,
                },
            });
        });

        // Internals
        let hiding = false;
        let showCallback: MinimalFunction;
        let hideCallback: CloseHandler;
        function doShow() {
            if (!shown.value) {
                shown.value = true;
                hiding = false;
                hideAnim?.pause();
                if (showAnim) {
                    showAnim?.restart();
                    showAnim.finished.then(() => {
                        showCallback && showCallback();
                        emit("show");
                    });
                } else {
                    showCallback && showCallback();
                    emit("show");
                }
            }
        }
        function doHide(mode: "blur" | "click" | "action") {
            if (shown.value && !hiding) {
                hiding = true;
                showAnim?.pause();
                if (hideAnim) {
                    hideAnim.restart();
                    hideAnim.finished.then(() => {
                        shown.value = false;
                        hiding = false;
                        hideCallback && hideCallback(mode);
                        emit("hide", mode);
                    });
                } else {
                    shown.value = false;
                    hiding = false;
                    hideCallback && hideCallback(mode);
                    emit("hide", mode);
                }
            }
        }
        function doAction(key: string, data?: unknown): void {
            if (props.onAction) {
                loading.value = true;
                props
                    .onAction(key, data)
                    .then((res: boolean) => {
                        loading.value = false;
                        if (res) {
                            doHide("action");
                        }
                    })
                    .catch(() => {
                        loading.value = false;
                    });
            }
        }

        // Provide for child components
        provide("v-popper-close", doHide);
        provide("v-popper-action", doAction);
        provide("v-popper-loading", loading);
        provide(
            "v-popper-on-show",
            (cb: MinimalFunction) => (showCallback = cb)
        );
        provide("v-popper-on-hide", (cb: CloseHandler) => (hideCallback = cb));

        // Handle Functionalities
        const onTargetFocus = () => {
            setTimeout(() => {
                if (target.value && trigger.value === "focus") {
                    if (target.value.contains(document.activeElement)) {
                        doShow();
                    } else {
                        doHide("blur");
                    }
                }
            });
        };
        const onOutsideClick = (e: MouseEvent) => {
            if (target.value && e.target) {
                if (target.value.contains(e.target as HTMLElement)) {
                    trigger.value === "click" && doShow();
                } else {
                    props.closable && doHide("blur");
                }
            }
        };
        const onTargetMouseLeave = () =>
            trigger.value === "hover" && doHide("blur");

        onMounted(() => {
            if (target.value) {
                document.addEventListener("focusin", onTargetFocus);
                document.addEventListener("focusout", onTargetFocus);
                document.addEventListener("click", onOutsideClick);
                document.addEventListener("mousemove", onTargetMouseLeave);
            }
        });

        onUnmounted(() => {
            document.removeEventListener("focusin", onTargetFocus);
            document.removeEventListener("focusout", onTargetFocus);
            document.removeEventListener("click", onOutsideClick);
            document.removeEventListener("mousemove", onTargetMouseLeave);
        });

        // Render
        return () => [
            h(
                props.tag || "span",
                {
                    ref: target,
                    ...attrs,
                    onMousemove: withModifiers(
                        () => trigger.value === "hover" && doShow(),
                        ["stop"]
                    ),
                    // onClick: withModifiers(
                    //     () => trigger.value === "click" && doShow(),
                    //     ["stop"]
                    // ),
                },
                slots.default
                    ? slots.default({
                          open: doShow,
                          close: doHide,
                          action: doAction,
                          loading: loading,
                      })
                    : h("span", "Put Content here!")
            ),
            h(
                "div",
                {
                    ref: popup,
                    class: "v-popper-container",
                    style: { visibility: shown.value ? undefined : "hidden" },
                    onMousemove: withModifiers(() => ({}), ["stop"]),
                    onClick: withModifiers(() => ({}), ["stop"]),
                },
                h(
                    "div",
                    {
                        ref: animWrapper,
                    },
                    slots.popup
                        ? slots.popup()
                        : h("span", "put popup data in popup slot")
                )
            ),
        ];
    },
});
</script>
