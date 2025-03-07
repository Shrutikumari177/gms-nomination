sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("com.ingenx.nomination.salesnomination.controller.nominationDashboard", {
            onInit: function () {
                // Initialize data or perform any setup here
            },
            publishNom: function () {
                const tile = this.getOwnerComponent().getRouter();
                tile.navTo("RoutepublishNomination");
            },

            publishReNom: function () {
                const reNom = this.getOwnerComponent().getRouter();
                reNom.navTo("RoutepublishRenomination");
            },

            publishDisplay: function () {
                const reNom = this.getOwnerComponent().getRouter();
                reNom.navTo("Routefdisplay");
            },
            OnImportNom: function () {
                const reNom = this.getOwnerComponent().getRouter();
                reNom.navTo("RouteimportExcel");
            },
            OnSysNom: function(){
                const reNom = this.getOwnerComponent().getRouter();
                reNom.navTo("RouteSystemNom");
            }
        });
    });