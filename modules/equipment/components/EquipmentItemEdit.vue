<template>
    <div class="equipment-create">
        <h2>Редактировать данные</h2>
        <form action="" @submit.prevent="changeEquipment" class="equipment-create-form">
            <input type="text" class="input-style" placeholder="Название" v-model="editEquipment.title">
            <textarea v-model="editEquipment.description"></textarea>
            <div class="equipment-create-send">
                <button type="submit" class="btn">Изменить</button>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    name: "EquipmentItemEdit",
    props: ["equipment"],
    data: ()=>({
      editEquipment: {
        title: "",
        description: ""
      }
    }),
    methods:{
      async changeEquipment(){
        // await this.$store.dispatch("equipment/editEquipment", [this.equipment.id, this.editEquipment])
        console.log("ala")
      },
    },
    mounted() {
      this.editEquipment.title = this.equipment.title,
      this.editEquipment.description = this.equipment.description
    },
  }
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  border-radius: 3px;
  border: 1px solid #c7ccd6;
  outline: 0;
  padding: 10px;
  width: 100%;
  min-height: 150px
}
</style>
