import React, { useState } from "react";
import { MyBootstrapInput } from "../form";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { translate } from "ra-core";
import { Button, Container, Modal } from "react-bootstrap";

import { ITCrudDelete } from "../../configurations/actions";
import { notificationName } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const enhance = compose(translate, connect(undefined, { ITCrudDelete }));

export const MyDeleteBox = enhance(({ ...props }) => {
    // console.log('deleteBox props', props);

    const { translate, resource, id, callback, redirect = 'list', fixed, ITCrudDelete, basePath, onlyIcon } = props;
    const { record = {} } = props;
    const resourceName = notificationName({ values: record }, resource, translate);
    const [inputValue, setInputValue] = useState({ reason: '' });
    const [showPopup, setShowPopup] = useState(false);

    const onReasonChange = e => {
        setInputValue({ ...inputValue, ...e });
    };

    const showConfirm = (e) => {
        e.preventDefault();
        console.log('show popup input reason');
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
            previousData: record,
            id,
            redirectTo: redirect,
            reason: inputValue['reason'],
            basePath,
            resourceName: resourceName,
            callback
        })

    };

    return (
        <div className={`px-3 ${fixed ? 'position-fixed' : ``}`}>
            <div>
                {onlyIcon ?
                    <button className='btn btn-itech-icon btn-itech-icon-warning'
                        onClick={showConfirm}>
                             <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    :
                    <button className='btn btn-itech btn-itech-secondary btn-itech-fixed'
                        onClick={showConfirm}>{translate('button.delete')}</button>}
            </div>
            <Modal show={showPopup} onHide={hidePopup} centered size={'md'}>
                <Modal.Header>
                    <span dangerouslySetInnerHTML={{
                        __html: translate(`commons.message.delete`, { resourceName: resourceName })
                    }} />
                </Modal.Header>
                <Modal.Body>
                    <Container fluid className='justify-content-between'>
                        <MyBootstrapInput label={'deleteReason'} source={'reason'} small={false}
                            inputValue={inputValue} onInputChange={onReasonChange}
                            groupClasses='row'
                            inputClasses='flex-grow-1'
                            labelClasses='label-required col-4 pl-0' />
                    </Container>
                </Modal.Body>
                <Modal.Footer className='d-flex flex-row-reverse justify-content-around'>
                    <Button variant='itech' className='btn-danger btn-itech-fixed'
                        onClick={onDelete}
                        disabled={inputValue.reason.length < 3}>{translate('button.delete')}</Button>
                    <Button variant='itech' className='btn-itech-secondary btn-itech-fixed mr-3'
                        onClick={hidePopup}>{translate('commons.no')}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
});

MyDeleteBox.propTypes = {
    resource: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    fixed: PropTypes.bool,
    callback: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onlyIcon: PropTypes.bool
};

MyDeleteBox.defaultProps = {
    fixed: false,
    onlyIcon: false
};
