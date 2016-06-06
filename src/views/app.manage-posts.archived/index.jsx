import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ProductCard from 'app/components/ProductCard';

export default class AppManagePostsArchivedView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Archived Posts" />

        <div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection" />

          <div className="SidebarContainer-panelHeadingSection">
            <button className="Btn Btn--primary Btn--inverted Btn--borderless">
              Delete all permanently
            </button>
          </div>
        </div>

        <div className="Grid">
          {[[], [], [], [], [], []].map(() =>
            <div className="Grid-cell u-size6 u-spacer-base">
              <ProductCard />
            </div>
          )}
        </div>
      </div>
    );
  }
}
