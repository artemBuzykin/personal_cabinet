<template>
    <input
        ref="phone"
        type="text"
        name="phone"
        class="input-style"
        placeholder="Ваш телефон"
        :value="initial_value"
        @input="input"
        @focus="focus"
        @blur="blur"
        @keydown="keyAction"
        @keyup="keyAction"
        @paste="paste"
    />
</template>

<script>
if (process.client) {
    // eslint-disable-next-line global-require
    require('@/utils/country-phone');
}
export default {
    props: ['value'],
    data() {
        return {
            initial_value: this.value,
            phoneRef: null,
            phoneValid: {
                ru: {
                    regexp: /^((\+7)+([0-9]){10})$/,
                    maxlength: 12,
                },
                ua: {
                    regexp: /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/,
                    maxlength: 14,
                },
            },
        };
    },
    watch: {
        value: {
            handler(val) {
                this.initial_value = val;
            },
        },
    },
    mounted() {
        this.phoneRef = this.$refs.phone;
        window.intlTelInput(this.phoneRef, {
            initialCountry: 'ru',
            nationalMode: false,
            onlyCountries: ['ru', 'ua', 'az', 'am', 'by', 'ge', 'kz', 'kg', 'md', 'tj', 'tm', 'uz'],
        });
    },
    methods: {
        input(e) {
            const { value } = e.target;
            this.initial_value = value;
            if (value !== null && (value.length === 0 || value.charAt(0) !== '+')) {
                this.initial_value = '+';
            }
            this.$emit('input', this.initial_value);
            setTimeout(() => {
                const codeCountry = this.phoneRef.nextSibling.querySelector('.iti__active').dataset
                    .countryCode;
                const selectCountry = this.phoneRef.nextSibling
                    .querySelector('.iti__active')
                    .getAttribute('aria-selected');
                const maxLength =
                    selectCountry !== undefined && this.phoneValid[codeCountry] !== undefined
                        ? this.phoneValid[codeCountry].maxlength
                        : 15;
                this.phoneRef.setAttribute('maxlength', maxLength);
            }, 150);
        },
        focus() {
            if (this.initial_value === null || this.initial_value.length === 0) {
                const activeCountry = this.phoneRef.nextSibling.querySelector('.iti__active');
                const activeDialCode = activeCountry.dataset.dialCode;
                this.initial_value = `+${activeDialCode}`;
                this.$emit('input', this.initial_value);
            }
            setTimeout(() => {
                this.phoneRef.selectionStart = this.phoneRef.selectionEnd = 10000;
            }, 1);
        },
        blur() {
            if (
                (this.initial_value !== null &&
                    this.initial_value.length === 1 &&
                    this.initial_value.charAt(0) === '+') ||
                (this.initial_value !== null &&
                    this.initial_value.startsWith('+7') &&
                    this.initial_value.length === 2)
            ) {
                this.initial_value = null;
                this.$emit('input', this.initial_value);
            }
        },
        keyAction(e) {
            const key = e.which;
            const disabledButtons = [8, 9, 86, 17, 82, 65, 67, 91, 13];
            if (
                !disabledButtons.includes(key) &&
                (key < 48 || key > 57) &&
                (key < 37 || key > 41) &&
                (key < 96 || key > 105)
            ) {
                e.preventDefault();
                return false;
            }
            if (key === 8 && this.initial_value.length === 1) {
                e.preventDefault();
                this.initial_value = '+';
                this.$emit('input', this.initial_value);
                return false;
            }
            this.initial_value = `+${this.initial_value.replace(/\D/g, '')}`;
            this.$emit('input', this.initial_value);
            return true;
        },
        paste() {
            this.phoneRef.removeAttribute('maxlength');
            this.initial_value = '+';
            setTimeout(() => {
                const text = this.initial_value;
                let pastePhone = text.replace(/\D/g, '');
                if (pastePhone.startsWith('8')) {
                    pastePhone = pastePhone.replace('8', '7');
                }
                this.initial_value = `+${pastePhone}`;
                this.$emit('input', this.initial_value);
            }, 0);
        },
    },
};
</script>

<style lang="sass">
@import '~/assets/sass/_intlTelInput.css';
.iti
    display: block
.iti__flag-container, .iti__selected-flag
    outline: none !important
.iti__country-list
    width: 100%
    cursor: pointer
    max-height: 100px
.iti__flag
    background-image: url("~assets/img/flags.png")
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)
    .iti__flag
        background-image: url("~assets/img/flags@2x.png")
</style>
