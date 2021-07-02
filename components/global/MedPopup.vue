<template>
    <div>
        <div class="modal-trigger-wrap">
            <button ref="trigger" class="modal-trigger" @click.stop="toggleModal()">
                <slot v-if="!openBtnContent" name="btnOpen">Открыть</slot>
                <div v-else v-html="openBtnContent" />
            </button>
        </div>
        <transition name="fade">
            <div
                v-show="modalVisible"
                :id="modalId"
                ref="modal"
                class="modal-overlay"
                :class="modalClass"
                @click.self="toggleModal(true)"
            >
                <div class="modal-wrap">
                    <button v-if="closeBtn" class="close" @click.stop="toggleModal()" />
                    <div class="modal-content" :class="contentClass">
                        <slot v-if="!modalContent" name="body">Контент</slot>
                        <div v-else v-html="modalContent" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
// window.addEventListener('scroll', () => {
//   document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
// });
export default {
    name: 'MedPopup',
    props: {
        modalContent: String,
        openBtnContent: String,
        container: {
            type: String,
            default: 'body',
        },
        modalClass: {
            type: String,
            default: 'med-modal',
        },
        contentClass: {
            type: String,
            default: '',
        },
        closeOutside: {
            type: Boolean,
            default: true,
        },
        closeBtn: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            modalVisible: false,
            id: Math.random().toString(36).substr(2, 10),
        };
    },
    computed: {
        modalId() {
            return `modal_${this.id}`;
        },
    },
    mounted() {
        const modalNode = this.$refs.modal;
        modalNode.parentNode && modalNode.parentNode.removeChild(modalNode);
    },
    methods: {
        beforeOpen() {
            this.$emit('beforeOpened');
        },
        beforeClose() {
            this.$emit('beforeClosed');
        },
        openModal() {
            this.beforeOpen();
            this.modalVisible = true;
            this.$_show();
            const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
            const { body } = document;
            body.classList.add('modal-active');
            body.style.top = `-${scrollY}`;
        },
        closeModal() {
            this.beforeClose();
            this.modalVisible = false;
            const modalNode = this.$refs.modal;
            modalNode.parentNode && modalNode.parentNode.removeChild(modalNode);
            const { body } = document;
            const scrollY = body.style.top;
            body.classList.remove('modal-active');
            body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        },
        toggleModal(clickedOutside = false) {
            if (clickedOutside && this.closeOutside === false) {
                return false;
            }
            if (!this.modalVisible) {
                this.openModal();
            } else {
                this.closeModal();
            }
        },
        $_findContainer(container, reference) {
            if (typeof container === 'string') {
                container = window.document.querySelector(container);
            } else if (container === false) {
                container = reference.parentNode;
            }
            return container;
        },
        $_show() {
            const modalNode = this.$refs.modal;
            const reference = this.$refs.trigger;
            const container = this.$_findContainer(this.container, reference);
            container.appendChild(modalNode);
        },
    },
};
</script>

<style lang="sass">
.modal-active
  position: fixed
  padding-right: 15px
  height: auto
  width: 100%
</style>

<style lang="sass" scoped>
.modal-overlay
  background-color: rgba(0, 0, 0, 0.8)
  height: 100%
  width: 100%
  position: fixed
  top: 0
  bottom: 0
  right: 0
  left: 0
  z-index: 9999
  display: flex
  align-items: center
  justify-content: center
.modal-wrap
  position: relative
.close
  position: absolute
  top: 8px
  right: 8px
  width: 10px
  height: 10px
  cursor: pointer
  background-size: contain
  background-repeat: no-repeat
  background-position: center
  background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0ieCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTEuOTEiIGhlaWdodD0iMTEuOTA2IiB2aWV3Qm94PSIwIDAgMTEuOTEgMTEuOTA2Ij4gIDxkZWZzPiAgICA8c3R5bGU+ICAgICAgLmNscy0xIHsgICAgICAgIGZpbGw6ICNjN2NjZDY7ICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7ICAgICAgfSAgICA8L3N0eWxlPiAgPC9kZWZzPiAgPHBhdGggaWQ9ItCf0YDRj9C80L7Rg9Cz0L7Qu9GM0L3QuNC6X9GB0LrRgNGD0LPQuy5f0YPQs9C70YtfMSIgZGF0YS1uYW1lPSLQn9GA0Y/QvNC+0YPQs9C+0LvRjNC90LjQuiwg0YHQutGA0YPQs9C7LiDRg9Cz0LvRiyAxIiBjbGFzcz0iY2xzLTEiIGQ9Ik0xMTQxLjAxLDUyMi40MjNsOS42Myw5LjYzMWExLjEzMywxLjEzMywwLDEsMS0xLjYsMS42bC05LjYzLTkuNjNhMS4xNDEsMS4xNDEsMCwwLDEsMC0xLjYwNUExLjEyOSwxLjEyOSwwLDAsMSwxMTQxLjAxLDUyMi40MjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTEzOS4wOSAtNTIyLjA5NCkiLz4gIDxwYXRoIGlkPSLQn9GA0Y/QvNC+0YPQs9C+0LvRjNC90LjQul/RgdC60YDRg9Cz0LsuX9GD0LPQu9GLXzFf0LrQvtC/0LjRjyIgZGF0YS1uYW1lPSLQn9GA0Y/QvNC+0YPQs9C+0LvRjNC90LjQuiwg0YHQutGA0YPQs9C7LiDRg9Cz0LvRiyAxINC60L7Qv9C40Y8iIGNsYXNzPSJjbHMtMSIgZD0iTTExNTAuNjQsNTIyLjQyM2ExLjEyMywxLjEyMywwLDAsMSwwLDEuNjA1bC05LjYzLDkuNjNhMS4xMjcsMS4xMjcsMCwwLDEtMS42LDAsMS4xNCwxLjE0LDAsMCwxLDAtMS42bDkuNjMtOS42MzFBMS4xMjksMS4xMjksMCwwLDEsMTE1MC42NCw1MjIuNDIzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExMzkuMDkgLTUyMi4wOTQpIi8+PC9zdmc+)
.modal-content
  background: #fff
  max-width: 100%
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s
.fade-enter,
.fade-leave-to
  opacity: 0
</style>
