<template>
    <div class="chat-message-document__item-wrap">
        <div class="chat-message-document__item" :class="getFormat" @click="downloadDocument">
            <div class="chat-message-document__item-img" />
            <div class="chat-message-document__item-descr">
                <div class="chat-message-document__item-name">
                    {{ baseDocument.name }}
                </div>
                <div class="chat-message-document__item-size">
                    {{ getSize }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import document from '@/mixins/document';

export default {
    mixins: [document],
    props: {
        document: {},
    },
    data() {
        return {
            baseDocument: { ...this.document },
        };
    },
};
</script>

<style lang="scss" scoped></style>
