<template>
    <div id="app">
        <div class="error-page__block">
            <div class="error-page__block-type">
                <span>{{ error.statusCode }}</span>
            </div>
            <div class="error-page__block-text">
                <h2>{{ title }}</h2>
                <p>
                    Вы можете перейти на главную страницу или <br />
                    воспользоваться каталогом товаров.
                </p>
            </div>
            <div class="error-page__block-active">
                <nuxt-link class="btn" to="/"> На главную </nuxt-link>
                <a class="btn" :href="`${$config.siteURL}/store`"> Каталог </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            pageNotFound: 'Страница не найдена',
            otherError: 'Ой, что-то пошло не так',
        };
    },
    head() {
        return {
            title: this.title,
        };
    },
    computed: {
        title() {
            return this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        },
    },
};
</script>

<style lang="sass" scoped>
//Error Page
.error-page__block
  background: #fff
  padding-top: 80px
  padding-bottom: 100px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.error-page__block-type
  min-height: 325px
  background: url('~assets/img/errorpage.png') no-repeat center center
  background-size: contain
  width: 440px
  max-width: 100%
  span
    display: inline-block
    font-size: 80px
    font-weight: 600
    line-height: 1
    color: #fff
    margin: 25px 0 0 55px
.error-page__block-text
  text-align: center
  padding-top: 35px
  h2
    font-size: 26px
    font-weight: 600
    color: #262626
    padding-bottom: 10px
  p
    font-size: 15px
.error-page__block-active
  padding-top: 25px
  display: flex
  flex-wrap: wrap
  .btn
    flex: 0 0 190px
    min-width: 190px
    &:last-child
      margin-left: 15px
@media only screen and (max-width: 767px)
    .error-page__block
      padding-top: 50px
    .error-page__block-type
      min-height: 250px
    .error-page__block-type span
      font-size: 64px
    .error-page__block-active
      flex-direction: column
    .error-page__block-active .btn
      flex: 0 0 100%
    .error-page__block-active .btn:last-child
      margin-left: 0
      margin-top: 15px
</style>
