<template>
    <div class="lk-profile">
        <the-banner src="bannerProfile.png">
            <h2>В разделе Профиль вы можете:</h2>
            <p>Обсуждать все условия покупки с персональным менеджером</p>
            <p>Обмениваться документами по сделке в электронном виде</p>
            <p>Отслеживать статус и текущее местоположения своих заказов</p>
            <p>Поделиться своим мнением об оборудовании</p>
        </the-banner>
        <div class="lk-profile-content lk-page-content">
            <div class="row">
                <div class="col-lg-10">
                    <div class="lk-profile-user">
                        <div class="row">
                            <div class="col-md-4">
                                <div
                                    class="lk-profile-user__img"
                                    :class="{ 'no-img-placeholder': !avatar }"
                                >
                                    <div v-if="!avatar" class="img-empty">
                                        <div class="img-empty-bg" />
                                        <div class="img-empty-text">
                                            <p>
                                                <span @click="$modal.show('personal-avatar-modal')">
                                                    Нажмите на ссылку
                                                </span>
                                                , чтобы добавить фотографию
                                            </p>
                                        </div>
                                    </div>
                                    <div v-else class="lk-profile-user__avatar">
                                        <img :src="avatar" alt="" />
                                        <div
                                            class="lk-profile-user__avatar__delete"
                                            @click="deleteAvatar"
                                        >
                                            <span class="delete blue" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <user-personal />
                            </div>
                        </div>
                    </div>
                    <payers-block />
                    <div class="lk-profile-settings">
                        <div class="lk-profile-settings__header">
                            <h2>Настройки</h2>
                        </div>
                        <user-settings />
                    </div>
                </div>
            </div>
        </div>
        <modal
            name="personal-avatar-modal"
            width="440px"
            height="auto"
            :adaptive="true"
            :scrollable="true"
            classes="modal-wrapper"
        >
            <div class="close" @click="$modal.hide('personal-avatar-modal')" />
            <user-avatar-modal />
        </modal>
    </div>
</template>

<script>
import PayersBlock from '../components/payers/PayersBlock';
import UserAvatarModal from '../components/user/UserAvatarModal.vue';
import UserPersonal from '../components/user/UserPersonal.vue';
import UserSettings from '../components/user/UserSettings.vue';

export default {
    name: 'ProfileIndex',
    components: {
        PayersBlock,
        UserSettings,
        UserPersonal,
        UserAvatarModal,
    },
    data() {
        return {};
    },
    head: {
        title: 'Профиль',
    },
    computed: {
        avatar() {
            const base_url = this.$config.apiURL;
            const { avatar } = this.$auth.user;
            return avatar ? `${base_url}${avatar}` : null;
        },
    },
    methods: {
        deleteAvatar() {
            this.$axios.delete('/clients/delete-image').then(async () => {
                await this.$auth.fetchUser();
            });
        },
    },
};
</script>

<style lang="sass">
@import '@/assets/sass/pages/_profile';
</style>
