export function isObjct(value) {

    return ({}).toString.call(value) === "[object Object]";

}
