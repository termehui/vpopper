<template>
    <div
        class="v-tooltip"
        :class="{ 'is-loading': loading }"
        @click.stop="dismiss"
    >
        <slot :action="action" :close="close" :loading="loading" />
        <div class="arrow" data-popper-arrow></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePopup } from "./usePopup";
export default defineComponent({
    name: "vPopup",
    emits: ["show", "hide"],
    props: {
        closable: { type: Boolean, default: true },
    },
    setup(props, { emit }) {
        const { close, action, loading, onShow, onHide } = usePopup();
        onShow(() => emit("show"));
        onHide((mode: "blur" | "click" | "action") => emit("hide", mode));
        function dismiss() {
            props.closable && close("click");
        }
        return { loading, action, close, dismiss };
    },
});
</script>
