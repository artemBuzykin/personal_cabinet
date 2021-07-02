<template>
    <div class="lk-documents">
        <empty-placeholder
            v-if="!isLoading && !documents.length"
            :show-actives="false"
            src="documents-empty.png"
        >
            <h3>Документы отсутствуют</h3>
            <template #content>
                <p>
                    Здесь будут храниться все документы, <br />
                    прикрепленные к переписке
                </p>
            </template>
        </empty-placeholder>
        <div v-else class="lk-documents__block">
            <div class="lk-documents__list">
                <document-item
                    v-for="document in documents"
                    :key="document.id"
                    :document="document"
                />
            </div>
            <div v-if="showMoreButton" class="lk-documents-item__more fetch-more-btn">
                <a href="" class="btn-rev" @click.prevent="loadMore">Загрузить еще</a>
            </div>
            <the-loader v-if="isLoading" />
        </div>
    </div>
</template>

<script>
import DocumentItem from './DocumentItem.vue';

export default {
    components: {
        DocumentItem,
    },
    data() {
        return {
            isLoading: false,
            options: {
                itemsPerPage: 10,
                page: 1,
            },
            total: 0,
            documents: [],
        };
    },
    async fetch() {
        this.isLoading = true;
        const { page, itemsPerPage } = this.options;
        const { data } = await this.$axios.get('/deals/documents/all?sort=-date', {
            params: {
                page,
                limit: itemsPerPage,
            },
        });
        const { data: documents, meta } = data;
        this.total = meta.total;
        if (page === 1) {
            this.documents = [...documents];
        } else {
            this.documents = [...this.documents, ...documents];
        }
        this.isLoading = false;
    },
    computed: {
        showMoreButton() {
            return this.options.page * this.options.itemsPerPage < this.total;
        },
    },
    created() {
        this.$nuxt.$on('messages-updated', this.reFetch);
    },
    beforeDestroy() {
        this.$nuxt.$off('messages-updated');
    },
    methods: {
        async loadMore() {
            this.options.page++;
            await this.$fetch();
        },
        async reFetch() {
            this.options.page = 1;
            await this.$fetch();
        },
    },
};
</script>

<style lang="sass" scoped>
.lk-documents-item__more
    margin-top: 15px
</style>
