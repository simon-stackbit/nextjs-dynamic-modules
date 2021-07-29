import React from 'react';

import { markdownify, safeMap } from '../utils';

export default class SectionFaq extends React.Component {
    constructor(props) {
        super(props);
        this.handorgelRef = React.createRef();
    }

    componentDidMount() {
        const handorgelElm = this.handorgelRef?.current;
        if (handorgelElm) {
            new handorgel(handorgelElm, {
                multiSelectable: true
            });
        }
    }

    renderFaqItem(faqItem, index) {
        const question = faqItem?.question;
        const answer = faqItem?.answer;

        return (
            <React.Fragment key={index}>
                <h3 className="faq-accordion-header handorgel__header">
                    <button className="handorgel__trigger">
                        <span>{question}</span>
                        <span className="handorgel__icon icon-plus" />
                    </button>
                </h3>
                <div className="faq-accordion-content handorgel__content">
                    <div className="handorgel__content-inner">{markdownify(answer)}</div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        const section = this.props?.section;
        const sectionId = section?.section_id;
        const background = section?.background;
        const title = section?.title;
        const subtitle = section?.subtitle;
        const faqItems = section?.faq_items;

        return (
            <section id={sectionId} className={`block faq-block bg-${background} outer`}>
                <div className="inner-small">
                    <div className="block-header">
                        {title && <h2 className="block-title">{title}</h2>}
                        {subtitle && <p className="block-subtitle">{subtitle}</p>}
                    </div>
                    {faqItems && (
                        <div className="faq-accordion handorgel" ref={this.handorgelRef}>
                            {safeMap(faqItems, (faqItem, index) => this.renderFaqItem(faqItem, index))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
