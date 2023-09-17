<template>
    <section>
        <h3>Show On Click</h3>
        <popper
            tag="button"
            class="button is-primary"
            trigger="click"
            :closable="true"
            :config="{ placement: 'top-start' }"
            :onAction="longTask"
            @show="logIt('shown')"
            @hide="logIt('hide')"
            @initialized="logIt"
        >
            Click to show
            <template #popup>
                <popup
                    class="is-primary"
                    :closable="false"
                    #="{ close, action }"
                >
                    <div class="header is-primary is-marginless">
                        <h4>Greeting!</h4>
                    </div>
                    <div class="attachment">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Sint tempore blanditiis dolor molestiae nihil
                        harum.
                    </div>
                    <div class="separator"></div>
                    <div class="attachment is-footer">
                        <div class="gaper is-auto">
                            <div class="filler"></div>
                            <button
                                class="button is-simple is-primary"
                                @click.stop="action('long')"
                            >
                                LongTask
                            </button>
                            <button class="button is-error" @click.stop="close">
                                Close
                            </button>
                        </div>
                    </div>
                </popup>
            </template>
        </popper>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    setup() {
        function longTask() {
            var promise = new Promise<boolean>(function (resolve, _) {
                window.setTimeout(function () {
                    resolve(true);
                }, 5000);
            });
            return promise;
        }
        function logIt(v) {
            console.log(v);
        }
        return { longTask, logIt };
    },
});
</script>
