<template>
    <div class="lk-orders-item">
        <div class="lk-orders-item__header">
            <div class="lk-orders-item__title">
                <h3>Сделка #{{ order.number }} от {{ getTime }}</h3>
            </div>
            <div class="lk-orders-item__status" :style="{ backgroundColor: getStatus.bgColor }">
                {{ getStatus.title }}
            </div>
        </div>
        <div class="lk-orders-item__body">
            <order-item-product
                v-for="number in count"
                :key="order.products[number - 1].id"
                :product="order.products[number - 1]"
            />
        </div>
        <div v-if="max < order.products.length" class="lk-orders-item__load">
            <div
                class="lk-orders-item__load-btn"
                :class="{ visible: isVisible }"
                @click="isVisible = !isVisible"
            >
                <span class="arrow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="9"
                        viewBox="0 0 284.929 284.929"
                    >
                        <path
                            d="M282.082 76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856-2.471 0-4.661.95-6.563 2.856L142.466 174.441 30.262 62.241c-1.903-1.906-4.093-2.856-6.567-2.856-2.475 0-4.665.95-6.567 2.856L2.856 76.515C.95 78.417 0 80.607 0 83.082c0 2.473.953 4.663 2.856 6.565l133.043 133.046c1.902 1.903 4.093 2.854 6.567 2.854s4.661-.951 6.562-2.854L282.082 89.647c1.902-1.903 2.847-4.093 2.847-6.565 0-2.475-.945-4.665-2.847-6.571z"
                        />
                    </svg>
                </span>
                <span class="text">{{ btnText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import * as dayjs from 'dayjs';
import OrderItemProduct from './OrderItemProduct';

export default {
    components: {
        OrderItemProduct,
    },
    props: ['order'],
    data: () => ({
        max: 10,
        isVisible: false,
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
    }),
    computed: {
        count() {
            return !this.isVisible && this.order.products.length > this.max
                ? this.max
                : this.order.products.length;
        },
        btnText() {
            return !this.isVisible ? 'Все товары в запросе' : 'Скрыть товары';
        },
        getTime() {
            return dayjs(this.order.created_at).format('DD.MM.YY');
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

<style lang="sass" scoped></style>
