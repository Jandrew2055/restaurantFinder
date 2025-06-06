//THIS COMPONENT IS TO BE DISPLAYED WHEN USER IS NOT LOGGED IN AND TRIES
//TO ACCESS A PAGE THAT REQUIRES SIGN UP/IN
import React, { ReactNode } from 'react';

const Guest = () => {
  return (
    <div>
      <h1>Sorry you must be Signed In to use this feature</h1>
    </div>
  );
};

export default Guest;
