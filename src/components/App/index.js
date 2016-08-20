import React from 'react';
import { Layout, Header, Navigation } from 'react-mdl';
import { Link } from 'react-router';

export default (props) => (
  <Layout>
    <Header title="Here is the header of website">
      <Navigation>
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
      </Navigation>
    </Header>
    {props.children}
  </Layout>
);
