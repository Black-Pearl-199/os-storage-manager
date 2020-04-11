import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslate } from 'react-admin';
// import { List } from "react-admin";
import { storage_tag } from "../../../data-test";
import {
    MySearchableDataGrid,
    listStylesNoActions,
    FormHeading,
    // MyCustomPagination,
    MyField,
    MyBootstrapInput,
    MyFilterBox,
    InputWrapper,
    RedirectCreateButton,
} from "../../../components";
import {
    LocationStorage,
    DeleteStorageTagButton,
    DetailStorageTag,
} from "./StorageTagCustomField";
import { STORAGE_TAG, LOAI_XE } from "../../../configurations";

const gia_hang = fakeData(10);
const tang = fakeData(3);
const o_so = fakeData(100);

function fakeData(number) {
    let result = [];
    for (let index = 1; index <= number; index++) {
        result.push({
            id: index,
            name: `${index}-test`,
        });
    }
    return result;
}

export default withTranslate(withStyles(listStylesNoActions)(
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
            <StatisticDistributeFilter {...props} />
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
                data={storage_tag}
                ids={[0, 1, 2, 3]}
                className="w-100 my-3"
                classes={classes}
                searchEnable
                rowClick="show"
                currentSort={{}}
                exportable
            >
                <MyField hideLabel source="phan_loai" />
                <MyField hideLabel source="so_dang_ky" />
                <MyField hideLabel source="danh_diem" />
                <DetailStorageTag hideLabel source="ten_goi" {...props} />
                <MyField
                    hideLabel
                    source="quy_cach"
                    label="resources.storage_tag.fields.ky_hieu_quy_cach"
                />
                <MyField hideLabel source="muc_du_tru" />
                <LocationStorage hideLabel source="vi_tri" />
                <MyField hideLabel source="khoi_luong" />
                <MyField hideLabel source="don_gia" />
                <DeleteStorageTagButton
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

const StatisticDistributeFilter = (props) => (
    <MyFilterBox
        {...props}
        // hasSearch={false}
        // initFilter={defaultFilters}
        resource={STORAGE_TAG}
        className="mb-2 filter-box mr-0"
        // convertValue={convertValue}
        buttonClasses="pl-3 d-flex flex-column-reverse justify-content-around"
        defaultSort={{}}
    >
        <InputWrapper className="flex-1 px-3 row">
            <MyBootstrapInput
                source="so_dang_ky"
                groupClasses="col-xl-3 col-lg-3 col-md-6 col-sm-6 form-group"
                labelClasses="label-filter-sm"
            />
            <InputWrapper className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <InputWrapper className="row">
                    <MyBootstrapInput
                        component="select"
                        source="phan_loai"
                        choices={LOAI_XE}
                        translateChoice={false}
                        allowEmpty
                        emptyChoiceLabel="time_range.all"
                        groupClasses="col-xl-6 col-lg-6 col-md-6 col-sm-6 form-group"
                        labelClasses="label-filter-sm"
                    />
                    <MyBootstrapInput
                        source="ky_hieu_quy_cach"
                        allowEmpty
                        groupClasses="col-xl-6 col-lg-6 col-md-6 col-sm-6 form-group"
                        labelClasses="label-filter-sm"
                    />
                </InputWrapper>
            </InputWrapper>
            <InputWrapper className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <InputWrapper className="row">
                    <MyBootstrapInput
                        source="gia_hang_so"
                        allowEmpty
                        groupClasses="col-4 form-group"
                        labelClasses="label-filter-sm"
                        translateChoice={false}
                        component="select"
                        choices={gia_hang}
                        emptyChoiceLabel="time_range.all"
                    />
                    <MyBootstrapInput
                        source="tang"
                        allowEmpty
                        groupClasses="col-4 form-group"
                        labelClasses="label-filter-sm"
                        translateChoice={false}
                        component="select"
                        choices={tang}
                        emptyChoiceLabel="time_range.all"
                    />
                    <MyBootstrapInput
                        source="o_so"
                        allowEmpty
                        groupClasses="col-4 form-group"
                        labelClasses="label-filter-sm"
                        translateChoice={false}
                        component="select"
                        choices={o_so}
                        emptyChoiceLabel="time_range.all"
                    />
                </InputWrapper>
            </InputWrapper>
            <InputWrapper className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <InputWrapper className="row">
                    <MyBootstrapInput
                        source="danh_diem"
                        allowEmpty
                        groupClasses="col-xl-6 col-lg-6 col-md-6 col-sm-6 form-group"
                        labelClasses="label-filter-sm"
                    />
                    <MyBootstrapInput
                        source="ten_goi"
                        groupClasses="col-xl-6 col-lg-6 col-md-6 col-sm-6 form-group"
                        labelClasses="label-filter-sm"
                    />
                </InputWrapper>
            </InputWrapper>
            <InputWrapper className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <InputWrapper className="row">
                    <MyBootstrapInput
                        source="khoi_luong"
                        allowEmpty
                        groupClasses="col-xl-4 form-group"
                        labelClasses="label-filter-sm"
                    />
                    <MyBootstrapInput
                        source="don_gia"
                        groupClasses="col-xl-4 form-group"
                        labelClasses="label-filter-sm"
                    />
                    <MyBootstrapInput
                        source="muc_du_tru"
                        groupClasses="col-xl-4 form-group"
                        labelClasses="label-filter-sm"
                    />
                </InputWrapper>
            </InputWrapper>
        </InputWrapper>
    </MyFilterBox>
);
