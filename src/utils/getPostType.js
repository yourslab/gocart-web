const types = [
  { id: 1, label: 'For Sale' },
  { id: 2, label: 'Looking for' },
  { id: 3, label: 'Promo/Events' },
  { id: 4, label: 'For Rent' }
]

export default function getPostType(type) {
  return type == null
    ? types
    : types.find((xtype) => xtype.id == type);
}
