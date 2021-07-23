import React from 'react';
import _map from 'lodash/map';
import _get from 'lodash/get';

import { htmlToReact, classNames, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPricing extends React.Component {
    renderPricingPlan(plan, index) {
        const highlight = _get(plan, 'highlight');
        const title = _get(plan, 'title');
        const subtitle = _get(plan, 'subtitle');
        const price = _get(plan, 'price');
        const details = _get(plan, 'details');
        const actions = _get(plan, 'actions');

        return (
            <div key={index} className="cell plan">
                <div className={classNames('card', { highlight: highlight })}>
                    <div className="plan-header">
                        {title && <h3 className="plan-title">{title}</h3>}
                        {subtitle && <div className="plan-subtitle">{subtitle}</div>}
                        {price && <div className="plan-price">{price}</div>}
                    </div>
                    {details && <div className="plan-content">{markdownify(details)}</div>}
                    {actions && (
                        <div className="plan-footer block-buttons">
                            <CtaButtons actions={actions} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        const section = _get(this.props, 'section');
        const sectionId = _get(section, 'section_id');
        const background = _get(section, 'background');
        const title = _get(section, 'title');
        const subtitle = _get(section, 'subtitle');
        const pricingPlans = _get(section, 'pricing_plans');

        return (
            <section id={sectionId} className={`block pricing-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                </div>
                {pricingPlans && (
                    <div className="inner">
                        <div className="grid">{_map(pricingPlans, (plan, index) => this.renderPricingPlan(plan, index))}</div>
                    </div>
                )}
            </section>
        );
    }
}
