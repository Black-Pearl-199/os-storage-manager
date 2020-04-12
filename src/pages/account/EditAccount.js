import React, { Component } from "react";
import { Edit, SimpleForm } from "react-admin";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { Row } from "react-bootstrap";
// import { account_data } from '../../data-test';
import {
    FormHeading,
    listStylesNoActions,
    MySaveToolbar,
    MyTextInput,
    MyGroupingInput,
    MyBootstrapInput
} from "../../components";
import { validateUsername, validateSecretNotRequired, validatePasswordVerify } from "../../configurations/validation";
import { CAP_DO, STORAGES } from "../../configurations";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);

class EditAccount extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;

        return (
            <>
                <FormHeading
                    title="page.account.title.edit"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row>
                    <Edit {...rest} className="w-100" classes={classes}>
                        <SimpleForm
                            // defaultValue={account_data[0]}
                            redirect={"list"}
                            className="container-fluid px-0"
                            toolbar={<MySaveToolbar />}
                        >
                            <MyGroupingInput formClassName="col-12 d-flex flex-column hide-legend">
                                <MyTextInput
                                    source="username"
                                    placeholder="Nhập tên đăng nhập..."
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateUsername}
                                />
                                <MyTextInput
                                    source="ten"
                                    placeholder="Nhập tên đầy đủ..."
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                                <MyTextInput
                                    source="password"
                                    placeholder="Nhập mật khẩu..."
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validateSecretNotRequired}
                                />
                                <MyTextInput
                                    source="verifyPassword"
                                    placeholder="Nhập lại mật khẩu..."
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validatePasswordVerify}
                                />
                                <MyBootstrapInput
                                    component="select"
                                    source="cap"
                                    choices={CAP_DO}
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                                <MyBootstrapInput
                                    component="select"
                                    source="kho_quan_ly"
                                    choices={STORAGES}
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                            </MyGroupingInput>
                        </SimpleForm>
                    </Edit>
                </Row>
            </>
        );
    };
}

export default enhance(EditAccount);
