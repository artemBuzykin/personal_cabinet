<template>
    <div class="lk-order-review lk-page-content">
        <div class="lk-order-review__title">
            <h3>Отзывы</h3>
        </div>
        <empty-placeholder v-if="!isLoading && !orders.length" src="review-empty.png">
            <h3>Отсутствие отзывов!</h3>
        </empty-placeholder>
        <div v-if="orders.length" class="lk-order-review__block">
            <review-item v-for="order in orders" :key="order.id" :order="order" />
            <div v-if="showMoreButton" class="lk-orders-item__more fetch-more-btn">
                <a href="" @click.prevent="loadMore">Больше запросов</a>
            </div>
            <the-loader v-if="isLoading" />
        </div>
    </div>
</template>

<script>
import order from '@/mixins/order';
import ReviewItem from '../components/ReviewItem.vue';

export default {
    components: {
        ReviewItem,
    },
    mixins: [order],
    head: {
        title: 'Отзывы',
    },
};
</script>

<style lang="scss" scoped></style>
