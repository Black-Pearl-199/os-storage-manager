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
    MyGroupingInput
} from "../../../components";
import { validateTenPhanLoai } from "../../../configurations/validation";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);

class CreateMaterialDistribute extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;

        return (
            <>
                <FormHeading
                    title="page.material_distribute.title.create"
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
                                <MyTextInput
                                    source="ten_phan_loai"
                                    placeholder="Nhập tên phân loại..."
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateTenPhanLoai}
                                />
                            </MyGroupingInput>
                        </SimpleForm>
                    </Create>
                </Row>
            </>
        );
    };
}

export default enhance(CreateMaterialDistribute);
