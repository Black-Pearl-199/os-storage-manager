import moment from "moment";
import {ITECH_REDUCER, STAFF} from "../configurations/reducers";
import {inputValidate} from "../configurations/validation";
import {createSelector} from "reselect";
import {parse} from "query-string";
import pickBy from "lodash/pickBy";

export const formatDate = (date, format) => !!date ? moment(date).format(format ? format : '') : date;

/**
 * Inspect an object and check values of all attributes,
 * TODO : need to support full text search and regex search
 * @param {Object} obj - object need to search
 * @param {String} val - string to search
 * @return {Boolean} true if obj contain val in all of values
 */
export const searchValues = (obj, val) => {
    let result = false;
    for (let i in obj) {
        if (!obj.hasOwnProperty(i) || typeof obj[i] === 'function') continue;
        if (typeof obj[i] === 'object') {
            result = searchValues(obj[i], val);
            if (result === true) return true;
        } else if (String(obj[i]).toLowerCase().indexOf(val.toLowerCase()) > -1) {
            return true;
        }
    }
    return result;
};

export const searchInDataTable = (obj, val) => {
    let result = {};
    for (let i in obj) {
        if (!obj.hasOwnProperty(i) || typeof obj[i] === 'function') continue;
        if (typeof obj[i] === 'object') {
            if (searchValues(obj[i], val)) {
                result[i] = obj[i];
            }
        }
    }
    return result;
};

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
};

export const dateShowFormat = 'dd-MM-YYYY';
export const dateStoreFormat = 'YYYY-MM-DDTHH:mm:ss';
//YYYY-MM-DD HH:mm:ss ZZ

export const isEmpty = (obj) => (obj === undefined || obj === null || Object.keys(obj).length === 0);

export const cleanObject = (obj) =>
    Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === 'object') cleanObject(val);
        else if (val == null) delete obj[key]
    });

export const generateTabKey = (tabData) => {
    let {resource, data} = tabData;
    return `${resource}-${data.id}`;
};

export const generateTab = (tabData, translate, basePath) => {
    let {resource, data} = tabData;
    let key = `${resource}-${data.id}`;
    let title = `${translate(`resources.${resource}.name`)}`;
    let url = `${basePath}${resource}/${data.id}`;
    // switch (resource) {
    //     case PATIENTS:
    //         title = `${title}: ${data.fullName}`;
    //         break;
    //     case USERS:
    //         title = `${title}: ${data.fullName ? data.fullName : data.username}`;
    //         break;
    //     case REPORTS:
    //         title = `${title}: ${data.patientName}`;
    //         break;
    //     case ORDERS:
    //         title = `${title}: ${data.patient.fullName}`;
    //         break;
    //     default:
    //         title = `${title}: ${data.name}`;
    //         break;
    // }
    return {key, title, url, closable: true, meta: tabData};
};

export const notificationName = (recordForm,resource, translate) => {
    let {values} = recordForm;
    console.log(recordForm)
    let notiName; 
    if(typeof values.id === 'string'){
        notiName = `${translate(`resources.${resource}.name`)} ${values.id}`;
    } else if(values.healthCenterA) {
        notiName = `${translate(`resources.${resource}.name`)} ${values.healthCenterA.id} ${translate(`commons.and`)} ${values.healthCenterB.id}`;
    } else {
        notiName = `${translate(`resources.${resource}.name`)}`
    }
    
    return notiName
}

export const getStaff = state => state[ITECH_REDUCER][STAFF];

export const getInvalidMessages = (syncErrors, translate) => {
    let result = [];
    Object.values(syncErrors).forEach(value => {
            if (typeof value === 'string') {
                result.push(translate ? translate(value) : value);
            } else if (typeof value === 'object') {
                result = [...result, ...getInvalidMessages(value, translate)];
            }
        }
    );
    return result;
};

export const checkFormValidate = (form, translate, showNotification) => {
    let formValidated;
    const names = Object.keys(form);
    const invalid = {};
    try {
        for (let name of names) {
            const value = form[name];
            if (typeof value === 'string' && inputValidate[name] !== undefined && inputValidate[name].pattern) {
                if (value && value.length > 0) {
                    const pattern = inputValidate[name].pattern;
                    if (value.match(pattern)) {
                    } else {
                        invalid[name] = `commons.message.invalid.${name}`
                    }
                } else invalid[name] = `commons.message.invalid.${name}`
            }
        }
    } catch (e) {
        console.error(e);
    }

    formValidated = isEmpty(invalid);
    if (!formValidated) {
        let message = Object.values(invalid).map(msg => translate(msg)).join('\n');
        showNotification('commons.message.error', 'warning', {messageArgs: {error: message}});
    }
    return formValidated;
};

const validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
const getLocationPath = props => props.location.pathname;
const getLocationSearch = props => props.location.search;
export const selectQuery = createSelector(
    getLocationPath,
    getLocationSearch,
    (path, search) => {
        const query = pickBy(
            parse(search),
            (v, k) => validQueryParams.indexOf(k) !== -1
        );
        if (query.filter && typeof query.filter === 'string') {
            try {
                query.filter = JSON.parse(query.filter);
            } catch (err) {
                delete query.filter;
            }
        }
        return query;
    }
);

export const hasCustomParams = (params) =>
    params &&
    ((params.filter && Object.keys(params.filter).length > 0) ||
        params.order != null ||
        params.page !== 1 ||
        params.perPage != null ||
        params.sort != null);