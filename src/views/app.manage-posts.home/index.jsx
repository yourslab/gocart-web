import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ProductCard from './components/ProductCard';

export default class AppManagePostshomeView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Manage Posts" />

        <div className="SidebarContainer-panelHeading">
          <div />

          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <a href="#" className="Btn Btn--primary Btn--inverted Btn--borderless">Delete All</a>
            </div>
          </div>
        </div>

        <div className="Grid">
          {[[], [], [], [], [], []].map(() => <ProductCard />)}
        </div>
      </div>
    );
  }
}
