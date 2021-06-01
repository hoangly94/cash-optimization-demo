import React from "react";
// import ReactDOM from "react-dom";

// import * as HomeTemplate from "_templates/qualityMobile/home";
// import * as Cell from "_atoms/cell";
// import * as Row from "_atoms/row";
// import * as Image from "_atoms/image";
// import * as List from "_atoms/list";
// import * as LinkElement from "_atoms/link";
// import * as Base from "_/_settings";
// import * as Logo from "_molecules/logo";
// import * as Menu from "_molecules/menu";
// import * as Button from "_atoms/button";

// const _SCREEN_WIDTH = Base.Width.M;

// const _LOGO = {
//   url: '/uploads/logo.png',
// };

// const _INDEX = {
//   url: '/',
// };



import * as Dasboard from "~templates/dashboard";
import * as DropDownBlock from "~molecules/dropdownBlock";
import * as Li from "~atoms/list/li";


const dashboardProps: Dasboard.Props = {
}

export default () => (
  <Dasboard.Element {...dashboardProps} />
);