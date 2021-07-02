<template>
    <div class="order-chat-wrap">
        <div ref="chat" class="order-chat">
            <empty-placeholder
                v-if="!isLoading && !messages.length"
                :show-actives="false"
                src="chat-empty.png"
            >
                <h3>У вас еще нет сообщений</h3>
                <template #content>
                    <p>
                        Здесь будет храниться вся ваша <br />
                        переписка с менеджером
                    </p>
                </template>
            </empty-placeholder>
            <div v-else class="order-chat-messages-wrap">
                <div v-if="showMoreButton" class="order-chat-messages-load-more" @click="loadMore">
                    <span>Загрузить предыдущие сообщения</span>
                </div>
                <chat-message-item
                    v-for="message in reversedMessages"
                    :key="message.id"
                    :message="message"
                />
            </div>
        </div>
        <chat-form @sendingMessage="updateMessages" />
    </div>
</template>

<script>
import Echo from 'laravel-echo';
import ChatForm from './ChatForm.vue';
import ChatMessageItem from './ChatMessageItem.vue';

export default {
    components: {
        ChatMessageItem,
        ChatForm,
    },
    data() {
        return {
            messages: [],
            isLoading: false,
            options: {
                page: 1,
                itemsPerPage: 10,
            },
            total: 0,
        };
    },
    async fetch() {
        this.isLoading = true;
        const { page } = this.options;
        const { data } = await this.$axios.get('/deals/chat/all?sort=-date', {
            params: {
                page,
            },
        });
        const { data: messages, meta } = data;
        this.total = meta.total;
        if (page === 1) {
            this.messages = [...messages];
        } else {
            this.messages = [...this.messages, ...messages];
        }
        this.isLoading = false;
    },
    head: {
        title: 'Обсуждения',
    },
    computed: {
        showMoreButton() {
            return this.options.page * this.options.itemsPerPage < this.total;
        },
        reversedMessages() {
            return [...this.messages].reverse();
        },
    },
    watch: {
        messages: {
            handler(val) {
                if (val.length && this.options.page === 1) {
                    this.scrollChatBlock();
                }
            },
        },
    },
    mounted() {
        if (process.client) {
            window.io = require('socket.io-client');
            window.echo = new Echo({
                broadcaster: 'socket.io',
                host: this.$config.socketURL,
            });
            window.echo.connector.options.auth.headers.Authorization = this.$auth.strategy.token.get();
            window.echo.private(`deals.chat.${this.$auth.user.id}`).listen('.message', () => {
                this.updateMessages();
            });
        }
    },
    beforeDestroy() {
        window.echo.leave(`deals.chat.${this.$auth.user.id}`);
    },
    methods: {
        async loadMore() {
            this.options.page++;
            await this.$fetch();
        },
        scrollChatBlock() {
            this.$nextTick(() => {
                const chat_block = this.$refs.chat;
                chat_block.scrollTop = chat_block.scrollHeight;
            });
        },
        async updateMessages() {
            this.options.page = 1;
            await this.$fetch();
            this.scrollChatBlock();
            this.$nuxt.$emit('messages-updated');
        },
    },
};
</script>

<style lang="scss" scoped></style>
