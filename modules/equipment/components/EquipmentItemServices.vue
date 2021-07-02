<template>
    <div class="equipmentServices-wrap">
        <div class="equipmentService-item-wrap" v-for="service in equipment.services" :key="service.id">
            <div class="equipmentService-item" :class="service.type">
                <div class="equipmentService-item__title">
                    <p>{{ service.title }}</p>
                </div>
                <div class="equipmentService-item__body">
                    {{ service.description}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EquipmentItemServices",
    props: ["equipment"]
}
</script>

<style lang="sass" scoped>

</style>