<template>
    <div class="lk-register">
        <div class="container">
            <div class="lk-register-wrap row">
                <div class="col-lg-6 col-md-7">
                    <div class="lk-register-text">
                        <h1>Добро пожаловать в Онлайн-офис &laquo;Медэк&raquo;!</h1>
                        <p>
                            Надеемся, что наши сервисы повысят удобство взаимодействия с нами и
                            сэкономят время:
                        </p>
                        <ul>
                            <li>круглосуточный доступ с любого устройства;</li>
                            <li>индивидуальные предложения;</li>
                            <li>мониторинг текущих заявок на лизинг;</li>
                            <li>уведомления о предстоящих платежах и не только;</li>
                            <li>портфель всех сделок и хранилище документов;</li>
                            <li>полезности и секреты лизинга;</li>
                            <li>и многое другое.</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-6 col-md-5">
                    <div class="lk-register-form">
                        <form v-if="!verify_step" class="form-register" @submit.prevent="login">
                            <div class="lk-register-form__title">
                                <p>Введите номер телефона</p>
                            </div>
                            <div class="form-group" :class="{ invalid: errors.phone }">
                                <country-phone v-model="form.phone" />
                                <div v-if="errors.phone" class="input-error">
                                    <small>{{ errors.phone[0] }}</small>
                                </div>
                            </div>
                            <div class="form-group form-register__submit">
                                <button :disabled="disabled" type="submit" class="btn">
                                    Войти
                                </button>
                            </div>
                        </form>
                        <div v-else>
                            <verify-sms
                                title-text="Подтверждение входа"
                                :phone="form.phone"
                                @stepBack="verify_step = false"
                                @resetForm="resetForm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VerifySms from '@/components/VerifySms';
import CountryPhone from '@/components/global/CountryPhone';

export default {
    name: 'Login',
    components: {
        VerifySms,
        CountryPhone,
    },
    layout: 'auth',
    data: () => ({
        form: {
            phone: null,
        },
        verify_step: false,
        errors: {},
        disabled: false,
    }),
    methods: {
        login() {
            this.disabled = true;
            this.errors = {};
            this.$axios
                .post('/clients/form/auth', {
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

<style lang="scss" scoped>
@import '@/assets/sass/pages/_login';
</style>
