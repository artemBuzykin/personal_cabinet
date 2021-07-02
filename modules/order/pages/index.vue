<template>
<div class="lk-order">
    <the-loader v-if="isLoading">

    </the-loader>
    <empty-placeholder src="order-empty.png" v-else-if="!Object.keys(order).length && !order">
        <h3>Отсутствие запроса!</h3>
    </empty-placeholder>
    <div class="lk-order-wrap" v-else>
        <order-item :order="order">

        </order-item>
        <nav class="lk-order-nav">
            <nuxt-link class="lk-order__link" exact active-class="active" :to="{name: 'order.chat'}">
                Обсуждения
            </nuxt-link>
            <nuxt-link class="lk-order__link" active-class="active" :to="{name: 'order.documents'}">
                Документы
            </nuxt-link>
            <nuxt-link class="lk-order__link" active-class="active" :to="{name: 'order.delivery'}">
                Отслеживание
            </nuxt-link>
            <nuxt-link class="lk-order__link" active-class="active" :to="{name: 'order.review'}">
                Отзывы
            </nuxt-link>
        </nav>
        <div class="lk-order-content" id="lk-order-content">
            <nuxt-child :order="order" :key="$route.path">

            </nuxt-child>
        </div>
    </div>
</div>
</template>

<script>
import OrderItem from '../components/OrderItem';

export default {
    name: 'OrderIndex',
    components: {
        OrderItem,
    },
    validate({ params }) {
        return /^\d+$/.test(params.id);
    },
    async asyncData(cxt) {
        const response = await cxt.app.$axios.get(`/orders/${cxt.params.id}`, {
            params:{
                _embed: ['products', 'documents', 'messages'],
            },
        });
        return {
            isLoading: false,
            order: response.data,
        };
    },
    data: () => ({
        isLoading: true,
    }),
};
</script>x
