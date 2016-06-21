import React from 'react';
import StaticImg from 'app/components/StaticImg';

const EmptyResults = () =>
  <div className="BlankSlate">
    <div className="BlankSlate-icon">
      <StaticImg src="icons/sad.svg" alt="Sad" />
    </div>

    <h1 className="BlankSlate-heading">No Result Found</h1>
  </div>

export default EmptyResults;
