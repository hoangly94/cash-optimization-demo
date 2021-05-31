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
import * as DropDown from "~molecules/dropdown";
import * as Li from "~atoms/list/li";


const $ORGS_$managementUnitName_$list_$liList = [
  {
    $children: {
      text: 'name1'
    },
  },
  {
    $children: {
      text: 'name2'
    },
    active: true,
  },
  {
    $children: {
      text: 'name3'
    },
  },
];
const dashboardProps: Dasboard.Props = {
  $ORGS: {
    $managementUnitName: {
      $title: {
        text: 'Tên đơn vị quản lý',
      },
      $list: {
        $liList: $ORGS_$managementUnitName_$list_$liList,
      }
    }
  }
}

export default () => (
  <Dasboard.Element {...dashboardProps} />
);