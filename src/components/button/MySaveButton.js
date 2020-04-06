import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {REDUX_FORM_NAME, SaveButton, showNotification, translate} from 'react-admin';
import {compose} from "recompose";
import {connect} from "react-redux";
import {buttonGreenStyles} from "../MyCustomStyles";
import * as PropTypes from "prop-types";
import {ITCrudCreate, showEnhanceNotification} from "../../configurations/actions";
import {isEmpty} from "lodash";
import {getInvalidMessages, notificationName} from "../../utils";

const mapStateToProps = (state, ownProps) => {
    const {form = REDUX_FORM_NAME} = ownProps;
    return {
        recordForm: state.form[form] ? state.form[form] : {}
    }
};
const enhance = compose(withStyles(buttonGreenStyles), connect(mapStateToProps), translate);

class SaveButtonView extends Component {
    handleClick = () => {
        const {recordForm, beforeSubmit, basePath, resource, handleSubmit, redirect, dispatch, translate, callback, convertValue, action, hideNotification, customNotification = {}} = this.props;
        const {message = 'commons.message.save', type = 'actions', messageArgs = {}} = customNotification;
        const resourceName = notificationName(recordForm, resource, translate);

        // console.log('my save button handle click', this.props);
        const {syncErrors} = recordForm;
        // if (!isEmpty(syncErrors)) {
        //     return () => {
        //         dispatch(showNotification('commons.message.error', 'warning', {messageArgs: {error: getInvalidMessages(syncErrors, translate).join("\n")}}));
        //     };
        // }

        const sendRequest = (values) => {
            const data = convertValue ? convertValue(values) : values;
            let meta = hideNotification ? {
                onSuccess: {
                    redirectTo: redirect,
                    basePath,
                    callback
                }
            } : {};
            dispatch(action({
                resource,
                data,
                basePath,
                redirectTo: redirect,
                resourceName,
                callback,
                id: data.id,
                meta
            }));
        };

        return handleSubmit(values => {
            if (beforeSubmit) {
                beforeSubmit(values).then(result => {
                    if (result) {
                        dispatch(showEnhanceNotification(message, type,
                            {
                                messageArgs: {resourceName, ...messageArgs},
                                actions: [
                                    {
                                        label: 'button.add',
                                        callback: () => {
                                            sendRequest(values)
                                        }
                                    }
                                ],
                            }))
                    }
                })
            } else {
                dispatch(showEnhanceNotification(message, type,
                    {
                        messageArgs: {resourceName, ...messageArgs},
                        actions: [
                            {
                                label: 'button.add',
                                callback: () => {
                                    sendRequest(values)
                                }
                            }
                        ],
                    }))
            }
        })
    };

    render() {
        const {invalid, recordForm, beforeSubmit, classes, handleSubmitWithRedirect, dispatch, callback, convertValue, action, hideNotification, customNotification, ...rest} = this.props;
        // console.log('my save button', this.props);

        // remove invalid truyền vào saveButton để bỏ qua thông báo mặc định của react-admin khi form invalid
        return (
            <SaveButton className={classes.button}
                        handleSubmitWithRedirect={this.handleClick}
                        {...rest} submitOnEnter={!rest.disabled}
            />
        )
    }
}

export const MySaveButton = enhance(SaveButtonView);

// beforeSubmit check gía trị của values, nhận trả về là một Promise - ví dụ kiểm tra orderId có tồn tại hay ko
MySaveButton.propTypes = {
    beforeSubmit: PropTypes.func,
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    action: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    form: PropTypes.string
};
MySaveButton.defaultProps = {
    action: ITCrudCreate
};
