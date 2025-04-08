sap.ui.define([
	'sap/ui/Device',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'com/ingenx/nomination/salesnomination/utils/HelperFunction',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library',
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"external/ChartJSAdapterDateFns",
	"external/ChartJS"



], function (Device, Fragment, Controller, JSONModel, HelperFunction, Popover, Button, mobileLibrary, FeedItem, FlattenedDataset, MessageBox, MessageToast, ChartJSAdapterDateFns, ChartJS) {
	"use strict";

	let material;

	
	let minDCQVal = Number.MAX_SAFE_INTEGER;
	let maxDCQVal = 0;
	let remainingDCQ = 0;
	let sContract;
	let customerValue;
    let contractValue;

	return Controller.extend("com.ingenx.nomination.salesnomination.controller.systemNom", {

		onInit: function () {
			const initialDelvData = {
				DeliveryPoints: [{
					DeliveryPt: "",
					DNQ: "",
					UOM: "",
					MaxDP_DCQ :"",
					MinDP_DCQ:""
					
				}]
			};

			const initialRelDelvData = {
				RedeliveryPoints: [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					MaxRDP_DCQ :"",
					MinRDP_DCQ:""
					
				}]
			};

			const oModelDel = new sap.ui.model.json.JSONModel(initialDelvData);
			const oModelReDel = new sap.ui.model.json.JSONModel(initialRelDelvData);
			this.getView().setModel(oModelDel, "DelvModelData");
			this.getView().setModel(oModelReDel, "RedlvModelData");

			

			
			
		},

		


		


		soldToPartyValueHelp: async function (oEvent) {
			try {
				let sDialogId = "_customerSelectDialog";
				let sFragmentName = "com.ingenx.nomination.salesnomination.fragment.soldToParty";

				this._currentValueHelpSource = oEvent.getSource();

				await HelperFunction._openValueHelpDialog(this, sDialogId, sFragmentName);
			} catch (error) {
				console.error("Error opening value help dialog:", error);
				sap.m.MessageBox.error("Could not open value help. Please contact support.");
			}
		},
        onValueHelpConfirmSTP: async function (oEvent) {

			try {
				let oSource = this._currentValueHelpSource;
				 customerValue = HelperFunction._valueHelpSelectedValue(oEvent, this, oSource.getId());
				if (!customerValue) return;

				let oView = this.getView();
				

				let oData = await HelperFunction._getSingleEntityDataWithParam(
					this,
					"getNominationsByCustomer",
					"SoldToParty",
					customerValue
				);

				if (oData && oData.length) {
					let newModelForContracts = new sap.ui.model.json.JSONModel({ data: oData });
					oView.setModel(newModelForContracts, "newModelForContracts");
					oView.getModel("newModelForContracts").refresh();
				}
			} catch (error) {
				console.error("Unexpected error:", error.message || error);
				sap.m.MessageBox.error("An unexpected error occurred. Please try again.");
			} finally {
				
				this._customerSelectDialog.getBinding("items").filter([]);
			}
		},
		onValueHelpSearchSTP: function (oEvent) {
			HelperFunction._valueHelpLiveSearch(oEvent, "Customer", "soldToParty", this);
		},
        contractValueHelp: async function (oEvent) {
			try {
				let sDialogId = "_contractSelectDialog";
				let sFragmentName = "com.ingenx.nomination.salesnomination.fragment.selectContract";

				this._currentValueHelpSource = oEvent.getSource();

				await HelperFunction._openValueHelpDialog(this, sDialogId, sFragmentName);
			} catch (error) {
				console.error("Error opening value help dialog:", error);
				sap.m.MessageBox.error("Could not open value help. Please contact support.");
			}
		},
        onValueHelpConfirmContract: async function (oEvent) {
            try {
                let oSource = this._currentValueHelpSource;
                let sContract = HelperFunction._valueHelpSelectedValue(oEvent, this, oSource.getId());
        
                if (!sContract) {
                    console.error("No contract selected.");
                    return;
                }
        
                console.log("Selected Contract:", sContract);
                const sPath = `/getContractDetailsAndPastNom?DocNo='${sContract}'`;
                console.log("Fetching from path:", sPath);
        
                let oModelgetCust = this.getOwnerComponent().getModel();
                const oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});
        
                try {
                    const oData = await oBindinggetCust.requestObject();
                    console.log("Fetched Data:", oData);
        
                    if (!oData || !oData.value || oData.value.length === 0) {
                        console.error("No data received or empty data array!");
                        sap.m.MessageToast.show("No materials found.");
                        return;
                    }
        
                    let oView = this.getView();
                    let oMaterialModel = oView.getModel("materialModel");
        
                    if (!oMaterialModel) {
                        oMaterialModel = new sap.ui.model.json.JSONModel();
                        oView.setModel(oMaterialModel, "materialModel");
                    }
        
                    
                    oMaterialModel.setProperty("/data", oData.value);
                    oMaterialModel.updateBindings(true);
                    oMaterialModel.refresh(true);
        
                    console.log("Updated Model Data:", oMaterialModel.getData());
        
                   
                   
        
                } catch (error) {
                    console.error("Error fetching contract details:", error);
                    sap.m.MessageBox.error("Failed to fetch contract details. Please try again later.");
                }
            } catch (oError) {
                console.error("Unexpected error:", oError);
                sap.m.MessageBox.error("An unexpected error occurred.");
            }
        },
        
        
        onValueHelpSearchContract: function (oEvent) {
			HelperFunction._valueHelpLiveSearch(oEvent, "DocNo", "DocNo", this);
		},
        materialValueHelp: async function (oEvent) {
			try {
				let sDialogId = "_materialSelectDialog";
				let sFragmentName = "com.ingenx.nomination.salesnomination.fragment.selectMaterial";

				this._currentValueHelpSource = oEvent.getSource();

				await HelperFunction._openValueHelpDialog(this, sDialogId, sFragmentName);
			} catch (error) {
				console.error("Error opening value help dialog:", error);
				sap.m.MessageBox.error("Could not open value help. Please contact support.");
			}
		},
      
       
		
		onValueHelpConfirmMaterial: async function (oEvent) {
			try {
				let oSource = this._currentValueHelpSource;
				let material1 = HelperFunction._valueHelpSelectedValue(oEvent, this, oSource.getId());
				if (!material1) return;
		
				let oSelectedItem = oEvent.getParameter("selectedItem");
				if (!oSelectedItem) return;
		
				let oContext = oSelectedItem.getBindingContext("materialModel");
				if (!oContext) return;
		
				let oSelectedMaterial = oContext.getObject();
				let material = oSelectedMaterial.Material;
				let redeliveryPoint = oSelectedMaterial.Redelivery_Point;
				let docNo = oSelectedMaterial.DocNo;
		
				if (!docNo || !material || !redeliveryPoint) {
					sap.m.MessageBox.error("Missing required data: DocNo, Material, or Redelivery_Point.");
					return;
				}
		
				const sPath = `/getContractDetail?DocNo='${docNo}'&Material='${material}'&Redelivery_Point='${redeliveryPoint}'`;
				console.log("API Call:", sPath);
		
				let oModel = this.getOwnerComponent().getModel();
				let oBinding = oModel.bindContext(sPath, null, {});
		
				const oData = await oBinding.requestObject();
				console.log("Fetched Contract Data:", oData.value);
		
				if (!oData.value || oData.value.length === 0) {
					sap.m.MessageBox.warning("No contract details found for the selected material.");
					return;
				}
		
				let contractDetails = oData.value[0];
		
				// Ensure data array exists
				let contractDataArray = contractDetails.data || [];
		
				let maxDCQ = this._getClauseValue(contractDataArray, "Max RDP DCQ");
				let minDCQ = this._getClauseValue(contractDataArray, "Min RDP DCQ");
				console.log("Max DCQ:", maxDCQ, "Min DCQ:", minDCQ);
		
				this.getView().byId("contractRDPDCQ").setValue(contractDetails.Redelivery_Dcq || ""); 
				this.getView().byId("contractUOM").setValue(contractDetails.UOM || "");  
				this.getView().byId("ContractRedeliveryPoint").setValue(contractDetails.Redelivery_Point || "");  
		
			} catch (error) {
				console.error("Error fetching contract details:", error);
				sap.m.MessageBox.error("Failed to fetch contract details. Please try again.");
			}
		},
		
		_getClauseValue: function (data, clauseCode) {
			
			let clause = data.find(item => item.Clause_Code === clauseCode);
			return clause ? parseFloat(clause.Calculated_Value) || 0 : 0;
		},
		onSubmitSysNomDData: function () {
			var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel();
			var oListBinding = oModel.bindList("/systemNomination");
		
			var oValidFrom = oView.byId("IdsysPubNomDelvFromTimePicker").getDateValue();
			var oValidTo = oView.byId("IdsysPubNomDelvtoTimePicker").getDateValue();
		
			// Format dates to YYYY-MM-DD
			var sValidFrom = oValidFrom ? oValidFrom.toISOString().split("T")[0] : null;
			var sValidTo = oValidTo ? oValidTo.toISOString().split("T")[0] : null;
		
			var oPayload = {
				Vbeln: oView.byId("registrationMapping_emailID").getValue(),
				soldToParty: oView.byId("registrationMapping_retailerName").getValue(),
				Material: oView.byId("registrationMapping_contactNo").getValue(),
				Rdcq: parseFloat(oView.byId("contractRDPDCQ").getValue()) || 0,
				Uom: oView.byId("contractUOM").getValue(),
				RedelivryPoint: oView.byId("ContractRedeliveryPoint").getValue(),
				Rpdnq: parseFloat(oView.byId("registrationMapping_district").getValue()) || 0,
				ValidTo: sValidTo,
				ValidFrom: sValidFrom
			};
		
			// Validate required fields
			if (!oPayload.Vbeln) {
				MessageBox.error("Contract No. is required!");
				return;
			}
		
			if (!oPayload.ValidFrom || !oPayload.ValidTo) {
				MessageBox.error("Valid From and Valid To dates are required!");
				return;
			}
		
			if (new Date(oPayload.ValidFrom) > new Date(oPayload.ValidTo)) {
				MessageBox.error("Valid From date cannot be later than Valid To date!");
				return;
			}
		
			// Create new entry using bindList (OData V4)
			var oContext = oListBinding.create(oPayload);
		
			oContext.created()
				.then(() => {
					MessageBox.success("System Nomination created successfully!");
		
					// Clear input fields after successful nomination
					oView.byId("registrationMapping_emailID").setValue("");
					oView.byId("registrationMapping_retailerName").setValue("");
					oView.byId("registrationMapping_contactNo").setValue("");
					oView.byId("contractRDPDCQ").setValue("");
					oView.byId("contractUOM").setValue("");
					oView.byId("ContractRedeliveryPoint").setValue("");
					oView.byId("registrationMapping_district").setValue("");
					oView.byId("IdsysPubNomDelvFromTimePicker").setValue("");
					oView.byId("IdsysPubNomDelvtoTimePicker").setValue("");
		
					oModel.refresh(); // Refresh UI to show new data
				})
				.catch((oError) => {
					MessageBox.error("Failed to create System Nomination: " + oError.message);
				});
		}
		
		
		
		
        

       



      


		
		












	
		



	


	});
});