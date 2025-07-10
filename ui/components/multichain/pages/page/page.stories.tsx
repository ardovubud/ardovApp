import React from 'react';
import {
  ButtonIcon,
  ButtonIconSize,
  ButtonPrimary,
  IconName,
} from '../../../component-library';
import { BackgroundColor } from '../../../../helpers/constants/design-system';
import { Page, Header, Content, Footer } from '.';

const story = {
  title: 'Components/Multichain/Page',
  component: Page,
};

export default story;

const scrollingContent = 'Content '.repeat(2000);

const pageWrapStyle = {
  width: '328px',
  height: '600px',
  border: '1px solid var(--color-border-muted)',
};

const responsivePageWrapStyle = {
  width: '100%',
  height: '600px',
  border: '1px solid var(--color-border-muted)',
};

const BackButtonIcon = (
  <ButtonIcon
    size={ButtonIconSize.Sm}
    ariaLabel="Back"
    iconName={IconName.ArrowLeft}
  />
);

export const DefaultStory = (args) => <Page {...args}>This is the content!</Page>;
DefaultStory.storyName = 'Default';

export const HeaderStory = (args) => (
  <div style={pageWrapStyle}>
    <Page {...args}>
      <Header startAccessory={BackButtonIcon} backgroundColor={BackgroundColor.primaryAlternative}>
        Connect
      </Header>
      <Content backgroundColor={BackgroundColor.successDefault}>Contents!</Content>
    </Page>
  </div>
);
HeaderStory.storyName = 'Header';

export const FullscreenStory = (args) => (
  <div style={responsivePageWrapStyle}>
    <Page {...args}>
      <Header startAccessory={BackButtonIcon} backgroundColor={BackgroundColor.primaryAlternative}>
        Connect
      </Header>
      <Content backgroundColor={BackgroundColor.successDefault}>{scrollingContent}</Content>
      <Footer backgroundColor={BackgroundColor.warningDefault}>
        <ButtonPrimary block disabled>Cancel</ButtonPrimary>
        <ButtonPrimary block>Confirm</ButtonPrimary>
      </Footer>
    </Page>
  </div>
);
FullscreenStory.storyName = 'Fullscreen';

export const HeaderFooterStory = (args) => (
  <div style={pageWrapStyle}>
    <Page {...args}>
      <Header startAccessory={BackButtonIcon} backgroundColor={BackgroundColor.primaryAlternative}>
        Connect
      </Header>
      <Content backgroundColor={BackgroundColor.successDefault}>Content</Content>
      <Footer backgroundColor={BackgroundColor.warningDefault}>
        <ButtonPrimary block disabled>Cancel</ButtonPrimary>
        <ButtonPrimary block>Confirm</ButtonPrimary>
      </Footer>
    </Page>
   </div >
);
HeaderFooterStory.storyName='Header + Footer';

export const ScrollingStory=(args)=>(
<div style= {pageWrapStyle }>
<Page {... args }>
< Header startAccessory ={ BackButtonIcon }backgroundcolor ={ Background Color .primary Alternative }>Connect< / Header >
< Content backgroundcolor ={ Background Color .success Default }>
{ scrollingcontent }
< / Content >
< Footer backgroundcolor ={ Background Color .warning Default }>
<Button Primary block disabled > Cancel<
/ Button Primary >
<Button Primary block > Confirm<
/ Button Primary >
< / Footer >
< / Page >
< / div > );
Scrolling Story. Story Name= "content scrolling";
