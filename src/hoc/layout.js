import React from 'react';

import Header from '../components/Header/header';

const Layout = (props) => {

	return (
        <div className="inline-root__wrapper">
        	<Header/>
        	<div className="root-wrapper__center">
        		{props.children}
        	</div>
        </div>
	)
};

export default Layout;
