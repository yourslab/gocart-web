import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ProductCard from 'app/components/ProductCard';

export default class AppManagePostsArchivedView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Archived Posts" />

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
