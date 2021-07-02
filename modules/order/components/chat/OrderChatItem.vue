<template>
<div class="order-chat-wrap">
    <div class="order-chat">
        <div class="order-chat-message" v-for="(message, i) in messages" :key="i">
            <div class="chat-message-img">
                <img :src="require(`@/assets${message.image}`)" alt="">
            </div>
            <div class="chat-message-body">
                <div class="chat-message-title">
                    <div class="chat-message-user">
                        {{ message.user }}
                    </div>
                    <div class="chat-message-time">
                        {{ message.time }}
                    </div>
                </div>
                <div class="chat-message-text">
                    {{ message.text }}
                </div>
            </div>
            <!-- {{ message.username }}
    {{ message.msg }} -->
        </div>
    </div>
    <div class="order-chat-write">
        <div class="chat-write-img">
            <img src="@/assets/img/user1.png" alt="">
        </div>
        <form action="" class="chat-write-form">
            <!-- <input type="text" class="input-style" v-model="msg" placeholder="Введите сообщение"> -->
            <textarea class="chat-write-place" placeholder="Введите Ваше сообщение"></textarea>
            <div class="chat-write-send">
                <button @click="sendMessage" :disabled="!msg" class="btn">Написать</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
    export default {
        props: ["messages"],
        data: () => ({
            msg: ""
        }),
        methods: {
            sendMessage: function () {
                if (!this.msg) {
                    alert("pusto");
                    return;
                }
                this.$emit("sendMessage", this.msg);
                this.msg = ""
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>