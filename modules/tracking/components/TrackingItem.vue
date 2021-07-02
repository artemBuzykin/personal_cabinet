<template>
    <div class="lk-order-tracking__item-wrap lk-order-item__group">
        <div class="lk-order-tracking__item-title lk-order-item__group-item-title">
            Сделка #{{ order.number }} от {{ getTime }}
        </div>
        <div
            v-for="product in order.products"
            :key="product.id"
            class="lk-order-tracking__item lk-order-item__group-item"
        >
            <order-item-product :product="product" />
            <div class="lk-order-tracking__item-descr">
                <p>{{ statusLabels[product.status] }}</p>
                <!--                <p>Какой-то текст</p>-->
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
    data() {
        return {
            statusList: [
                {
                    id: 1,
                    title: 'Формируется',
                    bgColor: '#f4f4f4',
                },
                {
                    id: 2,
                    title: 'Изготавливается',
                    bgColor: '#ecf3f7',
                },
                {
                    id: 3,
                    title: 'Ожидает отправки',
                    bgColor: '#d7e9f3',
                },
                {
                    id: 4,
                    title: 'Отправлен в Россию',
                    bgColor: '#c6e6f8',
                },
                {
                    id: 5,
                    title: 'На таможне',
                    bgColor: '#f6f1df',
                },
                {
                    id: 6,
                    title: 'Доставляется транспортной компанией',
                    bgColor: '#eaf8f4',
                },
                {
                    id: 7,
                    title: 'Доставлен',
                    bgColor: '#def5ee',
                },
                {
                    id: 8,
                    title: 'Согласование время исталляции',
                    bgColor: '#ecf0fa',
                },
                {
                    id: 9,
                    title: 'Ожидайте инженера',
                    bgColor: '#dbe3f9',
                },
                {
                    id: 10,
                    title: 'Установлен',
                    bgColor: '#c8f4f0',
                },
            ],
        };
    },
    computed: {
        getTime() {
            return dayjs(this.order.created_at).format('DD.MM.YY');
        },
        statusLabels() {
            const labels = {};
            this.statusList.forEach((status) => {
                labels[status.id] = status.title;
            });
            return labels;
        },
        getStatus() {
            const products_status = this.order.products.map((product) => product.status);
            const smallest_status = Math.min(...products_status);
            const finded_status = this.statusList.find((status) => status.id === smallest_status);
            return finded_status;
        },
    },
};
</script>

<style lang="scss" scoped></style>
