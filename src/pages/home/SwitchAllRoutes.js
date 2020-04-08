import React from "react";
import { Route, Switch } from "react-router-dom";
import { Resource } from "ra-core";
import { Redirect } from "react-router";
import { OPERATION_RESOURCES } from "../../configurations/resources";
import { LazyLoad } from "../../components";
import { URL_STORAGE_MANAGE } from "./Home";

export const LazyResourceList = React.lazy(() => import("../operation_resource/ResourceList"));
export const LazyResourceCreate = React.lazy(() => import("../operation_resource/ResourceCreate"));
export const LazyResourceEdit = React.lazy(() => import("../operation_resource/ResourceEdit"));

export const LazyListStorageTag = React.lazy(() => import("../storage_manage/tag/ListStorageTag"));
export default () => (
    <React.Suspense fallback={<LazyLoad />}>
        <Switch>
            <Route
                path={URL_STORAGE_MANAGE}
                render={(props) => (
                    <Resource
                        context="route"
                        name={OPERATION_RESOURCES}
                        list={LazyListStorageTag}
                        edit={LazyResourceEdit}
                        create={LazyResourceCreate}
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
