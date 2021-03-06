import {crud} from './crud';
import {sidebar} from "./sidebar";
import {resources} from "./resources";
import {bodyPart} from "./bodyPart";
import {modalityTypes} from "./modalityTypes";
import {page} from './page';
import {button} from './button';
import {commons} from "./commons";

export const vi = {
    // ...defaultMessages,
    ...crud,
    language: {
        name: 'Tiếng Việt'
    },
    page,
    sidebar,
    resources,
    msgBox: {
        heading: {
            info: 'Thông báo',
            warning: 'Lỗi',
            actions: 'Thông báo'
        }
    },
    commons,
    button,
    label: {
        image: 'ảnh',
        images: 'ảnh'
    },
    time_range: {
        today: "Hôm nay",
        yesterday: "Hôm qua",
        last_week: "Tuần trước",
        all: "Tất cả",
        other: "Khác",
        this_week: 'Tuần này',
        this_month: 'Tháng này',
        hour: 'giờ',
        day: 'Ngày',
        week: 'Tuần',
        month: 'Tháng'
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
    'deleteReason': 'Nhập lý do xóa',
    'no-access': 'Bạn không có quyền truy cập trang này. Xin mời ấn nút quay lại hoặc liên hệ quản trị viên!',
    'Username/Password invalid': 'Tên đăng nhập hoặc mật khẩu không đúng. Xin vui lòng thử lại',
    '': ''
};