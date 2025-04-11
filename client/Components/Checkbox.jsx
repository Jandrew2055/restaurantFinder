import React, { useState } from 'react';

const Checkbox = (id, checkHandler, name, checked) => {
  // console.log(list);

  //LOGIC TO BE MOVED TO CHECKBOX LIST COMPONENT

  //will print out the list of restaurants user can select from to filter list
  return (
    <div>
      <label>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={checkHandler}
        ></input>
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
