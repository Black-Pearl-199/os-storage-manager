export const FILL_USER_DATA = 'IT/FILL_USER_DATA';

export const fillUserData = (data) => {
    return {
        type: FILL_USER_DATA,
        payload: {data}
    }
};