import trimStart from 'lodash/trimStart';
import config from 'app/config';

export default function img(path) {
  return `${config.assets.images}/${trimStart(path, '/')}`
}
