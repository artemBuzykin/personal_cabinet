<template>
    <div class="chat-uploader-wrap">
        <div v-if="files.length" class="chat-uploader-files-wrap">
            <div class="chat-uploader-files">
                <chat-uploader-document
                    v-for="(file, index) in files"
                    :key="index"
                    :document="file"
                    :index="index"
                    @delete-upload-file="deleteFile"
                />
            </div>
        </div>
        <div v-if="errors.length" class="chat-uploader-error-block">
            <div class="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="38px"
                    height="36px"
                >
                    <path
                        fill-rule="evenodd"
                        fill="rgb(190, 45, 52)"
                        d="M36.891,15.955 C36.898,16.022 36.905,16.090 36.912,16.158 C37.142,18.246 37.031,20.405 36.488,22.560 C34.630,29.502 28.898,34.534 22.053,35.697 C21.854,35.732 21.656,35.765 21.457,35.793 C21.268,35.819 21.080,35.842 20.890,35.862 C15.490,36.453 10.038,34.600 6.113,30.682 C4.207,28.721 2.854,26.432 2.014,24.006 C1.991,23.941 1.971,23.876 1.948,23.811 C1.847,23.508 1.741,23.208 1.657,22.901 C0.755,19.787 0.685,16.433 1.551,13.186 C3.137,7.591 7.199,3.375 12.212,1.357 C12.220,1.354 12.228,1.351 12.235,1.348 C12.707,1.158 13.186,0.987 13.674,0.838 C13.850,0.783 14.027,0.736 14.204,0.686 C14.523,0.599 14.842,0.516 15.167,0.446 C15.523,0.367 15.881,0.305 16.240,0.248 C16.387,0.225 16.533,0.200 16.681,0.181 C21.993,-0.530 27.562,1.098 31.699,5.113 C34.477,7.889 36.173,11.385 36.759,15.045 C36.811,15.346 36.854,15.650 36.891,15.955 ZM30.862,27.156 C30.979,27.004 31.085,26.844 31.196,26.688 C31.357,26.461 31.518,26.234 31.666,25.999 C31.743,25.877 31.814,25.752 31.888,25.629 C32.070,25.320 32.245,25.008 32.404,24.688 C32.435,24.626 32.465,24.565 32.495,24.503 C34.565,20.189 34.542,14.962 31.969,10.505 C31.199,9.171 30.253,8.001 29.180,7.005 C29.159,6.986 29.138,6.967 29.117,6.948 C28.779,6.638 28.428,6.345 28.067,6.070 C28.037,6.048 28.008,6.026 27.978,6.004 C27.615,5.732 27.242,5.477 26.858,5.240 C26.834,5.225 26.810,5.211 26.787,5.197 C26.393,4.957 25.990,4.736 25.577,4.534 C25.562,4.527 25.547,4.520 25.532,4.512 C25.114,4.310 24.688,4.127 24.255,3.965 C24.237,3.958 24.219,3.951 24.201,3.945 C23.778,3.788 23.349,3.652 22.915,3.533 C22.869,3.521 22.822,3.510 22.776,3.498 C22.375,3.393 21.970,3.305 21.562,3.234 C21.457,3.216 21.352,3.202 21.247,3.186 C20.895,3.132 20.540,3.088 20.184,3.059 C20.001,3.045 19.815,3.039 19.630,3.031 C19.339,3.018 19.048,3.008 18.756,3.012 C18.514,3.016 18.275,3.033 18.035,3.048 C17.786,3.064 17.537,3.076 17.288,3.104 C17.036,3.133 16.790,3.177 16.542,3.218 C16.303,3.257 16.065,3.292 15.827,3.343 C15.586,3.395 15.350,3.463 15.113,3.526 C14.874,3.590 14.634,3.650 14.397,3.726 C14.167,3.800 13.945,3.889 13.721,3.973 C13.484,4.062 13.246,4.148 13.012,4.250 C12.784,4.350 12.564,4.463 12.342,4.573 C12.125,4.680 11.908,4.786 11.694,4.904 C11.441,5.046 11.196,5.200 10.952,5.355 C10.794,5.455 10.635,5.554 10.482,5.660 C10.189,5.862 9.905,6.076 9.628,6.298 C9.544,6.365 9.458,6.431 9.376,6.500 C9.059,6.765 8.753,7.042 8.460,7.332 C8.425,7.367 8.389,7.401 8.354,7.436 C8.038,7.754 7.736,8.086 7.449,8.432 C7.436,8.448 7.422,8.464 7.409,8.480 C7.116,8.836 6.839,9.206 6.580,9.589 C6.569,9.604 6.559,9.619 6.549,9.634 C6.293,10.014 6.055,10.406 5.835,10.809 C5.821,10.835 5.807,10.860 5.793,10.886 C5.579,11.282 5.384,11.688 5.206,12.104 C5.191,12.139 5.176,12.174 5.161,12.208 C4.986,12.627 4.829,13.055 4.692,13.491 C4.683,13.519 4.674,13.546 4.665,13.574 C4.234,14.973 4.000,16.459 4.000,18.000 C4.000,22.651 6.118,26.807 9.441,29.558 C9.448,29.564 9.455,29.571 9.463,29.578 C11.600,31.340 14.237,32.509 17.126,32.870 C17.373,32.901 17.621,32.924 17.869,32.943 C18.094,32.959 18.320,32.970 18.548,32.977 C18.774,32.984 19.001,32.992 19.228,32.989 C19.467,32.985 19.702,32.969 19.937,32.954 C20.127,32.943 20.317,32.937 20.508,32.918 C21.875,32.777 23.189,32.452 24.425,31.972 C25.122,31.700 25.810,31.381 26.479,30.995 C28.232,29.983 29.699,28.667 30.862,27.156 ZM18.906,28.281 C18.191,28.281 17.547,27.851 17.273,27.191 C17.000,26.531 17.151,25.771 17.657,25.267 C18.162,24.761 18.922,24.610 19.582,24.883 C20.243,25.157 20.673,25.801 20.673,26.515 C20.673,27.490 19.882,28.281 18.906,28.281 ZM18.906,22.277 C17.930,22.277 17.139,21.487 17.139,20.511 L17.139,9.281 C17.139,8.305 17.930,7.515 18.906,7.515 C19.882,7.515 20.673,8.305 20.673,9.281 L20.673,20.511 C20.673,21.487 19.882,22.277 18.906,22.277 Z"
                    />
                </svg>
            </div>
            <div class="text">
                <div v-for="(error, index) in errors" :key="index">
                    <p>{{ error.name }}</p>
                    <p>{{ error.text }}</p>
                </div>
            </div>
        </div>
        <div class="chat-uploader-dropzone-wrap">
            <div
                class="chat-uploader-dropzone"
                :class="{ dragging: isDragging }"
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @dragover.prevent
                @drop="onDrop"
            >
                <div class="chat-uploader-dropzone__img">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="39px"
                        height="37px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(199, 204, 214)"
                            d="M36.737,4.409 C33.720,1.370 28.810,1.370 25.792,4.409 L7.551,22.783 C6.674,23.667 6.191,24.841 6.190,26.091 C6.190,27.340 6.673,28.515 7.551,29.398 C9.361,31.222 12.307,31.222 14.118,29.398 L28.711,14.699 L26.522,12.494 L11.929,27.193 C11.325,27.801 10.343,27.801 9.740,27.193 C9.447,26.898 9.286,26.507 9.286,26.091 C9.286,25.674 9.447,25.283 9.740,24.988 L27.981,6.614 C29.792,4.790 32.738,4.790 34.548,6.614 C36.359,8.438 36.359,11.405 34.548,13.229 L16.307,31.603 C13.289,34.642 8.379,34.642 5.362,31.603 C2.344,28.563 2.344,23.618 5.362,20.578 L23.603,2.204 L21.414,-0.001 L3.173,18.373 C-1.052,22.629 -1.052,29.552 3.173,33.808 C5.285,35.935 8.060,36.999 10.834,36.999 C13.609,36.999 16.383,35.935 18.496,33.808 L36.737,15.434 C39.755,12.394 39.755,7.449 36.737,4.409 Z"
                        />
                    </svg>
                </div>
                <div class="chat-uploader-dropzone__content">
                    <p>
                        Перенесите сюда файл или
                        <label :for="uploaderId" class="choose">выберите файл</label> с компьютера.
                    </p>
                    <p>Поддерживаются файлы размером не более 15 мб.</p>
                    <input
                        :id="uploaderId"
                        type="file"
                        :multiple="multiple"
                        @change="onInputChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatUploaderDocument from './ChatUploaderDocument.vue';

