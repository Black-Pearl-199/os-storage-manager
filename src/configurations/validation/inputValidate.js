import moment from "moment/moment";
import {get} from 'lodash';

export const inputValidate = {
    cid: {
        pattern: /^[A-Za-z_\-\d]{3,}$/,
    },
    pid: {
        pattern: /^[A-Za-z\d]{3,}$/,
    },
    patientName: {
        pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,}$/u,
    },
    pn: {
        pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,}$/u,
    },
    accessionNumber: {
        pattern: /^[A-Za-z\d]{3,}$/
    },
    orderId: {
        pattern: /^[A-Za-z\d]{3,}$/
    },
    nationalId: {
        pattern: /^[\d]{9,12}$/
    },
    phoneNumber: {
        pattern: /^[\d]{9,11}$/
    },
    username: {
        pattern: /^[A-Za-z0-9_.-]{3,50}$/
    },
    password: {
        pattern: /^[A-Za-z0-9_]{1,50}$/
        // pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    },
    email: {
        // eslint-disable-next-line no-useless-escape
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    // kiem tra la 1 so hoac null
    accessTokenValiditySeconds: {
        pattern: /^(\s*null|\d+)$/
    },
    // kiem tra la mot so hoac null
    refreshTokenValiditySeconds: {
        pattern: /^(\s*null|\d+)$/
    },
    fullName: {
        pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,}$/u,
    },
    city: {
        pattern: /^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,}$/u,
    },
    registeredRedirectURIs: {
        // eslint-disable-next-line no-useless-escape
        pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    },
    so_gia_hang: {
        pattern: /^(?:[1-9]|\d\d\d*)$/
    },
    so_tang: {
        pattern: /^(?:[1-9]|\d\d\d*)$/
    },
    so_o: {
        pattern: /^(?:[1-9]|\d\d\d*)$/
    },

};

export const msgPrefix = 'commons.message.invalid';

const normalizeValue = value => (typeof value === 'string' && value.trim().replace(/[\s]+/g, " ")) || value;

/**
 * @param {string} patternName - name of pattern using to test
 */
const validPattern =
    patternName =>
        (value, allValues, props) => {
            let pattern = inputValidate[patternName].pattern;
            let normalizeVal = normalizeValue(value);
            return pattern.test(normalizeVal) ? undefined : props.translate(`${msgPrefix}.${patternName}`);
        };

        //Test email có hợp lệ k, cho phép rỗng
const validPatternForMail =
    patternName =>
        (value, allValues, props) => {
            if (value) {
                let pattern = inputValidate[patternName].pattern;
                let normalizeVal = normalizeValue(value);
                return pattern.test(normalizeVal) ? undefined : `${msgPrefix}.${patternName}`;
            }
};

// test password co hop le khong va cho phep null
const validPatternForPassword =
    password =>
        (value, allValues, props) => {
            if (value) {
                let pattern = inputValidate[password].pattern;
                let normalizeVal = normalizeValue(value);
                return pattern.test(normalizeVal) ? undefined : props.translate(`${msgPrefix}.${password}`);
            }
};

const validPatternForSourceCanNull =
    source =>
        (value, allValues, props) => {
            if (value) {
                let pattern = inputValidate[source].pattern;
                let normalizeVal = normalizeValue(value);
                return pattern.test(normalizeVal) ? undefined : props.translate(`${msgPrefix}.${source}`);
            }
};

export const testSoGiaHang = validPattern("so_gia_hang");
export const testSoTang = validPattern("so_tang");
export const testSoO = validPattern("so_o");

export const testPid = validPattern("pid");
export const testCid = validPattern("cid");
export const testCTypeid = validPattern("ctypeid");
export const testPatientName = validPattern(`patientName`);
export const testAccessionNumber = validPattern('accessionNumber');
export const testOrderId = validPattern('orderId');
export const testNationalId = validPattern(`nationalId`);
export const testPhoneNumber = validPattern(`phoneNumber`);
export const testBirthDate = (message = `${msgPrefix}.birthDate`) =>
    (value, allValues, props) => {
        const date = moment(value);
        return (date.isValid() && date.get('year') >= 1900) ? undefined : props.translate(message);
    };
export const testEmail = validPattern('email');
export const testEmailNull = validPatternForMail('email');
export const testPatternUsername = validPattern('username');
export const testPatternPassword = validPattern('password');
export const testPatternPasswordNotRequired = validPatternForPassword('password');
export const testPasswordVerify =
    field =>
        (value, allValues, props) => {
            let originValue = get(allValues, field);
            return value === originValue ? undefined : props.translate(`${msgPrefix}.${field}Verify`)
        };
export const checkAccessTokenValiditySeconds = validPatternForSourceCanNull('accessTokenValiditySeconds');
export const checkRefreshTokenValiditySeconds = validPatternForSourceCanNull('refreshTokenValiditySeconds');
export const checkRegisteredRedirectURIs = validPatternForSourceCanNull('registeredRedirectURIs');