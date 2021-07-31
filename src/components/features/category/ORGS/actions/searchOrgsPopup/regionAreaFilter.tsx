import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Combox from "~commons/combox";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { _Date, getCurrentDate } from "@utils";
import {  SELECT_AREA_TYPE_FILTER, SELECT_REGION_TYPE_FILTER } from '~stores/authority/searchOrgs/constants';
import { FETCH_AREAS, FETCH_REGIONS } from '~/stores/dashboardRoot/constants';
import { NONAME } from 'dns';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const dispatch = useDispatch();
  useLayoutEffect(()=>{
    dispatch({type: FETCH_REGIONS});
    dispatch({type: FETCH_AREAS});
  }, []);
  
  //create props
  const locationTypeSelector = useSelector(state => state['searchOrgs'].filters.locationType);
 
  return (
    <>
      <Combox.Element
        width={Base.Width.PX_200}
        store={{
          defaultSelectorKeys: ['searchOrgs', 'filters', 'regionType'],
          selectorKeys: ['root', 'regions'],
          reducerType: SELECT_REGION_TYPE_FILTER,
          reducerKeys: {
            text: 'regionName',
            value: 'id',
          },
          defaultOptions:[{
            text: 'Tất cả',
            value: 0,
          }],
        }}
        style={{
          display: locationTypeSelector.value === 'region' ? 'block' : 'none',
        }}
      />
      <Combox.Element
        width={Base.Width.PX_200}
        store={{
          defaultSelectorKeys: ['searchOrgs', 'filters', 'areaType'],
          selectorKeys: ['root', 'areas'],
          reducerType: SELECT_AREA_TYPE_FILTER,
          reducerKeys: {
            text: 'areaName',
            value: 'id',
          },
          defaultOptions:[{
            text: 'Tất cả',
            value: 0,
          }],
        }}
        style={{
          backgroundColor: '#f8f8f8',
          display: locationTypeSelector.value === 'area' ? 'block' : 'none',
        }}
      />
    </>
  )
}

Element.displayName = 'regionAreaFilter'
