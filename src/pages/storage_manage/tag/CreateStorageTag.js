import React, { Component } from "react";
import { Create, SimpleForm } from "react-admin";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { Row } from "react-bootstrap";
import {
    FormHeading,
    listStylesNoActions,
    MySaveToolbar,
    MyTextInput,
    MyGroupingInput,
    InputWrapper,
    MySelectInput,
} from "../../../components";
import { LOAI_XE } from "../../../configurations";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);

const gia_hang = fakeData(10);
const tang = fakeData(3);
const o_so = fakeData(100);

function fakeData(number) {
    let result = [];
    for (let index = 1; index <= number; index++) {
        result.push({
            id: index,
            name: `${index}-test`
        });
    }
    return result;
}

class CreateStorageTag extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;
        console.log('gia hang', gia_hang)

        return (
            <>
                <FormHeading
                    title="page.storage_tag.title.create"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row>
                    <Create {...rest} className="w-100" classes={classes}>
                        <SimpleForm
                            redirect={"list"}
                            className="container-fluid px-0"
                            toolbar={<MySaveToolbar />}
                        >
                            <MyGroupingInput formClassName="col-12 d-flex flex-column hide-legend">
                                <InputWrapper className="row w-100">
                                    <MySelectInput
                                        source="phan_loai"
                                        placeholder="Chọn phân loại"
                                        choices={LOAI_XE}
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="so_dang_ky"
                                        placeholder="Nhập số đăng ký..."
                                        groupClasses="form-group col-xl-3 col-lg-3 col-md-6 col-sm-6"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="to_so"
                                        placeholder="Nhập tờ số..."
                                        groupClasses="form-group col-xl-3 col-lg-3 col-md-6 col-sm-6"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="danh_diem"
                                        placeholder="Nhập danh điểm..."
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="ten_goi"
                                        placeholder="Nhập tên gọi..."
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="ky_hieu_quy_cach"
                                        placeholder="Nhập ký hiệu quy cách..."
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="muc_du_tru"
                                        placeholder="Nhập mức dự trữ..."
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MySelectInput
                                        source="gia_hang_so"
                                        choices={gia_hang}
                                        placeholder="Nhập vị trí giá hàng..."
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MySelectInput
                                        source="tang"
                                        choices={tang}
                                        placeholder="Nhập vị trí tầng..."
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MySelectInput
                                        source="o_so"
                                        choices={o_so}
                                        placeholder="Nhập vị trí ô số..."
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="don_vi_tinh"
                                        placeholder="Nhập đơn vị tính..."
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="khoi_luong"
                                        placeholder="Nhập khối lượng..."
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="don_gia"
                                        placeholder="Nhập đơn giá..."
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                            </MyGroupingInput>
                        </SimpleForm>
                    </Create>
                </Row>
            </>
        );
    };
}

export default enhance(CreateStorageTag);
