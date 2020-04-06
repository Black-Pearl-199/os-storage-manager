import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import {
    REDUX_FORM_NAME,
    SaveButton,
    showNotification,
    startUndoable,
    translate
} from "react-admin";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { buttonGreenStyles } from "../MyCustomStyles";
import {
    ITCrudUpdate,
    showEnhanceNotification
} from "../../configurations/actions";
import { isEmpty } from "lodash";
import { getInvalidMessages, notificationName } from "../../utils";

const mapStateToProps = (state, ownProps) => {
    const { form = REDUX_FORM_NAME } = ownProps;
    return {
        recordForm: state.form[form] ? state.form[form] : {}
    };
};
const enhance = compose(
    withStyles(buttonGreenStyles),
    connect(mapStateToProps),
    translate
);

class UpdateButtonView extends Component {
    static propTypes = {
        undoable: PropTypes.bool
    };
    static defaultProps = {
        undoable: false
    };

    handleClick = () => {
        const {
            recordForm,
            dispatch,
            basePath,
            editing,
            resource,
            changeEditState,
            record,
            handleSubmit,
            redirect,
            undoable,
            translate,
            callback,
            convertValue,
            action,
            beforeSubmit,
            hideNotification,
            customNotification = {}
        } = this.props;
        const {
            message = "commons.message.edit",
            type = "actions",
            messageArgs = {}
        } = customNotification;
        const { id } = record;
        const resourceName = notificationName(recordForm, resource, translate);

        if (!editing && changeEditState)
            return () => {
                changeEditState(true);
            };

        // const [editing, setEdit] = useState(false);
        // console.log('my update button', this.props);
        const { syncErrors } = recordForm;
        if (!isEmpty(syncErrors)) {
            return () => {
                dispatch(
                    showNotification("commons.message.error", "warning", {
                        messageArgs: {
                            error: getInvalidMessages(
                                syncErrors,
                                translate
                            ).join("\n")
                        }
                    })
                );
            };
        }

        const checkDiffObject = (oldObject, newObject) => {
            const dataDiff = {};
            const keyLoop = Object.keys(newObject);
            keyLoop.forEach(property => {
                const value1 = oldObject && oldObject[property];
                const value2 = newObject && newObject[property];
                if (property.toString() === "id") {
                    return;
                } else if (
                    !value1 ||
                    (value2 && JSON.stringify(value1) !== JSON.stringify(value2))
                ) {
                    dataDiff[property] = value2;
                } else if (value1 && !value2 ) {
                    dataDiff[property] = '';
                }
            });
            return dataDiff;
        };

        const sendRequest = values => {
            const { initial: oldValue } = recordForm;
            const data = convertValue ? convertValue(values) : values;
            console.log("my update button", values, this.props);
            const dataUpload = checkDiffObject(oldValue, data);
            console.log("dataUpload", dataUpload);
            if (Object.keys(dataUpload) <= 0) {
                return dispatch(
                    showNotification(
                        "commons.message.invalid.update.notChange",
                        "warning"
                    )
                );
            }
            let meta = hideNotification
                ? {
                      onSuccess: {
                          redirectTo: redirect,
                          basePath,
                          callback
                      }
                  }
                : {};
            if (undoable) {
                dispatch(
                    startUndoable(
                        dispatch(
                            action({
                                resource,
                                id,
                                data: { ...dataUpload, id: record.id },
                                // data,
                                previousData: record,
                                basePath,
                                redirectTo: redirect,
                                resourceName,
                                callback,
                                meta
                            })
                        )
                    )
                );
            } else {
                dispatch(
                    action({
                        resource,
                        id,
                        data: { ...dataUpload, id: record.id },
                        // data,
                        previousData: record,
                        basePath,
                        redirectTo: redirect,
                        resourceName,
                        callback,
                        meta
                    })
                );
            }
        };

        return handleSubmit(values => {
            // Nếu editing = false thì chuyển trạng thái thành true, không gửi dữ liệu
            // Nếu editing=true hiện thông báo => gửi yêu cầu => hiện list
            if (beforeSubmit) {
                beforeSubmit(values).then(result => {
                    if (result) {
                        dispatch(
                            showEnhanceNotification(message, type, {
                                messageArgs: { resourceName, ...messageArgs },
                                actions: [
                                    {
                                        label: "button.add",
                                        callback: () => {
                                            sendRequest(values);
                                        }
                                    }
                                ]
                            })
                        );
                    }
                });
            } else {
                dispatch(
                    showEnhanceNotification(message, type, {
                        messageArgs: { resourceName, ...messageArgs },
                        actions: [
                            {
                                label: "button.add",
                                callback: () => {
                                    sendRequest(values);
                                }
                            }
                        ]
                    })
                );
            }
        });
    };

    // {...sanitizeRestProps(rest)}
    render() {
        const {
            recordForm,
            dispatch,
            showNotification,
            classes,
            handleSubmitWithRedirect,
            changeEditState,
            editing,
            setEdit,
            ITCrudUpdate,
            startUndoable,
            undoable,
            callback,
            convertValue,
            action,
            beforeSubmit,
            hideNotification,
            customNotification,
            ...rest
        } = this.props;
        // console.log('my update button', this.props);
        return (
            <SaveButton
                className={classes.button}
                label={"button.edit"}
                handleSubmitWithRedirect={this.handleClick}
                {...rest}
            />
        );
    }
}

export const MyUpdateButton = enhance(UpdateButtonView);
MyUpdateButton.propTypes = {
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    action: PropTypes.func,
    undoable: PropTypes.bool,
    beforeSubmit: PropTypes.func,
    editing: PropTypes.bool,
    changeEditState: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    form: PropTypes.string
};
MyUpdateButton.defaultProps = {
    undoable: false,
    action: ITCrudUpdate
};
