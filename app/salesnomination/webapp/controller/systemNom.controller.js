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

	

	
	
	

	let customerValue;
	let documentValue;
  

	return Controller.extend("com.ingenx.nomination.salesnomination.controller.systemNom", {

		onInit: function () {


			this._oBusyDialog = new sap.m.BusyDialog();
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
		documenttypeValueHelp: async function (oEvent) {
			try {
				this._resetContractDataViews();

				let sDialogId = "_documentSelectDialog";
				let sFragmentName = "com.ingenx.nomination.salesnomination.fragment.selectDocumentType";

				this._currentValueHelpSource = oEvent.getSource();

				await HelperFunction._openValueHelpDialog(this, sDialogId, sFragmentName);
			} catch (error) {
				console.error("Error opening value help dialog:", error);
				sap.m.MessageBox.error("Could not open value help. Please contact support.");
			}
		},
		_resetContractDataViews: function () {
			const oView = this.getView();
		
			oView.byId("IdSysNomDelPointTable").setVisible(false);
			oView.byId("IdSysNomTableHeaderBarForDelv").setVisible(false);
		
			const aInputIds = [
				"sysNom_ValidTo",
				"sysNom_ValidFrom",
				"sysNom_Contract",
				"sysNom_Material",
				"sysNom_SoldToParty",
				"sysNom_DocumentType"
			];
			aInputIds.forEach(function (sId) {
				let oInput = oView.byId(sId);
				if (oInput) {
					oInput.setValue("");
				}
			});
		
			const oRedlvModel = oView.getModel("RedlvModelData");
			if (oRedlvModel) {
				oRedlvModel.setProperty("/RedeliveryPoints", [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					MaxRDP_DCQ: "",
					MinRDP_DCQ: ""
				}]);
			}
		
			const oDelvModel = oView.getModel("DelvModelData");
			if (oDelvModel) {
				oDelvModel.setProperty("/DeliveryPoints", [{
					DeliveryPt: "",
					DNQ: "",
					UOM: "",
					MaxDP_DCQ: "",
					MinDP_DCQ: ""
				}]);
			}
		
			const oContModel = oView.getModel("contDataModel");
			if (oContModel) {
				oContModel.setData({});
			}
		},
		
		
		onValueHelpConfirmDocument: async function (oEvent) {

			try {
				let oSource = this._currentValueHelpSource;
				 documentValue = HelperFunction._valueHelpSelectedValue(oEvent, this, oSource.getId());
				if (!documentValue) {
					return;

				}
					
				} 
				catch (error) {
				console.error("Unexpected error:", error.message || error);
			} finally {
				
				this._documentSelectDialog.getBinding("items").filter([]);
			}
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
				
				const sPath = `/getContractsByCustomerNDocType?SoldToParty='${customerValue}'&DocTyp='${documentValue}'`;
				
				let oModel = this.getOwnerComponent().getModel();
				const oBindList = oModel.bindList(sPath);
				const aContexts = await oBindList.requestContexts(0, Infinity);

				const oData = aContexts.map(oContext => oContext.getObject());
				console.log("aContracts", oData);

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
		
				let contractDataArray = contractDetails.data || [];
		
			
		
				let oNewJsonModel = new sap.ui.model.json.JSONModel(oData.value[0]);
				this.getView().setModel(oNewJsonModel, "contDataModel");

		
				this._updateRedeliveryData(oData.value[0]);
				this._updateDeliveryData(oData.value[0]);  
		
			} catch (error) {
				console.error("Error fetching contract details:", error);
				sap.m.MessageBox.error("Failed to fetch contract details. Please try again.");
			}
		},
		
		

		
		_updateRedeliveryData: function (oData) {
			const hasRedeliveryDcq = oData.Redelivery_Point && oData.Redelivery_Point.trim() !== "";
			if (hasRedeliveryDcq) {
				let oRedlvModel = this.getView().getModel("RedlvModelData");
				let aRedeliveryPoints = oRedlvModel.getProperty("/RedeliveryPoints") || [];
		
				const contractDataArray = oData.data || [];
				const maxDCQ = this._getClauseValue(contractDataArray, "Max RDP DCQ");
				const minDCQ = this._getClauseValue(contractDataArray, "Min RDP DCQ");
		
				aRedeliveryPoints.forEach(item => {
					item.RedeliveryPt = oData.Redelivery_Point;
					item.UOM = "MBT";
					item.MaxRDP_DCQ = maxDCQ || "";
					item.MinRDP_DCQ = minDCQ || "";
				});
		
				oRedlvModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
			}
		},
		
		
		_updateDeliveryData: function (oData) {
			const hasDeliveryDcq = !!(oData.Delivery_Point && oData.Delivery_Point.trim());
			if (hasDeliveryDcq) {
				let oView = this.getView();
				
				oView.byId("IdSysNomDelPointTable").setVisible(true);
				oView.byId("IdSysNomTableHeaderBarForDelv").setVisible(true);

				let oDelvModel = oView.getModel("DelvModelData");
				let aDeliveryPoints = oDelvModel.getProperty("/DeliveryPoints") || [];
				const contractDataArray = oData.data || [];
				const maxDCQ = this._getClauseValue(contractDataArray, "Max DP DCQ");
				const minDCQ = this._getClauseValue(contractDataArray, "Min DP DCQ");
		

				aDeliveryPoints.forEach(item => {
					item.DeliveryPt = oData.Delivery_Point;
					item.UOM = "MBT";
					item.MaxDP_DCQ = maxDCQ || "";
					item.MinDP_DCQ = minDCQ || "";
				});

				oDelvModel.setProperty("/DeliveryPoints", aDeliveryPoints);
			}
		},
       





		
		_getClauseValue: function (data, clauseCode) {
			
			let clause = data.find(item => item.Clause_Code === clauseCode);
			return clause ? parseFloat(clause.Calculated_Value) || 0 : 0;
		},
		onSubmitSysNomDData1: async function () {

			const oModelDataRedlv = this.getView().getModel("RedlvModelData").getData();
			const oModelDataDelv = this.getView().getModel("DelvModelData").getData();
			const selectedMaterialData = this.getView().getModel("contDataModel").getData();

			var oView = this.getView();
			var oValidFrom = oView.byId("sysNom_ValidFrom").getDateValue();
			var oValidTo = oView.byId("sysNom_ValidTo").getDateValue();
		
			var sValidFrom = oValidFrom ? oValidFrom.toISOString().split("T")[0] : null;
			var sValidTo = oValidTo ? oValidTo.toISOString().split("T")[0] : null;

			let systemNomPayload = {
				Vbeln:selectedMaterialData.DocNo,
				Redelivrypoint:selectedMaterialData.Redelivery_Point,
				ValidFrom:sValidFrom,
				ValidTo:sValidTo,
				SoldToParty:selectedMaterialData.SoldToParty,
				Material:selectedMaterialData.Material,
				DpDnq:oModelDataDelv.DeliveryPoints[0].DNQ,
				Uom:selectedMaterialData.UOM,
				RpDnq:oModelDataRedlv.RedeliveryPoints[0].DNQ,
				DeliveryPoint:selectedMaterialData.Delivery_Point,
				Event:"No-event"
			};





			console.log("systemNomPayload",systemNomPayload);
			
			let oModel = this.getOwnerComponent().getModel();
			let oBindList = oModel.bindList("/Nom_DetailSet");
			const newContext =await oBindList.create(systemNomPayload, true);
			await newContext.created();
			sap.m.MessageBox.success("Nomination Successfully Submitted");
			this._resetContractDataViews();
			
		
			
			
		},
		
		

		onSubmitSysNomDData: async function () {
			const oView = this.getView();
			const oBusyDialog = new sap.m.BusyDialog();
			oBusyDialog.open();
		
			try {
				const oModelDataRedlv = oView.getModel("RedlvModelData").getData();
				const oModelDataDelv = oView.getModel("DelvModelData").getData();
				const selectedMaterialData = oView.getModel("contDataModel").getData();
		
				const oValidFrom = oView.byId("sysNom_ValidFrom").getDateValue();
				const oValidTo = oView.byId("sysNom_ValidTo").getDateValue();
		
				const sValidFrom = oValidFrom ? oValidFrom.toISOString().split("T")[0] : null;
				const sValidTo = oValidTo ? oValidTo.toISOString().split("T")[0] : null;
		
				const systemNomPayload = {
					Vbeln: selectedMaterialData.DocNo,
					Redelivrypoint: selectedMaterialData.Redelivery_Point,
					ValidFrom: sValidFrom,
					ValidTo: sValidTo,
					SoldToParty: selectedMaterialData.SoldToParty,
					Material: selectedMaterialData.Material,
					DpDnq: oModelDataDelv.DeliveryPoints[0].DNQ,
					Uom: selectedMaterialData.UOM,
					RpDnq: oModelDataRedlv.RedeliveryPoints[0].DNQ,
					DeliveryPoint: selectedMaterialData.Delivery_Point,
					Event: "No-event"
				};
		
				const oModel = this.getOwnerComponent().getModel();
				const oBindList = oModel.bindList("/Nom_DetailSet");
		
				oBindList.attachEventOnce("createCompleted", function (oEvent) {
					oBusyDialog.close();
					const bSuccess = oEvent.getParameter("success");
		
					if (bSuccess) {
						sap.m.MessageBox.success("Nomination Successfully Submitted");
						this._resetContractDataViews();
					} else {
						const oContext = oEvent.getParameter("context");
						const oMessages = oModel.getMessagesByPath(oContext.getPath());
						const sErrorMsg = oMessages?.[0]?.message || "Nomination submission failed.";
						sap.m.MessageBox.error(sErrorMsg);
					}
				}, this);
		
				// Fire-and-forget (false = don't wait)
				oBindList.create(systemNomPayload, false);
		
			} catch (error) {
				console.error("Unexpected error:", error);
				oBusyDialog.close();
				sap.m.MessageBox.error("Unexpected error occurred while submitting nomination.");
			}
		},
		onSubmitSysNomDData2: async function () {
			
			const oView = this.getView();
			const oModelDataRedlv = oView.getModel("RedlvModelData").getData();
			const oModelDataDelv = oView.getModel("DelvModelData").getData();
			const selectedMaterialData = oView.getModel("contDataModel").getData();
		
			const oValidFrom = oView.byId("sysNom_ValidFrom").getDateValue();
			const oValidTo = oView.byId("sysNom_ValidTo").getDateValue();
		
			const sValidFrom = oValidFrom ? oValidFrom.toISOString().split("T")[0] : null;
			const sValidTo = oValidTo ? oValidTo.toISOString().split("T")[0] : null;
		
			let systemNomPayload = {
				Vbeln: selectedMaterialData.DocNo,
				Redelivrypoint: selectedMaterialData.Redelivery_Point,
				ValidFrom: sValidFrom,
				ValidTo: sValidTo,
				SoldToParty: selectedMaterialData.SoldToParty,
				Material: selectedMaterialData.Material,
				DpDnq: oModelDataDelv.DeliveryPoints[0].DNQ|| "0.000",
				Uom: selectedMaterialData.UOM,
				RpDnq: oModelDataRedlv.RedeliveryPoints[0].DNQ|| "0.000",
				DeliveryPoint: selectedMaterialData.Delivery_Point,
				Event: "No-event"
			};
		
			console.log("systemNomPayload", systemNomPayload);
		
			const oModel = this.getOwnerComponent().getModel();
		
			const oListBinding = oModel.bindList("/xGMSxNOMDETAILS", null, null, [
				new sap.ui.model.Filter("Vbeln", "EQ", systemNomPayload.Vbeln),
				new sap.ui.model.Filter("ValidFrom", "EQ", systemNomPayload.ValidFrom),
				new sap.ui.model.Filter("Redelivrypoint", "EQ", systemNomPayload.Redelivrypoint),
				new sap.ui.model.Filter("ValidTo", "EQ", systemNomPayload.ValidTo),


			]);
		
			try {
				const aContexts = await oListBinding.requestContexts(0, 1); 
		
				if (aContexts.length > 0) {
					sap.m.MessageBox.error("A nomination already exists for the selected combination.");
					return;
				}
		
				const oNominationBinding = oModel.bindList("/Nom_DetailSet");
				const oNewContext = await oNominationBinding.create(systemNomPayload, true);
				await oNewContext.created();
		
				sap.m.MessageBox.success("Nomination Successfully Submitted");
				this._resetContractDataViews();
		
			} catch (err) {
				console.error("Nomination creation failed:", err);
		        sap.m.MessageBox.error("Nomination creation failed:", err);
			}
		}
		
		

		
		
		
		
		
		
		
		
        

       



      


		
		












	
		



	


	});
});