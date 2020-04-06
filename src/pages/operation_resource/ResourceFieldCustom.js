import React from "react";
import * as PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { withTranslate, withDataProvider } from "ra-core";
import {
    OPERATION_RESOURCES,
    showEnhanceNotification,
    ITCrudDelete,
    ITCrudGetList
} from "../../configurations";
import { NOTIFICATION_TYPE } from "../../components";

const connectedViewBtn = compose(
    connect(undefined, {}),
    withTranslate,
    withDataProvider
);

export const EditResourceButton = React.memo(
    connectedViewBtn(props => {
        const {
            record = {},
            history,
            basePath,
        } = props;

        const onGoEditPage = () => {
            const redirectTo = `${basePath}/${record.id}/edit`;
            history.replace(redirectTo);
        };

        return (
            <div>
                <Button
                    size="sm"
                    variant="itech"
                    className="btn-itech-icon-primary text-center"
                    onClick={onGoEditPage}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
        );
    })
);
EditResourceButton.propTypes = {
    translate: PropTypes.func,
    record: PropTypes.object
};

const enhance = compose(
    withTranslate,
    connect(undefined, { showEnhanceNotification, ITCrudDelete, ITCrudGetList })
);
export const DeleteResourceButton = enhance(props => {
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
            "page.resource.notification.delete.confirm",
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
            resource: OPERATION_RESOURCES,
            previousData: record,
            id: record.id,
            redirectTo: "list",
            reason: "test",
            basePath,
            optimistic: true,
            resourceName: record.id,
            callback: async () => {
                ITCrudGetList({
                    resource: OPERATION_RESOURCES,
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

DeleteResourceButton.propTypes = {
    record: PropTypes.object
};
