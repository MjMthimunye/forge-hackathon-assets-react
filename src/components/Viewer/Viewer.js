import React, { Component } from 'react';
import Helpers from './Viewer-helpers';
import {withRouter} from 'react-router-dom';

class Viewer extends Component {

    constructor(props) {
        super(props);
    };

    
    componentDidMount() {

        const {assets, categories} = this.props;

        // Revit Architectural Sample File
        var documentId = 'urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLi1aelF2dTR1VEJDVmwtWXg4YWtpRGc_dmVyc2lvbj0x';
        Helpers.launchViewer('viewerDiv', documentId , '0002', assets, categories);        
    }

	render() {
        return (
            <div className='forge-viewer' id="viewerDiv" />
        );
	}
}

export default Viewer;
