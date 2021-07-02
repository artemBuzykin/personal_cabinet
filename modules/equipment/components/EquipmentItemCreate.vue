<template>
    <div class="equipment-create">
        <h2>Добавить оборудование</h2>
        <form action="" @submit.prevent="addEquipment" class="equipment-create-form">
            <input type="text" class="input-style" placeholder="Название" v-model="newEquipment.title">
            <input type="text" class="input-style" placeholder="Описание" v-model="newEquipment.description">
            <div class="equipment-create-send">
                <!-- <button type="submit" class="btn">Добавить</button> -->
                <button @click.prevent="check" class="btn">Проверить</button>
            </div>
        </form>
    </div>
</template>

<script>
// import Uploader from "@/components/Uploader"
export default {
    name: "EquipmentItemCreate",
    data: () => ({
        newEquipment: {
            title: "",
            description: "",
            image: null
        },
        images: null,
    }),
    methods: {
        check() {
            this.$uploadImage(this.images)
        },
        // async fileSelected(event) {
        //     if (this.images) {
        //         let fd = new FormData();
        //         this.images.forEach((item) => {
        //             fd.append('file', item, item.name);
        //         })
        //         await axios.post('upload', fd, {
        //             onUploadProgress: uploadEvent => {
        //                 console.log(Math.round(uploadEvent.loaded / uploadEvent.total * 100))
        //             },
        //             baseURL: "http://localhost/api/"
        //         }).then(res => {
        //             this.newEquipment.image = res.data
        //         })
        //     }
        // },
        async addEquipment() {
            // await this.fileSelected();
            // await this.$store.dispatch('equipment/createEquipment', this.newEquipment);
            this.newEquipment = {
                title: "",
                description: "",
                image: null
            }
        }
    },
    components: {
        // Uploader
    }
}
</script>

<style lang="sass" scoped>
</style>
