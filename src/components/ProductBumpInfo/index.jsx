import React, {PropTypes} from 'react';
import pluralizer from 'app/utils/pluralizer';
import connectOxfordItems from 'app/utils/connectOxfordItems';

// @todo: Handle scenario where a user in
// the `liked_by` list unlikes the product

const ProductBumpInfo = ({product}) => {
  // Entries for the bump text will be converted to a string later on
  // At most, there will be 3 entries
  var entries = [];

  if ( product.num_likes === 0 ) {
    entries.push('0');
  }

  if ( product.is_liked ) {
    entries.push('You');
  }

  // Case 1: You is added (liked_by[0] is added)
  // Case 2: You not added (liked_by[0] and liked_by[1] added)
  // These cases are handled by MAX_FOLLOWING - entries.length
  const MAX_FOLLOWING = 2;
  var remaining = product.liked_by
  .slice(0, MAX_FOLLOWING - entries.length)
  .map((user) => user.name);

  entries.concat(remaining);

  const finalBumpCount = product.num_likes - entries.length;

  if ( finalBumpCount > 0 ) {
    var otherText = `${finalBumpCount} ${pluralizer('other', finalBumpCount)}`;
    // We use '1 other' or 'x others' if it's not the only entry
    entries.push((entries.length > 0) ? otherText : `${finalBumpCount}`);
  }

  const text = `${connectOxfordItems(entries)} bumped this`;

  return <span>{text}</span>
}

ProductBumpInfo.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductBumpInfo;
