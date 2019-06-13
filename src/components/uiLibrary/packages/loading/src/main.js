import Vue from "vue";
import Main from "./Main.vue";

const UiController = Vue.extend(Main);

export default (function() {

    let instance = null;

    return function Loading(options) {

        if (instance) return instance;

        const { container, ...otherOptions } = options;
        let box = null;

        if (typeof container === "string") {

            box = document.querySelector(container);
            (box && ["absolute", "fixed"].indexOf(box.style.position) === -1) && (box.style.position = "relative");

        } else {

            box = container;

        }

        instance = new UiController({
            data: otherOptions
        });

        instance.$mount();
        (box || document.body).appendChild(instance.$el);
        instance.visible = true;

        return instance;

    };

})();
