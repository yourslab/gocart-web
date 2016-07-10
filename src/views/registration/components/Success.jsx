import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

const Success = () =>
  <div className="u-text-center">
    <Helmet title="Sign Up Successful" />

    <h1>Awesome!</h1>

    <h4 className="u-text-muted">
      You signed up successfully, but one last step &mdash; please check your email to verify your account.
    </h4>
  </div>

export default Success;
