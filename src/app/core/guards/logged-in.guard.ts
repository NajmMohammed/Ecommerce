import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {

const router= inject(Router)
const pLATFORM_ID = inject(PLATFORM_ID)
if (isPlatformBrowser(pLATFORM_ID)) {
  if(localStorage.getItem("token") !==null){
    router.navigate(['/home'])
return false
  }
  else
  {
  return  true
  }
}

else {
  return false
}
};