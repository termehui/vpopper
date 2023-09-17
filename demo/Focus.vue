<template>
    <section>
        <h3>Show On Focus</h3>
        <popper
            tag="div"
            trigger="focus"
            :config="{ placement: 'auto' }"
            style="width: 15rem; border: 1px solid #dddddd; padding: 1rem; border-radius: 3px;"
        >
            <div class="gaper is-auto is-stacked">
                <input type="text" value="first input" />
                <input type="text" value="second input" />
                <input type="text" value="third input" />
            </div>
            <template #popup>
                <popup :closable="false">
                    <div class="attachment">
                        This popup shown when any input got focus
                    </div>
                    <div class="separator"></div>
                    <div class="attachment is-secondary is-footer">Some note ...</div>
                </popup>
            </template>
        </popper>
    </section>
</template>
