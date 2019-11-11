function isDate(date) {
    let result = false;
    if (date) {
        result = date instanceof Date && !isNaN(date.valueOf());
    }
    return result;
}

function isNumber(num) {
    return typeof num === 'number' && !isNaN(num) && isFinite(num);
}

const SimpleDateFormat = {
    // yyyy-MM-dd HH:mm:ss
    format: function(date, pattern = 'yyyy-MM-dd') {
        if (isDate(date) || isNumber(date)) {
            let result = '';
            const dateObj = new Date(date);
            const yyyy = dateObj.getFullYear() + '';
            const M = dateObj.getMonth() + 1 + '';
            const MM = dateObj.getMonth() + 1 < 10 ? '0' + M : M;
            const d = dateObj.getDate() + '';
            const dd = dateObj.getDate() < 10 ? '0' + d : d;
            const H = dateObj.getHours() + '';
            const HH = dateObj.getHours() < 10 ? '0' + H : H;
            const m = dateObj.getMinutes() + '';
            const mm = dateObj.getMinutes() < 10 ? '0' + m : m;
            const s = dateObj.getSeconds() + '';
            const ss = dateObj.getSeconds() < 10 ? '0' + s : s;

            result = pattern
                .replace('yyyy', yyyy)
                .replace('MM', MM)
                .replace('M', M)
                .replace('dd', dd)
                .replace('d', d)
                .replace('HH', HH)
                .replace('H', H)
                .replace('mm', mm)
                .replace('m', m)
                .replace('ss', ss)
                .replace('s', s);
            
            return result;
        } else {
            throw new Error('Invalid date');
        }
    }
};

export default SimpleDateFormat;
