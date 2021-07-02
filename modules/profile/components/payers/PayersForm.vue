<template>
    <div class="lk-profile-payers-form__wrap">
        <div class="lk-profile-payers-form__title">{{ title }}</div>
        <form @submit.prevent="sendForm">
            <div class="lk-profile-payers-form__content">
                <div class="lk-profile-payers-form__item" :class="{ invalid: errors.org_type }">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">Тип организации:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <treeselect
                                    v-model="form.org_type"
                                    :clearable="false"
                                    :searchable="false"
                                    :options="orgType_list"
                                    placeholder="Выберите"
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.org_type" class="input-error offset-error">
                        <small>{{ errors.org_type[0] }}</small>
                    </div>
                </div>
                <div class="lk-profile-payers-form__item" :class="{ invalid: errors.inn }">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">ИНН:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <input
                                    v-model="form.inn"
                                    type="text"
                                    class="input-style"
                                    @change="loadCompanyData"
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.inn" class="input-error offset-error">
                        <small>{{ errors.inn[0] }}</small>
                    </div>
                </div>
                <div class="lk-profile-payers-form__item" :class="{ invalid: errors.name }">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">Название организации:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <input v-model="form.name" type="text" class="input-style" />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.name" class="input-error offset-error">
                        <small>{{ errors.name[0] }}</small>
                    </div>
                </div>
                <div
                    class="lk-profile-payers-form__item"
                    :class="{ invalid: errors.delivery_address }"
                >
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">Адрес доставки:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <input
                                    v-model="form.delivery_address"
                                    type="text"
                                    class="input-style"
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.delivery_address" class="input-error offset-error">
                        <small>{{ errors.delivery_address[0] }}</small>
                    </div>
                </div>
                <div class="lk-profile-payers-form__item" :class="{ invalid: errors.site }">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">Сайт:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <input v-model="form.site" type="text" class="input-style" />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.site" class="input-error offset-error">
                        <small>{{ errors.site[0] }}</small>
                    </div>
                </div>
                <div class="lk-profile-payers-form__item" :class="{ invalid: errors.email }">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">Email:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <input v-model="form.email" type="text" class="input-style" />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.email" class="input-error offset-error">
                        <small>{{ errors.email[0] }}</small>
                    </div>
                </div>
                <div class="lk-profile-payers-form__item" :class="{ invalid: errors.position }">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title">Ваша должность:</div>
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <input v-model="form.position" type="text" class="input-style" />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors.position" class="input-error offset-error">
                        <small>{{ errors.position[0] }}</small>
                    </div>
                </div>
                <div class="lk-profile-payers-form__item">
                    <div class="lk-profile-payers-form__item-wrap">
                        <div class="lk-profile-payers-form__item-title" />
                        <div class="lk-profile-payers-form__item-control">
                            <div class="form-group">
                                <button class="btn" type="submit">{{ btnLabel }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    components: {
        Treeselect,
    },
    data() {
        return {
            orgType_list: [
                {
                    id: 1,
                    label: 'Частное лицо',
                },
                {
                    id: 2,
                    label: 'Частный центр',
                },
                {
                    id: 3,
                    label: 'Государственная клиника',
                },
            ],
            form: {},
            errors: {},
            initial_props: {
                payer: {
                    org_type: 1,
                    inn: null,
                    name: null,
                    delivery_address: null,
                    site: null,
                    email: null,
                    position: null,
                },
                formType: 'create',
            },
        };
    },
    computed: {
        btnLabel() {
            return this.initial_props.formType === 'edit' ? 'Применить изменения' : 'Добавить';
        },
        title() {
            return this.initial_props.formType === 'edit'
                ? 'Редактирование плательщика'
                : 'Добавление плательщика';
        },
        payersProps() {
            return this.$store.getters.getModalProps;
        },
    },
    created() {
        const store_modal_props = this.$store.getters.getModalProps;
        if (store_modal_props) {
            this.initial_props = { ...store_modal_props };
        }
        this.form = { ...this.initial_props.payer };
    },
    beforeDestroy() {
        this.$store.commit('setModalProps', null);
    },
    methods: {
        sendForm() {
            this.initial_props.formType === 'create' ? this.createPayer() : this.editPayer();
        },
        createPayer() {
            this.errors = {};
            this.$axios
                .post('/clients/payers', this.form)
                .then(() => {
                    this.$nuxt.$emit('payers-fetch');
                    this.$modal.hide('payers-form-modal');
                })
                .catch((err) => {
                    this.errors = { ...err.response.data.errors };
                });
        },
        editPayer() {
            this.errors = {};
            this.$axios
                .put(`/clients/payers/${this.form.id}`, this.form)
                .then(() => {
                    this.$nuxt.$emit('payers-fetch');
                    this.$modal.hide('payers-form-modal');
                })
                .catch((err) => {
                    this.errors = { ...err.response.data.errors };
                });
        },
        loadCompanyData() {
            this.$axios
                .create({
                    headers: {
                        Authorization: this.$config.apiSuggestionsToken,
                    },
                })
                .post(this.$config.companyDataUrl, {
                    query: this.form.inn,
                })
                .then((res) => {
                    if (!res.data.suggestions.length) {
                        this.form.name = null;
                        this.form.position = null;
                        return false;
                    }
                    let info = null;
                    const filtered_res = res.data.suggestions.filter(
                        (item) => item.data.state.status === 'ACTIVE'
                    );
                    if (filtered_res.length) {
                        info = filtered_res[0].data;
                    } else {
                        info = res.data.suggestions[0].data;
                    }
                    this.form.name = info.name?.full_with_opf ? info.name.full_with_opf : null;
                    this.form.position = info.management?.post ? info.management.post : null;
                    return true;
                });
        },
    },
};
</script>

<style lang="sass" scoped>
.offset-error
    margin-left: 205px
.invalid .lk-profile-payers-form__item-control .input-style
    background-position: calc(100% - 12px) 12px
@media only screen and (max-width : 767px)
    .offset-error
        margin-left: 0
</style>
