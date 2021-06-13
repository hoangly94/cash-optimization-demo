import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as Actions from "./actions";
import { FETCH_ORGS } from '_/stores/dashboardRoot/constants';
import { useDispatch } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  
  const dispatch = useDispatch();
  dispatch({ type: FETCH_ORGS });
  
  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  
  const searchFilterProps = {
    
  };
  
  const searchDataTableProps = {
    
  };
  
  const actionsProps = {
    
  };

  return (
    <Block.Element {...componentWrapperProps}>
      <SearchFilter.Element {...searchFilterProps}/>
      <SearchDataTable.Element {...searchDataTableProps}/>
      <Actions.Element {...actionsProps}/>
    </Block.Element >
  )
}

Element.displayName = 'ATM/CDM'

