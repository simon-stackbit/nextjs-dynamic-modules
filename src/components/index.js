import dynamic from 'next/dynamic';

const Action = dynamic(() => import('./Action'));
const ActionLink = dynamic(() => import('./ActionLink'));
const BlogPostFooter = dynamic(() => import('./BlogPostFooter'));
const CtaButtons = dynamic(() => import('./CtaButtons'));
const Footer = dynamic(() => import('./Footer'));
const FooterForm = dynamic(() => import('./FooterForm'));
const FooterNav = dynamic(() => import('./FooterNav'));
const FooterText = dynamic(() => import('./FooterText'));
const FormField = dynamic(() => import('./FormField'));
const Header = dynamic(() => import('./Header'));
const Layout = dynamic(() => import('./Layout'));
const Icon = dynamic(() => import('./Icon'));
const SectionContact = dynamic(() => import('./SectionContact'));
const SectionContent = dynamic(() => import('./SectionContent'));
const SectionCta = dynamic(() => import('./SectionCta'));
const SectionFaq = dynamic(() => import('./SectionFaq'));
const SectionFeatures = dynamic(() => import('./SectionFeatures'));
const SectionHero = dynamic(() => import('./SectionHero'));
const SectionPosts = dynamic(() => import('./SectionPosts'));
const SectionPricing = dynamic(() => import('./SectionPricing'));
const SectionReviews = dynamic(() => import('./SectionReviews'));

export {
    Action,
    ActionLink,
    BlogPostFooter,
    CtaButtons,
    Footer,
    FooterForm,
    FooterNav,
    FooterText,
    FormField,
    Header,
    Layout,
    Icon,
    SectionContact,
    SectionContent,
    SectionCta,
    SectionFaq,
    SectionFeatures,
    SectionHero,
    SectionPosts,
    SectionPricing,
    SectionReviews
};

export default {
    Action,
    ActionLink,
    BlogPostFooter,
    CtaButtons,
    Footer,
    FooterForm,
    FooterNav,
    FooterText,
    FormField,
    Header,
    Layout,
    Icon,
    SectionContact,
    SectionContent,
    SectionCta,
    SectionFaq,
    SectionFeatures,
    SectionHero,
    SectionPosts,
    SectionPricing,
    SectionReviews
};
