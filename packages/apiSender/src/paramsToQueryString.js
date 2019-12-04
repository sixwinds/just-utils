export default function paramsToQueryString(params) {
    let queryString = '';
    if (params) {
        for(let name in params) {
            const value = params[name];
            if (value !== undefined && value !== null) {
                if (queryString) {
                    queryString += `&${name}=${encodeURIComponent(value)}`;
                } else {
                    queryString = `${name}=${encodeURIComponent(value)}`;
                }
            }
        }
    }
    return queryString;
}