import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withTranslate } from "react-admin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { MyField, NOTIFICATION_TYPE } from '../../../components';
import {
    STORAGE_TAG,
    showEnhanceNotification,
    ITCrudDelete,
    ITCrudGetList
} from "../../../configurations";

export const LocationStorage = withTranslate((props) => {
    const { translate, record = {}, ...rest } = props;
    const { vi_tri_gia_hang, vi_tri_tang, vi_tri_o } = record;
    const displayText = `${translate(
        "resources.storage_tag.fields.gia"
    )}: ${vi_tri_gia_hang}; ${translate(
        "resources.storage_tag.fields.tang"
    )}:${vi_tri_tang}; ${translate(
        "resources.storage_tag.fields.o_so"
    )}:${vi_tri_o}`;
    record.vi_tri = displayText;
    return (
        <MyField {...rest} record={record} />
    )
});

const enhance = compose(
    withTranslate,
    connect(undefined, { showEnhanceNotification, ITCrudDelete, ITCrudGetList })
);
export const DeleteStorageTagButton = enhance(props => {
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
            "page.storage.notification.delete.confirm",
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

DeleteStorageTagButton.propTypes = {
    record: PropTypes.object,
    showEnhanceNotification: PropTypes.func,
    ITCrudDelete: PropTypes.func,
    ITCrudGetList: PropTypes.func
};

export const DetailStorageTag = withTranslate((props) => {
    const { history, record = {}, basePath, translate, resource, source } = props;
    const { id } = record;
    const redirectDetailPage = () => {
        history.push(`${basePath}/${id}/show`);
    }
    const labelTranslated = translate(`resources.${resource}.fields.${source}`);
    return (
        <Button variant="link" size="sm" className="w-100 text-left px-0" onClick={redirectDetailPage}>
            {labelTranslated}
        </Button>
    )
});

DetailStorageTag.propTypes = {
    history: PropTypes.func,
    basePath: PropTypes.string,
    record: PropTypes.object,
    translate: PropTypes.func,
    resource: PropTypes.string,
    source: PropTypes.string
};
