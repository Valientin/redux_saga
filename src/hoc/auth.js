import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function(ComposedClass,reload){
    class AuthenticationCheck extends React.Component {

        render(){
            return(
                !this.props.user.authenticated && reload ?
                    <Redirect to="/articles" />
                : <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state){
        return{
            user: state.users.auth
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)
}