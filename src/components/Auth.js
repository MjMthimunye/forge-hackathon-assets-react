/*global chrome*/
import {Container, CssBaseline, Link } from '@material-ui/core';
import React, {Component} from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import logo from '../assets/images/auto.png';

//import history from "../utils/history";


const styles = {
    container:{
        marginTop: 200,
        textAlign: 'center',
        height: 450
        
    },
    paper: {
        marginTop: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}
 
 
 
 
class AuthPage extends Component{
 
    constructor(props) {
        super(props);
        this.oAuth2TokenGet = this.oAuth2TokenGet.bind(this);

    
        this.state = {
            token: '',
            categories: [],
            assets: [],

        };
    };
 
 
    componentDidMount(){
        console.log("Authentification Page ( Three Legged )")
    }
 
 
    oAuth2TokenGet() {
        // Build the oauth request url

        const clientId = 'HjU6XYZQiL3UbqSLFm1k2IsgNBPoRgXa';
        const scope = 'data:read account:read data:write data:create account:write';
        const redirectUri = 'http://localhost:3000/api/forge/callback/oauth';  
        const url = `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
        // Open a new window
        const win = window.open(url, 'Authenticate', 'height=600,width=450');
        if (win) win.focus();
    
    
        const pollTimer = window.setInterval(() => {
        try {
            if (!!win && win.location.href.indexOf(redirectUri) !== -1) {
            window.clearInterval(pollTimer);
    
            // Get the URL hash with your token in itS
            const hash = win.location.hash;
            win.close();
    
            // Parse the string hash and convert to object of keys and values
            const result = hash.substring(1)
                .split('&')
                .map(i => i.split('='))
                .reduce((prev, curr) => ({
                ...prev,
                [curr[0]]: curr[1],
                }), {});

                //console.log(result.access_token)
                this.setState({token:result.access_token});

                const projectID = 'edd7ab2f-07aa-4274-ac1d-3d3cace73f25';
                const aToken = result.access_token;
                const url = `https://developer.api.autodesk.com/construction/assets/v2/projects/${projectID}/assets?limit=200`;
                //const urlAssets = `https://developer.api.autodesk.com/construction/assets/v2/projects/${projectID}/assets?includeCustomAttributes=true`;
               

                //get Assets from Autodesk Build
                fetch( url , { 
                        headers: {
                            'Authorization': `Bearer ${aToken}`
                        }
                    })
                    .then(res => res.text())
                    .then(data => {
                        let json = JSON.parse(data)
                        let pretty = JSON.stringify(json, null, 2)
                        //console.log(json.results)
                        //console.log(pretty);
                        this.setState({ assets: json.results});
        
                        
                })


                const urlCategories = `https://developer.api.autodesk.com/construction/assets/v1/projects/${projectID}/categories`;
                
                //get Assets from Autodesk Build
                fetch( urlCategories , { 
                        headers: {
                            'Authorization': `Bearer ${aToken}`
                        }
                    })
                    .then(res => res.text())
                    .then(data => {
                        let json = JSON.parse(data)
                        let pretty = JSON.stringify(json, null, 2)
                        //console.log(json.results)
                        //console.log(pretty);
                        //this.setState({ categories: json.data});

                        this.props.history.push( {pathname: "/viewer",
					    state: { assets: this.state.assets, categories: json.results }});
        
                        
                })
               


                // Calculate when the token expires and store in the result object
                result.expires_at = Date.now() + parseInt(hash.expires_in, 10);
        
           
            }
        } catch (err) {
            // do something or nothing if window still not redirected after login
            console.log(err);
        }
        }, 100);
    }
 
 
     
 
     handleSubmit = (e)=>{
         e.preventDefault()
 
     }
 
 
 
     render(){
 
         return(
             <React.Fragment>
                 <CssBaseline>
                     <Container fixed style={styles.container}>
                         <div className={styles.paper}>
                         
                            <button><img src={logo} alt="Autodesk SignIn" onClick={this.oAuth2TokenGet.bind(this)} style={{height: 70, width: 70}}/></button>
                         
                         </div>
                         <Box mt={8}>
                             <Copyright />
                         </Box>
                     </Container>       
                 </CssBaseline>
             </React.Fragment>
         )
     }
 }
 
 
 export default AuthPage;
 
 
 
 function Copyright() {
     return (
       <Typography variant="body2" color="textSecondary" align="center" style={{marginTop: -40}}>
            {'Copyright © '}
                <Link color="inherit" href="">
                    Forge Hackathon
                </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
       </Typography>
     );
 }
 
 
