// import React from "react";
// import ReactDOM from "react-dom";

// import * as HomeTemplate from "./components/templates/home";
// import * as Cell from "./components/atoms/cell";
// import * as Row from "./components/atoms/row";
// import * as Image from "./components/atoms/image";
// import * as List from "./components/atoms/list";
// import * as LinkElement from "./components/atoms/link";
// import * as Base from "./components/_settings";
// import * as Logo from "./components/molecules/logo";
// import * as Menu from "./components/molecules/menu";

// const _SCREEN_WIDTH = Base.Width.M;

// const _LOGO = {
//   url: '/uploads/logo.png',
// };

// const _INDEX = {
//   url: '/',
// };

// const menu_props = {
// };

// const menu_desktop_list_items_link_props = {
//   margin: Base.MarginLeft.L1,
//   theme: Base.Theme.DARK,
//   fontStyle: Base.FontStyle.BOLD,
//   size: LinkElement.Size.S,
// };

// const menu = {
//     $list: {
//       $lis: [
//         {
//           $element: {
//             $link: {
//               ...menu_desktop_list_items_link_props,
//               text: 'Safer Play',
//               url: '',
//             },
//           },
//         },
//         {
//           $element: {
//             $link: {
//               ...menu_desktop_list_items_link_props,
//               text: 'Our Services',
//               url: '',
//             },
//           },
//         },
//         {
//           $element: {
//             $link: {
//               ...menu_desktop_list_items_link_props,
//               text: 'FAQ',
//               url: '',
//             },
//           },
//         },
//         {
//           $element: {
//             $link: {
//               ...menu_desktop_list_items_link_props,
//               text: 'Corporate',
//               url: '',
//             },
//           },
//         },
//       ],
//     },
// };


// const headerBar = {
//   style: {
//     backgroundColor: '#055f8e',
//   },
//   $innerSection: {
//     width: _SCREEN_WIDTH,
//     padding: Base.Padding.S,
//     $logo: {
//       size: Logo.Size.L,
//       $image: {
//         src: _LOGO.url,
//       },
//     },
//     $menu: menu,
//   }
// };

// const footerMenu_innerSection_props = {
//   flex: Base.Flex.EVENLY
// };
// const footerMenu_innerSection_blocks_props = {
//   theme: Base.Theme.DARK,
//   style: {
//     lineHeight: '1.8',
//   }
// };
// const footerMenu_innerSection_blocks_link_props = {
//   theme: Base.Theme.DARK,
//   fontStyle: Base.FontStyle.BOLD,
// };

// const footerMenu_innerSection_blocks_items_props = {
//   type: List.Type.VERTICAL,
// };
// const footerMenu_innerSection_blocks_items_items_props = {
//   theme: Base.Theme.DARK,
// };


// const footerMenu = {
//   style: {
//     backgroundColor: '#474747',
//     paddingBottom: '0',
//   },
//   $innerSection: {
//     width: _SCREEN_WIDTH,
//     $blocks: [
//       {
//         ...footerMenu_innerSection_blocks_props,
//         $link: {
//           ...footerMenu_innerSection_blocks_link_props,
//           text: 'Products',
//         },
//         $list: {
//           ...footerMenu_innerSection_blocks_items_props,
//           $lis: [
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Sports',
//                 url: '',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Lottery',
//                 url: '',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Horse Racing',
//                 url: '',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Singapore Pools Mobile App',
//                 url: 'https://online.singaporepools.com/en/sports/singapore-pools-mobile-app',
//               }
//             },
//           ],
//         },
//       },
//       {
//         ...footerMenu_innerSection_blocks_props,
//         $link: {
//           ...footerMenu_innerSection_blocks_link_props,
//           text: 'Accounts',
//         },
//         $list: {
//           ...footerMenu_innerSection_blocks_items_props,
//           $lis: [
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Login',
//                 url: 'https://online.singaporepools.com/en/account',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Sign Up',
//                 url: 'https://online.singaporepools.com/en/account/registration',
//               }
//             },
//           ],
//         },
//       },
//       {
//         ...footerMenu_innerSection_blocks_props,
//         $link: {
//           ...footerMenu_innerSection_blocks_link_props,
//           text: 'Information',
//         },
//         $list: {
//           ...footerMenu_innerSection_blocks_items_props,
//           $lis: [
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Safer Play',
//                 url: 'https://www.singaporepools.com.sg/ms/sp/en/index.html',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Our Services',
//                 url: 'https://www.singaporepools.com.sg/en/services/Pages/index.html',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'FAQ',
//                 url: 'https://www.singaporepools.com.sg/en/faq/Pages/account-registration.html',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Contact Us',
//                 url: 'https://www.singaporepools.com.sg/en/cu/Pages/default.aspx',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Locate Outlets',
//                 url: 'https://www.singaporepools.com.sg/outlets/Pages/lo.aspx',
//               },
//             }
//           ],
//         },
//       },
//       {
//         ...footerMenu_innerSection_blocks_props,
//         $link: {
//           ...footerMenu_innerSection_blocks_link_props,
//           text: 'Corporate',
//         },
//         $list: {
//           ...footerMenu_innerSection_blocks_items_props,
//           $lis: [
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Corporate Website',
//                 url: 'https://www.singaporepools.com.sg/en/Pages/default.aspx',
//               },
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'About Singapore Pools',
//                 url: 'https://www.singaporepools.com.sg/en/ci/Pages/default.aspx',
//               }
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Press Releases',
//                 url: 'https://www.singaporepools.com.sg/en/pr/Pages/default.aspx',
//               },
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Careers',
//                 url: 'https://www.singaporepools.com.sg/en/ca/Pages/default.aspx',
//               },
//             },
//             {
//               $element: {
//                 ...footerMenu_innerSection_blocks_items_items_props,
//                 text: 'Tender & Quotations',
//                 url: 'https://www.singaporepools.com.sg/en/tnq/Pages/default.aspx',
//               },
//             },
//           ],
//         },
//       },
//     ],
//   },
// }


// const homeBannerSection = {
//   padding: Base.Padding.NONE,
//   $innerSection: {
//     width: _SCREEN_WIDTH,
//     $slider: {
//       $innerSlider: {
//         $items: [
//           {
//             $image: {
//               src: "",
//             },
//           },
//           {
//             text: 'item2',
//             $image: {
//               src: "",
//             },
//           },
//           {
//             text: 'item3',
//             $image: {
//               src: "",
//             },
//           },
//           {
//             text: 'item4',
//             $image: {
//               src: "",
//             },
//           },
//           {
//             text: 'item4',
//             $image: {
//               src: "",
//             },
//           },
//         ],
//       },
//     },
//   },
// };

// const homeTemplateProps = {
//   width: Base.Width.M,
//   $header: {
//     $headerBar: headerBar,
//   },
//   $main: {
//     $bannerSection: homeBannerSection,
//   },
//   $footer: {
//     $footerMenu: footerMenu,
//   },
// }

// const App = () => (
//   <HomeTemplate.Element {...homeTemplateProps} />
// );

// ReactDOM.render(
//   <App />,
//   document.getElementById("root")
// );