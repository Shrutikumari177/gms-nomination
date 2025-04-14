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
	let Redelivery_Point;
	let sDocNo

	let oView;
	
	let sContract;
	let customerValue;
	let RDPSelectedEvent ;
	let dpSelectedEvent
	return Controller.extend("com.ingenx.nomination.salesnomination.controller.publishNomination", {

		onInit: function () {

			oView = this.getView();

			var oModelSizes = new JSONModel({
				pane1: "200px",
				pane2: "auto",
				pane3: "auto"
			});

			oView.setModel(oModelSizes, "sizes");

			const initialDelvData = {
				DeliveryPoints: [{
					DeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "06:00:00",
					ToT: "06:00:00",
					Event: ""
				}]
			};

			const initialRelDelvData = {
				RedeliveryPoints: [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "06:00:00",
					ToT: "06:00:00",
					Event: ""
				}]
			};

			const oModelDel = new sap.ui.model.json.JSONModel(initialDelvData);
			const oModelReDel = new sap.ui.model.json.JSONModel(initialRelDelvData);
			this.getView().setModel(oModelDel, "DelvModelData");
			this.getView().setModel(oModelReDel, "RedlvModelData");

			// model for TotalDNQ
			var oModel = new sap.ui.model.json.JSONModel({
				rdpCummDNQ: "",
				dpCummDNQ: ""
			});
			this.getView().setModel(oModel, "localModel");
			

			const oDatePicker = this.byId("IdPubNomGasDayPicker");

			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			oDatePicker.setMinDate(tomorrow);
		},

		onRootContainerResize: function (oEvent) {
			var aOldSizes = oEvent.getParameter("oldSizes"),
				aNewSizes = oEvent.getParameter("newSizes"),
				sMessage = "Root container is resized.";

			if (aOldSizes && aOldSizes.length) {
				sMessage += "\nOld panes sizes = [" + aOldSizes + "]";
			}

			sMessage += "\nNew panes sizes = [" + aNewSizes + "]";

		},

		onInnerContainerResize: function (oEvent) {
			var aOldSizes = oEvent.getParameter("oldSizes"),
				aNewSizes = oEvent.getParameter("newSizes"),
				sMessage = "Inner container is resized.";

			if (aOldSizes && aOldSizes.length) {
				sMessage += "\nOld panes sizes = [" + aOldSizes + "]";
			}

			sMessage += "\nNew panes sizes = [" + aNewSizes + "]";

		},

		// nomination**********************************************************************************

		onTimeChange: function (oEvent) {
			var sNewValue = oEvent.getParameter("value");
			var oModel = this.getView().getModel("RedlvModelData");
			oModel.setProperty(oEvent.getSource().getBinding("value").getPath(), sNewValue);
		},

		// updated code 

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
				oView.byId("IdPubNomContractsPage").setBusy(true);

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
				this.getView().byId("IdPubNomContractsPage").setBusy(false);
				this._customerSelectDialog.getBinding("items").filter([]);
			}
		},
		onValueHelpSearchSTP: function (oEvent) {
			HelperFunction._valueHelpLiveSearch(oEvent, ["Customer", "CustomerName"], "soldToParty", this);
		},
		
		onBackMat: function () {
			try {
				this.byId("IdPubNomStaticListS").setVisible(false);
				this.byId("IdPubNomContractRPDCQ").setVisible(true);
				this.byId("IdPubNomStaticListfinal").setVisible(true);


				const oMaterialBox = this.byId("IdPubNomVboxMaterials");
				const oContractsBox = this.byId("IdPubNomVboxContracts");
				oContractsBox.setVisible(true);
				oMaterialBox.setVisible(false);


				// Hide Delivery Point Table and Header
				const oDeliveryDNQTable = this.byId("IdPubNomDelPointTable");
				if (oDeliveryDNQTable) {
					oDeliveryDNQTable.setVisible(false);
					this.byId("IdPubNomTableHeaderBarForDelv").setVisible(false);
				}
				this.byId("IdDelCummDNQInput").setValue("");
				this.byId("IdCummDNQInput").setValue("");
				this.clearMaterialModels();


			} catch (error) {
				console.error("Error in onBackMat:", error);
				// Optionally, show a message to the user
				sap.m.MessageToast.show("An error occurred while processing. Please try again.");
			}
		},












		clearMaterialModels: function () {

			const oMaterialWiseContractData = this.getView().getModel("materialModel");
			const oMaterialWiseModelData = this.getView().getModel("contDataModel");
			const oReDelvNomDCQTableData = this.getView().getModel("RedlvModelData");
			const oDelvNomDCQTableData = this.getView().getModel("DelvModelData");

			if (oMaterialWiseModelData) {
				oMaterialWiseModelData.setData({});
			}

			if (oReDelvNomDCQTableData) {
				oReDelvNomDCQTableData.setProperty("/RedeliveryPoints", [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "06:00:00",
					ToT: "06:00:00",
					Event: ""
				}]);
			}

			if (oDelvNomDCQTableData) {
				oDelvNomDCQTableData.setProperty("/DeliveryPoints", [{
					DeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "06:00:00",
					ToT: "06:00:00",
					Event: ""
				}]);
			}

			// if (oMaterialWiseContractData) {
			// 	oMaterialWiseContractData.setData({}); // Clear contract data
			// }

			// Refresh the model bindings if they exist
			const oGasDayPicker = this.byId("IdPubNomGasDayPicker");
			if (oGasDayPicker) {
				oGasDayPicker.setValue(""); // Clear the selected date
			}
			this.byId("IdDelCummDNQInput").setValue("");
			this.byId("IdCummDNQInput").setValue("");
			this.byId("IdPubNomStaticListS").setVisible(false);
			this.byId("IdPubNomContractRPDCQ").setVisible(true);
			this.byId("IdPubNomStaticListfinal").setVisible(true);

			this.refreshModels([
				oMaterialWiseContractData,
				oMaterialWiseModelData,
				oReDelvNomDCQTableData,
				oDelvNomDCQTableData
			]);
		},

		refreshModels: function (models) {
			models.forEach(model => {
				if (model) {
					model.refresh(true); // true to force refresh
				}
			});
		},

		
		onSelectContract: async function (oEvent) {
			// Set the busy indicator for the Contracts control
			const oView = this.getView();
			const oContractsControl = oView.byId("IdPubNomContractsPage");
			const oVboxCon = oView.byId("IdPubNomVboxContracts");
			const oVboxMat = oView.byId("IdPubNomVboxMaterials");
			const oModel = this.getOwnerComponent().getModel();
		
			oContractsControl.setBusy(true);
			oVboxCon.setVisible(false);
			oVboxMat.setVisible(true);
		
			try {
				sContract = oEvent.getSource().getBindingContext("newModelForContracts").getObject();
				console.log("sContract", sContract);
		
				const sDocNo = String(sContract.DocNo);
				const sPath = `/getContractDetailsAndPastNom?DocNo='${encodeURIComponent(sDocNo)}'`;
				console.log("sPath", sPath);
		
				let oModelgetCust = this.getOwnerComponent().getModel();
				const oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});
		
				try {
					const oData = await oBindinggetCust.requestObject();
					console.log("Fetched Data:", oData);
					let oMaterialModel = oView.getModel("materialModel");
		
					if (!oMaterialModel) {
						oMaterialModel = new sap.ui.model.json.JSONModel();
						oView.setModel(oMaterialModel, "materialModel");
					}
					oMaterialModel.setProperty("/selectedMaterials", oData.value);
					console.log("oMaterialModel", oMaterialModel);
		
				} catch (error) {
					console.log("error", error);
				}
		
			} catch (oError) {
				console.error("Error fetching contract details:", oError.message || oError);
				sap.m.MessageBox.error("Failed to fetch contract details. Please try again later.");
			} finally {
				oContractsControl.setBusy(false);
			}
		},
		
	
		
		onSelectMaterial: async function (oEvent) {
			let oSelectedItem = oEvent.getSource();
			let oContext = oSelectedItem.getBindingContext("materialModel");
			if (!oContext) return;
		
			let oSelectedMaterial = oContext.getObject();
			 material = String(oSelectedMaterial.Material);
			 Redelivery_Point = String(oSelectedMaterial.Redelivery_Point);
			 sDocNo = String(sContract.DocNo);
		
			const sPath = `/getContractDetail?DocNo='${encodeURIComponent(sDocNo)}'&Material='${encodeURIComponent(material)}'&Redelivery_Point='${encodeURIComponent(Redelivery_Point)}'`;
			console.log("sPath", sPath);
		
			let oModelgetCust = this.getOwnerComponent().getModel();
			let oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});
		
			if (!this._oBusyDialog) {
				this._oBusyDialog = new sap.m.BusyDialog({
					text: "Loading nomination details...",
					title: "Please wait"
				});
			}
		
			this._oBusyDialog.open(); 
		
			try {
				const oData = await oBindinggetCust.requestObject();
				console.log("Fetched Data:", oData.value);
		
				let oNewJsonModel = new sap.ui.model.json.JSONModel(oData.value[0]);
				this.getView().setModel(oNewJsonModel, "contDataModel");
		
				this._updateRedeliveryData(oData.value[0]);
				this._updateDeliveryData(oData.value[0]);
		
			} catch (error) {
				console.error("Error fetching contract details:", error);
				sap.m.MessageToast.show("Failed to load contract details.");
			} finally {
				this._oBusyDialog.close(); 
			}
		},
	
		onSelectedGasDay: async function (oEvent) {
			const oDatePicker = oEvent.getSource();
			const gasDay = oDatePicker.getDateValue();
			if (!gasDay) return;
		
			const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
			let Gasday = oDateFormat.format(gasDay);
		
			const sPath = `/getMinMaxDCQByGasDate?DocNo='${encodeURIComponent(sDocNo)}'&Material='${encodeURIComponent(material)}'&Redelivery_Point='${encodeURIComponent(Redelivery_Point)}'&Gasday=${Gasday}`;
		
			let oModel = this.getOwnerComponent().getModel();
			let oBindingGetData = oModel.bindContext(sPath, null, {});
		
			try {
				const oResult = await oBindingGetData.requestObject();
		
				// Update only the `data` portion of contDataModel
				let oContDataModel = this.getView().getModel("contDataModel");
				if (oContDataModel) {
					let oModelData = oContDataModel.getData();
					oModelData.data = oResult.value;
					oContDataModel.setData(oModelData);
				} else {
					let oNewModel = new sap.ui.model.json.JSONModel({ data: oResult.value });
					this.getView().setModel(oNewModel, "contDataModel");
				}
		
			} catch (err) {
				const errMsg = err?.message || "";
			
				if (
					errMsg.includes("No clause found for the given gas day") ||
					errMsg.includes("Cannot create nomination.DCQ Validity starts from")
				) {
					const oFallbackData = [
						{
							Clause_Code: "Max RDP DCQ",
							Calculated_Value: ""
						},
						{
							Clause_Code: "Min RDP DCQ",
							Calculated_Value: ""
						}
					];
			
					let oContDataModel = this.getView().getModel("contDataModel");
					if (oContDataModel) {
						let oModelData = oContDataModel.getData();
						oModelData.data = oFallbackData;
						oContDataModel.setData(oModelData);
					} else {
						let oNewModel = new sap.ui.model.json.JSONModel({ data: oFallbackData });
						this.getView().setModel(oNewModel, "contDataModel");
					}
			
					sap.m.MessageToast.show(errMsg); 
				} else {
					console.error("Error fetching clause codes:", err);
					sap.m.MessageToast.show(errMsg);
				}
			
			
			}
		},
		
		
		
		
		
		

		_updateRedeliveryData: function (oData) {
			const hasRedeliveryDcq = oData.Redelivery_Point && oData.Redelivery_Point.trim() !== "";
			if (hasRedeliveryDcq) {
				this.getView().byId("IdPubNomContractRPDCQ").setVisible(true);
				let oRedlvModel = this.getView().getModel("RedlvModelData");
				let aRedeliveryPoints = oRedlvModel.getProperty("/RedeliveryPoints") || [];

				aRedeliveryPoints.forEach(item => {
					item.RedeliveryPt = oData.Redelivery_Point;
					item.UOM = "MBT";
				});

				oRedlvModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
			}
		},
		
		_updateDeliveryData: function (oData) {
			const hasDeliveryDcq = !!(oData.Delivery_Point && oData.Delivery_Point.trim());
			if (hasDeliveryDcq) {
				let oView = this.getView();
				oView.byId("IdPubNomStaticListS").setVisible(true);
				oView.byId("IdPubNomContratRPDCQ").setVisible(true);
				oView.byId("IdPubNomContractDPDCQ").setVisible(true);
				oView.byId("IdPubNomContractRPDCQ").setVisible(false);
				oView.byId("IdPubNomStaticListfinal").setVisible(false);
				oView.byId("IdPubNomDelPointTable").setVisible(true);
				oView.byId("IdPubNomTableHeaderBarForDelv").setVisible(true);

				let oDelvModel = oView.getModel("DelvModelData");
				let aDeliveryPoints = oDelvModel.getProperty("/DeliveryPoints") || [];

				aDeliveryPoints.forEach(item => {
					item.DeliveryPt = oData.Delivery_Point;
					item.UOM = "MBT";
				});

				oDelvModel.setProperty("/DeliveryPoints", aDeliveryPoints);
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
			let oModel = oView.getModel("localModel");
		
			if (!sValue){
				oModel.setProperty("/dpCummDNQ", "");
				this._lastValidatedValue = null;
				return;
			}
			oModel.setProperty("/dpCummDNQ", sValue + "MBT");
		
			let oContractData = oView.getModel("contDataModel").getData();
			let profile = oContractData.Profile;
			let maxDCQ = this._getClauseValue(oContractData.data, "Max DP DCQ");
			let minDCQ = this._getClauseValue(oContractData.data, "Min DP DCQ");
		
			let valueMap = {
				"DNQ": dnqValue,
				"Max DP DCQ": maxDCQ,
				"Min DP DCQ": minDCQ
			};
		
			let isRelaxedValidation = (dpSelectedEvent === "Force-Majeure" || dpSelectedEvent === "Under-Maintenance");
		
			if (this._validationTimeout) {
				clearTimeout(this._validationTimeout);
			}
		
			if (!this._lastValidatedValue || this._lastValidatedValue !== sValue) {
				this._lastValidatedValue = sValue;
		
				this._validationTimeout = setTimeout(async () => {
					if (sValue.length >= 1) {
						try {
							let result = await HelperFunction.validateDNQ(oView, valueMap, customerValue, profile, isRelaxedValidation);
							if (!result.isValid) {
								MessageBox.error(result.message, {
									onClose: () => {
										oEvent.getSource().setValue("");
										oModel.setProperty("/dpCummDNQ", "");
									}
								});
							}
						} catch (err) {
							console.error("Validation failed:", err);
							MessageBox.error("Validation error occurred.", {
								onClose: () => {
									oEvent.getSource().setValue("");
									oModel.setProperty("/dpCummDNQ", "");
								}
							});
						} finally {
							this._validationTimeout = null;
						}
					}
				}, 1000);
			}
		},
		
		
		
		RDPeventSelected:function(oEvent){
        let event = oEvent.getSource().getSelectedItem();
		if(event){
			RDPSelectedEvent = event.getText();
			return RDPSelectedEvent
		}
		},
		DpEventSelected:function(oEvent){
			let event = oEvent.getSource().getSelectedItem();
			if(event){
				dpSelectedEvent = event.getText();
				return dpSelectedEvent
			}
		},
		OnReDeliveryDNQValidation: function (oEvent) {
			let sValue = oEvent.getParameter("value").trim();
			let dnqValue = parseFloat(sValue) || 0;
			let oView = this.getView();
			let oModel = oView.getModel("localModel");
		
			if (!sValue) {
				oModel.setProperty("/rdpCummDNQ", "");
				this._lastValidatedValue = null;
				return;
			}
		
			oModel.setProperty("/rdpCummDNQ", sValue + "MBT");
		
			let oContractData = oView.getModel("contDataModel").getData();
			let profile = oContractData.Profile;
		
			let maxRDPDCQ = this._getClauseValue(oContractData.data, "Max RDP DCQ");
			let minRDPDCQ = this._getClauseValue(oContractData.data, "Min RDP DCQ");
		
			let valueMap = {
				"DNQ": dnqValue,
				"Max RDP DCQ": maxRDPDCQ,
				"Min RDP DCQ": minRDPDCQ
			};
		
			let isRelaxedValidation = (RDPSelectedEvent === "Force-Majeure" || RDPSelectedEvent === "Under-Maintenance");
		
			if (this._validationTimeout) {
				clearTimeout(this._validationTimeout);
			}
		
			if (!this._lastValidatedValue || this._lastValidatedValue !== sValue) {
				this._lastValidatedValue = sValue;
		
				this._validationTimeout = setTimeout(async () => {
					if (sValue.length >= 1) {
						try {
							let result = await HelperFunction.validateDNQ(oView, valueMap, customerValue, profile, isRelaxedValidation);
							if (!result.isValid) {
								MessageBox.error(result.message, {
									onClose: () => {
										oEvent.getSource().setValue("");
										oModel.setProperty("/rdpCummDNQ", "");
									}
								});
							}
						} catch (err) {
							console.error("Validation failed:", err);
							MessageBox.error("Validation error occurred.", {
								onClose: () => {
									oEvent.getSource().setValue("");
									oModel.setProperty("/rdpCummDNQ", "");
								}
							});
						} finally {
							this._validationTimeout = null;
						}
					}
				}, 1000);
			}
		},
		
		_getClauseValue: function (data, clauseCode) {
			let clause = data.find(item => item.Clause_Code === clauseCode);
			return clause ? parseFloat(clause.Calculated_Value) || 0 : 0;
		},






		
		onSelectedDate: function () {
			var oDatePicker = this.getView().byId("IdPubNomGasDayPicker");
			var sDate = oDatePicker.getDateValue();
			console.log("sDate", sDate);

		},

	
		
	
		createNomination: async function () {
			let oBusyDialog = new sap.m.BusyDialog();
			try {
				oBusyDialog.open(); // Show Busy Dialog
		
				let oGasdayPicker = this.getView().byId("IdPubNomGasDayPicker");

				let Gasday = oGasdayPicker ? oGasdayPicker.getDateValue() : null;
				let Remarks = this.getView().byId("IdPubNomRemarksInput").getValue();
				console.log("Remarks",Remarks);
				
		
				if (!Gasday) {
					oBusyDialog.close();
					sap.m.MessageBox.error("Please select a Gas Day!");
					return;
				}
		
				const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
				Gasday = oDateFormat.format(Gasday);
		
				const oModelDataRedlv = this.getView().getModel("RedlvModelData").getData();
				const oModelDataDelv = this.getView().getModel("DelvModelData").getData();
				const selectedMaterialData = this.getView().getModel("contDataModel").getData();
		
				if (!selectedMaterialData || !selectedMaterialData.DocNo) {
					oBusyDialog.close();
					sap.m.MessageBox.error("Invalid contract data. Please check and try again.");
					return;
				}
		
				let nomi_toitem = [];
				let oModel2 = this.getOwnerComponent().getModel();
				let purchaseContract = selectedMaterialData.DocNo;
		
				try {
					let oListBinding = oModel2.bindContext(`/TransAgreemSet(Salescontract='${selectedMaterialData.DocNo}')`);
					let oContext = await oListBinding.requestObject();
		
					if (oContext && oContext.Purchasecontract) {
						purchaseContract = oContext.Purchasecontract;
					}
				} catch (err) {
					console.log("Failed to fetch Purchase Contract:", err);
				}
		
				if (selectedMaterialData.Delivery_Point) {
					nomi_toitem.push({
						Contracttype: selectedMaterialData.Contracttype,
						Source: "Manual",
						Gasday,
						Vbeln: purchaseContract,
						ItemNo: "10",
						NomItem: "20",
						Shiptoparty: customerValue,
						Vendor: selectedMaterialData.Vendor,
						Versn: "",
						DeliveryPoint: selectedMaterialData.Delivery_Point,
						RedelivryPoint: "",
						ValidTo: oModelDataDelv.DeliveryPoints[0].ToT,
						ValidFrom: oModelDataDelv.DeliveryPoints[0].FromT,
						Material: selectedMaterialData.Material,
						kunnr: "",
						Auart: selectedMaterialData.Auart,
						Ddcq: selectedMaterialData.Delivery_Dcq,
						Uom1: oModelDataDelv.DeliveryPoints[0].UOM,
						Pdnq: oModelDataDelv.DeliveryPoints[0].DNQ,
						Event: oModelDataDelv.DeliveryPoints[0].Event,
						Adnq: "0.000",
						Znomtk: "",
						Src: "",
						Remarks: Remarks,
						Flag: "",
						Action: "",
						Path: "",
						CustGrp: "",
						SrvProfile: selectedMaterialData.Profile,
					});
					nomi_toitem.push({
						Contracttype: selectedMaterialData.Contracttype,
						Source: "Manual",
						Gasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "10",
						Shiptoparty: customerValue,
						Vendor: selectedMaterialData.Vendor,
						Versn: "",
						DeliveryPoint: "",
						RedelivryPoint: selectedMaterialData.Redelivery_Point,
						ValidTo: oModelDataRedlv.RedeliveryPoints[0].ToT,
						ValidFrom: oModelDataRedlv.RedeliveryPoints[0].FromT,
						Material: selectedMaterialData.Material,
						kunnr: "",
						Auart: selectedMaterialData.Auart,
						Ddcq: "0.000",
						Rdcq: selectedMaterialData.Redelivery_Dcq,
						Uom1: oModelDataRedlv.RedeliveryPoints[0].UOM,
						Event: oModelDataRedlv.RedeliveryPoints[0].Event,
						Adnq: "0.000",
						Pdnq: oModelDataRedlv.RedeliveryPoints[0].DNQ,
						Znomtk: "",
						Src: "",
						Remarks: Remarks,
						Flag: "",
						Action: "",
						Path: "",
						CustGrp: "",
						SrvProfile: selectedMaterialData.Profile,
					});
				} else {
					nomi_toitem.push({
						Contracttype: selectedMaterialData.Contracttype,
						Source: "Manual",
						Gasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "10",
						Shiptoparty: customerValue,
						Vendor: selectedMaterialData.Vendor,
						Versn: "",
						DeliveryPoint: "",
						RedelivryPoint: selectedMaterialData.Redelivery_Point,
						ValidTo: oModelDataRedlv.RedeliveryPoints[0].ToT,
						ValidFrom: oModelDataRedlv.RedeliveryPoints[0].FromT,
						Material: selectedMaterialData.Material,
						kunnr: "",
						Auart: selectedMaterialData.Auart,
						Ddcq: "0.000",
						Rdcq: selectedMaterialData.Redelivery_Dcq,
						Uom1: oModelDataRedlv.RedeliveryPoints[0].UOM,
						Event: oModelDataRedlv.RedeliveryPoints[0].Event,
						Adnq: "0.000",
						Pdnq: oModelDataRedlv.RedeliveryPoints[0].DNQ,
						Znomtk: "",
						Src: "",
						Remarks: Remarks,
						Flag: "",
						Action: "",
						Path: "",
						CustGrp: "",
						SrvProfile: selectedMaterialData.Profile,
					});
				}
		
				console.log("Nomination Items:", nomi_toitem);
		 
				let createNomPayLoad = {
					Gasday,
					Vbeln: selectedMaterialData.DocNo,
					nomi_toitem
				};
		
				let oModel = this.getOwnerComponent().getModel();
				let oBindList = oModel.bindList("/znom_headSet");
		
				const newContext = await oBindList.create(createNomPayLoad, true);
				await newContext.created();
		
				sap.m.MessageBox.success("Nomination Successfully Submitted");
				this.clearMaterialModels();
			} catch (error) {
				console.error("Error creating nomination:", error);
				sap.m.MessageBox.error("Failed to submit nomination. Please try again.");
			} finally {
				oBusyDialog.close(); 
			}
		},
		
		
		

		
		onCloseSimulateDialog: function () {
			this._simulateDialog.close();
		
		},
		Onsimulate: function () {
			//         const oEventBus = sap.ui.getCore().getEventBus();
			// oEventBus.publish("projectedImbalanceChannel", "calculateProjectedImbalance");
			if (!this._simulateDialog) {
				// Load the fragment and create the dialog
				this._simulateDialog = sap.ui.xmlfragment("com.ingenx.nomination.salesnomination.fragment.simulatePopup", this);
				this.getView().addDependent(this._simulateDialog);
			}
			// Open the dialog
			this._simulateDialog.open();

			const dnqValue = this.getView().byId("dnqGSA").getValue();
			const gasDay = this.getView().byId("selectedDate").getDateValue(); 

			sap.ui.getCore().getEventBus().publish("chartUpdate", "addDNQPoint", {
				dnq: Number(dnqValue),
				gasDay: gasDay
			});
		},





	});
});