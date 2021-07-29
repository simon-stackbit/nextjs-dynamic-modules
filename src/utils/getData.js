import safeTrim from './safeTrim';

export default function getData(props, dataPath) {
    dataPath = safeTrim(dataPath, '/');
    if (dataPath.startsWith('content/data/')) {
        dataPath = dataPath.replace('content/data/', '');
    }
    // remove extension
    dataPath = dataPath.replace(/\.\w+$/, '');
    const path = dataPath.split('/');
    return props[path];
}
