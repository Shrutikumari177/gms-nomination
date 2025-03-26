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

	let oView;
	let minDCQVal = Number.MAX_SAFE_INTEGER;
	let maxDCQVal = 0;
	let remainingDCQ = 0;
	let sContract;
	let customerValue;

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
			HelperFunction._valueHelpLiveSearch(oEvent, "Customer", "soldToParty", this);
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
		
		



		onSelectMaterial1: async function (oEvent) {
			let oSelectedItem = oEvent.getSource();
			let oContext = oSelectedItem.getBindingContext("materialModel");
			if (!oContext) return;

			let oSelectedMaterial = oContext.getObject();
			let material = oSelectedMaterial.Material;
			let Redelivery_Point = oSelectedMaterial.Redelivery_Point;

			const sPath = `/getContractDetail?DocNo=${sContract.DocNo}&Material=${material}&Redelivery_Point=${Redelivery_Point}`;
			console.log("sPath", sPath);

			let oModelgetCust = this.getOwnerComponent().getModel();
			let oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});

			try {
				const oData = await oBindinggetCust.requestObject();
				console.log("Fetched Data:", oData.value);

				let oNewJsonModel = new sap.ui.model.json.JSONModel(oData.value[0]);
				this.getView().setModel(oNewJsonModel, "contDataModel");

				this._updateRedeliveryData(oData.value[0]);
				this._updateDeliveryData(oData.value[0]);

			} catch (error) {
				console.error("Error fetching contract details:", error);
			}
		},
		onSelectMaterial: async function (oEvent) {
			let oSelectedItem = oEvent.getSource();
			let oContext = oSelectedItem.getBindingContext("materialModel");
			if (!oContext) return;
		
			let oSelectedMaterial = oContext.getObject();
			let material = String(oSelectedMaterial.Material); // Ensure Material is a string
			let Redelivery_Point = String(oSelectedMaterial.Redelivery_Point); // Ensure Redelivery_Point is a string
			let sDocNo = String(sContract.DocNo); // Ensure DocNo is a string
		
			const sPath = `/getContractDetail?DocNo='${encodeURIComponent(sDocNo)}'&Material='${encodeURIComponent(material)}'&Redelivery_Point='${encodeURIComponent(Redelivery_Point)}'`;
			console.log("sPath", sPath);
		
			let oModelgetCust = this.getOwnerComponent().getModel();
			let oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});
		
			try {
				const oData = await oBindinggetCust.requestObject();
				console.log("Fetched Data:", oData.value);
		
				let oNewJsonModel = new sap.ui.model.json.JSONModel(oData.value[0]);
				this.getView().setModel(oNewJsonModel, "contDataModel");
		
				this._updateRedeliveryData(oData.value[0]);
				this._updateDeliveryData(oData.value[0]);
		
			} catch (error) {
				console.error("Error fetching contract details:", error);
			}
		},
		

		// to show redilivery data
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
		// to show delivery data 
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
		// Utility to delay function execution
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
		
			oModel.setProperty("/dpCummDNQ", sValue ? sValue + "MBT" : "");
		
			let oContractData = oView.getModel("contDataModel").getData();
			let maxDCQ = this._getClauseValue(oContractData.data, "Max DP DCQ");
			let minDCQ = this._getClauseValue(oContractData.data, "Min DP DCQ");
		
			let valueMap = {
				"DNQ": dnqValue,
				"Max DCQ": maxDCQ,
				"Min DCQ": minDCQ
			};
		
			if (this._validationTimeout) {
				clearTimeout(this._validationTimeout);
			}
		
			if (sValue === "") {
				this._lastValidatedValue = null;
				return; // Skip validation if field is empty
			}
		
			if (!this._lastValidatedValue || this._lastValidatedValue !== sValue) {
				this._lastValidatedValue = sValue;
		
				this._validationTimeout = setTimeout(async () => {
					if (sValue.length >= 1) { 
						try {
							await HelperFunction.validateDNQ(oView, valueMap, customerValue);
						} catch (err) {
							console.error("Validation failed:", err);
						} finally {
							this._validationTimeout = null;
						}
					}
				}, 1000); // Debounce time (1000ms)
			}
		},
	
		OnReDeliveryDNQValidation: function (oEvent) {
			let sValue = oEvent.getParameter("value").trim();
			let dnqValue = parseFloat(sValue) || 0;
			let oView = this.getView();
			let oModel = oView.getModel("localModel");
		
			oModel.setProperty("/rdpCummDNQ", sValue ? sValue + "MBT" : "");
		
			let oContractData = oView.getModel("contDataModel").getData();
			let maxRDPDCQ = this._getClauseValue(oContractData.data, "Max RDP DCQ");
			let minRDPDCQ = this._getClauseValue(oContractData.data, "Min RDP DCQ");
		
			let valueMap = {
				"DNQ": dnqValue,
				"Max RDP DCQ": maxRDPDCQ,
				"Min RDP DCQ": minRDPDCQ
			};
		
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
							let isValid = await HelperFunction.validateDNQ(oView, valueMap, customerValue);
							if (!isValid) {
								oEvent.getSource().setValue(""); 
							}
						} catch (err) {
							console.error("Validation failed:", err);
							oEvent.getSource().setValue(""); 
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






		calculateDCQStatsByLabels: function (dynamicArray, label) {
			if (dynamicArray.length === 0) {
				return;
			}
			for (let index = 0; index < dynamicArray.length; index++) {
				const minMaxDcqVal = dynamicArray[index].value;
				maxDCQVal = Math.max(maxDCQVal, minMaxDcqVal);
				minDCQVal = Math.min(minDCQVal, minMaxDcqVal);

			}
			remainingDCQ = maxDCQVal;
		},

		onSelectedDate: function () {
			var oDatePicker = this.getView().byId("IdPubNomGasDayPicker");
			var sDate = oDatePicker.getDateValue();
			console.log("sDate", sDate);

		},

		onChangeAddDecimal: function (oEvent) {
			var oInput = oEvent.getSource(); // Get Input field
			var sValue = oInput.getValue().trim(); // Trim spaces
			var fValue = parseFloat(sValue); // Convert to float

			if (!sValue) {
				oInput.setValue("0.000");
				return;
			}

			if (!isNaN(fValue)) {
				var sFormattedValue = fValue.toFixed(3);
				oInput.setValue(sFormattedValue);

				var sPath = oInput.getBinding("value") ? oInput.getBinding("value").getPath() : null;
				var oModel = oInput.getModel();

				if (oModel && sPath) {
					oModel.setProperty(sPath, sFormattedValue);
				}
			} else {
				oInput.setValue("0.000");
			}
		},


		createNomination: async function () {
			try {
				let Gasday = this.getView().byId("IdPubNomGasDayPicker").getDateValue();
				const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
				Gasday = oDateFormat.format(Gasday);

				if (!Gasday) {
					sap.m.MessageBox.error("Please select a Gas Day!");
					return;
				}

				const oModelDataRedlv = this.getView().getModel("RedlvModelData").getData();
				const oModelDataDelv = this.getView().getModel("DelvModelData").getData();
				const selectedMaterialData = this.getView().getModel("contDataModel").getData();

				let nomi_toitem = [];

				if (selectedMaterialData.Delivery_Point) {
					nomi_toitem.push({
						Gasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "20",
						Versn: "",
						DeliveryPoint: selectedMaterialData.Delivery_Point,
						RedelivryPoint: "",
						ValidTo: oModelDataDelv.DeliveryPoints[0].ToT,
						ValidFrom: oModelDataDelv.DeliveryPoints[0].FromT,
						Material: selectedMaterialData.Material,
						Kunnr: "",
						Auart: "ZGSA",
						Ddcq: selectedMaterialData.Delivery_Dcq,
						Uom1: oModelDataDelv.DeliveryPoints[0].UOM,
						Pdnq: oModelDataDelv.DeliveryPoints[0].DNQ,
						Event: oModelDataDelv.DeliveryPoints[0].Event,
						Adnq: "0.000",
						Znomtk: "",
						Src: "",
						Remarks: "",
						Flag: "",
						Action: "",
						Path: "",
						CustGrp: "",
						SrvProfile: "",
					});

					nomi_toitem.push({
						Gasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "10",
						Versn: "",
						DeliveryPoint: "",
						RedelivryPoint: selectedMaterialData.Redelivery_Point,
						ValidTo: oModelDataRedlv.RedeliveryPoints[0].ToT,
						ValidFrom: oModelDataRedlv.RedeliveryPoints[0].FromT,
						Material: selectedMaterialData.Material,
						Kunnr: "",
						Auart: "ZGSA",
						Ddcq: "0.000",
						Rdcq: selectedMaterialData.Redelivery_Dcq,
						Uom1: oModelDataRedlv.RedeliveryPoints[0].UOM,
						Event: oModelDataRedlv.RedeliveryPoints[0].Event,
						Adnq: "0.000",
						Rpdnq: oModelDataRedlv.RedeliveryPoints[0].DNQ,
						Znomtk: "",
						Src: "",
						Remarks: "",
						Flag: "",
						Action: "",
						Path: "",
						CustGrp: "",
						SrvProfile: "",
					});
				} else {
					nomi_toitem.push({
						Gasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "10",
						Versn: "",
						DeliveryPoint: "",
						RedelivryPoint: selectedMaterialData.Redelivery_Point,
						ValidTo: oModelDataRedlv.RedeliveryPoints[0].ToT,
						ValidFrom: oModelDataRedlv.RedeliveryPoints[0].FromT,
						Material: selectedMaterialData.Material,
						Kunnr: "",
						Auart: "ZGSA",
						Ddcq: "0.000",
						Rdcq: selectedMaterialData.Redelivery_Dcq,
						Uom1: oModelDataRedlv.RedeliveryPoints[0].UOM,
						Event: oModelDataRedlv.RedeliveryPoints[0].Event,
						Adnq: "0.000",
						Rpdnq: oModelDataRedlv.RedeliveryPoints[0].DNQ,
						Znomtk: "",
						Src: "",
						Remarks: "",
						Flag: "",
						Action: "",
						Path: "",
						CustGrp: "",
						SrvProfile: "",
					});
				}

				console.log("nomi_toitem", nomi_toitem);

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