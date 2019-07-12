import Vue from "vue";
import App from "./App.vue";
import router from "./route";
import Config from "./utils/config";
import "./style/index.scss";

Vue.config.productionTip = false;

const { project } = Config;
const promiseList = [];

// import()语法动态加载限制导致无法封装，待解决
if (project.i18n) promiseList.push(new Promise((reslove) => {

    import("./i18n").then(res => reslove({ i18n: res.default }));

}));
if (project.store) promiseList.push(new Promise((reslove) => {

    import("./store").then(res => reslove({ store: res.default }));

}));

Promise.all(promiseList).then((responses) => {

    const rootConfig = {
        router,
        render: h => h(App)
    };

    responses.forEach(response => Object.assign(rootConfig, response));
    new Vue(rootConfig).$mount("#app");

});
