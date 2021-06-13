import {KeycloakService } from 'keycloak-angular';
export function initializeKeycloak(keycloak: KeycloakService):()=>Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'https://preprodjv.dba.ma'+'/auth',
          realm: 'UFP',
          clientId: 'UFP',
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
          loadUserProfileAtStartUp:true
      });
  }
  