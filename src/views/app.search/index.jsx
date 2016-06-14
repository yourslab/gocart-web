import React, { Component } from 'react';
import {IndexLink, Link} from 'react-router';
import history from 'app/history';
import StaticImg from 'app/components/StaticImg';

export default class AppSearchView extends Component {
  state = {
    search: this.props.location.query.q || ''
  };

  render() {
    const {search, feed, loading} = this.state;

    return (
      <div>
        {/*<div className="OverlaySearchbarBackdrop" />*/}

        <div className="OverlaySearchbar">
          <div className="OverlaySearchbar-actions">
            <Link to="/" className="PlainBtn">
              <StaticImg src="icons/close_black@1x.png" alt="Close" />
            </Link>
          </div>

          <div className="Container">
            <form onSubmit={this.handleSearch}>
              <div className="OverlaySearchbar-inner">
                <div className="OverlaySearchbar-label">Search</div>
                <input className="OverlaySearchbar-input" value={search} onChange={this.handleInput} />

                <button className="OverlaySearchbar-button">
                  <StaticImg src="icons/search_icon_red@2x.png" alt="Search" />
                </button>
              </div>
            </form>
          </div>

          {/*<div className="OverlaySearchbar-results">
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
          </div>*/}
        </div>

        <div className="Container">
          <div className="Tab u-spacer-base">
            <IndexLink to={{ pathname: '/search', query: { q: search } }} className="Tab-item" activeClassName="Tab-item--active">Posts</IndexLink>
            <Link to={{ pathname: '/search/users', query: { q: search } }} className="Tab-item" activeClassName="Tab-item--active">Users</Link>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }


  handleSearch = (evt) => {
    evt.preventDefault();

    history.push({
      pathname: this.props.location.pathname,
      query: { q: this.state.search }
    });
  }

  handleInput = (evt) => {
    this.setState({ search: evt.target.value });
  }
}
