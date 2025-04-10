import React, { useState } from 'react';

const Checkbox = (props) => {
  // console.log(list);

  //LOGIC TO BE MOVED TO CHECKBOX LIST COMPONENT
  const [isChecked, setIsChecked] = useState(false);

  //changes status of checkbox
  const checkHandler = (event) => {
    setIsChecked(!isChecked);
    console.log(event);
  };

  //will print out the list of restaurants user can select from to filter list
  return (
    <div>
      <label>
        <input
          type='checkbox'
          id={props.restaurant}
          checked={isChecked}
          onChange={checkHandler}
        ></input>
        {props.restaurant}
      </label>
    </div>
  );
};

export default Checkbox;
