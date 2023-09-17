<template>
    <section>
        <h3>Show/Hide Manualy (with tooltip content)</h3>
        <popper
            trigger="manualy"
            :closable="false"
            :config="{ placement: 'auto' }"
            style="display: inline-block;"
        >
            <template #default="{open, close}">
                <div>
                    <div class="gaper is-auto">
                        <button class="button is-error" @click.stop="close">
                            Close
                        </button>
                        <button class="button is-success" @click.stop="open">
                            Open
                        </button>
                    </div>
                </div>
            </template>
            <template #popup>
                <tooltip class="is-primary is-mini-gaped" :closable="false">
                    This popup shown manualy
                </tooltip>
            </template>
        </popper>
    </section>
</template>
