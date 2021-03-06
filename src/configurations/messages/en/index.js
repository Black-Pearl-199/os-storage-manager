import {crud} from "./crud";
import {sidebar} from "./sidebar";
import {resources} from "./resources";
import {modalityTypes} from "./modalityTypes";
import {bodyPart} from "./bodyPart";
import {page} from './page';
import {button} from "./button";
import {commons} from "./commons";
import {msgBox} from "./msgBox"

export const en = {
    // ...defaultMessages,
    ...crud,
    language: {
        name: 'English'
    },
    page,
    sidebar,
    resources,
    commons,
    msgBox,
    button,
    label: {
        image: 'image',
        images: 'images'
    },
    time_range: {
        today: "Today",
        yesterday: "Yesterday",
        last_week: "Last week",
        all: "All time",
        other: "Other",
        this_week: 'This week',
        this_month: 'This month',
        hour: 'hour(s)',
        day: 'Day',
        week: 'Week',
        month: 'Month'
    },
    priority: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5"
    },
    bodyPart,
    ...modalityTypes,
    'deleteReason': 'Reasons for delete',
    'no-access': 'You don\'t have permissions to access this page. Please go back or contact Administrators!',
    'Username/Password invalid': 'Username or password is not correct. Please try again.',
    '': ''
};