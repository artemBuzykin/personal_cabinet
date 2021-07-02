<template>
    <div>
        <form v-if="!verify_step" @submit.prevent="validatePhone">
            <div class="user-contacts-modal__title">
                <p>Введите новый номер телефона</p>
            </div>
            <div class="form-group" :class="{ invalid: errors.phone }">
                <country-phone v-model="form.phone" />
                <div v-if="errors.phone" class="input-error">
                    <small>{{ errors.phone[0] }}</small>
                </div>
            </div>
            <div class="form-group user-contacts-modal__submit">
                <button :disabled="disabled" type="submit" class="btn">Далее</button>
            </div>
        </form>
        <div v-else>
            <user-contacts-phohe-verify
                title-text="Подтверждение номера"
                :phone="form.phone"
                @stepBack="verify_step = false"
                @resetForm="resetForm"
            />
        </div>
    </div>
</template>

<script>
import CountryPhone from '@/components/global/CountryPhone';
import UserContactsPhoheVerify from './UserContactsPhoheVerify.vue';

export default {
    components: {
        CountryPhone,
        UserContactsPhoheVerify,
    },
    data: () => ({
        form: {
            phone: null,
        },
        verify_step: false,
        errors: {},
        disabled: false,
    }),
    beforeDestroy() {
        this.resetForm();
    },
    methods: {
        validatePhone() {
            this.disabled = true;
            this.errors = {};
            this.$axios
                .post('/clients/phone/validate-phone', {
                    ...this.form,
                })
                .then(() => {
                    this.verify_step = true;
                })
                .catch((err) => {
                    this.errors = err.response.data.errors;
                })
                .finally(() => {
                    this.disabled = false;
                });
        },
        resetForm() {
            this.form.phone = null;
        },
    },
};
</script>

<style lang="sass" scoped>
.user-contacts-modal__title
    font-size: 22px
    text-align: center
    font-weight: 600
    padding-bottom: 20px
.user-contacts-modal__submit
    .btn
        width: 100%
</style>
