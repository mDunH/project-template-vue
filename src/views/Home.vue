<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
    </div>
</template>

<script>
import homeServices from "../services/homeServices";

export default {
    name: "home",
    mounted() {

        homeServices.testGet({ test: "1" });

    }
};
</script>
