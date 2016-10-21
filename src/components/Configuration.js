import React from 'react';

const Configuration = (props) => (
  <div className="config">
    <h3 className="config-text"> Use: {Object.keys(props.reqs).map(function (value, index) {
      return props.reqs[value] && value !== 'undefined' ? <span className='required' key={index}>| {value} |</span> : null;
    })}</h3>
    <h3 className="config-text"> Don't use: {Object.keys(props.restrictions).map(function (value, index) {
      return props.restrictions[value] && value !== 'undefined' ? <span className='restrictions' key={index}>| {value} | </span> : null;
    })}</h3>
  </div>
);

export default Configuration;