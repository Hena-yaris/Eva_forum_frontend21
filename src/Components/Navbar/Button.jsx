import React from 'react'

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className=" text-black py-2 px-10 md:ml-8 rounded  duration-700   bg-gradient-to-t from-green-500 to-green-700 hover:to-green-500 text-lg font-mono"
    >
      {props.children}
    </button>
  );
};

export default Button