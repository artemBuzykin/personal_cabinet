<template>
    <div class="empty-block">
        <div
            class="empty-block__img"
            :style="{
                backgroundImage: `url(${require(`@/assets/img/${src}`)})`,
            }"
        />
        <div class="empty-block__descr">
            <div class="empty-block__descr-title">
                <slot>
                    <h3>Здесь пусто</h3>
                </slot>
            </div>
            <div class="empty-block__descr-content">
                <div class="empty-block__descr-text">
                    <slot name="content">
                        <p>Звоните самостоятельно: 8(800) 555-73-87</p>
                        <p>Или пишите на info@medeq.ru</p>
                    </slot>
                </div>
                <div v-if="showActives" class="empty-block__descr-link">
                    <a :href="$config.siteURL" class="btn"> Вернуться на главную </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Empty',
    props: {
        src: {
            type: String,
        },
        showActives: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="sass">
@import '@/assets/sass/components/_empty';
</style>
