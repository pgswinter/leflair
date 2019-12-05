import {
    commonApi
} from '../../constant';

export default class {
    constructor(initApi) {
        this.initApi = initApi;
    }
    getJson = () => this.initApi.get(commonApi.fetch);
}