/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
sap.ui.loader.config({
    paths: {
      "external/ChartJS": "https://cdn.jsdelivr.net/npm/chart",
      "external/ChartJSAdapterDateFns": "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min"
    },
    shim: {
      "external/ChartJS": {
        amd: true,
        exports: "Chart"
      },
      "external/ChartJSAdapterDateFns": {
         deps: ["external/ChartJS"],  // Ensure Chart.js is loaded before the adapter
         exports: "Chart"
      }
    }
});

sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/ingenx/nomination/salesnomination/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.ingenx.nomination.salesnomination.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // code for chat Ai
            // this._loadWebchatScript();
        },

        // code for chatAi
    
        _loadWebchatScript: function () {
            // Check if the script is already loaded
            if (!document.getElementById("cai-webchat")) {
                var script = document.createElement("script");
                script.id = "cai-webchat";
                script.src = "https://cdn.cai.tools.sap/webchat/webchat.js";
                script.setAttribute("channelId", "c2a6a1d1-6558-4471-8e9d-dad84fc9a6d6");
                script.setAttribute("token", "cebfdab9951cec1de07a9cf0d08b0684");
                document.body.appendChild(script);
            }
        },
    });
});