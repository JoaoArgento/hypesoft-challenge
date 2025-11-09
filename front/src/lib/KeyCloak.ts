import Keycloak from "keycloak-js";

export const authClient = new Keycloak({
        url: "http://localhost:8080",
        realm: "ProductManagement",
        clientId: "user",
});