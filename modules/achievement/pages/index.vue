<template>
    <div class="lk-bonuses">
        <the-banner src="bannerBonus.png">
            <h2>В разделе Бонусы и достижения вы можете:</h2>
            <p>Обсуждать все условия покупки с персональным менеджером</p>
            <p>Обмениваться документами по сделке в электронном виде</p>
            <p>Отслеживать статус и текущее местоположения своих заказов</p>
            <p>Поделиться своим мнением об оборудовании</p>
        </the-banner>
        <div class="lk-bonuses-content lk-page-content">
            <the-loader v-if="isLoading" />
            <template v-else>
                <div class="lk-bonuses-count">
                    <h3>Бонусы</h3>
                    <div class="lk-bonuses-count__sum">
                        Вы совершили покупок на {{ dealsSum }} рублей
                    </div>
                    <div class="lk-bonuses-count__total">
                        <span>Ваш текущий бонус: {{ $auth.user.bonus_summary }} рублей</span>
                        <div class="bonuses-count__tooltip-wrap">
                            <v-popover
                                offset="26"
                                placement="right-start"
                                popover-class="bonuses-history-tooltip"
                            >
                                <div class="lk-bonuses-count__total-tooltip">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            fill="#a9b2c5"
                                            class="cls-1"
                                            d="M1259,300a7,7,0,1,0,7,7A7.021,7.021,0,0,0,1259,300Zm1,11h-2v-5h2v5Zm0-6h-2v-2h2v2Z"
                                            transform="translate(-1252 -300)"
                                        />
                                    </svg>
                                </div>
                                <template slot="popover">
                                    <div class="bonuses-history">
                                        <div v-close-popover class="delete" />
                                        <div class="bonuses-history__title">
                                            История начисления/снятия бонусов
                                        </div>
                                        <div class="bonuses-history__body">
                                            <div
                                                v-for="(item, i) in bonusActivity"
                                                :key="i"
                                                class="bonuses-history__body-item"
                                            >
                                                {{ item.description === 'withdraw' ? '-' : '+' }}
                                                {{ item.info.bonus }} рублей за заказ
                                                {{ item.info.deal_code }}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </v-popover>
                        </div>
                    </div>
                </div>
                <div class="lk-bonuses-progress">
                    <h3>Достижения</h3>
                    <div v-if="openedProgress.length > 0" class="lk-bonuses-progress__block">
                        <span>Открытые</span>
                        <div class="lk-bonuses-progress__wrap">
                            <div
                                v-for="item in openedProgress"
                                :key="item.id"
                                class="lk-bonuses-progress__item"
                            >
                                <div class="lk-bonuses-progress__item-img">
                                    <img
                                        :src="`${$config.siteStorageURL}${item.image_url}`"
                                        alt=""
                                    />
                                </div>
                                <div class="lk-bonuses-progress__item-text">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="closedProgress.length > 0" class="lk-bonuses-progress__block">
                        <span>Не открытые</span>
                        <div class="lk-bonuses-progress__wrap">
                            <div
                                v-for="item in closedProgress"
                                :key="item.id"
                                class="lk-bonuses-progress__item"
                            >
                                <div class="lk-bonuses-progress__item-img closed">
                                    <img
                                        :src="`${$config.siteStorageURL}${item.image_url}`"
                                        alt=""
                                    />
                                </div>
                                <div class="lk-bonuses-progress__item-text">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AchievementsIndex',
    data: () => ({
        isLoading: false,
        openedProgress: [],
        closedProgress: [],
        dealsSum: 0,
        bonusActivity: [],
    }),
    async fetch() {
        this.isLoading = true;
        const openDataRequest = this.$axios.get('/achievements?filter[achieved]=true');
        const closeDataRequest = this.$axios.get('/achievements?filter[achieved]=false');
        const dealsSumRequest = this.$axios.get('/clients/bonus/deals-sum');
        const bonusActivityRequest = this.$axios.get('/clients/bonus/activity');
        const [
            openDataResponse,
            closeDataResponse,
            dealsSumResponse,
            bonusActivityResponse,
        ] = await Promise.all([
            openDataRequest,
            closeDataRequest,
            dealsSumRequest,
            bonusActivityRequest,
        ]);
        const {
            data: { data: openedProgress },
        } = openDataResponse;
        const {
            data: { data: closedProgress },
        } = closeDataResponse;
        const {
            data: { data: bonusActivity },
        } = bonusActivityResponse;
        this.openedProgress = [...openedProgress];
        this.closedProgress = [...closedProgress];
        this.dealsSum = dealsSumResponse.data.sum;
        this.bonusActivity = bonusActivity;
        this.isLoading = false;
    },
    head: {
        title: 'Бонусы и достижения',
    },
};
</script>

<style lang="sass">
@import '@/assets/sass/pages/_bonusses';
</style>
