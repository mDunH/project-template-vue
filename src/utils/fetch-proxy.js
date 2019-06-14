import querystringify from "querystringify";
import config from "./config";
import { isObjct } from "./utils";
import { Notification, Loading } from "../components/uiLibrary";
import { getLocaleData } from "../i18n/utils";

class FetchStateControlle {

    constructor() {

        this.fetchLoading = Loading.service({ text: "test" });

    }

    fetchStart() {

        this.fetchLoading.open();

    }

    fetchEnd(startTimesStamp, endTimesStamp, timeInterval = 500) {

        const runningTime = endTimesStamp - startTimesStamp;
        const actualTimeInterval = timeInterval - runningTime;

        if (actualTimeInterval > 0) {

            setTimeout(() => {

                this.fetchLoading.close();

            }, actualTimeInterval);

        } else this.fetchLoading.close();

    }

}

const fetchStateControlle = new FetchStateControlle();

function getMessage() {

    const localeMessage = getLocaleData().message;

    return {
        deleteConfirm: localeMessage["common.deleteConfirm"] || "Delete confirm?",
        calcen: localeMessage["common.cancel"] || "Cancel.",
        commonError: localeMessage["Error.commonError"] || "Error"
    };

}

function injectData(data, appendData = {}) {

    if (!isObjct(appendData)) return;

    const appendWay = data instanceof FormData ? (key, value) => {

        data.append(key, value);

    } : (key, value) => {

        data[key] = value;

    };

    Object.keys(appendData).forEach(key => {

        appendWay(key, appendData[key]);

    });

}

function getNowTimesStamp() {

    return new Date().getTime();

}

function action(url, init, isMask) {

    const startTimesStamp = getNowTimesStamp();

    isMask && fetchStateControlle.fetchStart();

    return new Promise((resolve, reject) => {

        fetch(url, init).then(async d => {

            const endTimesStamp = getNowTimesStamp();

            isMask && fetchStateControlle.fetchEnd(startTimesStamp, endTimesStamp);

            if (!d.ok) {

                Notification.error({
                    title: getMessage().commonError,
                    message: getMessage().commonError
                });

                reject();

            } else {

                const response = await d.json();
                const { status, message } = response;

                switch (status) {

                    case 0:
                        resolve(response);
                        break;
                    case 999:
                        //
                        reject(message);
                        break;
                    default:
                        reject(message);

                }

            }

        }).catch(err => {

            const endTimesStamp = getNowTimesStamp();

            isMask && fetchStateControlle.fetchEnd(startTimesStamp, endTimesStamp);

            reject(err);

        });

    });

}

function setRequest(method, u, data, isMask) {

    let url = u;

    if (!url.startsWith("http")) url = config.service.url + url;

    const myInit = {
        method,
        headers: new Headers(config.service.headers)
    };

    injectData(data, config.service.data);

    if (method === "GET") url += `?${querystringify.stringify(data)}`;
    else if (data instanceof FormData) {

        myInit.body = data;

    } else {

        myInit.headers.append("Content-Type", "application/json; charset=utf-8");
        myInit.body = JSON.stringify(data);

    }

    return action(url, myInit, isMask);

}

const fetchAction = {
    get: (...args) => setRequest("GET", ...args),

    post: (...args) => setRequest("POST", ...args),

    put: (...args) => setRequest("PUT", ...args),

    deleteItem: (...args) => new Promise((res, rej) => {

        // eslint-disable-next-line no-alert
        if (window.confirm(getMessage().deleteConfirm)) res();
        else rej(getMessage().calcen);

    }).then(() => setRequest("DELETE", ...args), rej => {

        throw rej;

    }).catch(err => {

        throw err;

    })
};

export default fetchAction;
