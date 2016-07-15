import React, {Component} from 'react';
import {Link} from 'react-router';
import StaticImg from 'app/components/StaticImg';

const BlankSlate = () =>
  <div className="Grid-cell u-size6 u-spacer-base">
    <Link to="/manage-posts/create" className="BlankSlate">
      <StaticImg src="/icons/post_icon@1x.png" />
      <h1> Add Post </h1>
    </Link>
  </div>

export default BlankSlate;
