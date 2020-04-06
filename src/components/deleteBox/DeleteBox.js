import React, {useState} from "react";
import {MyBootstrapInput} from "../form";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import {translate} from "ra-core";
import {Button, Container, Modal} from "react-bootstrap";
import {ITCrudDelete} from "../../configurations/actions";
import { notificationName} from "../../utils";

const enhance = compose(translate, connect(undefined, {ITCrudDelete}));

export const DeleteBox = enhance(({...props}) => {
    // console.log('deleteBox props', props);

    const {translate, ITCrudDelete, id,recordForm, resource, basePath, fixed, callback, redirect = 'list'} = props;

    const [inputValue, setInputValue] = useState({reason: ''});
    const [showPopup, setShowPopup] = useState(false);

    const onReasonChange = e => {
        setInputValue({...inputValue, ...e});
    };

    const showConfirm = () => {
        setShowPopup(true);
    };
    const hidePopup = () => {
        setShowPopup(false);
    };

    const onDelete = () => {
        // for test callback only
        // if (callback) callback();
        // return;

        hidePopup();
        ITCrudDelete({
            resource: resource,
            id,
            redirectTo: redirect,
            reason: inputValue['reason'],
            basePath,
            resourceName: notificationName(recordForm, resource, translate),
            callback
        })
    };

    return (
        <div className={`delete-box d-flex align-items-center px-5 ${fixed ? 'position-fixed' : ``}`}>
            <MyBootstrapInput label={'deleteReason'} source={'reason'} small={false}
                              inputValue={inputValue} onInputChange={onReasonChange}
                              className='bg-white'
                              groupClasses='form-inline col-xl-6 col-lg-8 col-md-10'
                              inputClasses='flex-grow-1'
                              labelClasses='label-required mr-3'/>
            <div>
                <button className='btn btn-itech-secondary btn-itech-fixed' onClick={showConfirm}
                        disabled={inputValue.reason.length < 3}>{translate('button.delete')}</button>
            </div>
            <Modal show={showPopup} onHide={hidePopup} centered size={'md'}>
                {/*<Modal.Header>{translate(`page.modality.text.selectRentType`)}</Modal.Header>*/}
                <Modal.Body>
                    <Container fluid>
                        {translate(`commons.message.delete`, {resourceName: notificationName(recordForm, resource, translate)})}
                    </Container>
                </Modal.Body>
                <Modal.Footer className='d-flex flex-row-reverse justify-content-around'>
                    <Button variant='itech btn-itech-primary btn-itech-fixed'
                            onClick={onDelete}>{translate('commons.yes')}</Button>
                    <Button variant='itech btn-itech-secondary btn-itech-fixed mr-3'
                            onClick={hidePopup}>{translate('commons.no')}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
});

DeleteBox.propTypes = {
    resource: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    callback: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

DeleteBox.defaultProps = {
    fixed: false
};