import React from "react";
import { withStyles } from "@material-ui/core";
import { List } from "react-admin";
import {
  MySearchableDataGrid,
  listStylesNoActions,
  FormHeading,
  MyCustomPagination,
  RedirectCreateButton,
  MyField
} from "../../components";
import { Row } from "react-bootstrap";
import { EditResourceButton, DeleteResourceButton } from './ResourceFieldCustom';

export default withStyles(listStylesNoActions)(({ classes, ...props }) => (
  <div>
    <FormHeading title="page.resource.title.list" {...props} hasBack={false}>
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
        <MySearchableDataGrid searchEnable rowClick={null}>
            <MyField hideLabel source="id" headerStyle={{ width: '20%' }} />
            <MyField hideLabel source="description" />
            <EditResourceButton {...props} label="button.edit" headerStyle={{ width: '10%'}} />
            <DeleteResourceButton {...props} label="button.delete" headerStyle={{ width: '10%'}} />
        </MySearchableDataGrid>
      </List>
    </Row>
  </div>
));
