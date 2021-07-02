<template>
    <div class="lk-profile-settings__content">
        <div class="lk-profile-settings-item">
            <h3>Общедоступная информация:</h3>
            <div class="lk-profile-settings-item__block">
                <div class="lk-profile-settings-item__block-type">Имя</div>
                <div class="lk-profile-settings-item__block-line" />
                <div class="lk-profile-settings-item__block-checkbox">
                    <input
                        id="settings-visibility-fist_name"
                        type="checkbox"
                        class="input-checkbox"
                        :checked="userSettings.block_visibility['first_name']"
                        @change="
                            updateSettings('block_visibility', 'first_name', $event.target.checked)
                        "
                    />
                    <label for="settings-visibility-fist_name" />
                </div>
            </div>
            <div class="lk-profile-settings-item__block">
                <div class="lk-profile-settings-item__block-type">Фамилия</div>
                <div class="lk-profile-settings-item__block-line" />
                <div class="lk-profile-settings-item__block-checkbox">
                    <input
                        id="settings-visibility-last_name"
                        type="checkbox"
                        class="input-checkbox"
                        :checked="userSettings.block_visibility['last_name']"
                        @change="
                            updateSettings('block_visibility', 'last_name', $event.target.checked)
                        "
                    />
                    <label for="settings-visibility-last_name" />
                </div>
            </div>
            <div class="lk-profile-settings-item__block">
                <div class="lk-profile-settings-item__block-type">Телефон</div>
                <div class="lk-profile-settings-item__block-line" />
                <div class="lk-profile-settings-item__block-checkbox">
                    <input
                        id="settings-visibility-phone"
                        type="checkbox"
                        class="input-checkbox"
                        :checked="userSettings.block_visibility['phone']"
                        @change="updateSettings('block_visibility', 'phone', $event.target.checked)"
                    />
                    <label for="settings-visibility-phone" />
                </div>
            </div>
            <div class="lk-profile-settings-item__block">
                <div class="lk-profile-settings-item__block-type">Email</div>
                <div class="lk-profile-settings-item__block-line" />
                <div class="lk-profile-settings-item__block-checkbox">
                    <input
                        id="settings-visibility-email"
                        type="checkbox"
                        class="input-checkbox"
                        :checked="userSettings.block_visibility['email']"
                        @change="updateSettings('block_visibility', 'email', $event.target.checked)"
                    />
                    <label for="settings-visibility-email" />
                </div>
            </div>
        </div>
        <div class="lk-profile-settings-item">
            <h3>Получать рассылку:</h3>
            <div class="lk-profile-settings-item__block">
                <div class="lk-profile-settings-item__block-type">Скидки и акции</div>
                <div class="lk-profile-settings-item__block-line" />
                <div class="lk-profile-settings-item__block-checkbox">
                    <input
                        id="settings-mailing-hot"
                        type="checkbox"
                        class="input-checkbox"
                        :checked="userSettings.mailing['hot']"
                        @change="updateSettings('mailing', 'hot', $event.target.checked)"
                    />
                    <label for="settings-mailing-hot" />
                </div>
            </div>
            <div class="lk-profile-settings-item__block">
                <div class="lk-profile-settings-item__block-type">Снизилась цена на избранное</div>
                <div class="lk-profile-settings-item__block-line" />
                <div class="lk-profile-settings-item__block-checkbox">
                    <input
                        id="settings-mailing-price-decreased"
                        type="checkbox"
                        class="input-checkbox"
                        :checked="userSettings.mailing['price-decreased']"
                        @change="
                            updateSettings('mailing', 'price-decreased', $event.target.checked)
                        "
                    />
                    <label for="settings-mailing-price-decreased" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        userSettings() {
            const user_settings = this.$auth.user.settings;
            return {
                block_visibility: {
                    first_name: !!user_settings?.block_visibility?.first_name,
                    last_name: !!user_settings?.block_visibility?.last_name,
                    email: !!user_settings?.block_visibility?.email,
                    phone: !!user_settings?.block_visibility?.phone,
                },
                mailing: {
                    hot: !!user_settings?.mailing?.hot,
                    'price-decreased': !!user_settings?.mailing?.['price-decreased'],
                },
            };
        },
    },
    methods: {
        updateSettings(block, field, value) {
            const settings = { ...this.userSettings };
            settings[block][field] = value;
            this.$axios.put('/clients/me', {
                settings,
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
