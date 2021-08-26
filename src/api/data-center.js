import http from '../http/index';

const prefix = '/api/center/data'

export default {
    getDataGrowth(queryDate) {
        let params = {
            queryDate: queryDate
        }
        return http.get(prefix + '/data_growth', {params: params});
    }
}