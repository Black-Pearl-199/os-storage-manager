import React from 'react';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import classNames from 'classnames';

import {
    hideNotification,
    getNotification,
    translate,
    undo,
    complete,
} from 'ra-core';
import * as PropTypes from "prop-types";

const styles = theme => ({
    confirm: {
        backgroundColor: theme.palette.background.default,
    },
    warning: {
        backgroundColor: theme.palette.error.light,
    },
    undo: {
        color: theme.palette.primary.light,
    },
    success: {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
});

class MyNotification extends React.Component {
    state = {
        open: false,
    };

    componentWillMount = () => {
        this.setOpenState(this.props);
    };

    componentWillReceiveProps = nextProps => {
        this.setOpenState(nextProps);
    };

    setOpenState = ({notification}) => {
        this.setState({
            open: !!notification,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleExited = () => {
        const {notification, hideNotification, complete} = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    };

    render() {
        const {
            undo,
            complete,
            classes,
            className,
            type,
            translate,
            notification,
            autoHideDuration,
            hideNotification,
            ...rest
        } = this.props;

        const {
            warning,
            confirm,
            undo: undoClass, // Rename classes.undo to undoClass in this scope to avoid name conflicts
            success,
            info,
            ...snackbarClasses
        } = classes;

        // console.log('notification props', this.props)

        return (
            <Snackbar
                open={this.state.open}
                message={
                    notification &&
                    notification.message &&
                    translate(notification.message, notification.messageArgs)
                }
                autoHideDuration={
                    (notification && notification.autoHideDuration) ||
                    autoHideDuration
                }
                disableWindowBlurListener={
                    notification && notification.undoable
                }
                onExited={this.handleExited}
                onClose={this.handleRequestClose}
                ContentProps={{
                    className: classNames(
                        classes[(notification && notification.type) || type],
                        className
                    ),
                }}
                action={
                    notification && notification.undoable ? (
                        <Button
                            color="primary"
                            className={undoClass}
                            size="small"
                            onClick={undo}
                        >
                            {translate('ra.action.undo')}
                        </Button>
                    ) : null
                }
                classes={snackbarClasses}
                {...rest}
            />
        );
    }
}

MyNotification.propTypes = {
    complete: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object,
    }),
    type: PropTypes.string,
    hideNotification: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    translate: PropTypes.func.isRequired,
    undo: PropTypes.func,
};

MyNotification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000,
};

const mapStateToProps = state => ({
    notification: getNotification(state),
});

const enhance = compose(
    translate,
    withStyles(styles),
    connect(
        mapStateToProps,
        {
            complete,
            hideNotification,
            undo,
        }
    )
);

export default enhance(MyNotification);
