import React from 'react';

const RestrictedMenu = (props) => (
  <form onClick={props.addRestriction}>
    {props.keywords.map(function (value, index) {
      if (value !== 'variable declaration') {
        return <label key={index}>{value}<input className='required' type='checkbox' key={index} value={value} defaultChecked={props.restrictions[value] ? 'checked' : null}/></label>
      }
      return null;
    })}
  </form>
);

export default RestrictedMenu;