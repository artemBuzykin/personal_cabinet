<template>
    <div class="lk-orders-item__product">
        <div class="lk-orders-item__product-img">
            <a :href="product.link" target="_blank">
                <img :src="getImage" alt="" />
            </a>
        </div>
        <div class="lk-orders-item__product-descr">
            <a :href="product.link" target="_blank">{{ fullName }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product',
    props: ['product'],
    computed: {
        fullName() {
            return `${this.product.category} ${this.product.brand_title} ${this.product.title}`;
        },
        getImage() {
            // eslint-disable-next-line global-require
            return this.product.image || require('~/assets/img/img-placeholder.png');
        },
    },
};
</script>

<style lang="scss" scoped></style>
