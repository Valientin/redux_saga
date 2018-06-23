import React from 'react';

import { Link } from 'react-router-dom';
import NavLinkItems from './navLinkItems';

const Header = () => {

    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-brand">
                <Link className="nav-logo" to="/">Redux SAGA</Link>
            </div>
            <NavLinkItems />
        </nav>
    )
}

export default Header;