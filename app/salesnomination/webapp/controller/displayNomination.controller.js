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
	let customerValue;

	return Controller.extend("com.ingenx.nomination.salesnomination.controller.displayNomination", {

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
					FromT: "",
					ToT: "",
					Event: ""
				}]
			};

			const initialRelDelvData = {
				RedeliveryPoints: [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "",
					ToT: "",
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
					FromT: "",
					ToT: "",
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


		onSelectMaterial1: async function (oEvent) {
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
						item.DNQ = oData.value[0].rediliveryDNQ;
						item.UOM = "MBT";
						item.FromT = oData.value[0].Redelivery_ValidFrom;
						item.ToT = oData.value[0].Redelivery_ValidTo;
						item.Event = oData.value[0].redeliveryEvent;

					});
					oRedlvModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
				}

				const hasDeliveryDcq = !!(oData.value[0].Delivery_Point && oData.value[0].Delivery_Point.trim());
				if (hasDeliveryDcq) {
					var oDelvModel = this.getView().getModel("DelvModelData");
					var aDeliveryPoints = oDelvModel.getProperty("/DeliveryPoints") || [];
					const oView = this.getView();

					["IdRePubNomStaticListS", "IdRePubNomContratRPDCQ", "IdRePubNomContractDPDCQ", "IdRePubNomDelPointTable", "IdRePubNomTableHeaderBarForDelv"].forEach(id => {
						oView.byId(id).setVisible(true);
					});

					["IdRePubNomContractRPDCQ", "IdRePubNomStaticListfinal"].forEach(id => {
						oView.byId(id).setVisible(false);
					});



					aDeliveryPoints.forEach(item => {
						item.DeliveryPt = oData.value[0].Delivery_Point;
						item.UOM = "MBT";
						item.DNQ = oData.value[0].deliveryDNQ;
						item.FromT = oData.value[0].Delivery_ValidFrom;
						item.ToT = oData.value[0].Delivery_ValidTo;
						item.Event = oData.value[0].deliveryEvent;
					});

					oDelvModel.setProperty("/DeliveryPoints", aDeliveryPoints);
				}

			} catch (error) {
				console.log("error", error);
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
		
			// Reusable BusyDialog setup
			if (!this._oBusyDialog) {
				this._oBusyDialog = new sap.m.BusyDialog({
					title: "Please wait",
					text: "Loading nomination details..."
				});
			}
			this._oBusyDialog.open();
		
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
		
				// Redelivery Section
				const hasRedeliveryDcq = oData.value[0].Redelivery_Point && oData.value[0].Redelivery_Point.trim() !== "";
				if (hasRedeliveryDcq) {
					this.getView().byId("IdRePubNomContractRPDCQ").setVisible(true);
					var oRedlvModel = this.getView().getModel("RedlvModelData");
					var aRedeliveryPoints = oRedlvModel.getProperty("/RedeliveryPoints") || [];
		
					aRedeliveryPoints.forEach(item => {
						item.RedeliveryPt = oData.value[0].Redelivery_Point;
						item.DNQ = oData.value[0].rediliveryDNQ;
						item.UOM = "MBT";
						item.FromT = oData.value[0].Redelivery_ValidFrom;
						item.ToT = oData.value[0].Redelivery_ValidTo;
						item.Event = oData.value[0].redeliveryEvent;
					});
					oRedlvModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
				}
		
				// Delivery Section
				const hasDeliveryDcq = !!(oData.value[0].Delivery_Point && oData.value[0].Delivery_Point.trim());
				if (hasDeliveryDcq) {
					var oDelvModel = this.getView().getModel("DelvModelData");
					var aDeliveryPoints = oDelvModel.getProperty("/DeliveryPoints") || [];
					const oView = this.getView();
		
					["IdRePubNomStaticListS", "IdRePubNomContratRPDCQ", "IdRePubNomContractDPDCQ", "IdRePubNomDelPointTable", "IdRePubNomTableHeaderBarForDelv"].forEach(id => {
						oView.byId(id).setVisible(true);
					});
		
					["IdRePubNomContractRPDCQ", "IdRePubNomStaticListfinal"].forEach(id => {
						oView.byId(id).setVisible(false);
					});
		
					aDeliveryPoints.forEach(item => {
						item.DeliveryPt = oData.value[0].Delivery_Point;
						item.UOM = "MBT";
						item.DNQ = oData.value[0].deliveryDNQ;
						item.FromT = oData.value[0].Delivery_ValidFrom;
						item.ToT = oData.value[0].Delivery_ValidTo;
						item.Event = oData.value[0].deliveryEvent;
					});
		
					oDelvModel.setProperty("/DeliveryPoints", aDeliveryPoints);
				}
		
			} catch (error) {
				console.error("Error while fetching nomination data:", error);
			} finally {
				// Always close BusyDialog
				if (this._oBusyDialog) {
					this._oBusyDialog.close();
				}
			}
		}
		
















	});
});