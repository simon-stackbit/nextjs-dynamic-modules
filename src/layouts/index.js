import dynamic from 'next/dynamic';

const landing = dynamic(() => import('./landing'));
const page = dynamic(() => import('./page'));
const blog = dynamic(() => import('./blog'));
const post = dynamic(() => import('./post'));

export {
    landing,
    page,
    blog,
    post
};

export default {
    landing,
    page,
    blog,
    post
};
