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
					MaxDP_DCQ: "",
					MinDP_DCQ: ""

				}]
			};

			const initialRelDelvData = {
				RedeliveryPoints: [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					MaxRDP_DCQ: "",
					MinRDP_DCQ: ""

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
		onCancelSysNomDData:function(){
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

				function formatDateToLocalISO(date) {
					if (!date) return null;
					const tzOffset = date.getTimezoneOffset() * 60000;
					const localISO = new Date(date.getTime() - tzOffset).toISOString().split('T')[0];
					return localISO;
				}

				const sValidFrom = formatDateToLocalISO(oValidFrom);
				const sValidTo = formatDateToLocalISO(oValidTo);


				let systemNomPayload = {
					Vbeln: selectedMaterialData.DocNo,
					Redelivrypoint: selectedMaterialData.Redelivery_Point,
					ValidFrom: sValidFrom,
					ValidTo: sValidTo,
					SoldToParty: selectedMaterialData.SoldToParty,
					Material: selectedMaterialData.Material,
					DpDnq: oModelDataDelv.DeliveryPoints[0].DNQ || "0.000",
					Uom: selectedMaterialData.UOM,
					RpDnq: oModelDataRedlv.RedeliveryPoints[0].DNQ || "0.000",
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
						const oMessages = oContext.oModel.mMessages?.[""] || [];
						const sErrorMsg = oMessages[0]?.message || "Nomination submission failed.";
						sap.m.MessageBox.error(sErrorMsg);

						
					}
				}, this);

				oBindList.create(systemNomPayload, false);

			} catch (error) {
				console.error("Unexpected error:", error);
				oBusyDialog.close();
				sap.m.MessageBox.error("Unexpected error occurred while submitting nomination.");
			}
		},
		OnReDeliveryDNQValidation: function (oEvent) {
			
			let sValue = oEvent.getParameter("value").trim();
			let dnqValue = parseFloat(sValue) || 0;
			let oView = this.getView();
			
		
			let oContractData = oView.getModel("contDataModel").getData();
		
			let  profile = oContractData.Profile; 
			
			let maxRDPDCQ = this._getClauseValue(oContractData.data, "Max RDP DCQ");
			let minRDPDCQ = this._getClauseValue(oContractData.data, "Min RDP DCQ");
		
			let valueMap = {
				"DNQ": dnqValue,
				"Max RDP DCQ": maxRDPDCQ,
				"Min RDP DCQ": minRDPDCQ
			};
		
			let isRelaxedValidation = false
			console.log("isrelax",isRelaxedValidation);
			
		
			if (this._validationTimeout) {
				clearTimeout(this._validationTimeout);
			}
		
			if (!this._lastValidatedValue || this._lastValidatedValue !== sValue) {
				this._lastValidatedValue = sValue;
		
				this._validationTimeout = setTimeout(async () => {
					if (sValue.length >= 1) {
						try {
							let result = await HelperFunction.validateDNQ(oView, valueMap, customerValue,profile, isRelaxedValidation);
							if (!result.isValid) {
								MessageBox.error(result.message, {
									onClose: () => {
										oEvent.getSource().setValue("");
									
									}
								});
								
							}
						} catch (err) {
							console.error("Validation failed:", err);
							MessageBox.error("Validation error occurred.", {
								onClose: () => {
									oEvent.getSource().setValue("");
									
								}
							});
							
						} finally {
							this._validationTimeout = null;
						}
					}
				}, 1000);
			}
		},
		debounce: function (fn, delay) {
			let timer;
			return function (...args) {
				clearTimeout(timer);
				timer = setTimeout(() => fn.apply(this, args), delay);
			};
		},
		
		
		OnDeliveryDNQValidation: function (oEvent) {
			let sValue = oEvent.getParameter("value").trim();
			let dnqValue = parseFloat(sValue) || 0;
			let oView = this.getView();
		
			if (!sValue){
				
				this._lastValidatedValue = null;
				return;
			}
			
		
			let oContractData = oView.getModel("contDataModel").getData();
			let  profile = oContractData.Profile;
			let maxDCQ = this._getClauseValue(oContractData.data, "Max DP DCQ");
			let minDCQ = this._getClauseValue(oContractData.data, "Min DP DCQ");
		
			let valueMap = {
				"DNQ": dnqValue,
				"Max DP DCQ": maxDCQ,
				"Min DP DCQ": minDCQ
			};
		
			let isRelaxedValidation = false;
			console.log("isrelax",isRelaxedValidation);
			
			if (this._validationTimeout) {
				clearTimeout(this._validationTimeout);
			}
		
			if (sValue === "") {
				this._lastValidatedValue = null;
				return; 
			}
		
			if (!this._lastValidatedValue || this._lastValidatedValue !== sValue) {
				this._lastValidatedValue = sValue;
		
				this._validationTimeout = setTimeout(async () => {
					if (sValue.length >= 1) {
						try {
							let result = await HelperFunction.validateDNQ(oView, valueMap, customerValue,profile, isRelaxedValidation);
							if (!result.isValid) {
								MessageBox.error(result.message, {
									onClose: () => {
										oEvent.getSource().setValue("");
										
									}
								});
								
							}
						} catch (err) {
							MessageBox.error("Validation error occurred.", {
								onClose: () => {
									oEvent.getSource().setValue("");
								}
							});
							
						} finally {
							this._validationTimeout = null;
						}
					}
				}, 1000); 
			}
		},
	









































	});
});