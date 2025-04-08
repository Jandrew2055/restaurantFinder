import React, { useState } from 'react';

const Checkbox = () => {
  // console.log(list);
  const [isChecked, setIsChecked] = useState(false);

  //changes status of checkbox
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  //will print out the list of restaurants user can select from to filter list
  return (
    <div>
      <label htmlFor='test'>Restaurant</label>
      <input
        type='checkbox'
        id='test'
        checked={isChecked}
        onChange={checkHandler}
      ></input>
    </div>
  );
};

export default Checkbox;
