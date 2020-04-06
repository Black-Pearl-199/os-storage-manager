import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import ActionDelete from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {startUndoable, translate} from 'ra-core/esm';

import * as PropTypes from "prop-types";
import {ITCrudDeleteMany} from "../../configurations/actions/CrudActions";
import Button from "@material-ui/core/Button";

// const sanitizeRestProps = ({basePath, classes, dispatchCrudDeleteMany, filterValues, label, resource, selectedIds, startUndoable, undoable, translate, ...rest}) => rest;

const styles = theme => ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
});

class BulkDeleteButton extends Component {
    static propTypes = {
        basePath: PropTypes.string,
        classes: PropTypes.object,
        dispatchCrudDeleteMany: PropTypes.func.isRequired,
        label: PropTypes.string,
        resource: PropTypes.string.isRequired,
        startUndoable: PropTypes.func,
        selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
        undoable: PropTypes.bool,
        icon: PropTypes.element,
    };

    static defaultProps = {
        label: 'ra.action.delete',
        undoable: false,
        icon: <ActionDelete/>,
    };

    handleClick = () => {
        const {basePath, dispatchCrudDeleteMany, resource, selectedIds, startUndoable, undoable, onClick, translate} = this.props;
        const resourceName = translate(`resources.${resource}.name`);
        if (undoable) {
            startUndoable(dispatchCrudDeleteMany({resource, ids: selectedIds, basePath, resourceName}));
        } else {
            dispatchCrudDeleteMany({resource, ids: selectedIds, basePath, resourceName});
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    // {...sanitizeRestProps(rest)}
    render() {
        const {classes, label, icon} = this.props;
        return (
            <Button
                onClick={this.handleClick}
                label={label}
                className={classes.deleteButton}
            >
                {icon}
            </Button>
        );
    }
}

export const MyBulkDeleteButton = compose(
    connect(
        undefined,
        {
            startUndoable,
            dispatchCrudDeleteMany: ITCrudDeleteMany,
        }
    ),
    withStyles(styles),
    translate
)(BulkDeleteButton);

export default MyBulkDeleteButton;