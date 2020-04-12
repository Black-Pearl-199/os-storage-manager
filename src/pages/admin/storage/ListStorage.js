import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslate, List } from "react-admin";
import { Row } from "react-bootstrap";
import { storage_data } from "../../../data-test";
import {
    MySearchableDataGrid,
    listStylesNoActions,
    FormHeading,
    MyCustomPagination,
    MyField,
    RedirectCreateButton,
} from "../../../components";
import {
    DeleteStorageButton,
    DetailStorage,
    EditStorageField,
} from "./StorageCustomField";

export default withTranslate(
    withStyles(listStylesNoActions)(
        ({ classes, hasShow, hasList, hasEdit, hasCreate, ...props }) => (
            <div>
                <FormHeading
                    title="page.storage.title.list"
                    {...props}
                    hasBack={false}
                >
                    <RedirectCreateButton
                        basePath={props.basePath}
                        resource={props.resource}
                    />
                </FormHeading>
                <Row className="my-3">
                    <List
                        classes={classes}
                        {...props}
                        className="w-100"
                        actions={null}
                        bulkActions={false}
                        pagination={<MyCustomPagination />}
                    >
                        <MySearchableDataGrid
                            {...props}
                            data={storage_data}
                            ids={[0, 1, 2, 3]}
                            className="w-100 my-3"
                            classes={classes}
                            searchEnable={false}
                            rowClick={null}
                            currentSort={{}}
                        >
                            <MyField hideLabel source="id" />
                            <DetailStorage
                                hideLabel
                                source="ten_kho"
                                {...props}
                            />
                            <MyField hideLabel source="dia_chi" />
                            <MyField hideLabel source="ngay_tao" />
                            <MyField hideLabel source="ngay_cap_nhat" />
                            <EditStorageField
                                {...props}
                                label="button.edit"
                                headerStyle={{ width: "10%" }}
                            />
                            <DeleteStorageButton
                                {...props}
                                label="button.delete"
                                headerStyle={{ width: "10%" }}
                            />
                        </MySearchableDataGrid>
                    </List>
                </Row>
            </div>
        )
    )
);
