import React, { useEffect, useState } from 'react'
import Classnames from 'classnames'

export const Element = () => {
  return (
    <div>
      <Element1 />
      {/* <Element3 /> */}
    </div>
  )
}

export const Element1 = () => {
  const [aaaa, setAaaa] = useState(0);
  console.log('================start');
  const click = () =>{
    setAaaa(aaaa + 1);
  }
  const p = {
    aaaa: aaaa,
    $element3:{
      aaaa: aaaa,
    }
  }
  return (
    <div>
      <button onClick={click}>
        {aaaa}
      </button>
      <MemoizedElement2 {...p}/>
    </div>
  )
}
export const Element0 = () => {
  console.log('================Element0');
  return (
    <div>
      aaaaaaaaaaa
    </div>
  )
}

type Props2 = {
  aaaa?:number,
  $element3?: Props3,
};


export const Element2 = (props: Props2) => {
  const {aaaa, $element3} = props;
  // const [aaaa, setAaaa] = useState(0);
  console.log("Aaaaaaaaaa");
  useEffect(() => {
    // setAaaa(aaaa+1);
    console.log('2-----------run');
    // return () => {
    //   console.log('2-----------remove');
    // }
  },[]);

  return (
    <div>
      <button>
      {aaaa}
      </button>
      <Element3 {...$element3}/>
    </div>
  )
}


type Props3 = {
  aaaa?:number,
};

export const Element3 = (props: Props3) => {
  const {aaaa} = props;
  useEffect(() => {
    console.log('3-----------run');
    // return () => {
    //   console.log('3-----------remove');
    // }
  });

  return (
    <div>
      <button>
      {aaaa}
      </button>
    </div>
  )
}

const MemoizedElement2 = React.memo(Element2);
const MemoizedElement3 = React.memo(Element3);

export default Element;