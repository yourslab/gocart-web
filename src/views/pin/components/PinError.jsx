import React, {Component} from 'react';
import {Link} from 'react-router';

const PinSuccess = ({error}) =>
  <div className="u-text-center">
    <h1>Oops!</h1>

    <h4 className="u-text-muted u-headerNormal">
      {error}
    </h4>

    <Link to="/login" className="Btn Btn--info">
      Go Back
    </Link>
  </div>

export default PinSuccess;
