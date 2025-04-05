import React from 'react';

const Checkbox = ({ list }) => {
  console.log(list);

  //will print out the list of restaurants user can select from to filter list
  return (
    <div>
      <ul id='restaurant-filtering-list'>
        {list.map((element) => {
          return (
            <li id='restaurant-'>
              <label htmlFor={element}>{element}</label>
              <input type='checkbox' id={element} name={element}></input>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Checkbox;
