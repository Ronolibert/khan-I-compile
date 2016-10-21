import React from 'react';

const RequiredMenu = (props) => (
  <form onClick={props.addReqs}>
    {props.keywords.map(function (value, index) {
      return <label key={index}>{value}<input className='required'
                                  type='checkbox'
                                  key={index} value={value}
                                  defaultChecked={props.reqs[value] ? 'checked' : null}/>
                                  </label>})}
  </form>
);

export default RequiredMenu;
