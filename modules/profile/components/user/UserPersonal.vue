<template>
    <div class="lk-profile-user__personal">
        <div class="lk-profile-user__personal-item">
            <div class="lk-profile-user__header">
                <h2>Персональные данные</h2>
                <div>
                    <span @click="openModalPersonal">Редактировать данные</span>
                </div>
            </div>
            <user-personal-main />
        </div>
        <div class="lk-profile-user__personal-item">
            <div class="lk-profile-user__header">
                <h2>Контактные данные</h2>
            </div>
            <div class="lk-profile-user__main">
                <div class="lk-profile-user-item">
                    <div class="lk-profile-user-item__title">Телефон</div>
                    <div class="lk-profile-user-item__text">
                        {{ personalData.phone || 'Не заполнено' }}
                    </div>
                    <div class="lk-profile-user-item__edit" @click="openModalContacts('phone')">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="20px"
                            height="19px"
                        >
                            <path
                                fill-rule="evenodd"
                                fill="rgb(162, 182, 212)"
                                d="M7.297,16.147 L3.191,12.042 L13.123,2.112 L17.230,6.218 L7.297,16.147 ZM2.807,12.765 L6.574,16.531 L0.926,18.411 L2.807,12.765 ZM18.493,4.960 L17.781,5.672 L13.669,1.562 L14.381,0.849 C15.098,0.132 16.262,0.132 16.980,0.849 L18.493,2.362 C19.205,3.082 19.205,4.241 18.493,4.960 L18.493,4.960 Z"
                            />
                        </svg>
                    </div>
                </div>
                <div class="lk-profile-user-item">
                    <div class="lk-profile-user-item__title">Email</div>
                    <div class="lk-profile-user-item__text">
                        {{ personalData.email || 'Не заполнено' }}
                    </div>
                    <div class="lk-profile-user-item__edit" @click="openModalContacts('email')">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="20px"
                            height="19px"
                        >
                            <path
                                fill-rule="evenodd"
                                fill="rgb(162, 182, 212)"
                                d="M7.297,16.147 L3.191,12.042 L13.123,2.112 L17.230,6.218 L7.297,16.147 ZM2.807,12.765 L6.574,16.531 L0.926,18.411 L2.807,12.765 ZM18.493,4.960 L17.781,5.672 L13.669,1.562 L14.381,0.849 C15.098,0.132 16.262,0.132 16.980,0.849 L18.493,2.362 C19.205,3.082 19.205,4.241 18.493,4.960 L18.493,4.960 Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <modal
            name="personal-form-modal"
            width="440px"
            height="auto"
            :adaptive="true"
            :scrollable="true"
            classes="modal-wrapper"
        >
            <div class="close" @click="$modal.hide('personal-form-modal')" />
            <user-personal-modal />
        </modal>
        <modal
            name="personal-contacts-modal"
            width="440px"
            height="auto"
            :adaptive="true"
            :scrollable="true"
            classes="modal-wrapper"
        >
            <div class="close" @click="$modal.hide('personal-contacts-modal')" />
            <user-contacts-modal />
        </modal>
    </div>
</template>

<script>
import UserPersonalMain from './UserPersonalMain.vue';

export default {
    components: {
        UserPersonalModal: () => import('./UserPersonalModal.vue'),
        UserContactsModal: () => import('./contacts/UserContactsModal.vue'),
        UserPersonalMain,
    },
    computed: {
        personalData() {
            return this.$auth.user;
        },
    },
    methods: {
        openModalPersonal() {
            this.$modal.show('personal-form-modal');
        },
        openModalContacts(type) {
            this.$store.commit('setModalProps', type);
            this.$modal.show('personal-contacts-modal');
        },
    },
};
</script>

<style lang="scss" scoped></style>
