import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  
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

  return (
    <Block.Element {...componentWrapperProps}>
      <SearchFilter.Element {...searchFilterProps}/>
      <SearchDataTable.Element {...searchDataTableProps}/>
    </Block.Element >
  )
}

