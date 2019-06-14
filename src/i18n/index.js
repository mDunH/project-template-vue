import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./locale/en";
import zh from "./locale/zh";
import hk from "./locale/zh-hk";

Vue.use(VueI18n);

const messages = {
    en,
    zh,
    "zh-hk": hk
};

const i18n = new VueI18n({
    locale: "en",
    fallbackLocale: "en",
    messages
});

export default i18n;
