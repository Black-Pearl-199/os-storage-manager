import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslate } from 'react-admin';
// import { List } from "react-admin";
import { account_data } from "../../data-test";
import {
    MySearchableDataGrid,
    listStylesNoActions,
    FormHeading,
    // MyCustomPagination,
    MyField,
    RedirectCreateButton,
} from "../../components";
import {
    EditAccountField,
    EditAccountButton,
    DeleteAccountButton
} from "./AccountCustomField";

export default withTranslate(withStyles(listStylesNoActions)(
    ({ classes, hasShow, hasList, hasEdit, hasCreate, ...props }) => (
        <div>
            <FormHeading
                title="page.account.title.list"
                {...props}
                hasBack={false}
            >
                <RedirectCreateButton
                    basePath={props.basePath}
                    resource={props.resource}
                />
            </FormHeading>
            {/* <Row className="my-3"> */}
            {/* <List
                classes={classes}
                {...props}
                className="w-100"
                actions={null}
                bulkActions={false}
                pagination={<MyCustomPagination />}
            > */}
            <MySearchableDataGrid
                {...props}
                data={account_data}
                ids={[0, 1, 2, 3]}
                className="w-100 my-3"
                classes={classes}
                searchEnable={false}
                rowClick={null}
                currentSort={{}}
            >
                <EditAccountField hideLabel source="username" {...props} />
                <MyField hideLabel source="ten" />
                <MyField hideLabel source="cap" />
                <MyField hideLabel source="kho_quan_ly" />
                <MyField hideLabel source="ngay_tao" />
                <MyField hideLabel source="ngay_cap_nhat" />
                <EditAccountButton
                    {...props}
                    label="button.edit"
                    headerStyle={{ width: "10%" }}
                />
                <DeleteAccountButton
                    {...props}
                    label="button.delete"
                    headerStyle={{ width: "10%" }}
                />
            </MySearchableDataGrid>
            {/* </List> */}
            {/* </Row> */}
        </div>
    )
));
