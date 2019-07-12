<template>
    <transition name="loading-fade">
        <div v-show="show === undefined ? visible : show" class="loading" :style="{ background }">
            <div class="spinner">
                <div class="icon-box">
                    <i class="icon"></i>
                    <i class="icon"></i>
                    <i class="icon"></i>
                    <i class="icon"></i>
                    <i class="icon"></i>
                    <i class="icon"></i>
                </div>
                <p class="text">{{text}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "loading",
    data() {

        return {
            // optional
            text: "loading",
            background: "rgba(0, 0, 0, .4)",
            // optional

            visible: false,
            closed: null
        };

    },
    props: ["show"],
    watch: {
        closed(newVal) {

            this.visible = !newVal;
            if (newVal) {

                this.$el.addEventListener("transitionend", this.destroyElement);
                typeof this.onClose === "function" && this.onClose();

            } else {

                typeof this.onOpen === "function" && this.onOpen();

            }

        }
    },
    methods: {
        destroyElement() {

            this.$el.removeEventListener("transitionend", this.destroyElement);
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);

        },
        close() {

            if (this.show !== undefined) return;

            this.closed = true;

        },
        open() {

            if (this.show !== undefined) return;

            this.closed = false;

        }
    }
};
</script>

<style lang="scss" scoped>
.loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .spinner {
        text-align: center;
        color: #fff;

        .icon-box {
            position: relative;
            height: 36px;
            width: 36px;
            margin: 0 auto;

            .icon {
                position: absolute;
                left: 16px;
                top: 0;
                width: 3px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                &::before, &::after {
                    content: "";
                    height: 25%;
                    background: #fff;
                    border-radius: 5px;
                }

                &::before {
                    top: 0;
                    animation: load 1.2s linear 0s infinite;
                }

                &::after {
                    bottom: 0;
                    animation: load 1.2s linear 0.6s infinite;
                }

                &:nth-child(2) {
                    transform: rotate(30deg);

                    &::before {
                        animation: load 1.2s linear 0.1s infinite;
                    }

                    &::after {
                        animation: load 1.2s linear 0.7s infinite;
                    }
                }

                &:nth-child(3) {
                    transform: rotate(60deg);

                    &::before {
                        animation: load 1.2s linear 0.2s infinite;
                    }

                    &::after {
                        animation: load 1.2s linear 0.8s infinite;
                    }
                }

                &:nth-child(4) {
                    transform: rotate(90deg);

                    &::before {
                        animation: load 1.2s linear 0.3s infinite;
                    }

                    &::after {
                        animation: load 1.2s linear 0.9s infinite;
                    }
                }

                &:nth-child(5) {
                    transform: rotate(120deg);

                    &::before {
                        animation: load 1.2s linear 0.4s infinite;
                    }

                    &::after {
                        animation: load 1.2s linear 1s infinite;
                    }
                }

                &:nth-child(6) {
                    transform: rotate(150deg);

                    &::before {
                        animation: load 1.2s linear 0.5s infinite;
                    }

                    &::after {
                        animation: load 1.2s linear 1.1s infinite;
                    }
                }
            }
        }

        .text {
            margin: 5px 0;
        }
    }
}

.loading-fade-enter-active, .loading-fade-leave-active {
    transition-duration: .3s;
    transition-property: opacity;
}

.loading-fade-enter, .loading-fade-leave-to {
    opacity: 0;
}

@keyframes load{

    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
