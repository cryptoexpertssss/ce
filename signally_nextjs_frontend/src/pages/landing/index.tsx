import { ReactElement } from 'react';
import { LandingFooter } from '../../containers/LandingFooter';

import Page from '../../components/others/Page';
import Layout from '../../layouts';
import LandingCallToAction from '../../containers/LandingCallToAction';
import LandingHero from '../../containers/LandingHero';
import LandinWhyChooseUs from '../../containers/LandingWhyChooseUs';

export default function LandingPage() {
  return (
    <Page title='Landing'>
      <LandingHero />
      <LandingCallToAction />
      <LandinWhyChooseUs />
      <LandingFooter />
    </Page>
  );
}

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
