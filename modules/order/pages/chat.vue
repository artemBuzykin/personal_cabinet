<template>
    <div class="lk-order-chat">
        <div class="row">
            <div class="col-md-8">
                <order-chat-item :messages="messages" @sendMessage="sendMessage">

                </order-chat-item>
            </div>
            <div class="col-md-4">
                <order-chat-manager>

                </order-chat-manager>
            </div>
        </div>
    </div>
</template>

<script>
// import io from 'socket.io-client'
import OrderChatItem from '../components/chat/OrderChatItem'
import OrderChatManager from '../components/chat/OrderChatManager'
export default {
    props: ["order"],
    name: "orderChat",
    components: {
        OrderChatItem,
        OrderChatManager
    },
    data: () => ({
        username: "Клиент",
        // socket: io(`http://localhost:3000`),
        messages: [
            {
                user: "Дмитрий Барнов",
                time: "сейчас",
                image: "/img/user1.png",
                text: "Строка с текстом ведущего научного сотрудника Арктического"
            },
            {
                user: "Дмитрий Барнов",
                time: "сейчас",
                image: "/img/user1.png",
                text: "Строка с текстом ведущего научного сотрудника Арктического"
            },
            {
                user: "Сергей Андрюков",
                time: "сейчас",
                image: "/img/user2.png",
                text: "Очень много текста корабли плыли туда-сюда бла бла бла "
            },
            {
                user: "Сергей Андрюков",
                time: "сейчас",
                image: "/img/user2.png",
                text: "Украина не намерена со своей стороны ограничивать поток газа, который будет поступать из России, даже если «Нафтогазу» не удастся заключить контракт на транзит с «Газпромом». Об этом рассказал в интервью Deutsche Welle исполнительный директор «Нафтогаза» Юрий Витренко."
            },
            {
                user: "Сергей Андрюков",
                time: "сейчас",
                image: "/img/user2.png",
                text: "Украина не намерена со своей стороны ограничивать поток газа, который будет поступать из России, даже если «Нафтогазу» не удастся заключить контракт на транзит с «Газпромом». Об этом рассказал в интервью Deutsche Welle исполнительный директор «Нафтогаза» Юрий Витренко."
            },
            {
                user: "Дмитрий Барнов",
                time: "сейчас",
                image: "/img/user1.png",
                text: "Власти Франции не приняли предложение России о моратории на размещение ракет средней и меньшей дальности (РСМД) в Европе. Об этом заявил французский президент Эммануэль Макрон на пресс-конференции с генсеком НАТО Йенсом Столтенбергом, которая 28 ноября транслировалась в Twitter Елисейского дворца."
            },
            {
                user: "Дмитрий Барнов",
                time: "сейчас",
                image: "/img/user1.png",
                text: "Власти Франции не приняли предложение России о моратории на размещение ракет средней и меньшей дальности (РСМД) в Европе. Об этом заявил французский президент Эммануэль Макрон на пресс-конференции с генсеком НАТО Йенсом Столтенбергом, которая 28 ноября транслировалась в Twitter Елисейского дворца."
            },

        ],
        users: [],
    }),
    methods: {
        joinServer: function () {
            this.socket.on("loggedIn", data => {
                this.messages.push(data.messages)
                this.users = data.users;
                this.socket.emit("newuser", this.username);
            });
            this.listen()
        },
        listen: function () {
            this.socket.on('userOnline', user => {
                this.users.push(user)
            });
            this.socket.on("userLeft", user => {
                this.users.splice(this.users.indexOf(user), 1);
            });
            this.socket.on("msg", message => {
                if (message) {
                    this.messages.push(message)
                }
                // this.messages.push(message)
            })
        },
        sendMessage: function (message) {
            this.socket.emit('msg', message)
        }
    },
    mounted() {
        // this.username = prompt("Ваше имя", "Default")
        // if (!this.username){
        //   this.username = "Default"
        // }
        // this.joinServer()
    },
}
</script>

<style lang="scss" scoped>

</style>
