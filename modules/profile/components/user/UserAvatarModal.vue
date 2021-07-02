<template>
    <div class="user-avatar-uploader">
        <div class="user-avatar-uploader__title">
            {{ title }}
        </div>
        <div v-if="!isLoaded" class="image-uploader-wrapp">
            <div
                class="image-uploader"
                :class="{ dragging: isDragging }"
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @dragover.prevent
                @drop="onDrop"
            >
                <div class="image-uploader-empty-bg img-empty-bg" />
                <div class="image-uploader-empty-actions">
                    <p>Перетащите фотографию сюда, или</p>
                    <input
                        id="profile-avatar"
                        class="input-file"
                        accept="image/jpeg,image/png,image/jpg"
                        type="file"
                        @change="onFileChange"
                    />
                    <label for="profile-avatar">
                        <span class="button-upload btn">Выберите файл</span>
                    </label>
                </div>
            </div>
        </div>
        <div v-else class="image-cropping">
            <div class="cropping-rotate__actions">
                <div class="cropping-rotate__action" @click="rotateCrop(-90)">
                    <span class="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="16px"
                            height="18px"
                        >
                            <path
                                fill-rule="evenodd"
                                fill="rgb(73, 91, 128)"
                                d="M9.000,0.216 C8.832,0.482 8.986,1.509 8.630,1.778 L8.593,1.803 C12.728,2.110 16.000,5.619 16.000,9.890 C16.000,14.362 12.413,18.000 8.003,18.000 C3.594,18.000 0.006,14.362 0.006,9.890 C0.006,9.265 0.506,8.758 1.122,8.758 C1.739,8.758 2.238,9.265 2.238,9.890 C2.238,13.114 4.824,15.736 8.003,15.736 C11.182,15.736 13.768,13.114 13.768,9.890 C13.768,6.903 11.546,4.431 8.690,4.086 C9.025,4.358 8.961,4.808 8.862,5.237 C8.597,6.373 8.085,5.732 7.701,5.453 L5.216,3.772 C4.922,3.574 4.747,3.251 4.747,2.909 C4.747,2.567 4.922,2.244 5.216,2.046 L7.701,0.365 C8.086,0.106 8.744,-0.174 9.000,0.216 L9.000,0.216 Z"
                            />
                        </svg>
                    </span>
                    <span class="text">Влево</span>
                </div>
                <div class="cropping-rotate__action" @click="rotateCrop(90)">
                    <span class="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="16px"
                            height="18px"
                        >
                            <path
                                fill-rule="evenodd"
                                fill="rgb(73, 91, 128)"
                                d="M7.000,0.216 C7.168,0.482 7.013,1.509 7.370,1.778 L7.407,1.803 C3.272,2.110 -0.000,5.619 -0.000,9.890 C-0.000,14.362 3.587,18.000 7.997,18.000 C12.406,18.000 15.994,14.362 15.994,9.890 C15.994,9.265 15.494,8.758 14.878,8.758 C14.261,8.758 13.762,9.265 13.762,9.890 C13.761,13.114 11.175,15.736 7.997,15.736 C4.818,15.736 2.232,13.114 2.232,9.890 C2.232,6.903 4.454,4.431 7.310,4.086 C6.975,4.358 7.038,4.808 7.138,5.237 C7.403,6.373 7.914,5.732 8.299,5.453 L10.784,3.772 C11.077,3.574 11.253,3.251 11.253,2.909 C11.253,2.567 11.077,2.244 10.784,2.046 L8.299,0.365 C7.914,0.106 7.256,-0.174 7.000,0.216 L7.000,0.216 Z"
                            />
                        </svg>
                    </span>
                    <span class="text">Вправо</span>
                </div>
            </div>
            <div class="image-preview">
                <img ref="avatar" :src="avatar_base64" alt="" />
            </div>
        </div>
        <div v-if="errors.length">
            <div v-for="(error, index) in errors" :key="index" class="image-uploader-error">
                <div class="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="31px"
                        height="31px"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(190, 45, 52)"
                            d="M30.523,19.435 C28.914,25.469 23.917,29.826 17.969,30.771 C17.888,30.785 17.806,30.799 17.724,30.811 C17.134,30.895 16.537,30.953 15.931,30.968 C15.696,30.975 15.462,30.962 15.227,30.958 C15.037,30.955 14.848,30.962 14.657,30.951 C14.626,30.949 14.601,30.932 14.571,30.927 C10.822,30.713 7.207,29.174 4.464,26.427 C2.576,24.478 1.305,22.157 0.636,19.706 C0.601,19.583 0.581,19.458 0.549,19.334 C0.454,18.949 0.367,18.562 0.302,18.172 C-0.101,15.947 -0.051,13.629 0.551,11.366 C1.911,6.550 5.395,2.921 9.696,1.184 C9.703,1.181 9.710,1.178 9.718,1.176 C10.122,1.013 10.532,0.866 10.950,0.737 C11.102,0.689 11.254,0.649 11.407,0.606 C11.680,0.531 11.953,0.459 12.231,0.400 C12.537,0.331 12.845,0.278 13.154,0.229 C13.279,0.210 13.404,0.188 13.530,0.172 C18.087,-0.440 22.865,0.961 26.415,4.417 C28.798,6.806 30.253,9.815 30.755,12.966 C30.800,13.226 30.837,13.487 30.869,13.750 C30.875,13.808 30.881,13.866 30.886,13.925 C31.084,15.722 30.989,17.580 30.523,19.435 ZM15.500,2.000 C8.044,2.000 2.000,8.044 2.000,15.500 C2.000,22.955 8.044,28.999 15.500,28.999 C22.956,28.999 29.000,22.955 29.000,15.500 C29.000,8.044 22.956,2.000 15.500,2.000 Z"
                        />
                        <path
                            fill-rule="evenodd"
                            fill="rgb(190, 45, 52)"
                            d="M15.430,22.982 C14.907,22.982 14.435,22.666 14.235,22.181 C14.035,21.697 14.146,21.139 14.516,20.768 C14.886,20.397 15.442,20.286 15.925,20.487 C16.408,20.688 16.723,21.161 16.723,21.685 C16.723,22.401 16.144,22.982 15.430,22.982 ZM15.430,7.733 C16.144,7.733 16.723,8.313 16.723,9.030 L16.723,17.276 C16.723,17.992 16.144,18.573 15.430,18.573 C14.716,18.573 14.137,17.992 14.137,17.276 L14.137,9.030 C14.137,8.313 14.716,7.733 15.430,7.733 Z"
                        />
                    </svg>
                </div>
                <div class="text">
                    {{ error }}
                </div>
            </div>
        </div>
        <div class="image-uploader__actions">
            <div v-if="isLoaded" class="image-uploader__action">
                <button type="button" class="btn" @click="saveAvatar">Применить</button>
            </div>
            <div class="image-uploader__action">
                <button
                    type="button"
                    class="btn btn-rev"
                    @click="$modal.hide('personal-avatar-modal')"
                >
                    Отменить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    props: {
        maxFileSize: {
            type: Number,
            default: 5120,
        },
    },
    data() {
        return {
            avatar: null,
            avatar_base64: null,
            isDragging: false,
            dragCount: 0,
            errors: [],
            cropp_ref: null,
            cropper: {},
            allowed_extensions: ['jpeg', 'jpg', 'png'],
        };
    },
    computed: {
        title() {
            return this.avatar ? 'Редактирование фотографии профиля' : 'Выбор изображения профиля';
        },
        maxSizeConvert() {
            return this.maxFileSize * 1024;
        },
        isLoaded() {
            return !!this.avatar;
        },
    },
    methods: {
        onFileChange(e) {
            const { files } = e.target;
            this.addImageLikeFile(files);
            e.target.value = null;
            return true;
        },
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
        onDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.isDragging = false;
            const { files } = e.dataTransfer;
            this.addImageLikeFile(files);
        },
        async addImageLikeFile(files) {
            this.errors = [];
            const file = [...files][0];
            const reg = /(?:\.([^.]+))?$/;
            const document_ext = reg.exec(file.name)[1];
            const is_allow_ext = this.allowed_extensions.includes(document_ext);
            const is_allow_size = file.size <= this.maxSizeConvert;
            if (!is_allow_ext) {
                this.errors.push('Загружаемый файл не соответствует форматам *.jpeg, *.jpg, *.png');
                return false;
            }
            if (!is_allow_size) {
                this.errors.push('Размер загружаемого файла больше 5 Мб');
                return false;
            }
            const load_promise = new Promise((resolve) => {
                const reader = new FileReader();
                reader.addEventListener(
                    'load',
                    (e) => {
                        let image = new Image();
                        const { result } = e.target;
                        image.src = result;
                        image.addEventListener('load', () => {
                            const { height } = image;
                            const { width } = image;
                            if (height < 200 || width < 200) {
                                this.errors.push(
                                    'Минимальный размер изображения: 200 x 200 пикселей'
                                );
                                return false;
                            }
                            this.avatar_base64 = result;
                            image = undefined;
                            resolve();
                            return true;
                        });
                    },
                    false
                );
                reader.readAsDataURL(file);
            });
            await load_promise;
            this.avatar = file;
            this.$nextTick(() => {
                this.cropperInit();
            });
            return true;
        },
        cropperInit() {
            const minCroppedWidth = 200;
            const minCroppedHeight = 200;
            const maxCroppedWidth = 800;
            const maxCroppedHeight = 800;
            this.cropp_ref = this.$refs.avatar;
            this.cropper = new Cropper(this.cropp_ref, {
                zoomable: false,
                scalable: false,
                aspectRatio: 1,
                autoCropArea: 0.5,
                movable: false,
                toggleDragModeOnDblclick: false,
                viewMode: 1,
                crop: (event) => {
                    const { width } = event.detail;
                    const { height } = event.detail;

                    if (
                        width < minCroppedWidth ||
                        height < minCroppedHeight ||
                        width > maxCroppedWidth ||
                        height > maxCroppedHeight
                    ) {
                        this.cropper.setData({
                            width: Math.max(minCroppedWidth, Math.min(maxCroppedWidth, width)),
                            height: Math.max(minCroppedHeight, Math.min(maxCroppedHeight, height)),
                        });
                    }
                },
            });
        },
        deleteImage() {
            this.avatar = this.avatar_base64 = null;
        },
        rotateCrop(deg) {
            this.cropper.rotate(deg);
        },
        saveAvatar() {
            const crop_data = this.cropper.getData();
            const fd = new FormData();
            fd.append('image', this.avatar);
            fd.append('crop[x]', crop_data.x.toFixed());
            fd.append('crop[y]', crop_data.y.toFixed());
            fd.append('crop[width]', crop_data.width.toFixed());
            fd.append('crop[height]', crop_data.height.toFixed());
            fd.append('crop[rotate]', crop_data.rotate.toFixed());
            this.$axios({
                method: 'POST',
                url: '/clients/upload-image',
                data: fd,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(async () => {
                    await this.$auth.fetchUser();
                    this.$modal.hide('personal-avatar-modal');
                })
                .catch((err) => {
                    let errors = [];
                    Object.values(err.response.data.errors).forEach((e) => {
                        errors = [...errors, ...e];
                    });
                    this.errors = errors;
                });
        },
    },
};
</script>

<style lang="sass" scoped>
.image-uploader-error
    display: flex
    align-items: center
    border: 1px solid #e54b53
    border-radius: 3px
    padding: 10px
    margin-top: 10px

    .icon
        display: flex
        margin-right: 10px

    .text
        color: #be2d34
        font-size: 14px
        font-weight: 600
</style>
