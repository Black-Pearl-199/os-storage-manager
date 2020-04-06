import React, { Component, Fragment } from "react";
import {
  FormHeading,
  listStylesNoActions,
  MyEditToolbar,
  MyTextInput,
  MyGroupingInput
} from "../../components";
import {
  Edit,
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
class ResourceEdit extends Component {
  state = {
    editing: false
  };

  changeEditState = value => {
    this.setState({ editing: value });
  };

  render = () => {
    const { standAlone, translate, classes, ...rest } = this.props;

    return (
      <Fragment>
            <Container fluid={true}>
                <FormHeading
                    title="page.resource.title.edit"
                    {...rest}
                    hasBack={!standAlone}
                />
                <Row className="my-3">
                    <Edit
                        {...rest}
                        className="w-75"
                        classes={classes}
                        undoable={false}
                    >
                        <SimpleForm
                            redirect={"list"}
                            className="container-fluid px-0 mb-5"
                            toolbar={
                            <MyEditToolbar
                                editing={this.state.editing}
                                changeEditState={this.changeEditState}
                                deletable={!this.state.editing}
                            />
                            }
                        >
                            <MyGroupingInput formClassName="col-12 d-flex flex-column hide-legend">
                                <MyTextInput
                                    source="id"
                                    required
                                    groupClasses="row"
                                    readOnly
                                    labelClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-9 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                                <MyTextInput
                                    source="description"
                                    groupClasses="row"
                                    readOnly={!this.state.editing}
                                    labelClasses="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    inputClasses="col-xl-9 col-lg-8 col-md-6 col-sm-6 my-auto"
                                />
                            </MyGroupingInput>
                        </SimpleForm>
                    </Edit>
                </Row>
            </Container>
      </Fragment>
    );
  };
}

export default enhance(ResourceEdit);
