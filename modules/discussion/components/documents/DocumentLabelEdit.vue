<template>
    <div v-click-outside="resetEdit" class="editable">
        <div class="editable-input-wrap">
            <input
                ref="editable-input"
                :value="base_value"
                placeholder="Введите текст"
                class="editable-input"
                @input="input"
            />
        </div>
        <div class="editable-actions">
            <span class="editable-action" @click.stop="sendDescr">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="11px"
                    height="11px"
                >
                    <path
                        fill-rule="evenodd"
                        fill="rgb(61, 129, 143)"
                        d="M11.000,2.306 L3.249,10.997 L2.748,10.435 L2.745,10.439 L-0.001,7.360 L0.445,6.860 L-0.001,6.360 L1.143,5.077 L3.224,7.410 L9.834,-0.003 L11.000,1.305 L10.554,1.805 L11.000,2.306 Z"
                    />
                </svg>
            </span>
            <span class="editable-action" @click.stop="resetEdit">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="11px"
                    height="11px"
                >
                    <path
                        fill-rule="evenodd"
                        fill="rgb(190, 45, 52)"
                        d="M1.773,0.303 L10.671,9.201 C11.080,9.611 11.080,10.274 10.671,10.684 C10.262,11.094 9.598,11.094 9.188,10.684 L0.291,1.786 C-0.119,1.378 -0.119,0.713 0.291,0.303 C0.700,-0.106 1.364,-0.106 1.773,0.303 Z"
                    />
                    <path
                        fill-rule="evenodd"
                        fill="rgb(190, 45, 52)"
                        d="M10.671,0.303 C11.080,0.713 11.080,1.378 10.671,1.786 L1.773,10.684 C1.364,11.094 0.700,11.094 0.291,10.684 C-0.119,10.274 -0.119,9.611 0.291,9.201 L9.188,0.303 C9.598,-0.106 10.262,-0.106 10.671,0.303 Z"
                    />
                </svg>
            </span>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
    directives: {
        clickOutside: vClickOutside.directive,
    },
    props: {
        value: {},
        id: {},
    },
    data() {
        return {
            base_value: this.value,
        };
    },
    mounted() {
        this.$refs['editable-input'].focus();
    },
    methods: {
        input(e) {
            this.base_value = e.target.value.trim();
        },
        resetEdit() {
            this.$emit('input', this.value);
            this.$emit('edit-close');
        },
        sendDescr() {
            this.$axios
                .put(`/deals/documents/${this.id}`, {
                    description: this.base_value,
                })
                .then(() => {
                    this.$emit('input', this.base_value);
                    this.$emit('edit-close');
                });
        },
    },
};
</script>

<style lang="sass" scoped>
.editable
    flex: 1
    display: flex
    align-items: center
.editable-input-wrap
    flex: 1 0 70%
    display: flex
.editable-input
    width: 100%
    max-width: 100%
    border: 1px solid #c7ccd6
    border-radius: 3px
    color: #505050
    font-size: 13px
    font-weight: 400
    padding: 2px 5px
    &:focus
        border-color: #3b5998
.editable-actions
    display: flex
    align-items: center
    margin-left: 3px
.editable-action
    display: flex
    align-items: center
    justify-content: center
    background: #eef1f6
    border-radius: 3px
    padding: 3px
.editable-action + .editable-action
    margin-left: 3px
</style>
