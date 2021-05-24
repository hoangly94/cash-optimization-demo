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

// const menu_props = {
// };

// const menu_desktop_list_items_link_props = {
//   margin: Base.MarginLeft.PX_18,
//   theme: Base.Theme.DARK,
//   fontStyle: Base.FontStyle.BOLD,
//   size: LinkElement.Size.S,
// };

// const menu = {
//   $list: {
//     $lis: [
//       {
//         $element: {
//           $link: {
//             ...menu_desktop_list_items_link_props,
//             text: 'Safer Play',
//             url: '',
//           },
//         },
//       },
//       {
//         $element: {
//           $link: {
//             ...menu_desktop_list_items_link_props,
//             text: 'Our Services',
//             url: '',
//           },
//         },
//       },
//       {
//         $element: {
//           $link: {
//             ...menu_desktop_list_items_link_props,
//             text: 'FAQ',
//             url: '',
//           },
//         },
//       },
//       {
//         $element: {
//           $link: {
//             ...menu_desktop_list_items_link_props,
//             text: 'Corporate',
//             url: '',
//           },
//         },
//       },
//     ],
//   },
// };


// const headerBar = {
//   style: {
//     backgroundColor: '#18b8d8',
//   },
//   $innerSection: {
//     padding: Base.Padding.PX_8,
//     $logo: {
//       size: Logo.Size.S1,
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
//   padding: Base.Padding.PX_8,
//   $innerSection: {
//     $slider: {
//       height: Base.Height.PX_300,
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

// const tagListSection_$innerSection_$tagList_$list_$liList = {
//   childrenType: List.ItemChildrenType.Button,
// };
// const tagListSection_$innerSection_$tagList_$list_$liList_$element = {
//   size: Button.Size.M,
//   color: Base.Color.WHITE,
// };

// const tagListSection = {
//   padding: Base.Padding.PX_8,
//   $innerSection: {
//     $tagList: {
//       $list: {
//         $liList: [
//           {
//             ...tagListSection_$innerSection_$tagList_$list_$liList,
//             $children: {
//               ...tagListSection_$innerSection_$tagList_$list_$liList_$element,
//               text: 'aaaa',
//               url: '',
//               style:{
//                 backgroundColor: 'red',
//               }
//             },
//           },
//           {
//             ...tagListSection_$innerSection_$tagList_$list_$liList,
//             $children: {
//               ...tagListSection_$innerSection_$tagList_$list_$liList_$element,
//               text: 'bbbb',
//               url: '',
//               style:{
//                 backgroundColor: 'blue',
//               }
//             },
//           },
//         ],
//       },
//     },
//   },
// };

// const homeTemplateProps = {
//   // width: Base.Width.M,
//   $header: {
//     $headerBar: headerBar,
//   },
//   $main: {
//     $bannerSection: homeBannerSection,
//     $tagListSection: tagListSection,
//   },
//   $footer: {
//     $footerMenu: footerMenu,
//   },
// }

// export default () => (
//   <HomeTemplate.Element {...homeTemplateProps} />
// );


import * as Button from "_atoms/button";
import {Size} from "_atoms/svg";
import Chevron from "_atoms/svg/chevron";
import User from "_atoms/svg/user";
import Bars from "_atoms/svg/bars";
import Caret from "~svg/caret";
export default () => (
  <div>
  <Chevron/>
  <User size={Size.L2}/>
  <Bars color='red'/>
  <Caret size={Size.S1}/>
  </div>
);