export default {
    components: { ChatUploaderDocument },
    props: {
        value: {
            default() {
                return [];
            },
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        maxLength: {
            type: Number,
            default: 10,
        },
        maxFileSize: {
            type: Number,
            default: 15360,
        },
    },
    data() {
        return {
            id: null,
            isDragging: false,
            dragCount: 0,
            files: [...this.value],
            errors: [],
            document_format: {
                pdf: ['pdf'],
                txt: ['doc', 'docx', 'rtf', 'pps', 'pptx', 'ppt', 'pages'],
                table: ['xls', 'xlsx', 'numbers'],
                archive: ['zip', 'rar', '7z', 'gz'],
                img: ['jpeg', 'bmp', 'png', 'jpg', 'gif'],
            },
        };
    },
    computed: {
        uploaderId() {
            return `uploader_${this.id}`;
        },
        maxSizeConvert() {
            return this.maxFileSize * 1024;
        },
        allowedExtensions() {
            let extensions = [];
            Object.values(this.document_format).forEach((ext) => {
                extensions = [...extensions, ...ext];
            });
            return extensions;
        },
    },
    watch: {
        value: {
            handler(val) {
                this.files = [...val];
            },
        },
    },
    mounted() {
        this.id = Math.random().toString(36).substr(2, 10);
    },
    created() {
        this.$nuxt.$on('chat-uploader-reset-errors', this.resetErrors);
    },
    beforeDestroy() {
        this.$nuxt.$off('chat-uploader-reset-errors');
    },
    methods: {
        onDragEnter(e) {
            e.preventDefault();
            this.dragCount++;
            this.isDragging = true;
        },
        onDragLeave(e) {
            e.preventDefault();
            this.dragCount--;
            if (this.dragCount <= 0) {
                this.isDragging = false;
            }
        },
        onInputChange(e) {
            const { files } = e.target;
            if (this.multiple) {
                if (this.files.length + files.length > this.maxLength) {
                    return false;
                }
            }
            this.addFiles(files);
            e.target.value = null;
            return true;
        },
        async onDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.isDragging = false;
            const { files } = e.dataTransfer;
            if (this.multiple) {
                if (this.files.length + files.length > this.maxLength) {
                    return false;
                }
            }
            this.addFiles(files);
            return true;
        },
        resetErrors() {
            this.errors = [];
        },
        addFiles(files) {
            this.resetErrors();
            [...files].forEach((file) => {
                const reg = /(?:\.([^.]+))?$/;
                const document_ext = reg.exec(file.name)[1];
                const is_allow_ext = this.allowedExtensions.includes(document_ext);
                const is_allow_size = file.size <= this.maxSizeConvert;
                if (!is_allow_ext) {
                    this.errors.push({
                        name: file.name,
                        text: 'Недопустимый формат файла',
                    });
                    return false;
                }
                if (!is_allow_size) {
                    this.errors.push({
                        name: file.name,
                        text: 'Размер файла не должен превышать 15 Мб',
                    });
                    return false;
                }
                this.files.push(file);
                return true;
            });
            this.$emit('input', this.files);
        },
        deleteFile(index) {
            this.files.splice(index, 1);
            this.$emit('input', this.files);
        },
    },
};
</script>

<style lang="sass">
@import '@/assets/sass/components/_chat-uploader';
</style>
