<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <loading :show="loading" />
    </div>
</template>

<script>
import homeServices from "../services/homeServices";
import { Loading, Notification } from "../components/uiLibrary";

export default {
    name: "home",
    data() {

        return {
            loading: true
        };

    },
    components: {
        Loading
    },
    mounted() {

        homeServices.testGet({ test: "1" }).finally(() => {

            Notification({ title: "title", message: "message" });

        });

        setTimeout(() => this.loading = false, 3000);

    }
};
</script>
