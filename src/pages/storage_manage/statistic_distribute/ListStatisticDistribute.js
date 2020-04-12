import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslate, List } from "react-admin";
import { Row } from "react-bootstrap";
import { statistic_list_distribute } from "../../../data-test";
import {
    MySearchableDataGrid,
    listStylesNoActions,
    FormHeading,
    MyCustomPagination,
    MyField,
    MyBootstrapInput,
    MyFilterBox,
} from "../../../components";
import { STATISTIC_DISTRIBUTE, LOAI_XE } from "../../../configurations";

export default withTranslate(
    withStyles(listStylesNoActions)(
        ({ classes, hasShow, hasList, hasEdit, hasCreate, ...props }) => (
            <div>
                <FormHeading
                    title="page.statistic_distribute.name"
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
                            data={statistic_list_distribute}
                            ids={[0, 1, 2, 3]}
                            className="w-100 my-3"
                            classes={classes}
                            searchEnable
                            rowClick={null}
                            currentSort={{}}
                            exportable
                        >
                            <MyField hideLabel source="so_dang_ky" />
                            <MyField hideLabel source="danh_diem" />
                            <MyField hideLabel source="ten_goi" />
                            <MyField hideLabel source="quy_cach" />
                            <MyField hideLabel source="muc_du_tru" />
                            <MyField hideLabel source="vi_tri" />
                            <MyField hideLabel source="khoi_luong" />
                            <MyField hideLabel source="don_gia" />
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
        resource={STATISTIC_DISTRIBUTE}
        className="mb-2 filter-box"
        // convertValue={convertValue}
        buttonClasses="pl-3 d-flex flex-column-reverse justify-content-around"
        defaultSort={{}}
    >
        <MyBootstrapInput
            component="select"
            source="loai_xe"
            choices={LOAI_XE}
            translateChoice={false}
            groupClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6 form-group"
            labelClasses="label-filter-sm"
        />
    </MyFilterBox>
);
