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
} from "../../../components";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);
class CreateStorageTag extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;

        return (
            <>
                <FormHeading
                    title="page.storage.title.create"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row className="my-3">
                    <Create {...rest} className="w-100" classes={classes}>
                        <SimpleForm
                            redirect={"list"}
                            className="container-fluid px-0 mb-5"
                            toolbar={<MySaveToolbar />}
                        >
                            <MyGroupingInput formClassName="col-12 d-flex flex-column hide-legend">
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="phan_loai"
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="so_dang_ky"
                                        groupClasses="form-group col-xl-3 col-lg-3 col-md-6 col-sm-6"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="to_so"
                                        groupClasses="form-group col-xl-3 col-lg-3 col-md-6 col-sm-6"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="danh_diem"
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="ten_goi"
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="ky_hieu_quy_cach"
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="muc_du_tru"
                                        groupClasses="form-group col-xl-6 col-lg-6 col-md-8 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="gia_hang_so"
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="tang"
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="o_so"
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                </InputWrapper>
                                <InputWrapper className="row w-100">
                                    <MyTextInput
                                        source="don_vi_tinh"
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="khoi_luong"
                                        groupClasses="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12"
                                        inputClasses="w-100 my-auto"
                                        labelClasses="label-filter"
                                    />
                                    <MyTextInput
                                        source="don_gia"
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
