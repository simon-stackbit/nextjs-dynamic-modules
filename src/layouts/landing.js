import React from 'react';

import components from '../components/index';
import { getPageUrl, modelTypeToComponentName, safeMap } from '../utils';

export default class Landing extends React.Component {
    render() {
        const page = this.props?.page;
        const data = this.props?.data;
        const posts = this.props?.posts;
        const sections = page?.sections;
        const pageUrl = getPageUrl(page);

        return safeMap(sections, (section, index) => {
            const sectionType = section?.type;
            const component = modelTypeToComponentName(sectionType);
            if (!component) {
                throw new Error(`page section does not have the 'type' property, page: ${pageUrl}`);
            }
            const Component = components[component];
            if (!Component) {
                throw new Error(`no component matching the page section's type: ${sectionType}`);
            }
            return <Component key={index} section={section} data={data} posts={posts} />;
        });
    }
}
