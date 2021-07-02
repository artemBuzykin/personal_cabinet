<template>
    <div class="lk-orders">
        <the-banner src="bannerOrders.png">
            <h2>В разделе Мои сделки вы можете:</h2>
            <p>Обсуждать все условия покупки с персональным менеджером</p>
            <p>Обмениваться документами по сделке в электронном виде</p>
            <p>Отслеживать статус и текущее местоположения своих заказов</p>
            <p>Поделиться своим мнением об оборудовании</p>
        </the-banner>
        <empty-placeholder v-if="!isLoading && !orders.length" src="order-empty.png">
            <h3>Отсутствие запросов!</h3>
        </empty-placeholder>
        <div v-else class="lk-orders-list lk-page-content">
            <div class="lk-orders-list__sort">
                <div class="bg-line" />
                <div class="lk-orders__sort">
                    <treeselect
                        v-model="options.sort"
                        :clearable="false"
                        :searchable="false"
                        :options="sortType"
                        placeholder="Выберите"
                        @input="changeSort"
                    >
                        <label
                            slot="option-label"
                            slot-scope="{ node }"
                            class="vue-treeselect__value-custom"
                        >
                            <span
                                :class="node.raw.type"
                                class="vue-treeselect__value-custom__arrow"
                            />
                            <span>{{ node.label }}</span>
                        </label>
                        <div
                            slot="value-label"
                            slot-scope="{ node }"
                            class="vue-treeselect__value-custom"
                        >
                            <span
                                :class="node.raw.type"
                                class="vue-treeselect__value-custom__arrow"
                            />
                            <span> {{ node.raw.label }} </span>
                        </div>
                    </treeselect>
                </div>
            </div>
            <div v-if="orders.length">
                <div class="lk-orders-list__wrap">
                    <order-item v-for="order in orders" :key="order.id" :order="order" />
                </div>
                <div v-if="showMoreButton" class="lk-orders-item__more fetch-more-btn">
                    <a href="" @click.prevent="loadMore">Больше запросов</a>
                </div>
            </div>
            <the-loader v-if="isLoading" />
        </div>
    </div>
</template>

<script>
import order from '@/mixins/order';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import OrderItem from '@/modules/order/components/OrderItem';

export default {
    name: 'Index',
    components: {
        OrderItem,
        Treeselect,
    },
    head: {
        title: 'Мои сделки',
    },
    mixins: [order],
    data() {
        return {
            selectedSort: null,
            sortType: [
                {
                    label: 'Сортировать по дате',
                    id: '-date',
                    type: 'desc',
                },
                {
                    label: 'Сортировать по дате',
                    id: 'date',
                    type: 'asc',
                },
                {
                    label: 'Сортировать по номеру',
                    id: '-number',
                    type: 'desc',
                },
                {
                    label: 'Сортировать по номеру',
                    id: 'number',
                    type: 'asc',
                },
            ],
        };
    },
    methods: {
        async changeSort() {
            this.options.page = 1;
            this.options.itemsPerPage = 10;
            this.orders = [];
            await this.$fetch();
        },
    },
};
</script>
<style lang="sass"></style>
