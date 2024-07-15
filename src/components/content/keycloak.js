import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost/auth',
  realm: 'RockSolidRemedies',
  clientId: 'rsr-api-gateway',
});

export default keycloak;