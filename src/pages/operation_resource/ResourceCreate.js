import React, { Component, Fragment } from "react";
import {
    FormHeading,
    listStylesNoActions,
    MySaveToolbar,
    MyTextInput,
    MyGroupingInput
} from "../../components";
import {
    Create,
    SimpleForm,
    translate
} from "react-admin";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { Container, Row } from "react-bootstrap";

const enhance = compose(
  translate,
  withStyles(listStylesNoActions),
  connect(undefined, {})
);
class ResourceCreate extends Component {

  render = () => {
    const { standAlone, translate, classes, recordForm, ...rest } = this.props;

    return (
      <Fragment>
            <Container fluid={true}>
                <FormHeading
                    title="page.resource.title.create"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row className="my-3">
                    <Create
                        {...rest}
                        className="w-75"
                        classes={classes}
                    >
                        <SimpleForm
                            redirect={"list"}
                            className="container-fluid px-0 mb-5"
                            toolbar={
                            <MySaveToolbar />
                            }
                        >
                            <MyGroupingInput formClassName="col-12 d-flex flex-column hide-legend">
                                <MyTextInput
                                    source="id"
                                    required
                                    groupClasses="row"
                                    labelClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-9 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                                <MyTextInput
                                    source="description"
                                    groupClasses="row"
                                    labelClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-9 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                            </MyGroupingInput>
                        </SimpleForm>
                    </Create>
                </Row>
            </Container>
      </Fragment>
    );
  };
}

export default enhance(ResourceCreate);
