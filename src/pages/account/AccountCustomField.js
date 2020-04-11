import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withTranslate } from "react-admin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { NOTIFICATION_TYPE } from '../../components';
import {
    STORAGE_TAG,
    showEnhanceNotification,
    ITCrudDelete,
    ITCrudGetList
} from "../../configurations";
import get from 'lodash/get';

const enhance = compose(
    withTranslate,
    connect(undefined, { showEnhanceNotification, ITCrudDelete, ITCrudGetList })
);
export const DeleteAccountButton = enhance(props => {
    const {
        record = {},
        showEnhanceNotification,
        ITCrudDelete,
        ITCrudGetList,
        basePath,
        sort,
        order,
        page,
        perPage,
        filter
    } = props;
    const confirmDeleteResource = e => {
        e.preventDefault();
        e.stopPropagation();
        showEnhanceNotification(
            "page.account.notification.delete.confirm",
            NOTIFICATION_TYPE.INFO,
            {
                messageArgs: {
                    resource_name: record.id
                },
                actions: [
                    {
                        label: "button.delete",
                        callback: async () => {
                            deleteResource();
                        }
                    }
                ]
            }
        );
    };

    const deleteResource = async () => {
        ITCrudDelete({
            resource: STORAGE_TAG,
            previousData: record,
            id: record.id,
            redirectTo: "list",
            reason: "test",
            basePath,
            optimistic: true,
            resourceName: record.id,
            callback: async () => {
                ITCrudGetList({
                    resource: STORAGE_TAG,
                    pagination: {
                        page,
                        perPage
                    },
                    sort: {
                        field: sort,
                        order
                    },
                    filter
                });
            }
        });
    };

    return (
        <div className={"d-flex"}>
            <Button
                variant={"itech"}
                size={"sm"}
                className={"btn-itech-icon-warning"}
                onClick={confirmDeleteResource}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </div>
    );
});

DeleteAccountButton.propTypes = {
    record: PropTypes.object,
    showEnhanceNotification: PropTypes.func,
    ITCrudDelete: PropTypes.func,
    ITCrudGetList: PropTypes.func
};

export const EditAccountButton = (props) => {
    const { history, record = {}, basePath } = props;
    const { id } = record;
    const redirectEditPage = () => {
        history.push(`${basePath}/${id}`);
    }
    return (
        <div className={"d-flex"}>
            <Button
                variant={"itech"}
                size={"sm"}
                className={"btn-itech-icon-primary"}
                onClick={redirectEditPage}
            >
                <FontAwesomeIcon icon={faPenAlt} />
            </Button>
        </div>
    )
};

EditAccountButton.propTypes = {
    history: PropTypes.func,
    basePath: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string
};

export const EditAccountField = (props) => {
    const { history, record = {}, basePath, source } = props;
    const { id } = record;
    const displayText = get(record, source);
    const redirectDetailPage = () => {
        history.push(`${basePath}/${id}`);
    }
    return (
        <Button variant="link" size="sm" className="w-100 text-left px-0" onClick={redirectDetailPage}>
            {displayText}
        </Button>
    )
};

EditAccountField.propTypes = {
    history: PropTypes.func,
    basePath: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string
};
