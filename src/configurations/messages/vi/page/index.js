export const page = {
    login: {
        label: {
            username: 'Tên đăng nhập',
            password: 'Mật khẩu',
            remember: 'Duy trì đăng nhập'
        },
        button: {
            login: 'Đăng nhập',
            register: 'Đăng kí'
        },
        text: {
            formTitle: 'Kho KT788',
            subTitle: 'Đăng nhập để bắt đầu phiên của bạn',
            formFooter: 'Bản quyền thuộc về © 2019 iTech Solution.\nLiên hệ: info@itechcorp.com.vn - Điện thoại: 024.7300.8698',
            forgetPassword: 'Quên mật khẩu',
            currentLogin: 'Bạn đang đăng nhập vào tài khoản'
        }
    },
    resource: {
        title: {
            list: 'Quản lý tài nguyên hệ thống',
            edit: 'Sửa tài nguyên hệ thống',
            create: 'Tạo tài nguyên hệ thống'
        },
        notification: {
            delete: {
                confirm: 'Bạn có chắc chắn xóa tài nguyên %{resource_name} này không?',
                success: 'Xóa tài nguyên thành công',
                failure: 'Xóa tài nguyên thất bại'
            },
            create: {
                duplicated: 'Tài nguyên bạn tạo đã tồn tại!'
            }
        }
    },
    application: {
        title: {
            list: 'Quản lý ứng dụng',
            create: 'Thêm mới ứng dụng',
            edit: 'Thay đổi ứng dụng',
            info: 'Thông tin ứng dụng'
        }
    },
    user: {
        title: {
            list: 'Quản lý tài khoản',
            edit: 'Chỉnh sửa tài khoản',
            create: 'Thêm tài khoản'
        },
        filter: {
            name: 'Tìm theo tên',
            role: 'Tìm theo chức vụ',
            includeDisableUser: "Bao gồm các tài khoản đã khóa"
        },
        text: {
            userInfo: "Thông tin tài khoản",
            loginInfo: "Thông tin đăng nhập",
            demographicInfo: "Thông tin cá nhân"
        },
        notification: {
            duplicateUsername: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác',
            create: {
                success: 'Thêm tài khoản mới thành công',
                failure: 'Không thể thêm tài khoản. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin tài khoản thành công',
                failure: 'Không thể chỉnh sửa thông tin tài khoản. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            delete: {
                confirm: 'Bạn có chắc chắn muốn xóa tài khoản này?',
                success: 'Cập nhật thông tin tài khoản thành công',
                failure: 'Không thể chỉnh sửa thông tin tài khoản. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            changePassword: {
                confirm: 'Bạn có chắc chắn muốn thay đổi mật khẩu của tài khoản này?',
                success: 'Cập nhật mật khẩu thành công',
                failure: 'Không thể thay đổi mật khẩu. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            goToCreatePage: {
                confirm: 'Tạo tài khoản từ người dùng %{personName}?',
                notChoosePerson: 'Bạn chưa chọn người dùng nào! Hãy chọn một người dùng hoặc thêm người dùng mới'
            },
            updateAvatar: {
                success: 'Cập nhật avatar thành công',
                failure: 'Không thể thay đổi . Vui lòng thử lại hoặc liên hệ quản trị viên.',
                overUpload: 'Kích cỡ ảnh vượt quá mức cho phép'
            },
        }
    },
    storage_tag: {
        title: {
            create: 'THÊM THẺ KHO MỚI - MẪU SỐ: 03/VT',
            list: 'QUẢN LÝ THẺ KHO',
            edit: 'SỬA THÔNG TIN THẺ KHO - MẪU 03/VT',
            show: 'THẺ KHO - MẪU SỐ: 03/VT'
        },
        notification: {
            delete: {
                confirm: 'Bạn có chắc chắn xóa thẻ kho này không?'
            }
        }
    },
    storage: {
        title: {
            create: 'Thêm kho mới',
            edit: 'Sửa thông tin kho',
            list: 'Quản lý kho',
            show: 'Thông tin kho'
        },
        notification: {
            delete: {
                confirm: 'Bạn có muốn xóa kho này không? Lưu ý rằng chỉ được xóa kho trống \n(Không có thẻ kho nào).'
            }
        }
    
    },
    statistic_distribute: {
        name: 'KIỂM KÊ PHÂN LOẠI VẬT TƯ HÀNG HÓA'
    },
    material: {
        title: {
            list: 'QUẢN LÝ LỆNH NHẬP / XUẤT',
            createInputOrder: 'THÊM LỆNH NHẬP',
            createOutputOrder: 'THÊM LỆNH XUẤT'
        }
    },
    material_distribute: {
        title: {
            list: 'Quản lý phân loại',
            edit: 'Sửa thông tin phân loại',
            create: 'Thêm phân loại mới'
        },
        notification: {
            delete: {
                confirm: 'Bạn có muốn xóa phân loại này không? \nLưu ý rằng chỉ được xóa phân loại không có chứa thẻ kho nào.'
            }
        }
    },
    account: {
        title: {
            list: 'Quản lý tài khoản',
            edit: 'Sửa thông tin tài khoản',
            create: 'Thêm tài khoản mới'
        },
        notification: {
            delete: {
                confirm: 'Bạn có muốn xóa tài khoản này không?'
            }
        }
    }
}
