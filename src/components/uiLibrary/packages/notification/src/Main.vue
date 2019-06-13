<template>
    <transition name="notification-fade">
        <div v-show="visible" class="notification" :class="`notification-${typeClass}`" @mouseenter="clearTimeout" @mouseleave="startTimeout">
            <i class="icon" v-if="!noIcon"></i>
            <div class="content">
                <p class="title">{{ title }}</p>
                <p class="message">{{ message }}</p>
            </div>

            <i class="close" @click="close"></i>
        </div>
    </transition>
</template>

<script>
import { typeMap } from "./main";

export default {
    name: "notification",
    data() {

        return {
            // optional
            title: "",
            message: "",
            type: "",
            duration: 4000,
            noIcon: false,
            onClose: null,
            // optional

            visible: false,
            closed: false
        };

    },
    watch: {
        closed(newVal) {

            if (newVal) {

                this.visible = false;
                this.$el.addEventListener("transitionend", this.destroyElement);

            }

        }
    },
    computed: {
        typeClass() {

            const type = typeMap[this.type];

            return type ? type : "info";

        }
    },
    mounted() {

        this.startTimeout();

    },
    methods: {
        destroyElement() {

            this.$el.removeEventListener("transitionend", this.destroyElement);
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);

        },
        close() {

            this.closed = true;
            typeof this.onClose === "function" && this.onClose();

        },
        clearTimeout() {

            clearTimeout(this.timer);

        },
        startTimeout() {

            if (this.duration > 0) {

                this.timer = setTimeout(() => this.close(), this.duration);

            }

        }
    }
};
</script>

<style lang="scss" scoped>
.notification {
    position: fixed;
    top: 15px;
    right: 15px;
    width: 330px;
    max-width: calc(100% - 30px);
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    overflow: hidden;
    box-sizing: border-box;
    padding: 15px 30px 15px 15px;
    display: flex;
    z-index: 999;

    .icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        margin-right: 10px;
        background-color: #000;

        &::after {
            content: "";
        }
    }

    .content {
        width: 100%;
        flex-grow: 1;

        .title {
            font-weight: 700;
        }

        .message {
            margin-top: 5px;
        }
    }

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        text-align: center;

        &::after {
            content: "X";
        }

        &:hover {
            opacity: .7;
        }
    }
}

.notification-fade-enter-active, .notification-fade-leave-active {
    transition-duration: .5s;
    transition-property: opacity, transform, left, right, top, bottom;
}

.notification-fade-enter, .notification-fade-leave-to {
    opacity: 0;
    right: -330px;
}
</style>
