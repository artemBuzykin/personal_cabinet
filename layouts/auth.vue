<template>
    <div id="app">
        <the-header />
        <nuxt />
        <the-footer />
    </div>
</template>

<script>
import TheHeader from '@/components/global/TheHeader';
import TheFooter from '@/components/global/TheFooter';

export default {
    components: {
        TheHeader,
        TheFooter,
    },
};
</script>
