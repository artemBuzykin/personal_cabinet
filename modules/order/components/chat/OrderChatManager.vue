<template>
<div class="manager-wrap">
    <div class="manager">
        <div class="manager-title">
            <p>Ваш менеджер</p>
        </div>
        <div class="manager-person">
            <div class="manager-person__descr">
                <p class="name">{{ manager.name }}</p>
                <p class="phone">{{ manager.phone }}</p>
                <a href="" class="email">{{ manager.email }}</a>
            </div>
            <div class="manager-person__img">
                <img :src="require(`@/assets${manager.image}`)" alt="">
            </div>
        </div>
        <div class="manager-call">
            <a href="" class="btn">Свяжитесь сейчас</a>
        </div>
    </div>
    <div class="manager-rating">
        <client-only>
            <star-rating :show-rating="false" :star-size="30" inactive-color="#e7edf5" active-color="#3b5998"
                :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" v-model="rating">

            </star-rating>
        </client-only>
        <div class="manager-rating__text">
            Оценка работы по обращению
        </div>
    </div>
</div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
    name: "manager",
    data: () => ({
        manager: {
            name: "Абузяров Ренат",
            phone: "+7-915-242-09-12",
            email: "qwerdzxc@medeq.ru",
            image: "/img/manager.jpg"
        },
        rating: null
    }),
    components: {
        StarRating
    }
}
</script>

<style lang="scss" scoped>

</style>
