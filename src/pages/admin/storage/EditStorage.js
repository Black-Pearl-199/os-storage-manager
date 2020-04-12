import React, { Component } from "react";
import { Edit, SimpleForm } from "react-admin";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { Row } from "react-bootstrap";
// import { storage_data } from '../../../data-test';
import {
    FormHeading,
    listStylesNoActions,
    MySaveToolbar,
    MyTextInput,
    MyGroupingInput
} from "../../../components";
import { validateTenKho, validateSoGiaHang, validateSoTang, validateSoO } from "../../../configurations/validation";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);

class EditStorage extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;

        return (
            <>
                <FormHeading
                    title="page.storage.title.edit"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row>
                    <Edit {...rest} className="w-100" classes={classes}>
                        <SimpleForm
                            redirect={"list"}
                            // defaultValue={storage_data[0]}
                            className="container-fluid px-0"
                            toolbar={<MySaveToolbar />}
                        >
                            <MyGroupingInput formClassName="col-12 d-flex flex-column hide-legend">
                                <MyTextInput
                                    source="ten_kho"
                                    placeholder="Nhập tên kho..."
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateTenKho}
                                />
                                <MyTextInput
                                    source="dia_chi"
                                    placeholder="Nhập địa chỉ kho..."
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                                <MyTextInput
                                    source="so_gia_hang"
                                    placeholder="Nhập tổng số giá hàng..."
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateSoGiaHang}
                                />
                                <MyTextInput
                                    source="so_tang"
                                    placeholder="Nhập tổng số tầng..."
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateSoTang}
                                />
                                <MyTextInput
                                    source="so_o"
                                    placeholder="Nhập tổng số ô..."
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateSoO}
                                />
                            </MyGroupingInput>
                        </SimpleForm>
                    </Edit>
                </Row>
            </>
        );
    };
}

export default enhance(EditStorage);
