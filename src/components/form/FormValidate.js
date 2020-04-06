import React from "react";

class FormValidate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: false
        };
        this.onValidSubmit = this.props.onValidSubmit;
    }

    /**
     * Them main function that validates the list and fills in the error messages.
     * @returns bool Returns a boolean showing if the list is valid for submission or not.
     **/
    validate = () => {
        //this.formEl is a reference in the component to the list DOM element.
        const formEl = this.formEl;
        const formLength = formEl.length;

        /*
        * The checkValidity() method on a list runs the
        * html5 list validation of its elements and returns the result as a boolean.
        * It returns 'false' if at least one of the list elements does not qualify,
        * and 'true', if all list elements are filled with valid values.
        */
        if (formEl.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                //the i-th child of the list corresponds to the forms i-th input element
                const elem = formEl[i];
                /*
                * errorLabel placed next to an element is the container we want to use
                * for validation error message for that element
                */
                const errorLabel = elem.parentNode.querySelector(".invalid-feedback");

                /*
                * A list element contains also any buttuns contained in the list.
                * There is no need to validate a button, so, we'll skip that nodes.
                */
                if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                    /*
                    * Each note in html5 list has a validity property.
                    * It contains the validation state of that element.
                    * The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
                    * If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
                    * We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
                    */
                    if (!elem.validity.valid) {
                        elem.setCustomValidity(elem.attributes['invalid'].value);
                        errorLabel.textContent = elem.validationMessage;
                    } else {
                        errorLabel.textContent = "";
                    }
                }
            }

            //Return 'false', as the formEl.checkValidity() method said there are some invalid list inputs.
            return false;
        } else {
            //The list is valid, so we clear all the error messages
            for (let i = 0; i < formLength; i++) {
                const elem = formEl[i];
                const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
                if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                    errorLabel.textContent = "";
                }
            }

            //Return 'true', as the list is valid for submission
            return true;
        }
    };

    /**
     * This is the method that is called on list submit.
     * It stops the default list submission process and proceeds with custom validation.
     **/
    submitHandler = event => {
        event.preventDefault();

        //If the call of the validate method was successful, we can proceed with list submission. Otherwise we do nothing.
        if (this.validate() && this.onValidSubmit) {
            this.onValidSubmit(event);
        }

        this.setState({isValidated: true});
    };

    /**
     * Render the component as a regular list element with appended children from props.
     **/
    render() {
        const props = Object.assign({}, this.props);
        delete props.onValidSubmit;

        //Add bootstrap's 'was-validated' class to the forms classes to support its styling
        let classNames = [];
        if (props.className) {
            classNames = props.className;
            delete props.className;
        }

        // if (props.onValidSubmit) {delete props.onValidSubmit;}


        if (this.state.isValidated) {
            classNames.push("was-validated");
        }

        //The list will have a refference in the component and a submit handler set to the component's submitHandler
        return (
            <form
                {...props}
                className={classNames}
                noValidate
                ref={form => (this.formEl = form)}
                onSubmit={this.submitHandler}
            >
                {this.props.children}
            </form>
        );
    }
}

export default FormValidate;