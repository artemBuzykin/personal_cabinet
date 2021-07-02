<template>
<div class="lk-order-review">
    <div class="lk-order-review__block">
        <div class="lk-order-review__item" v-for="product in order.products" :key="product.id">
            <order-item-product :product="product">

            </order-item-product>
            <div class="lk-order-review__item-link">
                <a href="" class="lk-order-review__link-btn"><span>Написать отзыв</span></a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import OrderItemProduct  from '../components/OrderItemProduct'
export default {
    components: {
        OrderItemProduct
    },
    props: ["order"]
}
</script>

<style lang="scss" scoped>

</style>