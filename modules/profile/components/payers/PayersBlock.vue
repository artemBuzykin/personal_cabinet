<template>
    <div class="lk-profile-payers">
        <div class="lk-profile-payers__header">
            <h2>Данные о плательщиках</h2>
        </div>
        <div v-if="payers.length" class="lk-profile-payers__content">
            <payers-item v-for="payer in payers" :key="payer.id" :payer="payer" />
        </div>
        <div class="lk-profile-payers__new">
            <div class="lk-profile-payers__new-btn" @click="openModalPayers">
                Добавить нового плательщика
            </div>
        </div>
        <modal
            name="payers-form-modal"
            width="750px"
            height="auto"
            :adaptive="true"
            :scrollable="true"
            classes="payers-form-modal__content"
        >
            <div class="close" @click="$modal.hide('payers-form-modal')" />
            <payers-form />
        </modal>
    </div>
</template>

<script>
import PayersItem from './PayersItem';
import PayersForm from './PayersForm';

export default {
    components: {
        PayersItem,
        PayersForm,
    },
    data() {
        return {
            payers: [],
        };
    },
    async fetch() {
        const { data } = await this.$axios.get('/clients/payers');
        const { data: payers } = data;
        this.payers = payers;
    },
    created() {
        this.$nuxt.$on('payers-fetch', this.$fetch);
    },
    beforeDestroy() {
        this.$nuxt.$off('payers-fetch');
    },
    methods: {
        openModalPayers() {
            this.$modal.show('payers-form-modal');
        },
    },
};
</script>

<style lang="scss" scoped></style>
