import { Fragment } from 'react';

import Header from '../Navbars/Header';
import Home from '../MainBody/Home';

const Layout = (props) => {
  return (
    <Fragment>
      <Header/>
      <Home/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
