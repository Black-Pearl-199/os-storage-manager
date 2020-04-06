import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {complete, getNotification, hideNotification, translate, undo,} from 'ra-core';
import * as PropTypes from "prop-types";
import {Button, Container, Modal} from "react-bootstrap";
import classNames from 'classnames';

export const NOTIFICATION_TYPE = {
    "INFO": 'info',
    "WARNING": 'warning',
};

const bodyMessageStyle = {
    whiteSpace: 'pre-line'
};

class MessageBoxView extends Component {
    state = {
        open: false,
    };

    btnCloseRef = React.createRef();

    componentDidMount = () => {
        this.setState({open: !!this.props.notification});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.notification !== this.props.notification) {
            const open = !!this.props.notification;
            this.setState({open});
            if (open && this.btnCloseRef.current) this.btnCloseRef.current.focus();
        }
    }

    handleRequestClose = () => {
        const {notification, hideNotification, complete} = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    };

    /*handleExited = () => {
        const {notification, hideNotification, complete} = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    }*/

    render() {
        const {
            // undo,
            // complete,
            // classes,
            // className,
            // type,
            translate,
            notification,
            // autoHideDuration,
            hideNotification,
            // ...rest
        } = this.props;

        // const {
        //     warning,
        //     confirm,
        //     actions,
        //     undo: undoClass, // Rename classes.undo to undoClass in this scope to avoid name conflicts
        //     success,
        //     info,
        //     ...snackbarClassesinfo
        // } = classes;

        // console.log('notification props', this.props);

        const notifyType = (notification && notification.type) || NOTIFICATION_TYPE.INFO;
        const {actions} = notification || {};
        const {open} = this.state;
        const showAction = actions && actions.length > 0;
        return (
            notification ?
                <Modal show={open} backdrop='static' centered onHide={this.handleRequestClose}
                       aria-labelledby="notification"
                       dialogClassName={classNames(`msg-box`, notifyType.length > 0 ? `msg-box-${notifyType}` : '')}>
                    <Modal.Header className='border-bottom-0 mx-auto'>
                        <Modal.Title id="notification" as={'h5'}
                                     className={`msg-head`}>
                            {translate(`msgBox.heading.${notifyType}`).toUpperCase()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-4 py-0'>
                        <Container fluid
                                   className={`msg-body`}>
                            <span style={bodyMessageStyle} dangerouslySetInnerHTML={{
                                __html:
                                    notification &&
                                    notification.message &&
                                    translate(notification.message, notification.messageArgs)
                            }}/>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className='border-top-0 mx-auto d-flex justify-content-between'>
                        <Button size={'sm'} variant={'itech'} className={'btn-itech-sm btn-itech-dark'}
                                ref={this.btnCloseRef}
                                onClick={this.handleRequestClose}>{translate(showAction ? 'button.no' : 'button.close')}</Button>
                        {showAction > 0 && actions.map((action, index) =>
                            <Button key={index} variant={'itech'} size={'sm'}
                                    className={action.className ? action.className : 'btn-itech-primary btn-itech-sm'}
                                    onClick={() => {
                                        hideNotification();
                                        action.callback();
                                    }}>{translate(action.label)}</Button>)}
                    </Modal.Footer>
                </Modal> : ''
        );
    }
}

MessageBoxView.propTypes = {
    complete: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object,
        actions: PropTypes.arrayOf(PropTypes.object)
    }),
    type: PropTypes.string,
    hideNotification: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    translate: PropTypes.func.isRequired,
    undo: PropTypes.func,
};

MessageBoxView.defaultProps = {
    type: NOTIFICATION_TYPE.INFO,
    autoHideDuration: 4000,
};

const mapStateToProps = state => ({
    notification: getNotification(state),
});

const enhance = compose(
    translate,
    connect(
        mapStateToProps,
        {
            complete,
            hideNotification,
            undo,
        }
    )
);

export const MessageBox = enhance(MessageBoxView);
