import React from "react";
import { withStyles } from "@material-ui/core";
import { Row } from "react-bootstrap";
import { withTranslate, List } from "react-admin";
import { input_output_material } from "../../data-test";
import {
    MySearchableDataGrid,
    listStylesNoActions,
    FormHeading,
    MyCustomPagination,
    MyField,
    MyBootstrapInput,
    MyFilterBox,
} from "../../components";
import { INPUT_OUTPUT_ORDER, LENH_NHAP_XUAT } from "../../configurations";

export default withTranslate(
    withStyles(listStylesNoActions)(
        ({ classes, hasShow, hasList, hasEdit, hasCreate, ...props }) => (
            <div>
                <FormHeading
                    title="page.material.title.list"
                    {...props}
                    hasBack={false}
                />
                <StatisticDistributeFilter {...props} />
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
                            data={input_output_material}
                            ids={[0, 1, 2, 3]}
                            className="w-100 my-3"
                            classes={classes}
                            searchEnable={false}
                            rowClick={null}
                            currentSort={{}}
                        >
                            <MyField hideLabel source="loai" />
                            <MyField hideLabel source="so_lenh" />
                            <MyField hideLabel source="don_vi_nhap_xuat" />
                            <MyField hideLabel source="don_vi_nhap_xuat" />
                            <MyField hideLabel source="ngay_giao_nhan" />
                            <MyField hideLabel source="ngay_ra_lenh" />
                        </MySearchableDataGrid>
                    </List>
                </Row>
            </div>
        )
    )
);

const StatisticDistributeFilter = (props) => (
    <MyFilterBox
        {...props}
        // initFilter={defaultFilters}
        resource={INPUT_OUTPUT_ORDER}
        className="mb-2 filter-box"
        // convertValue={convertValue}
        buttonClasses="pl-3 d-flex flex-column-reverse justify-content-around"
        defaultSort={{}}
    >
        <MyBootstrapInput
            component="select"
            source="lenh_nhap_xuat"
            label={`resources.${INPUT_OUTPUT_ORDER}.fields.phan_loai`}
            choices={LENH_NHAP_XUAT}
            allowEmpty
            translateChoice={false}
            emptyChoiceLabel="time_range.all"
            groupClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6 form-group"
            labelClasses="label-filter-sm"
        />
    </MyFilterBox>
);
