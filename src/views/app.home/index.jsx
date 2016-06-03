import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import ProductCard from 'app/components/ProductCard';

class AppHomeView extends React.Component {
  render() {
    return (
      <div className="Container">
        <Helmet title="Home" />

        <div className="Grid">
          {[null, null, null, null].map(() =>
            <div className="Grid-cell u-size6 u-spacer">
              <ProductCard />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AppHomeView;
