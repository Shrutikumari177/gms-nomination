sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageToast"
  ],(BaseController,MessageToast) => {
    "use strict";
    let oView;
  
    return BaseController.extend("com.ingenx.nomination.salesnomination.controller.systemNom", {
        onInit() {
            oView = this.getView();
            var today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure no time component is set

    // Set minDate for Valid From
    var validFromPicker = oView.byId("validFromPicker");
    if (validFromPicker) {
        validFromPicker.setMinDate(today);
    }

    // Set minDate for Valid To
    var validToPicker = oView.byId("validToPicker");
    if (validToPicker) {
        validToPicker.setMinDate(today);
    }
        },

        onValueHelpCustomer: function () {

			if (!this._oInfoDialogSTP) {
				this._oInfoDialogSTP = sap.ui.xmlfragment(
					oView.getId(),
					"com.ingenx.nomination.salesnomination.fragment.soldToParty",
					this
				);
				oView.addDependent(this._oInfoDialogSTP);
			}
			this._oInfoDialogSTP.open();
		},
        onValueHelpSearchSTP1: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onValueHelpSearchSTP: function (oEvent) {


			var sValue1 = oEvent.getParameter("value").toUpperCase();

			var oFilter1 = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, sValue1);
			var oBinding = oEvent.getSource().getBinding("items");
			var oSelectDialog = oEvent.getSource();

			oBinding.filter([oFilter1]);

			oBinding.attachEventOnce("dataReceived", function () {
				var aItems = oBinding.getCurrentContexts();

				if (aItems.length === 0) {
					oSelectDialog.setNoDataText("No data found");
				} else {
					oSelectDialog.setNoDataText("Loading");
				}
			});
		},

		onValueHelpConfirmSTP: function (oEvent) {
            let oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                console.warn("No item selected.");
                return;
            }
        
            // Get the selected customer
            let selectedCustomer = oSelectedItem.getBindingContext().getObject().Customer;
            let oCustomerModel = new sap.ui.model.json.JSONModel({ selectedCustomer });
            this.getView().setModel(oCustomerModel, "customerModel");
            this.loadContractsForCustomer();

// Bind input field to the model in the View (XML)
           this.byId("customerInput").bindValue("customerModel>/selectedCustomer");
        },

        onValueHelpContract: function () {
            let oView = this.getView();
            
            // Get selected customer
            let selectedCustomer = oView.getModel("customerModel")?.getProperty("/selectedCustomer");
            if (!selectedCustomer) {
                sap.m.MessageToast.show("Please select a customer first.");
                return;
            }
        
            // Load contracts
            this.loadContractsForCustomer(selectedCustomer);
        
            // Open the fragment
            if (!this._oInfoDialog) {
                this._oInfoDialog = sap.ui.xmlfragment(
                    oView.getId(),
                    "com.ingenx.nomination.salesnomination.fragment.selectContract",
                    this
                );
                oView.addDependent(this._oInfoDialog);
            }
        
            this._oInfoDialog.open();
        },
        
        
        
        loadContractsForCustomer: async function () {
            try {
                let oView = this.getView();
                let oCustomerModel = oView.getModel("customerModel");
                let selectedCustomer = oCustomerModel.getProperty("/selectedCustomer");
        
                if (!selectedCustomer) {
                    MessageToast.show("Please select a customer first.");
                    return;
                }
        
                oView.byId("contractInput").setBusy(true);
        
                // Fetch contracts using query
                let path = `/getNominationsByCustomer?DocType=S&Customer=${encodeURIComponent(selectedCustomer)}`;
                let oModel = this.getOwnerComponent().getModel();
        
                let batchContexts;
                try {
                    let oBindList = oModel.bindList(path, null, null, null);
                    batchContexts = await oBindList.requestContexts(0, Infinity);
                } catch (error) {
                    console.error("Error fetching contracts:", error.message || error);
                    oView.byId("contractInput").setBusy(false);
                    return;
                }
        
                let contractsList = batchContexts.map(oContext => oContext.getObject());
                console.log("Fetched Contracts:", contractsList);
        
                // Set data in "contractModel"
                let contractModel = new sap.ui.model.json.JSONModel({ data: contractsList });
                oView.setModel(contractModel, "contractModel");
                console.log(contractModel);

              //  oView.getModel("oContractModel").refresh();
        
                oView.byId("contractInput").setBusy(false);
        
            } catch (error) {
                console.error("Unexpected error in loadContractsForCustomer:", error.message || error);
                this.getView().byId("contractInput").setBusy(false);
            }
        },

        onValueHelpConfirmContract: async function (oEvent) {
            const oView = this.getView();
            const oModel = this.getOwnerComponent().getModel();
        
            // Get the selected contract from the dialog
            const oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                sap.m.MessageToast.show("No contract selected.");
                return;
            }
        
            const sContract = oSelectedItem.getBindingContext("contractModel").getObject();
            console.log("Selected Contract:", sContract);
        
            // Set busy indicator
            oView.byId("selectContract").setBusy(true);
        
            try {
                // Construct the backend path to fetch materials for the selected contract
                const sPath = `/getContractDetailsAndPastNom?Vbeln=${encodeURIComponent(sContract.Vbeln)}`;
        
                // Bind list and fetch data
                const oBindList = oModel.bindList(sPath);
                const aContexts = await oBindList.requestContexts(0, Infinity);
                const aMaterials = aContexts.map(oContext => oContext.getObject());
        
                if (!aMaterials || aMaterials.length === 0) {
                    sap.m.MessageToast.show("No materials found for the selected contract.");
                    return;
                }
        
                // Update material model
                let oMaterialModel = oView.getModel("materialModel");
                if (!oMaterialModel) {
                    oMaterialModel = new sap.ui.model.json.JSONModel();
                    oView.setModel(oMaterialModel, "materialModel");
                }
                oMaterialModel.setProperty("/selectedMaterials", aMaterials);

                const oSelectedContractModel = new sap.ui.model.json.JSONModel({});
    this.getView().setModel(oSelectedContractModel, "selectedContract");
    oSelectedContractModel.setData(sContract);
        
                console.log("Fetched Materials:", aMaterials);
            } catch (oError) {
                console.error("Error fetching materials:", oError.message || oError);
                sap.m.MessageBox.error("Failed to fetch materials. Please try again later.");
            } finally {
                // Ensure the busy indicator is turned off
                oView.byId("selectContract").setBusy(false);
            }
        },
        onValueHelpSearchContract: function (oEvent) {
            var sQuery = oEvent.getParameter("value").toUpperCase(); // Convert input to uppercase for consistency
        
            var oFilter1 = new sap.ui.model.Filter("Vbeln", sap.ui.model.FilterOperator.Contains, sQuery);
            var oFilter2 = new sap.ui.model.Filter("ContractDescription", sap.ui.model.FilterOperator.Contains, sQuery);
        
            var oBinding = oEvent.getSource().getBinding("items"); // Get binding from source
            if (!oBinding) {
                console.error("Binding not found!");
                return;
            }
        
            var oSelectDialog = oEvent.getSource(); // Get the dialog control (if applicable)
            oBinding.filter([new sap.ui.model.Filter([oFilter1, oFilter2], false)]); // Apply OR filter
        },
        
        
        onValueHelpMaterial:function () {

            var oView = this.getView();
    var oContractInput = oView.byId("contractInput"); // Adjust the ID as per your input field for contract

    // Check if a contract is selected
    if (!oContractInput || !oContractInput.getValue()) {
        sap.m.MessageToast.show("Please select a contract first.");
        return;
    }

			if (!this._oInfoDialogMat) {
				this._oInfoDialogMat = sap.ui.xmlfragment(
					oView.getId(),
					"com.ingenx.nomination.salesnomination.fragment.selectMaterial",
					this
				);
				oView.addDependent(this._oInfoDialogMat);
			}
			this._oInfoDialogMat.open();
		},
        onConfirmMat: function (oEvent) {
            const oView = this.getView();
            const oModel = oView.getModel("materialModel");
        
            // Get selected material data from the dialog selection
            const oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                sap.m.MessageBox.warning("No material selected.");
                return;
            }
        
            // Retrieve the selected material object
            const sPath = oSelectedItem.getBindingContext("materialModel").getPath();
            const oSelectedMaterial = oModel.getProperty(sPath);
        
            if (!oSelectedMaterial) {
                console.error("No data found for the selected material.");
                sap.m.MessageBox.warning("No data available.");
                return;
            }
        
            console.log("Selected Material Data:", oSelectedMaterial);
        
            // Set the selected material data into a new model
            let oModelData = oView.getModel("modelData");
            if (!oModelData) {
                oModelData = new sap.ui.model.json.JSONModel();
                oView.setModel(oModelData, "modelData");
            }
            oModelData.setData(oSelectedMaterial);
  var DCQ;
            var dynamicFields = oModelData.getProperty("/dynamicFields");
            dynamicFields.forEach(function(field) {
                if (field.label === "DCQ") {
                    DCQ = field.value;
                }
            });
            console.log("DCQ",DCQ);
            var oInputField = this.getView().byId("dnqInput"); 
            oInputField.setValue(DCQ);
           // this.getView().byId("dynamicFieldLists").setData(DCQ);

           
        },
        onSubmit: async function () {
            // Retrieve the view and model
            var oView = this.getView();
            var oModel = oView.getModel();
            
            // Get the input values
            var customer = oView.byId("customerInput").getValue();
            var contract = oView.byId("contractInput").getValue();
            var material = oView.byId("materialInput").getValue();
            var dnq = oView.byId("dnqInput").getValue();
            var validFrom = oView.byId("validFromPicker").getDateValue();
            var validTo = oView.byId("validToPicker").getDateValue();
        
            let oModelData = oView.getModel("modelData");// Fetching the model data (adjust the path as needed)
            let oData = oModelData.getData();
            console.log(oData);
     
            let contractDescription = oModelData.getProperty("/ContractDescription");
            var dynamicFields = oModelData.getProperty("/dynamicFields");

    // Initialize variables to hold the values
    var maxDCQ, minDCQ;

    // Iterate through dynamicFields to find the Max DCQ and Min DCQ
    dynamicFields.forEach(function(field) {
        if (field.label === "Max DCQ") {
            maxDCQ = field.value;
        }
        if (field.label === "Min DCQ") {
            minDCQ = field.value;
        }
    });

            var formatDate = function(date) {
                if (date) {
                    var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
                    return oDateFormat.format(date);
                }
                return null; // Return null if no date is provided
            };

            if (!customer || !contract || !material || !dnq || !validFrom || !validTo) {
                sap.m.MessageToast.show("Please fill in all required fields before submitting.");
                return;
            }

           
            // Assuming these values should be saved in the SystemNominations table
            var oSystemNominationData = {
                Customer: customer,
                ContractID: contract,
                ContractDescription: contractDescription, // Assuming you will fill this in later or fetch it
                Material: material,
                DNQ: parseFloat(dnq), // Convert DNQ to Decimal (ensure it's a number)
                ValidFrom: formatDate(validFrom),
                ValidTo: formatDate(validTo),
                MaxDCQ: maxDCQ,  // You can set MaxDCQ and MinDCQ based on your business logic
                MinDCQ: minDCQ
            };
        
            try {
                let oBinding = oModel.bindList("/SystemNominations");
                await oBinding.create(oSystemNominationData);
                sap.m.MessageToast.show("Successfully submitted!");
            } catch (error) {
                sap.m.MessageBox.error("Submission failed. Please try again.");
                console.error(error);
            }
           
        },
        onCancel: function () {
            // Reset individual fields
            this.getView().byId("customerInput").setValue("");
            this.getView().byId("contractInput").setValue("");
            this.getView().byId("materialInput").setValue("");
            this.getView().byId("validFromPicker").setDateValue(null);
            this.getView().byId("dnqInput").setValue("");
            this.getView().byId("contract").setValue("");
            this.getView().byId("mat").setValue("");
            this.getView().byId("conDes").setValue("");
            this.getView().byId("minMaxDcq").setValue("");
            this.getView().byId("dynamicFieldLists").setVisible(false);
            this.getView().byId("validToPicker").setDateValue(null);
        }
        
        
        
        
   
    });
  });