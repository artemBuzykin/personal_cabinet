<template>
    <div class="lk-equipment">
        <the-banner src="bannerEquipment.png">
            <h2>В этом разделе вы можете:</h2>
            <p>
                Отслеживать даты окончания гарантийного срока и рекомендуемую дату технического
                обслуживания
            </p>
            <p>Создавать заявки на ремонт и сервис</p>
            <p>Отслеживать статус и текущее местоположения своих заказов</p>
            <p>Поделиться своим мнением об оборудовании</p>
        </the-banner>
        <div class="lk-equipment-content">
            <div class="lk-equipment__new">
                <MedPopup
                    modal-class="equipment-create-modal"
                    content-class="equipment-create-modal__content"
                >
                    <template #btnOpen>
                        <div class="lk-equipment__new-btn">Добавить свое оборудование</div>
                    </template>
                    <template #body>
                        <equipment-item-create />
                    </template>
                </MedPopup>
            </div>
            <the-loader v-if="isLoading" />
            <empty-placeholder v-else-if="!equipments.length" src="equipment-empty.png">
                <h3>Оборудование отсутствует!</h3>
            </empty-placeholder>
            <div v-if="equipments.length" class="lk-equipment-block">
                <div class="lk-equipment-block__header">
                    <h2>Мое оборудование</h2>
                    <div class="lk-equipment-block__sort">
                        <!-- <vue-select placeholder="Сортировать по дате" :searchable="false" :options="sortType"
                            :reduce="country => country.type" label="label" v-model="selectedSort">
                        </vue-select> -->
                    </div>
                </div>
                <div class="lk-equipment-block__content">
                    <equipment-item
                        v-for="equipment in equipments"
                        :key="equipment.id"
                        :equipment="equipment"
                    />
                </div>
                <div v-if="showMoreButton" class="lk-equipment-item__more fetch-more-btn">
                    <a href="" @click.prevent="loadMore">Показать больше</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EquipmentItem from '../components/EquipmentItem';
import EquipmentItemCreate from '../components/EquipmentItemCreate';

export default {
    name: 'EquipmentIndex',
    components: {
        EquipmentItem,
        EquipmentItemCreate,
    },
    async asyncData(cxt) {
        const page = cxt.route.query.page ? parseInt(cxt.route.query.page) : 1;
        const limit = cxt.route.query.limit ? parseInt(cxt.route.query.limit) : 10;
        const sort = cxt.route.query.sort ? cxt.route.query.sort : 'asc';
        // let response = await Role.where("query",encodeURI(search)).limit(limit).page(page).get();
        const response = await cxt.app.$axios.get('/equipment', {
            params: {
                _page: page,
                _limit: limit,
                _sort: 'id',
                _order: sort,
            },
        });
        return {
            options: {
                itemsPerPage: limit,
                page,
                sort,
            },
            isLoading: false,
            equipments: response.data,
            total: response.headers['x-total-count'],
        };
    },
    data: () => ({
        isLoading: true,
        selectedSort: null,
        sortType: [
            {
                label: 'По возрастанию',
                type: 'asc',
            },
            {
                label: 'По убыванию',
                type: 'desc',
            },
        ],
    }),
    computed: {
        showMoreButton() {
            return this.options.page * this.options.itemsPerPage < this.total;
        },
    },
    watch: {
        // async selectedSort(val) {
        //     this.$store.commit("equipment/CLEAR_EQUIPMENT")
        //     this.$store.commit("equipment/SET_SORT", val)
        //     await this.$store.dispatch('equipment/loadEquipment');
        // }
    },
    methods: {
        async loadMore() {
            this.options.page++;
            const response = await this.fetchEquipments();
            this.equipments = [...this.equipments, ...response.data];
        },
        async fetchEquipments() {
            this.changeLoading();
            const response = await this.$axios.get('/equipment', {
                params: {
                    _embed: ['products'],
                    _page: this.options.page,
                    _limit: this.options.itemsPerPage,
                    _sort: 'id',
                    _order: this.options.sort,
                },
            });
            this.total = response.headers['x-total-count'];
            this.changeLoading(false);
            return response;
        },
        changeLoading(load = true) {
            load ? (this.isLoading = true) : (this.isLoading = false);
        },
    },
};
</script>

<style lang="scss" scoped></style>
