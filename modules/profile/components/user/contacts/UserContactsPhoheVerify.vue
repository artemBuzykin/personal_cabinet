<template>
    <div class="verify-step">
        <div class="verify-step-title">
            <p>{{ titleText }}</p>
        </div>
        <div class="verify-step__choose-type">
            <p>Выберите вариант подтверждения номера телефона</p>
            <div class="verify-step__choose-type__active">
                <button
                    v-for="(type, i) in signType"
                    :key="i"
                    type="button"
                    class="btn btn-rev verify-step__choose-type__btn"
                    :class="{ active: type.active }"
                    @click="chooseVerifyType(type)"
                >
                    {{ type.text }}
                </button>
            </div>
        </div>
        <div v-if="verifyType" class="verify-step__confirm-wrap">
            <div class="verify-step-text">
                <p>
                    {{ verifyConfirmText }}
                    <span @click="stepBack">измените номер телефона</span>.
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
        phone: {
            required: true,
        },
    },
    data() {
        return {
            signType: [
                {
                    type: 1,
                    text: 'SMS',
                    active: false,
                },
                {
                    type: 2,
                    text: 'Телефон',
                    active: false,
                },
            ],
            disabled: false,
            token: null,
            timer: false,
            timer_minutes: 0,
            timer_seconds: 0,
            isSendingCode: false,
            errors: {},
        };
    },
    computed: {
        verifyRepeatText() {
            if (!this.timer) {
                return this.verifyType === 1 ? 'Повторная отправка кода' : 'Повторный звонок';
            }
            const veryfy_text = this.verifyType === 1 ? 'Повторная отправка' : 'Повторный звонок';
            return `${veryfy_text} ${this.timer_minutes}:${this.timer_seconds}`;
        },
        verifyConfirmText() {
            return this.verifyType === 1
                ? 'Дождитесь смс на ваш номер телефона (придет в течение нескольких секунд) либо'
                : 'Дождитесь звонка на ваш номер телефона (придет в течение нескольких секунд) либо';
        },
        verifyPlaceholderText() {
            return this.verifyType === 1 ? 'Код из SMS' : 'Код из звонка';
        },
        verifyType() {
            const type = this.signType.find((item) => item.active === true);
            return type ? type.type : null;
        },
    },
    beforeDestroy() {
        this.resetTimer();
        this.stepBack();
    },
    methods: {
        stepBack() {
            this.clearForm();
            this.$emit('stepBack');
        },
        clearForm() {
            this.token = null;
            this.signType.forEach((item) => {
                item.active = false;
            });
            this.$emit('resetForm');
        },
        chooseVerifyType(type) {
            this.signType.forEach((el) => {
                el.active = el === type;
            });
            if (!this.timer) {
                this.sendCode();
            }
            this.token = null;
            this.errors = {};
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
                .post('/clients/phone/verify-code', {
                    phone: this.phone,
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
                .post('/clients/phone/send-code', {
                    phone: this.phone,
                    verify_type: this.verifyType,
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
