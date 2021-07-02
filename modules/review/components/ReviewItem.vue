<template>
    <div class="lk-order-review__item-wrap lk-order-item__group">
        <div class="lk-order-review__item-title lk-order-item__group-item-title">
            Сделка #{{ order.number }} от {{ getTime }}
        </div>
        <div
            v-for="product in order.products"
            :key="product.id"
            class="lk-order-review__item lk-order-item__group-item"
        >
            <order-item-product :product="product" />
            <div class="lk-order-review__item-link">
                <!-- здесь проверка на наличие отзыва -->
                <!-- <a href="" class="btn lk-order-review__link-btn"><span>Написать отзыв</span></a> -->
                <a
                    :href="product.link"
                    target="_blank"
                    class="btn btn-rev lk-order-review__link-btn"
                >
                    <span class="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="13px"
                            height="10px"
                        >
                            <path
                                fill-rule="evenodd"
                                fill="rgb(73, 91, 128)"
                                d="M4.129,7.890 L1.046,4.782 L-0.000,5.837 L4.129,10.000 L13.000,1.055 L11.954,-0.000 L4.129,7.890 Z"
                            />
                        </svg>
                    </span>
                    <span>Написать отзыв</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import * as dayjs from 'dayjs';
import OrderItemProduct from '@/modules/order/components/OrderItemProduct';

export default {
    components: {
        OrderItemProduct,
    },
    props: ['order'],
    computed: {
        getTime() {
            return dayjs(this.order.created_at).format('DD.MM.YY');
        },
    },
};
</script>

<style lang="scss" scoped></style>
