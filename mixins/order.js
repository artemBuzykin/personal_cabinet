export default {
    data() {
        return {
            isLoading: false,
            options: {
                itemsPerPage: 10,
                page: 1,
                sort: '-date',
            },
            total: 0,
            orders: [],
        };
    },
    async fetch() {
        this.isLoading = true;
        const { page, itemsPerPage, sort } = this.options;
        const { data } = await this.$axios.get('/deals/all?include=products', {
            params: {
                page,
                limit: itemsPerPage,
                sort,
            },
        });
        const { data: orders, meta } = data;
        this.total = meta.total;
        if (page === 1) {
            this.orders = [...orders];
        } else {
            this.orders = [...this.orders, ...orders];
        }
        this.isLoading = false;
    },
    computed: {
        showMoreButton() {
            return this.options.page * this.options.itemsPerPage < this.total;
        },
    },
    methods: {
        async loadMore() {
            this.options.page++;
            await this.$fetch();
        },
    },
};
