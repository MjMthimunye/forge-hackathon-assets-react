import React, { Component } from 'react';
import Jumbotron from './Jumbotron/Jumbotron';
import Viewer from '../components/Viewer/Viewer';
import {withRouter} from 'react-router-dom';
import Gallery from './Gallery';
//import { ChronosTimeSlider } from "forge-dataviz-iot-react-components";
import "forge-dataviz-iot-react-components/dist/main.bundle.css"; // To import styles.
import 'font-awesome/css/font-awesome.css';

class Home extends Component {


    constructor(props) {
        super(props);

    
        this.state = {
            token: '',
            categories: [],
            assets: [],

        };
    };
 
 
    componentDidMount(){
        //console.log(this.props.location.state.assets);
        //console.log(this.props.location.state.categories);
        this.setState({assets: this.props.location.state.assets})
        this.setState({categories: this.props.location.state.categories})
    }




    render() {

        //const { assets, categories } = this.state;
        const { assets, categories } = this.props.location.state;

        return (
        <div>
       

            <Viewer assets={assets} categories={categories}/>

           
        </div>
        );
    }
}

export default Home;


{/* <Jumbotron assets={assets} categories={categories}/> */}
 {/* <Gallery />  */}