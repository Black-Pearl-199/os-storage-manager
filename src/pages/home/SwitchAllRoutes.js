import React from "react";
import { Route, Switch } from "react-router-dom";
import { Resource } from "ra-core";
import { Redirect } from "react-router";
import { STORAGE_TAG, STATISTIC_DISTRIBUTE, INPUT_OUTPUT_ORDER } from "../../configurations/resources";
import { LazyLoad } from "../../components";
import { URL_STORAGE_MANAGE, URL_STATISTIC_DISTRIBUTE, URL_STORAGE_TAG, URL_INPUT_OUTPUT_ORDER } from "./Home";

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
            {/* <Route path={URL_CHANGE_PASS} render={props => <LazyPasswordChange {...props} />} />

            <Route path={URL_PROFILE} render={props => <LazyProfile {...props} />} /> */}

            <Redirect to={URL_STORAGE_MANAGE} />
        </Switch>
    </React.Suspense>
);
