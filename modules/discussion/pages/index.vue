<template>
    <div class="lk-discussion lk-page-content">
        <div class="lk-chat-content">
            <div class="lk-chat__title">
                <h3>Обсуждения</h3>
            </div>
            <chat-wrap />
        </div>
        <div class="lk-documents-content">
            <div class="lk-documents__title">
                <h3>Документы</h3>
            </div>
            <documents-block />
        </div>
    </div>
</template>

<script>
import ChatWrap from '../components/chat/ChatWrap.vue';
import DocumentsBlock from '../components/documents/DocumentsBlock.vue';

export default {
    components: { DocumentsBlock, ChatWrap },
};
</script>

<style lang="scss" scoped></style>
