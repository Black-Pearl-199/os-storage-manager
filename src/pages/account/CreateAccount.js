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
    MyBootstrapInput
} from "../../components";
import { validateUsername, validatePassword, validatePasswordVerify } from "../../configurations/validation";
import { CAP_DO, STORAGES } from "../../configurations";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);

const defaultValue = {
    cap: CAP_DO[0],
    kho_quan_ly: STORAGES[0]
};

class CreateAccount extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;

        return (
            <>
                <FormHeading
                    title="page.account.title.create"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row>
                    <Create {...rest} className="w-100" classes={classes}>
                        <SimpleForm
                            defaultValue={defaultValue}
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
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-2 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-10 col-lg-8 col-md-6 col-sm-6 my-auto"
                                    validate={validatePassword}
                                />
                                <MyTextInput
                                    source="verifyPassword"
                                    placeholder="Nhập lại mật khẩu..."
                                    required
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
                    </Create>
                </Row>
            </>
        );
    };
}

export default enhance(CreateAccount);
