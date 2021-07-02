<template>
    <div class="lk-banner-cont">
        <transition name="fade" mode="out-in">
            <div
                v-show="show"
                class="lk-banner"
                :class="{ show: show }"
                :style="{ backgroundImage: `url(${require(`@/assets/img/${src}`)})` }"
            >
                <div class="lk-banner__wrap">
                    <slot />
                </div>
            </div>
        </transition>
        <div class="lk-banner__toggle" @click="toggleBanner">
            <div :class="{ 'banner-open': !show }">
                <span class="arrow">
                    <svg
                        v-if="show"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="9"
                        viewBox="0 0 284.929 284.929"
                    >
                        <path
                            d="M282.082 76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856-2.471 0-4.661.95-6.563 2.856L142.466 174.441 30.262 62.241c-1.903-1.906-4.093-2.856-6.567-2.856-2.475 0-4.665.95-6.567 2.856L2.856 76.515C.95 78.417 0 80.607 0 83.082c0 2.473.953 4.663 2.856 6.565l133.043 133.046c1.902 1.903 4.093 2.854 6.567 2.854s4.661-.951 6.562-2.854L282.082 89.647c1.902-1.903 2.847-4.093 2.847-6.565 0-2.475-.945-4.665-2.847-6.571z"
                        />
                    </svg>
                    <svg
                        v-else
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
                <span class="text">{{ show ? 'скрыть баннер' : 'открыть баннер' }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    props: ['src'],
    data: () => ({
        show: null,
    }),
    mounted() {
        const local_item = localStorage.getItem('banner')
            ? JSON.parse(localStorage.getItem('banner'))
            : {};
        if (typeof local_item[this.$route.name] !== 'undefined') {
            const show = local_item[this.$route.name];
            this.show = show;
        } else {
            this.show = true;
        }
    },
    methods: {
        toggleBanner() {
            this.show = !this.show;
            const local_item = localStorage.getItem('banner')
                ? JSON.parse(localStorage.getItem('banner'))
                : {};
            local_item[`${this.$route.name}`] = this.show;
            localStorage.setItem('banner', JSON.stringify(local_item));
        },
    },
};
</script>

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: opacity .5s linear, padding .5s ease
.fade-enter, .fade-leave-to
  // height: 1px
  opacity: 0
  padding: 0
</style>
