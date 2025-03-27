sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel,MessageBox) {
    "use strict";

    return Controller.extend("com.ingenx.nomination.salesnomination.controller.importNomination", {
        onInit: function () {
            // Create a model for storing Excel data
            this.getView().setModel(new JSONModel(), "excelDataModel");
            this._loadXLSXLibrary();
        },

        _loadXLSXLibrary: function () {
            var script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js";
            script.type = "text/javascript";
            script.onload = function () {
                console.log("XLSX library loaded successfully");
            };
            document.head.appendChild(script);
            this.getView().setModel(new JSONModel([]), "excelModel");
        },
        
        onFileUpload: function (oEvent) {
            var flexBox = this.getView().byId("importNominationBlockLayoutCell2");
            var oFileUploader = oEvent.getSource();
            var oFile = oFileUploader.oFileUpload.files[0]; // Get the uploaded file
        
            if (!oFile) {
                sap.m.MessageToast.show("Please select a file first!");
                return;
            }
        
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: "binary", cellDates: true }); // Ensure dates are parsed
        
                var firstSheetName = workbook.SheetNames[0]; // Get the first sheet
                var sheet = workbook.Sheets[firstSheetName];
                var sheetData = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: "yyyy-mm-dd hh:mm:ss" }); // Format dates
        
                // Ensure all date-time values are formatted properly
                sheetData.forEach(row => {
                    Object.keys(row).forEach(key => {
                        if (row[key] instanceof Date) {
                            row[key] = XLSX.SSF.format("yyyy-mm-dd hh:mm:ss", row[key]); // Format date-time fields
                        }
                    });
                });
        
                // Check if data is correctly parsed
                console.log("Parsed Excel Data:", sheetData);
        
                if (sheetData.length === 0) {
                    sap.m.MessageToast.show("No data found in the uploaded file!");
                    return;
                }
        
                // Set the JSON model with parsed Excel data
                var oModel = new JSONModel(sheetData);
                this.getView().setModel(oModel, "excelModel");
        
                console.log("Model Data After Setting:", this.getView().getModel("excelModel").getData());
        
                flexBox.setVisible(true);
                sap.m.MessageToast.show("File uploaded successfully!");
            }.bind(this);
        
            reader.readAsBinaryString(oFile);
        },
        

        handleSave: function () {
            var oModel = this.getView().getModel("excelModel");
        
            if (!oModel) {
                sap.m.MessageToast.show("Model not found!");
                return;
            }
        
            var oData = oModel.getData();
        
            console.log("Data Retrieved in handleSave:", oData);
        
            if (!oData || oData.length === 0) {
                sap.m.MessageToast.show("No data to save!");
                return;
            }
        
            let purchModel = this.getOwnerComponent().getModel();
            let purchaseBindList = purchModel.bindList("/znom_headSet");
        
            let errorOccurred = false;
        
            oData.forEach(item => {
                let payload = {
                    "Gasday": new Date(item.Gasday).toISOString().split("T")[0] + "T00:00:00Z",
                    "Vbeln": item.Vbeln.toString(),
                    "nomi_toitem": [{
                        "Gasday": new Date(item.Gasday).toISOString().split("T")[0] + "T00:00:00Z",
                        "Vbeln": item.Vbeln.toString(),
                        "ItemNo": item.Posnr,
                        "NomItem": "0000000010",
                        "Versn": "",
                        "DeliveryPoint": item.deliveryPoint,
                        "RedelivryPoint": item.Redelivery,
                        "ValidTo": item.ValidTo,
                        "ValidFrom": item.ValidFrom,
                        "Material": item.Material.toString(),
                        "Kunnr": "",
                        "Auart": "ZGSA",
                        "Ddcq": "0.000",
                        "Rdcq": "0.000",
                        "Uom1": item.Uom,
                        "Pdnq": item.Pdnq,
                        "Event": ""
                    }]
                };
        
                console.log("Posting payload:", payload);
        
                try {
                    purchaseBindList.create(payload, true);
                } catch (error) {
                    console.error("Error saving data for item:", item, error);
                    errorOccurred = true;
                }
            });
        
            if (errorOccurred) {
                sap.m.MessageBox.error("Some data could not be saved. Please check logs.");
            } else {
                sap.m.MessageBox.success("Nomination Created Successfully.");
            }
        }
        
    });
});