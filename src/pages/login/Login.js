import React from "react";
import { connect } from "react-redux";
import {
    changeLocale,
    showNotification,
    translate,
    userCheck,
    userLogin,
} from "react-admin";
import { compose } from "recompose";
import Checkbox from "@material-ui/core/Checkbox";
import { saveAccessTokenData } from '../../configurations/resources/authProvider';
import { checkFormValidate } from "../../utils";
import { URL_STORAGE_MANAGE } from "../home/Home";
import { STORAGES } from "../../configurations";
import version from "../../version";
import { token } from "../../data-test";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: process.env.REACT_APP_DEFAULT_USER || "",
            password: process.env.REACT_APP_DEFAULT_PASS || "",
            remember: localStorage.getItem("remember") === "true",
            storage: STORAGES[0].id,
        };
        // console.log(props);
    }

    checkFormValidate = () => {
        const { showNotification, translate } = this.props;
        const form = this.state;

        return checkFormValidate(form, translate, showNotification);
    };

    loginSubmit = (e) => {
        const { history } = this.props;
        e.preventDefault();

        if (!this.checkFormValidate()) return;
        saveAccessTokenData(token, false);
        history.push(URL_STORAGE_MANAGE);

        // let { username, password, remember } = this.state;
        // this.props.userLogin({ username, password, remember }, URL_STORAGE_MANAGE);

    };

    onInputChange = (e) => {
        const target = e.currentTarget;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        // console.log('change value', name, value);
        target.setCustomValidity("");
        console.log("value of login", value);

        this.setState({
            [name]: value,
        });
    };

    render() {
        // console.log('login props', this.props);
        // let {from} = (this.props && this.props.location && this.props.location.state && this.props.location.state.from) ? this.props.location.state : {from: {pathname: "/studies"}};
        let { isLoading, translate } = this.props;

        let { username, password, remember, storage } = this.state;

        return (
            <main className="auth-main flex-column">
                <div className="mt-5">
                    <h2
                        style={{
                            lineHeight: "40px",
                            margin: "24px 0 40px 0",
                        }}
                    >
                        <strong>
                            {translate("page.login.text.formTitle")}
                        </strong>
                    </h2>
                </div>
                <div className="auth-block mx-auto">
                    <p className="text-center">Đăng nhập để bắt đầu phiên của bạn</p>
                    <form onSubmit={this.loginSubmit}>
                        <div className="form-group mb-3">
                            {/* <label htmlFor="inputUsername3"
                                   className="mb-0">{translate('page.login.label.username')}</label> */}
                            <input
                                name="username"
                                type="text"
                                autoFocus
                                className="form-control"
                                id="inputUsername3"
                                placeholder={translate(
                                    "page.login.label.username"
                                )}
                                onChange={this.onInputChange}
                                value={username}
                                disabled={isLoading}
                            />
                            <div className="invalid-feedback" />
                        </div>
                        <div className="form-group mb-3">
                            {/* <label htmlFor="inputPassword3"
                                   className="mb-0">{translate('page.login.label.password')}</label> */}
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="inputPassword3"
                                placeholder={translate(
                                    "page.login.label.password"
                                )}
                                autoComplete={remember ? "on" : "off"}
                                onChange={this.onInputChange}
                                value={password}
                                disabled={isLoading}
                            />
                            <div className="invalid-feedback" />
                        </div>
                        <div className="form-group mb-2">
                            <select
                                id="inputSelectStorage"
                                name="storage"
                                value={storage}
                                onChange={this.onInputChange}
                                className="form-control"
                                disabled={isLoading}
                            >
                                {STORAGES.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <div className="invalid-feedback" />
                        </div>
                        <div
                            className="row justify-content-between"
                            style={{ marginTop: "20px" }}
                        >
                            <div className="form-group mb-2">
                                <Checkbox
                                    name="remember"
                                    id="exampleCheck1"
                                    disabled={isLoading}
                                    defaultChecked={remember}
                                    onChange={this.onInputChange}
                                    color="primary"
                                    inputProps={{
                                        "aria-label": "secondary checkbox",
                                    }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                >
                                    {translate("page.login.label.remember")}
                                </label>
                            </div>
                            <button
                                className="btn btn-auth"
                                type="submit"
                                disabled={isLoading}
                            >
                                {translate("page.login.button.login")}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="version">
                    {`v${version}${process.env.REACT_APP_ENV}`}
                </div>
            </main>
        );
    }
}

const enhance = compose(
    translate,
    connect(undefined, { userLogin, userCheck, changeLocale, showNotification, saveAccessTokenData })
);

export default enhance(Login);
