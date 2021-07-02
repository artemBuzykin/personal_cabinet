require('dotenv').config();

global.File = typeof window === 'undefined' ? Object : window.File;
global.FileList = typeof window === 'undefined' ? Object : window.FileList;
export default {
    mode: 'universal',

    srcDir: __dirname,
    target: 'server',
    head: {
        // title: process.env.APP_NAME,
        // titleTemplate: '%s - ' + process.env.APP_NAME,
        title: 'LK',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Pesonal Medeq',
            },
        ],
        link: [
            // {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
    },

    css: ['@/assets/sass/lk.sass'],

    plugins: ['~components/global', '~plugins/vue-api-query', '~plugins/vue-js-modal.js'],

    modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', '@nuxtjs/router', '@nuxtjs/auth-next'],

    styleResources: {
        sass: ['@/assets/sass/_vars.sass'],
    },

    buildModules: ['@nuxtjs/dotenv'],

    axios: {},
    publicRuntimeConfig: {
        axios: {
            baseURL: process.env.API_URL,
        },
        apiURL: process.env.API_URL,
        siteURL: process.env.SITE_URL,
        siteStorageURL: process.env.SITE_STORAGE_URL,
        companyDataUrl: process.env.COMPANY_DATA_URL,
        apiSuggestionsToken: process.env.API_SUGGESTIONS_TOKEN,
        socketURL: `${process.env.SOCKET_URL}:${process.env.SOCKET_PORT}`,
    },
    privateRuntimeConfig: {},
    auth: {
        localStorage: false,
        strategies: {
            local: {
                token: {
                    property: 'access_token',
                },
                endpoints: {
                    login: {
                        url: '/clients/verify',
                        method: 'post',
                    },
                    logout: { url: '/clients/logout', method: 'post' },
                    user: { url: '/clients/me', method: 'get' },
                },
                user: {
                    property: false,
                },
            },
        },
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login',
            home: '/',
        },
        rewriteRedirects: true,
        cookie: {
            options: {
                domain: process.env.DOMAIN_URL, // .medeq.ru
                expires: 30,
            },
        },
    },

    router: {
        middleware: ['auth'],
    },

    build: {
        extend(config, ctx) {
            if (ctx.dev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        fix: true,
                    },
                });
            }
        },
        // extractCSS: true,
        // splitChunks:{
        //     layouts: true
        // }
    },
};
