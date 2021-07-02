<template>
    <div id="app">
        <the-header />
        <div class="lk">
            <div class="lk-title">
                <div class="container">
                    <div class="title title-space main-title">
                        <h2 class="title-h2">Личный кабинет</h2>
                        <div class="mobile-menu-btn" @click="mobileMenu = !mobileMenu">
                            <span />
                        </div>
                    </div>
                </div>
            </div>
            <div class="lk-navigation" :class="{ mobileMenu: mobileMenu }">
                <div class="container">
                    <div class="lk-navigation-mobile">
                        <div class="lk-navigation-mobile__header">
                            <div class="mobile-menu-close" @click="mobileMenu = !mobileMenu" />
                        </div>
                    </div>
                    <nav class="lk-nav" @click="mobileMenu = false">
                        <nuxt-link
                            class="lk-nav__link"
                            :exact="isExact"
                            active-class="active"
                            to="/"
                        >
                            Мои сделки
                        </nuxt-link>
                        <nuxt-link
                            class="lk-nav__link"
                            active-class="active"
                            :to="{ name: 'discussions.index' }"
                        >
                            Обсуждения
                        </nuxt-link>
                        <nuxt-link
                            class="lk-nav__link"
                            active-class="active"
                            :to="{ name: 'achievements.index' }"
                        >
                            Бонусы
                        </nuxt-link>
                        <nuxt-link
                            class="lk-nav__link"
                            active-class="active"
                            :to="{ name: 'tracking.index' }"
                        >
                            Отслеживание
                        </nuxt-link>
                        <nuxt-link
                            class="lk-nav__link"
                            active-class="active"
                            :to="{ name: 'reviews.index' }"
                        >
                            Отзывы
                        </nuxt-link>
                        <nuxt-link
                            class="lk-nav__link"
                            active-class="active"
                            :to="{ name: 'profile.index' }"
                        >
                            Профиль
                        </nuxt-link>
                    </nav>
                </div>
            </div>
            <div class="lk-content">
                <div class="container">
                    <nuxt />
                </div>
            </div>
        </div>
        <the-footer />
    </div>
</template>

<script>
import TheHeader from '@/components/global/TheHeader';
import TheFooter from '@/components/global/TheFooter';

export default {
    name: 'DefaultLayout',
    components: {
        TheHeader,
        TheFooter,
    },
    transition: {
        name: 'page',
    },
    data() {
        return {
            isExact: true,
            mobileMenu: false,
        };
    },
};
</script>

<style lang="sass" scoped>
.page-enter, .page-leave-to
    opacity: 0
.page-enter-active, .page-leave-active
    transition: .15s
</style>
