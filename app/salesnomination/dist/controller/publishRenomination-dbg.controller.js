sap.ui.define([
	'sap/ui/Device',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library',
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"external/ChartJSAdapterDateFns",
	"external/ChartJS",
	'com/ingenx/nomination/salesnomination/utils/HelperFunction',
], function (Device, Fragment, Controller, JSONModel, Popover, Button, mobileLibrary, FeedItem, FlattenedDataset, MessageBox, MessageToast, ChartJSAdapterDateFns, ChartJS, HelperFunction) {
	"use strict";
	let selectedGasDay = undefined;
	let selectedContract = undefined
	let oView;
	let sContract
	let customerValue;

	return Controller.extend("com.ingenx.nomination.salesnomination.controller.publishRenomination", {

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
			var oModel = new sap.ui.model.json.JSONModel({ CummDNQ: "" });
			this.getView().setModel(oModel, "localModel");

			const oDatePicker = this.byId("IdRePubNomGasDayPicker");

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

			// MessageToast.show(sMessage);
		},

		onInnerContainerResize: function (oEvent) {
			var aOldSizes = oEvent.getParameter("oldSizes"),
				aNewSizes = oEvent.getParameter("newSizes"),
				sMessage = "Inner container is resized.";

			if (aOldSizes && aOldSizes.length) {
				sMessage += "\nOld panes sizes = [" + aOldSizes + "]";
			}

			sMessage += "\nNew panes sizes = [" + aNewSizes + "]";

			// MessageToast.show(sMessage);
		},

		// nomination**********************************************************************************

		onLoadContractModel: async function () {

			let salesContract = new sap.ui.model.json.JSONModel();
			oView.setModel(salesContract, "salesContractData");
		},

		soldToPartyValueHelp: async function (oEvent) {
			try {
				let sDialogId = "_soldTopartySelectDialog";
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
				oView.byId("pubNom_Contracts").setBusy(true);

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
					this.byId("datePicker").setVisible(true);
				}
			} catch (error) {
				console.error("Unexpected error:", error.message || error);
				sap.m.MessageBox.error("An unexpected error occurred. Please try again.");
			} finally {
				oView.byId("pubNom_Contracts").setBusy(false);
				if (this._customerSelectDialog) {
					let oBinding = this._customerSelectDialog.getBinding("items");
					if (oBinding) {
						oBinding.filter([]);
					}
				}
			}
		},




		onValueHelpSearchSTP: function (oEvent) {
			HelperFunction._valueHelpLiveSearch(oEvent, "Customer", "soldToParty", this);
		},

		onBackMat: function () {
			try {
				this.byId("IdRePubNomStaticListS").setVisible(false);
				this.byId("IdRePubNomContractRPDCQ").setVisible(true);
				this.byId("IdRePubNomStaticListfinal").setVisible(true);


				var OvboxC = this.byId("VboxCon");
				OvboxC.setVisible(true);
				var OvboxM = this.byId("VboxMat");
				OvboxM.setVisible(false);


				// Hide Delivery Point Table and Header
				const oDeliveryDNQTable = this.byId("IdRePubNomDelPointTable");
				if (oDeliveryDNQTable) {
					oDeliveryDNQTable.setVisible(false);
					this.byId("IdRePubNomTableHeaderBarForDelv").setVisible(false);
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
		refreshModels: function (models) {
			models.forEach(model => {
				if (model) {
					model.refresh(true); // true to force refresh
				}
			});
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

			if (oMaterialWiseContractData) {
				oMaterialWiseContractData.setData({}); // Clear contract data
			}

			// Refresh the model bindings if they exist
			const oGasDayPicker = this.byId("IdRePubNomGasDayPicker");
			if (oGasDayPicker) {
				oGasDayPicker.setValue(""); // Clear the selected date
			}
			this.byId("IdDelCummDNQInput").setValue("");
			this.byId("IdCummDNQInput").setValue("");
			this.byId("IdRePubNomStaticListS").setVisible(false);
			this.byId("IdRePubNomContractRPDCQ").setVisible(true);
			this.byId("IdRePubNomStaticListfinal").setVisible(true);

			this.refreshModels([
				oMaterialWiseContractData,
				oMaterialWiseModelData,
				oReDelvNomDCQTableData,
				oDelvNomDCQTableData
			]);
		},

		onSelectContract: function (oEvent) {

			selectedContract = oEvent.getSource().getBindingContext("newModelForContracts").getObject();
			selectedContract = selectedContract.DocNo
			this.fetchNominationsDetails(selectedContract, selectedGasDay);
		},

		onSelectGasDay: function (oEvent) {
			const oDatePicker = oView.byId("datePicker"); // Get the DatePicker control	
			// Check if a date is selected
			let oDate = oDatePicker.getDateValue();
			if (oDate) {
				const oFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "yyyy-MM-dd" // Note: Use "MM" for month and "dd" for day
				});
				selectedGasDay = oFormat.format(oDate);
				console.log("Selected Date in format YYYY:mm:DD: ", oDate);
			}
			this.fetchNominationsDetails(selectedContract, selectedGasDay);
		},

		// ON SELECT ITEM FROM LIST
		fetchNominationsDetails: async function (selectedContract, selectedGasDay) {

			if (!selectedContract) {
				sap.m.MessageToast.show("Please select a contract.");
				return;
			}
			if (!selectedGasDay) {
				sap.m.MessageToast.show("Please select a date before choosing a contract.");
				return;
			}
			const oView = this.getView();
			const oContractsControl = oView.byId("pubNom_Contracts");
			const oVboxCon = oView.byId("VboxCon");
			const oVboxMat = oView.byId("VboxMat");


			oContractsControl.setBusy(true);
			oVboxCon.setVisible(false);
			oVboxMat.setVisible(true);
			let oModel = this.getOwnerComponent().getModel();
			try {
				const sPath = `/getContractMatDetailsByGasday?DocNo='${encodeURIComponent(selectedContract)}'&Gasday=${encodeURIComponent(selectedGasDay)}`;

				// Bind the list and fetch data with error handling
				const oBindList = oModel.bindList(sPath);
				const aContexts = await oBindList.requestContexts(0, Infinity);

				// Map the fetched contexts to objects
				const aContracts = aContexts.map(oContext => oContext.getObject());
				console.log("aContracts", aContracts);

				if (!aContracts || aContracts.length === 0) {
					sap.m.MessageToast.show("No nominations found for the selected contract.");
					return;
				}

				// Update the material model with the fetched data
				let oMaterialModel = oView.getModel("materialModel");
				if (!oMaterialModel) {
					oMaterialModel = new sap.ui.model.json.JSONModel();
					oView.setModel(oMaterialModel, "materialModel");
				}
				oMaterialModel.setProperty("/selectedMaterials", aContracts);

			} catch (oError) {
				// Log the error and show a user-friendly message
				console.error("Error fetching contract details:", oError.message || oError);
				sap.m.MessageBox.error("Failed to fetch contract details. Please try again later.");
			} finally {
				// Ensure the busy indicator is turned off
				oContractsControl.setBusy(false);
			}
		},
		fetchNominationsDetails2: async function (selectedContract, selectedGasDay) {

			if (!selectedContract) {
				sap.m.MessageToast.show("Please select a contract.");
				return;
			}
			if (!selectedGasDay) {
				sap.m.MessageToast.show("Please select a date before choosing a contract.");
				return;
			}
		
			const oView = this.getView();
			const oContractsControl = oView.byId("pubNom_Contracts");
			const oVboxCon = oView.byId("VboxCon");
			const oVboxMat = oView.byId("VboxMat");
		
			oContractsControl.setBusy(true);
			oVboxCon.setVisible(false);
			oVboxMat.setVisible(true);
		
			let oModel = this.getOwnerComponent().getModel();
		
			try {
				// Ensure DocNo is a string
				let sDocNo = encodeURIComponent(String(selectedContract)); 
				
				// Ensure Gasday is a valid date string
				let oGasDay = new Date(selectedGasDay);
				if (isNaN(oGasDay.getTime())) {
					sap.m.MessageToast.show("Invalid date format. Please select a valid date.");
					return;
				}
				let sGasDay = encodeURIComponent(oGasDay.toISOString().split("T")[0]); // Format as YYYY-MM-DD
		
				// Construct API path
				const sPath = `/getContractMatDetailsByGasday?DocNo='${sDocNo}'&Gasday=${sGasDay}`;
				console.log("sPath", sPath);
		
				// Fetch data
				const oBindList = oModel.bindList(sPath);
				const aContexts = await oBindList.requestContexts(0, Infinity);
		
				const aContracts = aContexts.map(oContext => oContext.getObject());
				console.log("aContracts", aContracts);
		
				if (!aContracts || aContracts.length === 0) {
					sap.m.MessageToast.show("No nominations found for the selected contract.");
					return;
				}
		
				// Update the material model
				let oMaterialModel = oView.getModel("materialModel");
				if (!oMaterialModel) {
					oMaterialModel = new sap.ui.model.json.JSONModel();
					oView.setModel(oMaterialModel, "materialModel");
				}
				oMaterialModel.setProperty("/selectedMaterials", aContracts);
		
			} catch (oError) {
				console.error("Error fetching contract details:", oError.message || oError);
				sap.m.MessageBox.error("Failed to fetch contract details. Please try again later.");
			} finally {
				oContractsControl.setBusy(false);
			}
		},
		

		debounce: function (fn, delay) {
			let timer;
			return function (...args) {
				clearTimeout(timer);
				timer = setTimeout(() => fn.apply(this, args), delay);
			};
		},
		_getClauseValue: function (data, clauseCode) {
			let clause = data.find(item => item.Clause_Code === clauseCode);
			return clause ? parseFloat(clause.Calculated_Value) || 0 : 0;
		},


		OnDeliveryDNQValidation: function (oEvent) {

			let sValue = oEvent.getParameter("value").trim();
			let dnqValue = parseFloat(sValue) || 0;
			let oView = this.getView();

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

			oModel.setProperty("/CummDNQ", sValue ? sValue + "MBT" : "");

			let oContractData = oView.getModel("contDataModel").getData();
			let maxRDPDCQ = this._getClauseValue(oContractData.data, "Max RDP DCQ");
			let minRDPDCQ = this._getClauseValue(oContractData.data, "Min RDP DCQ");

			let valueMap = {
				"DNQ": dnqValue,
				"Max DCQ": maxRDPDCQ,
				"Min DCQ": minRDPDCQ
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




		onSelectMaterial: async function (oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("materialModel");
			if (oContext) {
				var oSelectedMaterial = oContext.getObject();

				var material = oSelectedMaterial.Material;
				var Redelivery_Point = oSelectedMaterial.RedelivryPoint;
			}

			const sPath = `/getRenominationContractData?DocNo='${selectedContract}'&Material='${material}'&Redelivery_Point='${Redelivery_Point}'&Gasday=${selectedGasDay}`;
			console.log("sPath", sPath);

			let oModelgetCust = this.getOwnerComponent().getModel();
			const oBindinggetCust = oModelgetCust.bindContext(sPath, null, {});
			try {
				const oData = await oBindinggetCust.requestObject();
				console.log("Fetched Data:", oData.value);

				const oNewJsonModel = new sap.ui.model.json.JSONModel(oData.value[0]);
				this.getView().setModel(oNewJsonModel, "contDataModel");
				var oLocalModel = this.getView().getModel("localModel");
				var redeliveryDNQ = oData.value[0].Rpdnq || "0.000";
				var uom = "MBT";
				oLocalModel.setProperty("/CummDNQ", redeliveryDNQ + " " + uom);


				const oDatePicker = this.getView().byId("IdRePubNomGasDayPicker");
				if (selectedGasDay) {
					const oFormattedDate = new Date(selectedGasDay);
					oDatePicker.setDateValue(oFormattedDate);

				} else {
					oDatePicker.setVisible(false);
				}

				const hasRedeliveryDcq = oData.value[0].Redelivery_Point && oData.value[0].Redelivery_Point.trim() !== "";
				if (hasRedeliveryDcq) {
					this.getView().byId("IdRePubNomContractRPDCQ").setVisible(true);
					var oRedlvModel = this.getView().getModel("RedlvModelData");
					var aRedeliveryPoints = oRedlvModel.getProperty("/RedeliveryPoints") || [];

					aRedeliveryPoints.forEach(item => {
						item.RedeliveryPt = oData.value[0].Redelivery_Point;
						item.DNQ = oData.value[0].Rpdnq;
						item.UOM = "MBT";
						item.FromT = oData.value[0].Redelivery_ValidFrom;
						item.ToT = oData.value[0].Redelivery_ValidTo;
						item.Event = oData.value[0].Event;

					});
					oRedlvModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
				}

				const hasDeliveryDcq = !!(oData.value[0].Delivery_Point && oData.value[0].Delivery_Point.trim());
				if (hasDeliveryDcq) {
					var oDelvModel = this.getView().getModel("DelvModelData");
					var aDeliveryPoints = oDelvModel.getProperty("/DeliveryPoints") || [];
					this.getView().byId("IdRePubNomStaticListS").setVisible(true);
					this.getView().byId("IdRePubNomContratRPDCQ").setVisible(true);
					this.getView().byId("IdRePubNomContractDPDCQ").setVisible(true);

					this.getView().byId("IdRePubNomContractRPDCQ").setVisible(false);
					this.getView().byId("IdRePubNomStaticListfinal").setVisible(false);
					this.getView().byId("IdRePubNomDelPointTable").setVisible(true);

					aDeliveryPoints.forEach(item => {
						item.DeliveryPt = oData.value[0].Delivery_Point;
						item.UOM = "MBT";
						item.DNQ = oData.value[0].Pdnq;
						item.FromT = oData.value[0].Delivery_ValidFrom;
						item.ToT = oData.value[0].Delivery_ValidTo;
						item.Event = oData.value[0].Event;
					});

					oDelvModel.setProperty("/DeliveryPoints", aDeliveryPoints);
				}

			} catch (error) {
				console.log("error", error);
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

			// const dnqValue = this.getView().byId("dnqGSA").getValue();
			// const gasDay = this.getView().byId("selectedDate").getDateValue(); 

			// sap.ui.getCore().getEventBus().publish("chartUpdate", "addDNQPoint", {
			// 	dnq: Number(dnqValue),
			// 	gasDay: gasDay
			// });
		},



		
		updateNomination: async function () {
			let oBusyDialog = new sap.m.BusyDialog();
		
			try {
				oBusyDialog.open(); // Show Busy Dialog
		
				let Gasday = this.getView().byId("IdRePubNomGasDayPicker").getDateValue();
				if (!Gasday) {
					sap.m.MessageBox.error("Please select a Gas Day!");
					oBusyDialog.close();
					return;
				}
		
				const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
				let formattedGasday = oDateFormat.format(Gasday);
		
				// Fetch models
				const oModelDataRedlv = this.getView().getModel("RedlvModelData").getData();
				const oModelDataDelv = this.getView().getModel("DelvModelData").getData();
				const selectedMaterialData = this.getView().getModel("contDataModel").getData();
		
				let nomi_toitem = [];
		
				if (selectedMaterialData.Delivery_Point) {
					nomi_toitem.push({
						Gasday: formattedGasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "20",
						DeliveryPoint: selectedMaterialData.Delivery_Point,
						RedelivryPoint: "",
						ValidTo: oModelDataDelv.DeliveryPoints[0]?.ToT || "",
						ValidFrom: oModelDataDelv.DeliveryPoints[0]?.FromT || "",
						Material: selectedMaterialData.Material,
						Auart: "ZGSA",
						Ddcq: selectedMaterialData.Delivery_Dcq || 0.000,
						Uom1: oModelDataDelv.DeliveryPoints[0]?.UOM || "",
						Pdnq: oModelDataDelv.DeliveryPoints[0]?.DNQ 
							  && !isNaN(oModelDataDelv.DeliveryPoints[0]?.DNQ) 
							  ? parseFloat(oModelDataDelv.DeliveryPoints[0]?.DNQ) 
							  : 0.000,
						Event: oModelDataDelv.DeliveryPoints[0]?.Event || "",
						Adnq: 0.000,
						Rpdnq: 0.000, // No redelivery value for this entry
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
						Gasday: formattedGasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "10",
						DeliveryPoint: "",
						RedelivryPoint: selectedMaterialData.Redelivery_Point,
						ValidTo: oModelDataRedlv.RedeliveryPoints[0]?.ToT || "",
						ValidFrom: oModelDataRedlv.RedeliveryPoints[0]?.FromT || "",
						Material: selectedMaterialData.Material,
						Auart: "ZGSA",
						Ddcq: 0.000,
						Rdcq: selectedMaterialData.Redelivery_Dcq || 0.000,
						Uom1: oModelDataRedlv.RedeliveryPoints[0]?.UOM || "",
						Event: oModelDataRedlv.RedeliveryPoints[0]?.Event || "",
						Adnq: 0.000,
						Rpdnq: oModelDataRedlv.RedeliveryPoints[0]?.DNQ 
							   && !isNaN(oModelDataRedlv.RedeliveryPoints[0]?.DNQ) 
							   ? parseFloat(oModelDataRedlv.RedeliveryPoints[0]?.DNQ) 
							   : 0.000,
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
						Gasday: formattedGasday,
						Vbeln: selectedMaterialData.DocNo,
						ItemNo: "10",
						NomItem: "10",
						DeliveryPoint: "",
						RedelivryPoint: selectedMaterialData.Redelivery_Point,
						ValidTo: oModelDataRedlv.RedeliveryPoints[0]?.ToT || "",
						ValidFrom: oModelDataRedlv.RedeliveryPoints[0]?.FromT || "",
						Material: selectedMaterialData.Material,
						Auart: "ZGSA",
						Ddcq: 0.000,
						Rdcq: selectedMaterialData.Redelivery_Dcq || 0.000,
						Uom1: oModelDataRedlv.RedeliveryPoints[0]?.UOM || "",
						Event: oModelDataRedlv.RedeliveryPoints[0]?.Event || "",
						Adnq: 0.000,
						Rpdnq: oModelDataRedlv.RedeliveryPoints[0]?.DNQ 
							   && !isNaN(oModelDataRedlv.RedeliveryPoints[0]?.DNQ) 
							   ? parseFloat(oModelDataRedlv.RedeliveryPoints[0]?.DNQ) 
							   : 0.000,
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
		
				// **Get OData Model**
				var oModel = this.getOwnerComponent().getModel();
				if (!oModel) {
					throw new Error("OData V4 model not found.");
				}
		
				// **Bind Context to OData Action**
				let sAction = "/updateNomination";
				const oContext = oModel.bindContext(`${sAction}(...)`, undefined);
		
				// **Set Payload as a Parameter**
				oContext.setParameter("nominations", nomi_toitem);
		
				// **Execute Action**
				await oContext.execute();
		
				// **Success Message**
				sap.m.MessageToast.show("Nomination updated successfully!");
			} catch (error) {
				console.error("Error updating nomination:", error);
				sap.m.MessageBox.error("Failed to update nomination. Please try again.");
			} finally {
				oBusyDialog.close(); // Ensure busy dialog is closed in all cases
			}
		},
		
		
		
	
		
		
		

















		// createNomination: async function () {
		// 	// Get the Gasday value from the DatePicker
		// 	let Gasday = this.getView().byId("IdPubReNomGasDatePicker").getDateValue();
		// 	const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
		// 		pattern: "yyyy-MM-dd"
		// 	});
		// 	Gasday = oDateFormat.format(Gasday);

		// 	// Validate Gasday
		// 	if (!Gasday) {
		// 		sap.m.MessageBox.error("Please select a Gas Day!");
		// 		return;
		// 	}

		// 	// Retrieve model data
		// 	const oModelDataRedlv = this.getView().getModel("RedlvModelData").getData();
		// 	const oModelDataDelv = this.getView().getModel("DelvModelData").getData();
		// 	const selectedMaterialData = this.getView().getModel("modelData").getData();
		// 	console.log("oModelDataRedlv ", oModelDataRedlv);
		// 	console.log("selectedMaterialData ", selectedMaterialData);

		// 	let nomi_toitem = [];
		// 	let counter = 0;
		// 	// Populate the nomi_toitem array
		// 	for (let i = 0; i < oModelDataRedlv.RedeliveryPoints.length; i++) {
		// 		let intradayNom = {
		// 			"Gasday": Gasday,
		// 			"Vbeln": selectedMaterialData.Vbeln,
		// 			"ItemNo": selectedMaterialData.ItemNo,
		// 			"NomItem": (10 + i).toString(), // Generate NomItem
		// 			"Versn": "",
		// 			"DeliveryPoint": "",
		// 			"RedelivryPoint": oModelDataRedlv.RedeliveryPoints[i].RedeliveryPt,
		// 			"ValidTo": oModelDataRedlv.RedeliveryPoints[i].ToT,
		// 			"ValidFrom": oModelDataRedlv.RedeliveryPoints[i].FromT,
		// 			"Material": selectedMaterialData.Material,
		// 			"Kunnr": "",
		// 			"Auart": selectedMaterialData.Auart,
		// 			"Ddcq": "0.000",
		// 			"Rdcq": "0.000",
		// 			"Uom1": oModelDataRedlv.RedeliveryPoints[i].UOM,
		// 			"Pdnq": oModelDataRedlv.RedeliveryPoints[i].DNQ,
		// 			"Event": oModelDataRedlv.RedeliveryPoints[i].Event,
		// 			"Adnq": "0.000",
		// 			"Rpdnq": "0.000",
		// 			"Znomtk": "",
		// 			"Src": "",
		// 			"Remarks": "",
		// 			"Flag": "",
		// 			"Action": "",
		// 			"Path": "",
		// 			"CustGrp": "",
		// 			"SrvProfile": "",
		// 		};
		// 		counter = i;
		// 		nomi_toitem.push(intradayNom);
		// 	}
		// 	counter++
		// 	for (let i = 0; i < oModelDataDelv.DeliveryPoints.length; i++) {
		// 		if (oModelDataDelv.DeliveryPoints[i].DeliveryPt == "" || oModelDataDelv.DeliveryPoints[i].DNQ == "") {
		// 			break;
		// 		}
		// 		let intradayNom = {
		// 			"Gasday": Gasday,
		// 			"Vbeln": selectedMaterialData.Vbeln,
		// 			"ItemNo": selectedMaterialData.ItemNo,
		// 			"NomItem": (10 + counter + i).toString(), // Generate NomItem
		// 			"Versn": "",
		// 			"DeliveryPoint": oModelDataDelv.DeliveryPoints[i].DeliveryPt,
		// 			"RedelivryPoint": "",
		// 			"ValidTo": oModelDataDelv.DeliveryPoints[i].ToT,
		// 			"ValidFrom": oModelDataDelv.DeliveryPoints[i].FromT,
		// 			"Material": selectedMaterialData.Material,
		// 			"Kunnr": "",
		// 			"Auart": selectedMaterialData.Auart,
		// 			"Ddcq": "0.000",
		// 			"Rdcq": "0.000",
		// 			"Uom1": oModelDataDelv.DeliveryPoints[i].UOM,
		// 			"Pdnq": oModelDataDelv.DeliveryPoints[i].DNQ,
		// 			"Event": oModelDataDelv.DeliveryPoints[i].Event,
		// 			"Adnq": "0.000",
		// 			"Rpdnq": "0.000",
		// 			"Znomtk": "",
		// 			"Src": "",
		// 			"Remarks": "",
		// 			"Flag": "",
		// 			"Action": "",
		// 			"Path": "",
		// 			"CustGrp": "",
		// 			"SrvProfile": "",
		// 		};
		// 		nomi_toitem.push(intradayNom);
		// 	}

		// 	let createNomPayLoad = {
		// 		"Gasday": Gasday,
		// 		"Vbeln": selectedMaterialData.Vbeln,
		// 		nomi_toitem: nomi_toitem
		// 	};
		// 	console.log("createNomPayLoad", createNomPayLoad);

		// 	let oModel = this.getOwnerComponent().getModel();
		// 	let oBindList = oModel.bindList("/znom_headSet");

		// 	// Show busy indicator
		// 	sap.ui.core.BusyIndicator.show(0);

		// 	try {
		// 		// Attach the createCompleted event
		// 		oBindList.attachCreateCompleted(this._onCreateCompleted, this);

		// 		// Create the entity and wait for the response
		// 		await oBindList.create(createNomPayLoad, true);
		// 	} catch (error) {
		// 		console.error("Error during create operation:", error);
		// 		MessageBox.error("An error occurred while submitting the nomination. Please try again.");
		// 	}
		// },
		// _onCreateCompleted: function (oEvent) {
		// 	// Hide busy indicator once the operation is complete
		// 	sap.ui.core.BusyIndicator.hide();

		// 	// Check if the operation was successful
		// 	let oParams = oEvent.getParameters();
		// 	if (oParams.success) {
		// 		// If successful, show the success message
		// 		MessageBox.success("Nomination Successfully Submitted");
		// 		this.clearMaterialModels();
		// 	} else {
		// 		// If not successful, handle the error
		// 		console.error("Error during create operation:", oParams.errorMessage);
		// 		MessageBox.error(`An error occurred while submitting the nomination. ${oParams.errorMessage}`);
		// 	}
		// }
	});
});