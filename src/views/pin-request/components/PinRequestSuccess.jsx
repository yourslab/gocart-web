import React, {Component} from 'react';
import {Link} from 'react-router';

const PinRequestSuccess = () =>
  <div className="u-text-center">
    <h1>Sure!</h1>

    <h4 className="u-text-muted u-headerNormal">
      We just sent a message to your email containing the activation link.<br />
      See you soon!
    </h4>

    <Link to="/login" className="Btn Btn--info">
      Go Back
    </Link>
  </div>

export default PinRequestSuccess;
