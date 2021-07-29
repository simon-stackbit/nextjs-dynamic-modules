import React from 'react';

import { classNames, markdownify, safeMap } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPricing extends React.Component {
    renderPricingPlan(plan, index) {
        const highlight = plan?.highlight;
        const title = plan?.title;
        const subtitle = plan?.subtitle;
        const price = plan?.price;
        const details = plan?.details;
        const actions = plan?.actions;

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
        const section = this.props?.section;
        const sectionId = section?.section_id;
        const background = section?.background;
        const title = section?.title;
        const subtitle = section?.subtitle;
        const pricingPlans = section?.pricing_plans;

        return (
            <section id={sectionId} className={`block pricing-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{subtitle}</p>}
                </div>
                {pricingPlans && (
                    <div className="inner">
                        <div className="grid">{safeMap(pricingPlans, (plan, index) => this.renderPricingPlan(plan, index))}</div>
                    </div>
                )}
            </section>
        );
    }
}
