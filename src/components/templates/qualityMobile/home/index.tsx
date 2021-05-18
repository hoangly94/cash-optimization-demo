import * as React from 'react'
import axios from 'axios';
import Classnames from 'classnames'
import styles from './styles.css';
import * as Base from '_/_settings';
import * as Header from '../header';
import * as Footer from '../footer';
import * as Main from '_organisms/main';
import * as ImageListSection from '_organisms/imageListSection';
import * as ImageLinkListSection from '_organisms/imageLinkListSection';
import * as Button from '_atoms/button';
import * as Section from '_atoms/section';
import * as Block from '_atoms/block';
import * as Select from '_atoms/select';
import * as BannerSection from '_organisms/bannerSection';
import * as TagListSection from '_organisms/tagListSection';

type Props = Base.Props & {
  $header: Header.Props,
  $main: Main.Props & {
    $bannerSection: BannerSection.Props,
    $tagListSection: TagListSection.Props,
  },
  $footer: Footer.Props,
}

export const Element = (props: Props) => {
  const {
    $header,
    $footer,
    $main,
  } = props;

  //create class props
  const headerProps = {
    ...$header,
  }
  const footerProps = {
    ...$footer
  }
  const mainProps = {
    ...$main,
  }
  const bannerSectionProps = {
    ...$main.$bannerSection,
  }
  const tagListSectionProps = {
    ...$main.$tagListSection,
  }

  return (
    <React.Fragment>
      <Header.Element {...headerProps} />
      <Main.Element {...mainProps}>
        <BannerSection.Element {...bannerSectionProps} />
        <TagListSection.Element {...tagListSectionProps} />
      </Main.Element>
      {/* <Footer.Element {...footerProps} /> */}
    </React.Fragment>
  )
}

