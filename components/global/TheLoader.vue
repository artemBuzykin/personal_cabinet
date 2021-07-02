<template>
    <div v-if="timeout" class="loader">
        <div class="cssload-spin-box" />
    </div>
</template>

<script>
export default {
    name: 'Loader',
    data: () => ({
        timeout: false,
    }),
    mounted() {
        setTimeout(() => {
            this.timeout = true;
        }, 1000);
    },
};
</script>

<style lang="sass" scoped>
.loader
  position: relative
  display: flex
  align-items: center
  justify-content: center
  height: 150px
.cssload-spin-box
  width: 10px
  height: 10px
  border-radius: 100%
  box-shadow: 10px 10px rgb(59,88,152), -10px 10px rgb(234,239,244), -10px -10px rgb(59,88,152), 10px -10px rgb(234,239,244)
  animation: cssload-spin ease infinite 3.6s
@keyframes cssload-spin
  0%,
  100%
    box-shadow: 10px 10px rgb(59,88,152), -10px 10px rgb(234,239,244), -10px -10px rgb(59,88,152), 10px -10px rgb(234,239,244)
  25%
    box-shadow: -10px 10px rgb(234,239,244), -10px -10px rgb(59,88,152), 10px -10px rgb(234,239,244), 10px 10px rgb(59,88,152)
  50%
    box-shadow: -10px -10px rgb(59,88,152), 10px -10px rgb(234,239,244), 10px 10px rgb(59,88,152), -10px 10px rgb(234,239,244)
  75%
    box-shadow: 10px -10px rgb(234,239,244), 10px 10px rgb(59,88,152), -10px 10px rgb(234,239,244), -10px -10px rgb(59,88,152)
</style>
