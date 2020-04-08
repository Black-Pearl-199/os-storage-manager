import React from "react";
import {
    faCalendar,
    // faUsersCog,
    // faUser,
    faCar,
    faCogs,
    faChartLine,
    faCopy
} from "@fortawesome/free-solid-svg-icons";
import SwitchAllRoutes from "./SwitchAllRoutes";
import { SideBar } from "../../components/layouts";

export const URL_CHANGE_PASS = '/change_password';
export const URL_PROFILE = '/profile';
export const URL_STORAGE_MANAGE = '/storage-manage';
export const URL_ADD_STORAGE_TAG = '/add-storage-tag';
export const URL_STATISTIC_DISTRIBUTE = '/statistic-distribute';

const sideBarProps = {
    items: [
        {
            url: "/storage",
            title: "sidebar.storage.title",
            icon: faCalendar,
            eventKey: "/storage",
            subs: [
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.storage.storage_manage'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.storage.statistic_distribute'
                },
                {
                    url: URL_ADD_STORAGE_TAG,
                    eventKey: URL_ADD_STORAGE_TAG,
                    title: 'sidebar.storage.add_storage_tag'
                },
            ]
        },
        {
            url: "/material",
            title: "sidebar.material.title",
            icon: faCopy,
            eventKey: "/material",
            subs: [
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.material.input_output_manage'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.material.add_input_order'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.material.add_output_order'
                }
            ]
        },
        {
            url: "/statistic_material",
            title: "sidebar.statistic_material.title",
            icon: faChartLine,
            eventKey: "/statistic_material",
            subs: [
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.statistic_material.report_manage'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.statistic_material.general_report_manage_q1'
                },
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.statistic_material.general_report_manage_q3'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.statistic_material.general_report_manage'
                },
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.statistic_material.add_report_stock'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.statistic_material.add_general_report_q1'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.statistic_material.add_general_report_q3'
                }
            ]
        },
        {
            url: "/car_record",
            title: "sidebar.car_record.title",
            icon: faCar,
            eventKey: "/car_record",
            subs: [
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.car_record.manage'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.car_record.add'
                }
            ]
        },
        {
            url: "/general_manage",
            title: "sidebar.general_manage.title",
            icon: faCogs,
            eventKey: "/general_manage",
            subs: [
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.general_manage.storage'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.general_manage.add_storage'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.general_manage.cargo_distribute'
                },
                {
                    url: URL_STORAGE_MANAGE,
                    eventKey: URL_STORAGE_MANAGE,
                    title: 'sidebar.general_manage.add_cargo_distribute'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.general_manage.account'
                },
                {
                    url: URL_STATISTIC_DISTRIBUTE,
                    eventKey: URL_STATISTIC_DISTRIBUTE,
                    title: 'sidebar.general_manage.add_account'
                }
            ]
        }
        // {
        //     url: URL_PROFILE,
        //     title: "sidebar.personal.list",
        //     icon: faUser,
        //     eventKey: URL_PROFILE
        // },
        // {
        //     url: URL_CHANGE_PASS,
        //     title: "sidebar.change_password.main",
        //     icon: faUsersCog,
        //     eventKey: URL_CHANGE_PASS
        // }
    ],
    collapse: false
};

const Home = props => {
    return (
        <div className="w-100 home-page">
            <SideBar {...props} config={sideBarProps} />
            <div className="al-main">
                <div className="al-content">
                    <SwitchAllRoutes></SwitchAllRoutes>
                </div>
            </div>
        </div>
    );
};

export default Home;
