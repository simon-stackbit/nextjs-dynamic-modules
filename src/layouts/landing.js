import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _upperFirst from 'lodash/upperFirst';
import _camelCase from 'lodash/camelCase';

import components, { Layout } from '../components/index';
import { getPageUrl } from '../utils';

export default class Landing extends React.Component {
    render() {
        const config = _get(this.props, 'data.config');
        const page = _get(this.props, 'page');
        const data = _get(this.props, 'data');
        const posts = _get(this.props, 'posts');
        const sections = _get(page, 'sections');
        const pageUrl = getPageUrl(page);

        return (
            <Layout page={page} config={config}>
                {_map(sections, (section, index) => {
                    const sectionType = _get(section, 'type');
                    const component = _upperFirst(_camelCase(sectionType));
                    if (!component) {
                        throw new Error(`page section does not have the 'type' property, page: ${pageUrl}`);
                    }
                    const Component = components[component];
                    if (!Component) {
                        throw new Error(`no component matching the page section's type: ${sectionType}`);
                    }
                    return <Component key={index} section={section} data={data} posts={posts} />;
                })}
            </Layout>
        );
    }
}
