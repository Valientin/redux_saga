import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavLinkItems extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            navItems: [
                {
                   text: 'Admin',
                   link: '/admin',
                   restricted: true
                },
                {
                   text: 'Articles',
                   link: '/articles',
                   restricted: false
                }
           ]
        }
    }

    element = (item, i) => (
    	<li key={i} className="header-items__item">
            <Link className="header-items__link" to={item.link}>{item.text}</Link>
        </li>
	)

	renderItems = () => (
		this.props.user ?
			this.state.navItems.map((item, i) => {
				if(this.props.user.authenticated){
					return this.element(item,i)
				} else {
					return !item.restricted ?
						this.element(item,i)
					: null
				}
			})
		: null
	)


    render(){
        return(
            <div className="header-items">
                <ul className="header-items__list">
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
	return{
		user: state.users.auth
	}
}


export default connect(mapStateToProps)(NavLinkItems);