import React from "react";
import {Button} from "react-bootstrap";
import {translate} from 'react-admin';

class NoAccess extends React.Component {
    goBack = () => {
        const {history} = this.props;
        history.goBack();
    };

    render() {
        const {translate} = this.props;

        return (
            <div className='w-100 h-100 text-center'>
                <div>
                    {translate('no-access')}
                </div>
                <div>
                    <Button variant='itech-primary' onClick={this.goBack}>
                        {translate('button.back')}
                    </Button>
                </div>
            </div>
        )
    }
}


export default translate(NoAccess);