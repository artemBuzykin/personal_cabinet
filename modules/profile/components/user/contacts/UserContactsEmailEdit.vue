<template>
    <div>
        <form v-if="!verify_step" @submit.prevent="validateEmail">
            <div class="user-contacts-modal__title">
                <p>Введите новый email</p>
            </div>
            <div class="form-group" :class="{ invalid: errors.email }">
                <input
                    v-model="form.email"
                    placeholder="Ваш email"
                    type="text"
                    class="input-style"
                />
                <div v-if="errors.email" class="input-error">
                    <small>{{ errors.email[0] }}</small>
                </div>
            </div>
            <div class="form-group user-contacts-modal__submit">
                <button :disabled="disabled" type="submit" class="btn">Далее</button>
            </div>
        </form>
        <div v-else>
            <user-contacts-email-verify
                title-text="Подтверждение email"
                :email="form.email"
                @stepBack="verify_step = false"
                @resetForm="resetForm"
            />
        </div>
    </div>
</template>

<script>
import UserContactsEmailVerify from './UserContactsEmailVerify.vue';

export default {
    components: {
        UserContactsEmailVerify,
    },
    data: () => ({
        form: {
            email: null,
        },
        verify_step: false,
        errors: {},
        disabled: false,
    }),
    beforeDestroy() {
        this.resetForm();
    },
    methods: {
        validateEmail() {
            this.disabled = true;
            this.errors = {};
            this.$axios
                .post('/clients/email/send-code', {
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
            this.form.email = null;
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
