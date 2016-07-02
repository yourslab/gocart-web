import axios from 'axios';
import isAbsoluteURL from 'is-absolute-url';
import trimStart from 'lodash/trimStart';
import trimEnd from 'lodash/trimEnd';
import config from 'app/config';

axios.interceptors.request.use(function (request) {
  if ( !isAbsoluteURL(request.url) ) {
    request.url = `${trimEnd(config.api, '/')}/${trimStart(request.url, '/')}`;
  }

  return request;
});
