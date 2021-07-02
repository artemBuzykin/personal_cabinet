<template>
    <div class="lk-profile-user__main">
        <div class="lk-profile-user-item">
            <div class="lk-profile-user-item__title">Имя</div>
            <div class="lk-profile-user-item__text">
                {{ personalData.first_name || 'Не заполнено' }}
            </div>
        </div>
        <div class="lk-profile-user-item">
            <div class="lk-profile-user-item__title">Фамилия</div>
            <div class="lk-profile-user-item__text">
                {{ personalData.last_name || 'Не заполнено' }}
            </div>
        </div>
        <div class="lk-profile-user-item">
            <div class="lk-profile-user-item__title">Ссылка на соц.сеть</div>
            <div class="lk-profile-user-item__text lk-profile-user-item__social">
                <a
                    v-if="personalData.social_networks && personalData.social_networks.vkontakte"
                    :href="personalData.social_networks.vkontakte"
                    target="_blank"
                    class="lk-profile-user-item__social-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="28px"
                        height="28px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(206, 214, 233)"
                            d="M-0.000,-0.006 L-0.000,27.994 L28.000,27.994 L28.000,-0.006 L-0.000,-0.006 ZM23.215,17.052 C23.726,17.575 24.836,18.447 24.635,19.338 C24.448,20.156 23.228,19.856 22.045,19.905 C20.692,19.961 19.890,19.991 19.079,19.338 C18.695,19.028 18.472,18.661 18.104,18.251 C17.770,17.879 17.350,17.214 16.778,17.240 C15.750,17.291 16.070,18.723 15.704,19.702 C9.990,20.601 7.695,17.069 5.670,13.644 C4.689,11.985 3.272,8.420 3.272,8.420 L7.314,8.405 C7.314,8.405 8.611,10.766 8.954,11.372 C9.246,11.890 9.568,12.301 9.899,12.762 C10.178,13.144 10.618,13.895 11.099,13.834 C11.882,13.734 12.025,10.694 11.539,9.676 C11.346,9.263 10.882,9.120 10.402,8.979 C10.564,7.956 14.936,7.744 15.643,8.536 C16.668,9.689 14.932,12.898 16.336,13.834 C18.310,12.799 19.996,8.470 19.996,8.470 L24.728,8.498 C24.728,8.498 23.988,10.839 23.213,11.877 C22.762,12.485 21.263,13.840 21.321,14.845 C21.367,15.640 22.589,16.414 23.215,17.052 Z"
                        />
                    </svg>
                </a>
                <a
                    v-if="
                        personalData.social_networks && personalData.social_networks.odnoklassniki
                    "
                    :href="personalData.social_networks.odnoklassniki"
                    target="_blank"
                    class="lk-profile-user-item__social-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="28px"
                        height="28px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(206, 214, 233)"
                            d="M-0.000,27.994 L-0.000,-0.006 L28.000,-0.006 L28.000,27.994 L-0.000,27.994 ZM13.994,3.999 C11.214,3.999 8.943,6.380 8.943,9.323 C8.943,12.253 11.214,14.634 13.994,14.634 C16.775,14.634 19.045,12.253 19.045,9.323 C19.045,6.380 16.775,3.999 13.994,3.999 ZM19.816,15.281 C19.524,14.682 18.738,14.181 17.691,15.047 C17.691,15.047 16.277,16.234 13.996,16.234 C11.715,16.234 10.301,15.047 10.301,15.047 C9.255,14.177 8.465,14.682 8.177,15.281 C7.687,16.336 8.243,16.841 9.512,17.703 C10.592,18.433 12.082,18.700 13.040,18.807 C13.023,18.824 13.015,18.833 13.006,18.843 C13.112,18.731 12.916,18.938 13.006,18.843 C12.861,18.995 12.136,19.760 9.266,22.784 C8.168,23.938 9.936,25.788 11.034,24.660 L14.005,21.520 C15.142,22.719 16.233,23.868 16.976,24.664 C18.074,25.797 19.841,23.962 18.755,22.788 C18.674,22.704 14.729,18.558 14.970,18.812 C15.939,18.705 17.408,18.422 18.474,17.707 L18.473,17.706 C19.742,16.840 20.299,16.336 19.816,15.281 ZM13.994,11.937 C12.628,11.937 11.514,10.762 11.514,9.323 C11.513,7.869 12.628,6.696 13.994,6.696 C15.360,6.696 16.475,7.871 16.475,9.323 C16.475,10.762 15.360,11.937 13.994,11.937 Z"
                        />
                    </svg>
                </a>
                <a
                    v-if="personalData.social_networks && personalData.social_networks.facebook"
                    :href="personalData.social_networks.facebook"
                    target="_blank"
                    class="lk-profile-user-item__social-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="28px"
                        height="28px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(206, 214, 233)"
                            d="M28.000,-0.006 L-0.000,-0.006 L-0.000,27.994 L14.000,27.994 L14.000,17.416 L10.577,17.416 L10.577,12.749 L14.000,12.749 L14.000,10.932 C14.000,7.796 16.354,4.972 19.250,4.972 L23.022,4.972 L23.022,9.639 L19.250,9.639 C18.837,9.639 18.355,10.140 18.355,10.891 L18.355,12.749 L23.022,12.749 L23.022,17.416 L18.355,17.416 L18.355,27.994 L23.333,27.994 C24.381,27.994 28.000,27.994 28.000,27.994 L28.000,-0.006 Z"
                        />
                    </svg>
                </a>
                <a
                    v-if="personalData.social_networks && personalData.social_networks.instagram"
                    :href="personalData.social_networks.instagram"
                    target="_blank"
                    class="lk-profile-user-item__social-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="28px"
                        height="28px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(206, 214, 233)"
                            d="M-0.000,27.997 L-0.000,-0.003 L28.000,-0.003 L28.000,27.997 L-0.000,27.997 ZM24.000,9.998 C24.000,7.357 21.641,3.998 19.000,3.998 L9.000,3.998 C6.358,3.998 4.000,7.357 4.000,9.998 L4.000,18.998 C4.000,21.641 6.358,23.998 9.000,23.998 L19.000,23.998 C21.641,23.998 24.000,21.641 24.000,18.998 L24.000,9.998 ZM18.702,21.466 L9.292,21.466 C7.789,21.466 6.569,20.244 6.569,18.741 L6.569,9.332 C6.569,7.830 7.789,6.609 9.292,6.609 L18.702,6.609 C20.203,6.609 21.426,7.830 21.426,9.332 L21.426,18.741 C21.426,20.244 20.203,21.466 18.702,21.466 ZM13.996,9.147 C11.300,9.147 9.105,11.341 9.105,14.038 C9.105,16.733 11.300,18.929 13.996,18.929 C16.692,18.929 18.887,16.733 18.887,14.038 C18.887,11.341 16.694,9.147 13.996,9.147 ZM19.045,7.843 C18.407,7.843 17.888,8.363 17.888,9.000 C17.888,9.639 18.407,10.158 19.045,10.158 C19.683,10.158 20.203,9.639 20.203,9.000 C20.203,8.363 19.683,7.843 19.045,7.843 ZM13.996,16.862 C12.440,16.862 11.173,15.596 11.173,14.038 C11.173,12.480 12.440,11.214 13.996,11.214 C15.554,11.214 16.821,12.482 16.821,14.038 C16.821,15.596 15.554,16.862 13.996,16.862 Z"
                        />
                    </svg>
                </a>
                <a
                    v-if="personalData.social_networks && personalData.social_networks.twitter"
                    :href="personalData.social_networks.twitter"
                    target="_blank"
                    class="lk-profile-user-item__social-item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="28px"
                        height="28px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(206, 214, 233)"
                            d="M-0.000,27.998 L-0.000,-0.003 L28.000,-0.003 L28.000,27.998 L-0.000,27.998 ZM23.742,6.133 C22.952,6.604 22.088,6.927 21.174,7.126 C20.433,6.331 19.371,5.834 18.211,5.834 C15.963,5.834 14.160,7.672 14.160,9.907 C14.160,10.230 14.185,10.527 14.259,10.825 C10.901,10.676 7.937,9.038 5.936,6.579 C4.504,9.162 6.110,11.297 7.171,12.018 C6.529,12.018 5.887,11.819 5.344,11.521 C5.344,13.532 6.751,15.196 8.579,15.568 C8.184,15.693 7.295,15.767 6.751,15.643 C7.270,17.257 8.777,18.448 10.530,18.473 C9.147,19.566 7.122,20.435 4.529,20.162 C6.332,21.329 8.455,21.999 10.752,21.999 C18.211,21.999 22.260,15.792 22.260,10.428 C22.260,10.255 22.260,10.080 22.236,9.907 C23.075,9.286 23.767,8.566 24.286,7.747 C23.545,8.069 22.779,8.293 21.964,8.392 C22.804,7.895 23.446,7.101 23.742,6.133 Z"
                        />
                    </svg>
                </a>
                <span
                    class="lk-profile-user-item__social-item lk-profile-user-item__social-item-add"
                    @click="openModalPersonal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="22px"
                        height="22px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(206, 214, 233)"
                            d="M-0.000,-0.000 L22.000,-0.000 L22.000,22.000 L-0.000,22.000 L-0.000,-0.000 Z"
                        />
                        <path
                            fill-rule="evenodd"
                            fill="rgb(255, 255, 255)"
                            d="M10.000,4.000 L12.000,4.000 L12.000,18.000 L10.000,18.000 L10.000,4.000 Z"
                        />
                        <path
                            fill-rule="evenodd"
                            fill="rgb(255, 255, 255)"
                            d="M18.000,10.000 L18.000,12.000 L4.000,12.000 L4.000,10.000 L18.000,10.000 Z"
                        />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        personalData() {
            return this.$auth.user;
        },
    },
    methods: {
        openModalPersonal() {
            this.$modal.show('personal-form-modal');
        },
    },
};
</script>

<style lang="scss" scoped></style>
