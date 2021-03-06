import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

import Layout from '../components/Layout';
import pageLayouts from '../layouts';

class Page extends React.Component {
    render() {
        const config = this.props?.data?.config;
        const page = this.props?.page;
        const modelName = this.props?.page?.__metadata?.modelName;
        const PageLayout = pageLayouts[modelName];
        if (!PageLayout) {
            throw new Error(`no page layout matching the page model: ${modelName}`);
        }
        return (
            <Layout page={page} config={config}>
                <PageLayout {...this.props} />
            </Layout>
        );
    }
}

export async function getStaticPaths() {
    console.log('Page [...slug].js getStaticPaths');
    const paths = await sourcebitDataClient.getStaticPaths();
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    console.log('Page [...slug].js getStaticProps, params: ', params);
    const pagePath = '/' + (params.slug ? params.slug.join('/') : '');
    const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
    return { props };
}

export default withRemoteDataUpdates(Page);
