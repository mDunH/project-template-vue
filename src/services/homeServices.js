import fetchAction from "../utils/fetch-proxy";

const homeServices = {
    testGet(data) {

        return fetchAction.get("/", data, true);

    }
};

export default homeServices;
