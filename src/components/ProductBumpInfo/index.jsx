import React, {PropTypes} from 'react';

// @todo: Handle scenario where a user in
// the `liked_by` list unlikes the product

const ProductBumpInfo = ({product}) => {
  // Entries for the bump text will be converted to a string later on
  // At most, there will be 3 entries
  var entries = [];

  if ( product.is_liked ) {
    entries.push('You');
  }

  // Case 1: You is added (liked_by[0] is added)
  // Case 2: You not added (liked_by[0] and liked_by[1] added)
  // These cases are handled by maxFollowing - entries.length
  const maxFollowing = 2;
  var remainingFollowing = product.liked_by.length;
  for ( var i=0; i < (maxFollowing - entries.length); i++ ) {
    // Push to entries only if there are names to add
    if ( remainingFollowing ) {
      const user = product.liked_by[i];
      entries.push(user.name);
      remainingFollowing--;
    }
  }

  var finalBumpCount = product.num_likes - entries.length;

  // Guaranteed that 0 users bumped the post
  if (finalBumpCount == 0 && entries.length == 0) {
    entries.push('0');
  }

  if ( finalBumpCount > 0 ) {
    var otherText = (finalBumpCount == 1 ? `${finalBumpCount} other` : `${finalBumpCount} others`);
    // We use '1 other' or 'x others' if it's not the only entry
    entries.push((entries.length > 0) ? otherText : `${finalBumpCount}`);
  }

  // Convert entries into string to be displayed
  // entries.length == 2 implies that Oxford comma is not needed
  var bumpText = entries.slice(0, -2).join(', ') + 
  (entries.slice(0, -2).length ? ', ' : '') + 
  (entries.length == 2 ? entries.slice(-2).join(' and ') : entries.slice(-2).join(', and '))
  + ' bumped this';

  return <span>{bumpText}</span>
}

ProductBumpInfo.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductBumpInfo;
