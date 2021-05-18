import * as React from 'react'
import axios from 'axios';
import Classnames from 'classnames'
import baseStyles from '../../_settings/_base.css';
import * as Base from '_/_settings';
import styles from './styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import * as Header from '../header';
import * as Footer from '../footer';
import * as Main from '../../../organisms/main';
import * as ImageListSection from '../../../organisms/imageListSection';
import * as ImageLinkListSection from '../../../organisms/imageLinkListSection';
import * as Button from '_atoms/button';
import * as Section from '../../../atoms/section';
import * as Block from '../../../atoms/block';
import * as Select from '../../../atoms/select';
import *  as BannerSection from '../../../organisms/bannerSection';


type Props = Base.Props & {
  $header: Header.Props,
  $main: Main.Props & {
    $bannerSection: BannerSection.Props,
  },
  $footer: Footer.Props,
}

const Element = (props: Props) => {
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

  return (
    <React.Fragment>
      <Header.Element {...headerProps} />
      <Main.Element {...mainProps}>
        <BannerSection.Element {...bannerSectionProps} />
      </Main.Element>
      {/* <Footer.Element {...footerProps} /> */}
    </React.Fragment>
  )
}


export {
  Element,
};


