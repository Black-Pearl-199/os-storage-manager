import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classNames from 'classnames';
import {translate, startUndoable} from 'ra-core/esm';

import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import {ITCrudDelete} from "../../configurations/actions/CrudActions";

const styles = theme => ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.18),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
});

// const sanitizeRestProps = ({basePath, classes, dispatchCrudDelete, filterValues, label, resource, selectedIds, startUndoable, undoable, redirect, translate, ...rest}) => rest;

class DeleteButton extends Component {
    handleDelete = event => {
        event.stopPropagation();
        const {dispatchCrudDelete, startUndoable, resource, record, basePath, redirect, undoable, onClick, translate} = this.props;
        const resourceName = translate(`resources.${resource}.name`);
        if (undoable) {
            startUndoable(
                dispatchCrudDelete({resource, id: record.id, record, basePath, redirect, resourceName})
            );
        } else {
            dispatchCrudDelete({resource, id: record.id, record, basePath, redirect, resourceName});
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    render() {
        const {label = 'ra.action.delete', classes = {}, className, icon} = this.props;
        console.log(this.props);
        return (

            <Button
                onClick={this.handleDelete}
                label={label}
                className={classNames(
                    'ra-delete-button',
                    classes.deleteButton,
                    className
                )}
                key="button"
            >{icon}
                
            </Button>
        );
    }
}

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    dispatchCrudDelete: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
    icon: PropTypes.element,
};

DeleteButton.defaultProps = {
    redirect: 'list',
    undoable: false,
    icon: <ActionDelete/>,
};

export const MyDeleteButton = compose(
    connect(
        null,
        {startUndoable, dispatchCrudDelete: ITCrudDelete}
    ),
    translate,
    withStyles(styles)
)(DeleteButton);
