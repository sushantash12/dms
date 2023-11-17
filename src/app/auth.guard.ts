import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedIn = sessionStorage.getItem('loggedIn');
  console.log(loggedIn);
  if (loggedIn === 'true') {
    // check if current url is authenticate
    console.log(state.url);
    if (state.url === '/authenticate') {
      inject(Router).navigate(['/dashboard']);
    }
    return true;
  } else {
    console.log(state.url);
    if (state.url !== '/authenticate') {
      inject(Router).navigate(['/authenticate']);
      return false;
    }    
    else{
      return true;
    }
  }
};
