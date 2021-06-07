import * as React from 'react'
import * as Child from "./searchFilter";
import * as Child2 from "./searchFilter2";
import { useSelector } from 'react-redux';

export const Element = () => {
  console.log("-------Parent");
  const ref = React.useRef(1);
  console.log(ref.current);
  const style={padding: '300px'}
  
  return (
    <div style={style} >
      <Child.Element refs={ref}></Child.Element>
      <Child2.Element refs={ref}></Child2.Element>
    </div>
  )
}

Element.displayName = 'ATM/CDM'

