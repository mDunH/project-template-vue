import Vue from "vue";
import Main from "./Main.vue";
import { isObjct } from "../../../utils";

export const typeMap = ["success", "warning", "info", "error"];

const UiConstructor = Vue.extend(Main);

function Notification(options = {}) {

    const instance = new UiConstructor({
        data: options
    });

    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;

    return instance;

}

typeMap.forEach(type => {

    Notification[type] = options => {

        let ownOptions = {
            type
        };

        if (!isObjct(options)) {

            ownOptions.message = options;

        } else {

            ownOptions = {
                ...ownOptions,
                ...options
            };

        }

        return Notification(ownOptions);

    };

});

export default Notification;
