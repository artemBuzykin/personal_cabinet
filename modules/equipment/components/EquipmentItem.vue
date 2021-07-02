<template>
<div class="lk-equipment-block__item">
    <div class="lk-equipment-block__item-img">
        <img :src="require(`@/assets${equipment.image}`)" alt="">
    </div>
    <div class="lk-equipment-block__item-descr">
        <div class="lk-equipment-block__item-title">
            <h3>{{equipment.title}}</h3>
        </div>
        <div class="lk-equipment-block__item-text">
            {{ equipment.description}}
        </div>
        <div class="lk-equipment-block__item-status">
            <div class="lk-equipment-block__item-status__block">
                <span class="type">Гарантия: осталось</span> <span class="day"
                    :class="typeWarranty">{{ equipment.warranty_left }} дней</span>
            </div>
            <div class="lk-equipment-block__item-status__block">
                <span class="type">Следующее ТО через </span> <span class="day"
                    :class="typeService">{{ equipment.service_left }} дней</span>
            </div>
        </div>
        <div class="lk-equipment-block__item-order">
            <MedPopup modalClass="equipment-services-modal" contentClass="equipment-services-modal__content">
                <template #btnOpen>
                    <div class="lk-equipment-block__item-order__btn">
                        Запросить услугу
                    </div>
                </template>
                <template #body>
                    <equipment-item-services :equipment="equipment">

                    </equipment-item-services>
                </template>
            </MedPopup>
            <!-- <MedPopup
            modalClass="equipment-edit-modal"
            contentClass="equipment-edit-modal__content"
    >
        <template #btnOpen>
        <div class="equipment-tooltip__item">Редактировать описание</div>
        </template>
        <template #body>
        <EquipmentEdit :equipment="equipment">

        </EquipmentEdit>
        </template>
    </MedPopup> -->
        </div>
        <div class="lk-equipment-block__menu">
            <v-popover offset="10" placement="left-start" popoverClass="equipment-tooltip">
                <span class="lk-equipment-block__menu-btn"></span>
                <template slot="popover">
                    <div class="equipment-tooltip__wrap">
                        <MedPopup modalClass="equipment-services-modal"
                            contentClass="equipment-services-modal__content">
                            <template #btnOpen>
                                <div class="equipment-tooltip__item" v-close-popover="true">Редактировать описание</div>
                            </template>
                            <template #body>
                                <equipment-item-edit :equipment="equipment">

                                </equipment-item-edit>
                            </template>
                        </MedPopup>
                        <!-- <div class="equipment-tooltip__item">Редактировать описание</div> -->
                        <div class="equipment-tooltip__item" @click.once.prevent="deleteEquipment(equipment.id)">Удалить
                            из списка моего оборудования</div>
                        <div class="equipment-tooltip__item">Сообщить об ошибке</div>
                    </div>
                </template>
            </v-popover>
        </div>
    </div>
</div>
</template>

<script>
import EquipmentItemServices from './EquipmentItemServices'
import EquipmentItemEdit from './EquipmentItemEdit'
export default {
    props: ["equipment"],
    name: "equipmentItem",
    components: {
        EquipmentItemServices,
        EquipmentItemEdit
    },
    computed: {
        typeWarranty() {
            if (this.equipment.warranty_left <= 20) {
                return "danger"
            } else if (this.equipment.warranty_left <= 40) {
                return "warning"
            } else {
                return ""
            }
        },
        typeService() {
            if (this.equipment.service_left <= 20) {
                return "danger"
            } else if (this.equipment.service_left <= 40) {
                return "warning"
            } else {
                return ""
            }
        },
    },
    methods: {
        // async deleteEquipment(id) {
        //     await this.$store.dispatch('equipment/deleteEquipment', id)
        // }
    }
}
</script>

<style lang="scss" scoped>

</style>
