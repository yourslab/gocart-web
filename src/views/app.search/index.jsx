import React, { Component } from 'react';
import StaticImg from 'app/components/StaticImg';
import ProductCard from './components/ProductCard';

export default class AppSearchView extends Component {
  render() {
    return (
      <div>
        <div className="OverlaySearchbarBackdrop" />

        <div className="OverlaySearchbar">
          <div className="Container">
            <div className="OverlaySearchbar-inner">
              <div className="OverlaySearchbar-label">Search</div>
              <input className="OverlaySearchbar-input" />

              <button className="OverlaySearchbar-button">
                <StaticImg src="icons/search_icon_red@2x.png" alt="Search" />
              </button>
            </div>
          </div>

          <div className="OverlaySearchbar-results">
            <div className="Container">
              <div className="OverlaySearchbarResult">
                <h6 className="OverlaySearchbarResult-heading">Suggested Searches</h6>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple For Sale &nbsp; <small className="OverlaySearchbarResult-resultSubText">by BoyExport</small></h5>
                  <h5 className="OverlaySearchbarResult-resultSection"><small className="OverlaySearchbarResult-resultSubText">Posted Yesterday</small></h5>
                </a>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple For Sale &nbsp; <small className="OverlaySearchbarResult-resultSubText">by BoyExport</small></h5>
                  <h5 className="OverlaySearchbarResult-resultSection"><small className="OverlaySearchbarResult-resultSubText">Posted 2 hours ago</small></h5>
                </a>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple For Sale &nbsp; <small className="OverlaySearchbarResult-resultSubText">by BoyExport</small></h5>
                  <h5 className="OverlaySearchbarResult-resultSection"><small className="OverlaySearchbarResult-resultSubText">Posted May 01, 2016</small></h5>
                </a>
              </div>

              <div className="OverlaySearchbarResult">
                <h6 className="OverlaySearchbarResult-heading">Recent Searches</h6>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple Mini</h5>
                  <h5 className="OverlaySearchbarResult-resultSection">5 results found</h5>
                </a>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple iPad 4</h5>
                  <h5 className="OverlaySearchbarResult-resultSection">23 results</h5>
                </a>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple MacBook Pro</h5>
                  <h5 className="OverlaySearchbarResult-resultSection">69 results</h5>
                </a>
              </div>

              <div className="OverlaySearchbarResult">
                <h6 className="OverlaySearchbarResult-heading">Hot Searches</h6>

                <a href="#" className="OverlaySearchbarResult-result">
                  <h5 className="OverlaySearchbarResult-resultSection">Apple Mini</h5>
                  <h5 className="OverlaySearchbarResult-resultSection">5 results found</h5>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="Container">
          <div className="Tab u-spacer-base">
            <a href="#" className="Tab-item Tab-item--active">Posts</a>
            <a href="#" className="Tab-item">Hashtags</a>
            <a href="#" className="Tab-item">Users</a>
          </div>

          <div className="Grid">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    );
  }
}
