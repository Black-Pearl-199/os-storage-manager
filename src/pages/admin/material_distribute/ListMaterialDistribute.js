import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslate, List } from "react-admin";
import { Row } from "react-bootstrap";
import { material_distribute_data } from "../../../data-test";
import {
    MySearchableDataGrid,
    listStylesNoActions,
    FormHeading,
    MyCustomPagination,
    MyField,
    RedirectCreateButton,
} from "../../../components";
import {
    DeleteMaterialDistributeButton,
    EditMaterialDisitributeField,
    DetailMaterialDistribute,
} from "./MaterialDistributeCustomField";

export default withTranslate(
    withStyles(listStylesNoActions)(
        ({ classes, hasShow, hasList, hasEdit, hasCreate, ...props }) => (
            <div>
                <FormHeading
                    title="page.material_distribute.title.list"
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
                            data={material_distribute_data}
                            ids={[0, 1]}
                            className="w-100 my-3"
                            classes={classes}
                            searchEnable={false}
                            rowClick={null}
                            currentSort={{}}
                        >
                            <DetailMaterialDistribute
                                hideLabel
                                source="ten_phan_loai"
                                {...props}
                            />
                            <MyField hideLabel source="ngay_tao" />
                            <EditMaterialDisitributeField
                                {...props}
                                label="button.edit"
                                headerStyle={{ width: "10%" }}
                            />
                            <DeleteMaterialDistributeButton
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
