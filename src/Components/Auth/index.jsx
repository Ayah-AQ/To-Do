import React, { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from '../Context/Auth';

function Auth(props) {
  const loginContext = useContext(LoginContext);

  const isLoggedIn = loginContext.loggedIn;
  const canDo = props.capability ? loginContext.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return (
    <When condition={okToRender}>
      {props.children}
    </When>
  );
}

export default Auth;
