<template>
    <div class="lk-profile-payers-item">
        <div class="lk-profile-payers-item__edit" @click="openModalPayers">
            <span>Редактировать данные</span>
        </div>
        <div class="lk-profile-payers-item__body">
            <div class="lk-profile-payers-item__el title">{{ payer.name }}</div>
            <div class="lk-profile-payers-item__el">ИНН: {{ payer.inn }}</div>
            <div class="lk-profile-payers-item__el">
                Адрес доставки: {{ payer.delivery_address }}
            </div>
            <div v-if="payer.site" class="lk-profile-payers-item__el">Сайт: {{ payer.site }}</div>
            <div v-if="payer.email" class="lk-profile-payers-item__el">
                Email: {{ payer.email }}
            </div>
            <div v-if="payer.position" class="lk-profile-payers-item__el">
                Ваша должность: {{ payer.position }}
            </div>
            <div class="lk-profile-payers-item__el">
                Тип организации: {{ getOrgType(payer.org_type) }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['payer'],
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
        };
    },
    methods: {
        getOrgType(type) {
            const find_type = this.orgType_list.find((item) => item.id === type);
            const { label } = find_type;
            return label;
        },
        openModalPayers() {
            this.$store.commit('setModalProps', {
                formType: 'edit',
                payer: this.payer,
            });
            this.$modal.show('payers-form-modal');
        },
    },
};
</script>

<style lang="scss" scoped></style>
