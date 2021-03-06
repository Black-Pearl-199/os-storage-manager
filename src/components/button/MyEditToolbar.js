import React from "react";
import {Toolbar} from "react-admin";
import classNames from "classnames";
import {MyUpdateButton} from "./MyUpdateButton";
import {MyBackEditButton} from "./MyCustomButton";
import * as PropTypes from "prop-types";
import {MyDeleteBox} from "./MyDeleteOneButton";

export const MyEditToolbar = props => {
    let {children, invalid, callback, className, editing, deletable, customButton, changeEditState, convertValue, customAction, undoable, beforeSubmit, hideNotification, customNotification, form, filter, ...rest} = props;
    let {redirect} = rest;

    const {record = {}, resource, basePath} = rest;
    const {id} = record;
    // console.log('update toolbar props', props);
    const childrenWithProps = React.Children.map(children, child =>
        (!!child && React.cloneElement(child, {invalid, ...rest}))
    );

    return (
        <Toolbar {...rest}
                 className={classNames("px-3", 'py-1', "d-flex", "flex-row-reverse", 'mt-0', className)}>
            <MyUpdateButton redirect={redirect} undoable={undoable} beforeSubmit={beforeSubmit} editing={editing}
                            convertValue={convertValue} action={customAction} changeEditState={changeEditState}
                            callback={callback} customNotification={customNotification} form={form}
                            filter={filter} {...rest}/>
            {childrenWithProps}
            {editing ? <MyBackEditButton {...rest} changeEditState={changeEditState}/> : null}
            {customButton ? customButton : null}
            {deletable ? <MyDeleteBox id={id} basePath={basePath} record={record} resource={resource}
                                      callback={callback}/> : null}
        </Toolbar>
    )
};
MyEditToolbar.propTypes = {
    deletable: PropTypes.bool,
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    customAction: PropTypes.func,
    beforeSubmit: PropTypes.func,
    editing: PropTypes.bool,
    changeEditState: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    form: PropTypes.string,
    filter: PropTypes.object
};
