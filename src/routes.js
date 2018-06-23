import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './hoc/auth';
import Home from './components/Home/home';
import Articles from './containers/articles';
import Admin from './containers/Admin/admin';
import Edit from './containers/Admin/edit';
import Add from './components/Admin/add';
import Layout from './hoc/layout';

const Routes = () => {
	return(
	    <Layout>
			<Switch>
				<Route path="/" exact component={Auth(Home, null)} />
                <Route path="/articles" exact component={Auth(Articles, null)} />
                <Route path="/admin/edit/:id" exact component={Auth(Edit, true)} />
				<Route path="/admin/add" exact component={Auth(Add, true)} />
                <Route path="/admin" exact component={Auth(Admin, true)} />
			</Switch>
		</Layout>
	)
}

export default Routes;