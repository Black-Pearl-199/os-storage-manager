export const commons = {
    yes: "Có",
    no: "Không",
    and: "và",
    message: {
        delete: 'Bạn có chắc chắn muốn xóa %{resourceName}?',
        save: 'Bạn có chắc chắn muốn thêm %{resourceName}?',
        edit: 'Bạn có chắc chắn muốn sửa %{resourceName}?',
        noChange: 'Bạn chưa thay đổi thông tin',
        duplicated: '%{resourceName} bị trùng!',
        error: '%{error}',
        invalid: {
            required: {
                pid: 'Mã bệnh nhân là bắt buộc',
                patientName: 'Tên bệnh nhân là bắt buộc',
                birthDate: 'Ngày sinh là bắt buộc và theo định dạng Ngày-Tháng-Năm',
                gender: 'Giới tính là bắt buộc',
                accessionNumber: 'Mã chỉ định chụp là bắt buộc',

                nameCenter: 'Tên đơn vị là bắt buộc',
                idCenter: 'Mã đơn vị là bắt buộc',
                idTypeCenter: 'Mã phân loại là bắt buộc',
                nameTypeCenter: 'Tên phân loại đơn vị là bắt buộc',
                typeCenter: 'Phân loại là bắt buộc',
                idRelationType: 'Mã phân loại liên kết là bắt buộc',
                nameRelationType: 'Tên phân loại liên kết là bắt buộc',
                idRelationCenter: 'Mã liên kết là bắt buộc',
                nameRelationCenter:'Tên liên kết là bắt buộc',
                startDate: 'Ngày bắt đầu là bắt buộc',
                active: 'Hoạt động là bắt buộc',

                orderId: 'Mã chỉ định chụp là bắt buộc',
                orderDate: 'Ngày chỉ định chụp là bắt buộc',
                diagnosis: 'Yêu cầu chuẩn đoán là bắt buộc',
                department: 'Khoa yêu cầu là bắt buộc',
                referringPhysician: 'Bác sĩ điều trị là bắt buộc',
                modalityType: 'Loại thiết bị là bắt buộc',
                contrastMedia: 'Thông tin thuốc cản quang là bắt buộc',
                priority: 'Độ ưu tiên là bắt buộc',
                status: 'Trạng thái là bắt buộc',
                protocol: 'Phương pháp chụp là bắt buộc',
                bodyPart: 'Bộ phận chụp là bắt buộc',

                username: 'Tên đăng nhập là bắt buộc',
                password: 'Mật khẩu là bắt buộc',
                passwordVerify: 'Mật khẩu xác nhận là bắt buộc',

                fullName: 'Tên đầy đủ là bắt buộc',
                phone: 'Số điện thoại là bắt buộc',
                email: 'Email là bắt buộc',
                degree: 'Trình độ là bắt buộc',

                aistob: 'A đối với B là bắt buộc',
                bistoa: 'B đối với A là bắt buộc',
                personA: 'Cá nhân A là bắt buộc',
                personB: 'Cá nhân B là bắt buộc',

                templateName: 'Tên mẫu báo cáo là bắt buộc',
                authority: 'Tên phân quyền là bắt buộc',
                authorityId: 'Mã phân quyền là bắt buộc',
                roleId: 'Vai trò là bắt buộc',
                roleName: 'Tên chức vụ là bắt buộc',
                clientAuthorityId: 'Mã quyền ứng dụng bắt buộc',
                clientAuthorityName: "Tên quyền ứng dụng bắt buộc",
                resourceId: 'Mã tài nguyên bắt buộc',
                resourceName: 'Tên tài nguyên bắt buộc',
                scopeId: 'Mã phạm vi bắt buộc',
                scopeName: 'Tên phạm vi bắt buộc',
                clientId: 'Mã ứng dụng bắt buộc',
                clientName: 'Tên ứng dụng bắt buộc',
                secret: 'Khóa bí mật là bắt buộc',
                authorizedGrantTypes: 'Ủy quyền là bắt buộc',
            },
            update: {
                notChange: 'Bạn chưa thay đổi dữ liệu!'
            },
            cid: 'Mã đơn vị bao gồm chữ cái, số, dấu gạch dưới và dấu gạch ngang. Xin vui lòng nhập lại.' ,
            ctypeid: 'Mã đơn vị y tế có ít nhất 3 kí tự, chỉ bao gồm chữ và số' ,
            pid: 'Mã bệnh nhân có ít nhất 3 kí tự, chỉ bao gồm chữ và số',
            patientName: 'Tên bệnh nhân có ít nhất 3 kí tự, chỉ bao gồm chữ cái, không chứa kí tự đặc biệt',
            accessionNumber: 'Mã chỉ định chụp có ít nhất 3 kí tự, chỉ bao gồm chữ cái, không chứa kí tự đặc biệt',
            orderId: 'Mã chỉ định chụp có ít nhất 3 kí tự, chỉ bao gồm chữ cái, không chứa kí tự đặc biệt',
            nationalId: 'Số CMND có từ 9 đến 12 kí tự, chỉ bao gồm số, không chứa kí tự đặc biệt',
            phoneNumber: 'Số điện thoại có từ 10-11 kí tự, chỉ bao gồm số, không chứa kí tự đặc biệt',
            brand: 'Nhẫn hiệu có ít nhất 3 kí tự, chỉ bao gồm chữ và số',
            birthDate: 'Năm sinh không được nhỏ hơn 1900',

            // username: 'Tên đăng nhập không được dài quá 50 kí tự, chỉ bao gồm chữ cái và số. Xin thử lại.',
            password: 'Mật khẩu dài tối thiểu 08 kí tự, bao gồm chữ cái hoa, thường và ít nhất 01 chữ số. Xin thử lại.',
            passwordVerify: 'Mật khẩu xác nhận không khớp với mật khẩu đã nhâp. Xin thử lại',
            phone: 'Số điện thoại chỉ bao gồm số',
            email: 'Email không đúng định dạng',
            secretVerify: 'Khóa bí mật xác nhận không khớp với khóa bí mật đã nhâp. Xin thử lại',
            accessTokenValiditySeconds: 'Thời hạn Access Token được yêu cầu là một số',
            refreshTokenValiditySeconds: 'Thời hạn Refresh Token được yêu cầu là một số',
            fullName: 'Tên bệnh nhân có ít nhất 3 kí tự, chỉ bao gồm chữ cái, số, không chứa kí tự đặc biệt',
            city: 'Tỉnh/Thành phố có ít nhất 3 kí tự, chỉ bao gồm chữ cái, số, không chứa kí tự đặc biệt',
            username: 'Tên đăng nhập có từ 3 đến 50 kí tự, chỉ bao gồm chữ cái, số. Xin thử lại',
            registeredRedirectURIs: 'Đường dẫn URL không đúng định dạng.'
        },
        cannotDeleteResource: 'Không thể xóa tài nguyên %{id} do đang được sử dụng!!!',
        cannotCreateUser: 'Không thể tạo tài khoản! Vui lòng thử lại hoặc liên hệ với quản trị viên.',
        cannotCreatePerson: 'Không thể người dùng mới! Vui lòng thử lại hoặc liên hệ với quản trị viên.',
        cannotCreateAvatar: 'Không thể tạo avatar! Vui lòng thử lại hoặc liên hệ với quản trị viên.',
        changePassword: 'Bạn có chắc chắn muốn thay đổi mật khẩu?'   
    }
}