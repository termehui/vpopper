<template>
    <div class="layout">
        <div class="content">
            <div class="wrapper">
                <div class="container">
                    <h1>Popper</h1>
                    <p>PopperJs powered popup for vue 3.</p>
                    <Hover />
                    <Click />
                    <Focus />
                    <Manual />
                    <Click />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Hover from "./Hover.vue";
import Click from "./Click.vue";
import Focus from "./Focus.vue";
import Manual from "./Manual.vue";
export default defineComponent({
    components: { Hover, Click, Focus, Manual },
});
</script>

<style lang="scss">
@use "@termehui/termeh/termeh.scss" as T;
@use "var";
@use "@termehui/termeh/styles.scss";
@use "@termehui/termeh/layout/layout.scss";
@use "@termehui/termeh/layout/container.scss";
@use "@termehui/termeh/layout/content.scss";
@use "@termehui/termeh/layout/grid.scss";
@use "@termehui/termeh/layout/gaper.scss";
@use "@termehui/termeh/components/button.scss";
@use "@termehui/termeh/components/header.scss";
@use "../src/termeh.scss";

html,
body,
#app {
    width: 100%;
    height: 100%;
}

#app {
    margin: 0;
    padding: 1rem;
}
section {
    display: block;
    padding: 1rem;
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
}
code {
    white-space: pre;
    margin-bottom: 1rem;
}

h3 {
    color: T.variant("primary", "readable");
}
</style>
