import React, {Component} from 'react';
import {Link} from 'react-router';

const PinSuccess = () =>
  <div className="u-text-center">
    <h1>Welcome to Gocart!</h1>

    <h4 className="u-text-muted u-headerNormal">
      You just activated your email. You may now login, and enjoy the e-commerce experience with us.
    </h4>

    <Link to="/login" className="Btn Btn--info">
      Proceed to Login
    </Link>
  </div>

export default PinSuccess;
