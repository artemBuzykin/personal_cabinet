<template>
    <div class="order-chat-message">
        <div class="chat-message-img" :class="{ placeholder: !message.image }">
            <img :src="getImage" alt="" />
        </div>
        <div class="chat-message-body">
            <div class="chat-message-title">
                <div class="chat-message-user">
                    {{ message.author_name }}
                </div>
                <div class="chat-message-time">
                    {{ getTime }}
                </div>
            </div>
            <div class="chat-message-content">
                <div class="chat-message-text">
                    {{ message.message }}
                </div>
                <div v-if="message.files" class="chat-message-documents">
                    <div class="chat-message-documents__list">
                        <chat-message-document
                            v-for="document in message.files"
                            :key="document.id"
                            :document="document"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as dayjs from 'dayjs';
import ChatMessageDocument from './ChatMessageDocument.vue';

export default {
    components: { ChatMessageDocument },
    props: {
        message: {},
    },
    computed: {
        getTime() {
            return `${dayjs(this.message.created_at).format('DD.MM.YY')} в ${dayjs(
                this.message.created_at
            ).format('HH:mm')}`;
        },
        getImage() {
            // eslint-disable-next-line global-require
            return this.message.image || require('~/assets/img/user-placeholder.png');
        },
    },
};
</script>

<style lang="scss" scoped></style>
