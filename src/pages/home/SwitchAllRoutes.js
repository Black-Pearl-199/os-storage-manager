import React from "react";
import { Route, Switch } from "react-router-dom";
import { Resource } from "ra-core";
import { Redirect } from "react-router";
import { OPERATION_RESOURCES, STORAGE_TAG } from "../../configurations/resources";
import { LazyLoad } from "../../components";
import { URL_STORAGE_MANAGE, URL_STATISTIC_DISTRIBUTE, URL_STORAGE_TAG } from "./Home";

export const LazyResourceList = React.lazy(() => import("../operation_resource/ResourceList"));
export const LazyResourceCreate = React.lazy(() => import("../operation_resource/ResourceCreate"));
export const LazyResourceEdit = React.lazy(() => import("../operation_resource/ResourceEdit"));

export const LazyStorageTagCreate = React.lazy(() => import("../storage_manage/tag/CreateStorageTag"));
// export const LazyResourceEdit = React.lazy(() => import("../storage_manage/tag/EditStorageTag"));

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
                path={URL_STORAGE_TAG}
                render={(props) => (
                    <Resource
                        context="route"
                        name={STORAGE_TAG}
                        edit={LazyResourceEdit}
                        create={LazyStorageTagCreate}
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
