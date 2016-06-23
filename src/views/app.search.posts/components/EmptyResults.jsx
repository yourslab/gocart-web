import React from 'react';
import StaticImg from 'app/components/StaticImg';

const EmptyResults = () =>
  <div className="SearchBlankSlate">
    <div className="SearchBlankSlate-icon">
      <StaticImg src="icons/sad.svg" alt="Sad" />
    </div>

    <h1 className="SearchBlankSlate-heading">No Result Found</h1>
  </div>

export default EmptyResults;
