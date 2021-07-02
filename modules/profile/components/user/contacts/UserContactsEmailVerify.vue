<template>
    <div class="verify-step">
        <div class="verify-step-title">
            <p>{{ titleText }}</p>
        </div>
        <div class="verify-step__confirm-wrap">
            <div class="verify-step-text">
                <p>
                    {{ verifyConfirmText }}
                    <span @click="stepBack">измените email</span>.
                </p>
            </div>
            <div class="verify-step-sms">
                <form @submit.prevent="sendForm">
                    <div class="verify-step__actions">
                        <input
                            v-model="token"
                            type="text"
                            class="input-sms-code input-style"
                            :class="{ error: errors.code }"
                            :placeholder="verifyPlaceholderText"
                        />
                        <button
                            type="button"
                            class="btn-sms-code"
                            :disabled="timer || !isSendingCode"
                            @click="sendCode"
                        >
                            {{ verifyRepeatText }}
                        </button>
                    </div>
                    <div v-if="errors.code" class="input-error">
                        <small style="display: block">{{ errors.code[0] }}</small>
                    </div>
                    <div class="verify-step__submit">
                        <button type="submit" :disabled="disabled" class="btn verify-submit">
                            <span>Подтвердить</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleText: {
            default: 'Подтверждение',
        },
        email: {
            required: true,
        },
    },
    data() {
        return {
            disabled: false,
            token: null,
            timer: false,
            timer_minutes: 0,
            timer_seconds: 0,
            isSendingCode: true,
            errors: {},
        };
    },
    computed: {
        verifyRepeatText() {
            if (!this.timer) {
                return 'Повторная отправка кода';
            }
            const veryfy_text = 'Повторная отправка';
            return `${veryfy_text} ${this.timer_minutes}:${this.timer_seconds}`;
        },
        verifyConfirmText() {
            return 'Дождитесь сообщения на ваш email (придет в течение нескольких секунд) либо';
        },
        verifyPlaceholderText() {
            return 'Код из email';
        },
    },
    beforeDestroy() {
        this.resetTimer();
        this.stepBack();
    },
    created() {
        this.startTimer(60);
    },
    methods: {
        stepBack() {
            this.clearForm();
            this.$emit('stepBack');
        },
        clearForm() {
            this.token = null;
            this.$emit('resetForm');
        },
        startTimer(duration) {
            let timer = duration;
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
            this.timer = true;
            this.timer_minutes = minutes < 10 ? `0${minutes}` : minutes;
            this.timer_seconds = seconds < 10 ? `0${seconds}` : seconds;
            const interval = setInterval(() => {
                if (--timer < 0) {
                    timer = 0;
                    this.resetTimer();
                    clearInterval(interval);
                }
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                this.timer_minutes = minutes < 10 ? `0${minutes}` : minutes;
                this.timer_seconds = seconds < 10 ? `0${seconds}` : seconds;
            }, 1000);
        },
        resetTimer() {
            this.timer = false;
            this.timer_minutes = 0;
            this.timer_seconds = 0;
        },
        sendForm() {
            this.errors = {};
            this.disabled = true;
            this.$axios
                .post('/clients/email/verify-code', {
                    email: this.email,
                    code: this.token,
                })
                .then(async () => {
                    await this.$auth.fetchUser();
                    this.$modal.hide('personal-contacts-modal');
                })
                .catch((err) => {
                    this.errors = err.response.data.errors;
                })
                .finally(() => {
                    this.disabled = false;
                });
        },
        sendCode() {
            this.errors = {};
            this.isSendingCode = false;
            this.$axios
                .post('/clients/email/send-code', {
                    email: this.email,
                })
                .then(() => {
                    this.startTimer(60);
                })
                .catch((err) => {
                    this.errors = err.response.data.errors;
                })
                .finally(() => {
                    this.isSendingCode = true;
                });
        },
    },
};
</script>

<style lang="sass" scoped>
.verify-step-title
    font-size: 22px
    font-weight: 600
    padding-bottom: 15px
    text-align: center
.verify-step__choose-type
  padding-bottom: 15px
  text-align: center
  p
    padding-bottom: 10px
    font-size: 14px
    font-weight: 300
.verify-step__choose-type__active
  display: flex
  align-items: center
  justify-content: space-between
.verify-step__choose-type__btn
  font-weight: 400
  font-size: 15px
  min-width: 0
  flex: 1
  min-height: 34
  padding: 8px 10px
.verify-step__choose-type__btn + .verify-step__choose-type__btn
    margin-left: 10px
.verify-step-text
    font-size: 15px
    font-weight: 300
    text-align: center
    padding-bottom: 20px
    span
        color: $blue
        display: inline-block
        font-weight: 400
        border-bottom: 1px solid $blue
        cursor: pointer
.verify-step__actions
  display: flex
  align-items: center
  justify-content: space-between
.input-sms-code
  height: 36px
  display: inline-block
  text-align: center
  flex: 0 0 150px
  padding: 7px 0
  &.error
    border-color: red
.btn-sms-code
  text-align: center
  border-radius: 3px
  background-color: #e8ecf4
  color: $blue
  font-weight: 300
  font-size:  15px
  flex: 1
  height: 36px
  line-height: 36px
  margin-left: 15px
  &:disabled, &[disabled]
    color: #b19797
    background-color: #f8f4f4
    cursor: not-allowed
.verify-step__submit
  padding-top: 20px
.verify-submit
  max-width: 100%
  width: 100%
@media only screen and (max-width : 1199px)
    .verify-step__actions
        flex-direction: column
        align-items: flex-start
        justify-content: flex-start
    .input-sms-code
        flex: 1
    .btn-sms-code
        flex: 1
        width: 100%
        margin-left: 0
        margin-top: 10px
</style>
