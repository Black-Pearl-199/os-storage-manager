import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { Row } from "react-bootstrap";
import {
    FormHeading,
    listStylesNoActions,
} from "../../../components";

const enhance = compose(
    withStyles(listStylesNoActions),
    connect(undefined, {})
);

class CreateStorageTag extends Component {
    render = () => {
        const { standAlone, classes, ...rest } = this.props;

        return (
            <>
                <FormHeading
                    title="page.storage_tag.title.show"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row className="my-3 col">
                    Chưa có thông tin về trang này. Bạn hãy quay lại sau
                </Row>
            </>
        );
    };
}

export default enhance(CreateStorageTag);
