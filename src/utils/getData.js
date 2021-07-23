import _get from 'lodash/get';
import _trim from 'lodash/trim';
import _startsWith from 'lodash/startsWith';

export default function getData(props, dataPath) {
    dataPath = _trim(dataPath, '/');
    if (_startsWith(dataPath, 'content/data/')) {
        dataPath = dataPath.replace('content/data/', '');
    }
    // remove extension
    dataPath = dataPath.replace(/\.\w+$/, '');
    const path = dataPath.split('/');
    return _get(props, path);
}
