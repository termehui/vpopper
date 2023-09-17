<template>
    <section>
        <h3>Show On Hover (with tooltip content)</h3>
        <popper tag="button" class="button is-primary" trigger="hover">
            Hover me
            <template #popup>
                <tooltip :closable="true">
                    This popup shown on hover
                </tooltip>
            </template>
        </popper>
    </section>
</template>
