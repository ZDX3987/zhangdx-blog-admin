import moment from 'moment';

moment.locale('zh');

const dateFormat = function (date, pattern = 'yyyy-MM-DD HH:mm:ss') {
	return moment(date).format(pattern);
}

export default {
    dateFormat
}