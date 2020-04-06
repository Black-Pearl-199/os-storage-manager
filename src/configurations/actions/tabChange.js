export const TAB_CHANGE = 'IT/TAB_CHANGE';

export const tabChange = (context, tabKey, basePath, redirectTo) => {
    return {
        type: TAB_CHANGE,
        payload: {data: {context, tabKey}},
        meta: {
            basePath,
            redirectTo
        }
    }
};