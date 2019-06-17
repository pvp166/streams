import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {signIn, signOut} from '../actions'
class GoogleAuth extends React.Component{
    
    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: 
                '378722589437-p9g42ovn8delvnhl924difsstkclkrju.apps.googleusercontent.com',
                scope: 'email'
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    }


    
    renderAuthButton(){
        if ( this.props.isSignedIn ===null){
            return null;
        }else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        }else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            );
        }
    }
    onSignInClick = () => {
        this.auth.signIn();
    }
    onSignOutClick = () => {
        this.auth.signOut();
    }
    render(){
        return <div>{this.renderAuthButton()}</div>
    }
};
const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};
export default connect( mapStateToProps, {signIn, signOut})(GoogleAuth);
