import React from "react";
import { Route, Switch } from "react-router-dom";
import { Resource } from "ra-core";
import { Redirect } from "react-router";
import { STORAGE_TAG, STATISTIC_DISTRIBUTE, INPUT_OUTPUT_ORDER, STORAGE, MATERIAL_DISTRIBUTE, ACCOUNT } from "../../configurations/resources";
import { LazyLoad } from "../../components";
import { URL_STORAGE_MANAGE, URL_STATISTIC_DISTRIBUTE, URL_STORAGE_TAG, URL_INPUT_OUTPUT_ORDER, URL_STORAGE, URL_MATERIAL_DISTRIBUTE, URL_ACCOUNT } from "./Home";

export const LazyResourceList = React.lazy(() => import("../operation_resource/ResourceList"));
export const LazyResourceCreate = React.lazy(() => import("../operation_resource/ResourceCreate"));
export const LazyResourceEdit = React.lazy(() => import("../operation_resource/ResourceEdit"));

export const LazyStorageTagCreate = React.lazy(() => import("../storage_manage/tag/CreateStorageTag"));
export const LazyListStorageTag = React.lazy(() => import("../storage_manage/tag/ListStorageTag"));
export const LazyEditStorageTag = React.lazy(() => import("../storage_manage/tag/EditStorageTag"));
export const LazyDetailStorageTag = React.lazy(() => import("../storage_manage/tag/DetailStorageTag"));

export const LazyStatisticDistribute = React.lazy(() => import("../storage_manage/statistic_distribute/ListStatisticDistribute"));

export const LazyInputOutputManage = React.lazy(() => import("../input_output_material/InputOutputOrderManage"));
export const LazyInputOrder = React.lazy(() => import("../input_output_material/CreateInput"));
export const LazyOutputOrder = React.lazy(() => import("../input_output_material/CreateOutput"));


export const LazyStorageCreate = React.lazy(() => import("../admin/storage/CreateStorage"));
export const LazyListStorage = React.lazy(() => import("../admin/storage/ListStorage"));
export const LazyEditStorage = React.lazy(() => import("../admin/storage/EditStorage"));

export const LazyCreateMaterialDistribute = React.lazy(() => import("../admin/material_distribute/CreateMaterialDistribute"));
export const LazyListMaterialDistribute = React.lazy(() => import("../admin/material_distribute/ListMaterialDistribute"));
export const LazyEditMaterialDistribute = React.lazy(() => import("../admin/material_distribute/EditMaterialDistribute"));

export const LazyCreateAccount = React.lazy(() => import("../account/CreateAccount"));
export const LazyListAccount = React.lazy(() => import("../account/ListAccount"));
export const LazyEditAccount = React.lazy(() => import("../account/EditAccount"));


export default () => (
    <React.Suspense fallback={<LazyLoad />}>
        <Switch>
            {/* <Route
                path={URL_STORAGE_MANAGE}
                render={(props) => (
                    <Resource
                        context="route"
                        name={OPERATION_RESOURCES}
                        list={LazyResourceList}
                        edit={LazyResourceEdit}
                        create={LazyResourceCreate}
                        {...props}
                    />
                )}
            /> */}
            <Route
                path={URL_STATISTIC_DISTRIBUTE}
                render={(props) => (
                    <Resource
                        context="route"
                        name={STATISTIC_DISTRIBUTE}
                        list={LazyStatisticDistribute}
                        {...props}
                    />
                )}
            />

            <Route
                path={URL_STORAGE_TAG}
                render={(props) => (
                    <Resource
                        context="route"
                        name={STORAGE_TAG}
                        edit={LazyEditStorageTag}
                        list={LazyListStorageTag}
                        create={LazyStorageTagCreate}
                        show={LazyDetailStorageTag}
                        {...props}
                    />
                )}
            />

            <Route
                path={URL_INPUT_OUTPUT_ORDER}
                render={(props) => (
                    <Resource
                        context="route"
                        name={INPUT_OUTPUT_ORDER}
                        list={LazyInputOutputManage}
                        {...props}
                    />
                )}
            />
            <Route
                path={URL_STORAGE}
                render={(props) => (
                    <Resource
                        context="route"
                        name={STORAGE}
                        edit={LazyEditStorage}
                        list={LazyListStorage}
                        create={LazyStorageCreate}
                        {...props}
                    />
                )}
            />

            <Route
                path={URL_MATERIAL_DISTRIBUTE}
                render={(props) => (
                    <Resource
                        context="route"
                        name={MATERIAL_DISTRIBUTE}
                        edit={LazyEditMaterialDistribute}
                        list={LazyListMaterialDistribute}
                        create={LazyCreateMaterialDistribute}
                        {...props}
                    />
                )}
            />

            <Route
                path={URL_ACCOUNT}
                render={(props) => (
                    <Resource
                        context="route"
                        name={ACCOUNT}
                        edit={LazyEditAccount}
                        list={LazyListAccount}
                        create={LazyCreateAccount}
                        {...props}
                    />
                )}
            />
            {/* <Route path={URL_CHANGE_PASS} render={props => <LazyPasswordChange {...props} />} />

            <Route path={URL_PROFILE} render={props => <LazyProfile {...props} />} /> */}

            <Redirect to={URL_STORAGE_MANAGE} />
        </Switch>
    </React.Suspense>
);
