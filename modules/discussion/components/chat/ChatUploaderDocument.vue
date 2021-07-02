<template>
    <div class="chat-uploader-file-wrap">
        <div class="chat-uploader-file__item" :class="getFormat">
            <div class="chat-uploader-file__item-img" />
            <div class="chat-uploader-file__item-descr">
                <div class="chat-uploader-file__item-name">{{ baseDocument.name }}</div>
                <div class="chat-uploader-file__item-size">{{ getSize }}</div>
            </div>
            <div class="close" @click="$emit('delete-upload-file', index)" />
        </div>
    </div>
</template>

<script>
import document from '@/mixins/document';

export default {
    mixins: [document],
    props: {
        document: {},
        index: {},
    },
    data() {
        return {
            baseDocument: {
                name: this.document.name,
                size: this.document.size,
            },
        };
    },
    created() {
        const reg = /(?:\.([^.]+))?$/;
        const document_ext = reg.exec(this.baseDocument.name)[1];
        this.baseDocument.extension = document_ext;
    },
};
</script>

<style lang="scss" scoped></style>
