sap.ui.define([
	'sap/ui/Device',
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
	"external/ChartJS"
], function (Device, Controller, JSONModel, Popover, Button, mobileLibrary, FeedItem, FlattenedDataset, MessageBox, MessageToast, ChartJSAdapterDateFns, ChartJS) {
	"use strict";
	let conDescArray = [];
	let material;
	let purchArray = [];
	var myNominationDataModel = [];
	let selectedVbeln;
	var formattedGasDay;
	let selectedGTAEvent;
	let gasDay;
	let oView;
	let minDCQVal = Number.MAX_SAFE_INTEGER;
	let maxDCQVal = 0;

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

			// Setting MinDate to the GasDay DatePicker
			// const oDatePicker = this.byId("IdPNGasDatePicker");

			// // Calculate the minDate (Current Date + 1)
			// const today = new Date();
			// const tomorrow = new Date(today);
			// tomorrow.setDate(today.getDate() + 1);

			// // Set minDate on the DatePicker
			// oDatePicker.setMinDate(tomorrow);
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

		onTimeChange: function (oEvent) {
			var sNewValue = oEvent.getParameter("value");
			var oModel = this.getView().getModel("RedlvModelData");
			oModel.setProperty(oEvent.getSource().getBinding("value").getPath(), sNewValue);
		},

		onAddPress: function () {
			const oModel = this.getView().getModel("RedlvModelData");
			const aRedeliveryPoints = oModel.getProperty("/RedeliveryPoints");
			
			console.log("aRedeliveryPoints ", aRedeliveryPoints);


			// Add a new blank entry
			aRedeliveryPoints.push({
				RedeliveryPt: aRedeliveryPoints[0].RedeliveryPt,
				DNQ: "",
				UOM: aRedeliveryPoints[0].UOM,
				FromT: "",
				ToT: "",
				Event: ""
			});

			oModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
			this.updateDNQSum();
		},

		onAddRowDlvPress: function () {
			const oModel = this.getView().getModel("DelvModelData");
			const aDeliveryPoints = oModel.getProperty("/DeliveryPoints");
			console.log("aRedeliveryPoints ", aDeliveryPoints);


			// Add a new blank entry
			aDeliveryPoints.push({
				DeliveryPt: aDeliveryPoints[0].DeliveryPt,
				DNQ: "",
				UOM: aDeliveryPoints[0].UOM,
				FromT: "",
				ToT: "",
				Event: ""
			});

			oModel.setProperty("/DeliveryPoints", aDeliveryPoints);
			this.updateDNQSum();
		},

		onDeletePress: function () {
			var oTable = this.byId("IdPubNomRedPointTable");
			var oModel = this.getView().getModel("RedlvModelData");
			var aRedeliveryPoints = oModel.getProperty("/RedeliveryPoints");

			// Get the selected item
			var aSelectedItems = oTable.getSelectedItems();
			if (aSelectedItems.length > 0) {
				var oSelectedItem = aSelectedItems[0];
				var iSelectedIndex = oTable.indexOfItem(oSelectedItem);

				// Ensure that the original row is not deleted
				if (iSelectedIndex > 0) {
					aRedeliveryPoints.splice(iSelectedIndex, 1); // Remove the selected element
				}
			} else if (aRedeliveryPoints.length > 1) {
				aRedeliveryPoints.pop(); // Remove the last element if no selection
			}

			oModel.setProperty("/RedeliveryPoints", aRedeliveryPoints);
			this.updateDNQSum();
		},

		onDeleteRowDlvPress: function () {
			var oTable = this.byId("IdPubNomDelPointTable");
			var oModel = this.getView().getModel("DelvModelData");
			var aDeliveryPoints = oModel.getProperty("/DeliveryPoints");

			// Get the selected item
			var aSelectedItems = oTable.getSelectedItems();
			if (aSelectedItems.length > 0) {
				var oSelectedItem = aSelectedItems[0];
				var iSelectedIndex = oTable.indexOfItem(oSelectedItem);

				// Ensure that the original row is not deleted
				if (iSelectedIndex > 0) {
					aDeliveryPoints.splice(iSelectedIndex, 1); // Remove the selected element
				}
			} else if (aDeliveryPoints.length > 1) {
				aDeliveryPoints.pop(); // Remove the last element if no selection
			}

			oModel.setProperty("/DeliveryPoints", aDeliveryPoints);
			this.updateDNQSum();
		},

		updateDNQSum: function () {
			const oModel = this.getView().getModel("RedlvModelData");
			const aRedeliveryPoints = oModel.getProperty("/RedeliveryPoints");

			let sumDNQ = aRedeliveryPoints.reduce(function (sum, point) {
				return sum + parseFloat(point.DNQ || 0);
			}, 0);

			// Set the calculated sum to a property in the model
			oModel.setProperty("/DNQSum", sumDNQ);
			console.log("sumDNQ", sumDNQ);

		},


		onLoadContractModel: async function () {

			let salesContract = new sap.ui.model.json.JSONModel();
			oView.setModel(salesContract, "salesContractData");

		},

		// SOLD TO PARTY VALUE HELP
		onSoldToParty: function () {

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

		onValueHelpConfirmSTP: async function (oEvent) {
			try {
				let oSelectedItem = oEvent.getParameter("selectedItem");
				if (!oSelectedItem) {
					console.warn("No item selected in value help dialog.");
					return;
				}

				// Get the selected customer's information
				let selectedCustomer = oSelectedItem.getBindingContext().getObject();
				this.byId("IdPubNomSoldToPartyInput").setValue(selectedCustomer.Customer);
				console.log("Selected Customer:", selectedCustomer.Customer);

				let oView = this.getView();
				oView.byId("IdPubNomContractsPage").setBusy(true);

				// Build the path with query parameters
				let path = `/getNominationsByCustomer?DocType=S&Customer=${encodeURIComponent(selectedCustomer.Customer)}`;
				let oModel = this.getOwnerComponent().getModel();
				let batchContexts
				try {

					// Bind list for the current batch
					let oBindList = oModel.bindList(path, null, null, null);
					batchContexts = await oBindList.requestContexts(0, Infinity);
				} catch (error) {
					console.error("Error fetching nominations:", error.message || error);
					oView.byId("IdPubNomContractsPage").setBusy(false);
					return;
				}

				// Process the fetched data
				let contractsByCustomer = batchContexts.map(oContext => oContext.getObject());
				console.log("Fetched Contracts:", contractsByCustomer);

				if (contractsByCustomer.length === 0) {
					console.warn("No nominations found for the selected customer.");
					oView.byId("IdPubNomContractsPage").setBusy(false);
					return;
				}

				// Set the fetched data to the model
				let newModelForContracts = new sap.ui.model.json.JSONModel();
				oView.setModel(newModelForContracts, "newModelForContracts");
				newModelForContracts.setProperty("/data", contractsByCustomer);

				// Refresh the model and UI
				oView.getModel("newModelForContracts").refresh();
				oView.byId("IdPubNomContractsPage").setBusy(false);

			} catch (error) {
				this.getView().byId("IdPubNomContractsPage").setBusy(false);
				console.error("Unexpected error in onValueHelpConfirmSTP:", error.message || error);
			}
		},




		onValueHelpConfirmSTP1: async function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (!oSelectedItem) {
				return;
			}

			// Get the selected customer's information
			let selectedCustomer = oSelectedItem.getBindingContext().getObject();
			this.byId("IdPubNomSoldToPartyInput").setValue(selectedCustomer.Customer);
			console.log("Selected Customer:", selectedCustomer.Customer);

			oView.byId("IdPubNomContractsPage").setBusy(true);
			// Fetch and filter contracts by customer
			await this.filterContractsByCustomer(selectedCustomer.Customer)
				.then(contracts => {
					// If contracts are found, set data in the JSON model

					let newModelForContracts = oView.getModel("newModelForContracts");
					if (!newModelForContracts) {
						newModelForContracts = new sap.ui.model.json.JSONModel();
						oView.setModel(newModelForContracts, "newModelForContracts");
					}
					newModelForContracts.setProperty("/data", contracts[0]);
					console.log("Filtered Contracts:", contracts[0]);
					oView.getModel("newModelForContracts").refresh();
				})
				.catch(error => {
					// Handle errors, such as no contracts found or service issues
					sap.m.MessageBox.error(`Error fetching contracts: ${error.message || "Unknown error occurred"}`);
					console.error("Error fetching contracts:", error);
				});

			// Clear any filters applied to the dialog 
			this._oInfoDialogSTP.getBinding("items").filter([]);

		},

		onContDescLiveChange: function (oEvent) {
			// Get the search value entered by the user
			var sValue = oEvent.getParameter("value");

			// Access the list control
			var oList = this.byId("idlst");

			// Create a filter for the "ContractDescription" property
			var oFilter = new sap.ui.model.Filter("ContractDescription", sap.ui.model.FilterOperator.Contains, sValue);

			// Get the binding of the items in the list
			var oBinding = oList.getBinding("items");

			// Apply the filter to the list binding
			oBinding.filter([oFilter]);

			if (oBinding.getLength() === 0) {
				oList.setNoDataText("No Contracts Found");
			} else {
				oList.setNoDataText("Loading...");
			}

		},


		onBackMat: function () {
			try {
				// Toggle visibility of the Material VBox
				const oMaterialBox = this.byId("IdPubNomVboxMaterials");
				const oContractsBox = this.byId("IdPubNomVboxContracts");

				// Check current visibility and toggle
				const bMaterialVisible = oMaterialBox.getVisible();
				oMaterialBox.setVisible(!bMaterialVisible);
				oContractsBox.setVisible(bMaterialVisible); // Set Contracts VBox to the opposite of Material VBox

				// Hide Delivery Point Table and Header
				const oDeliveryDNQTable = this.byId("IdPubNomDelPointTable");
				if (oDeliveryDNQTable) {
					oDeliveryDNQTable.setVisible(false);
					this.byId("IdPubNomTableHeaderBarForDelv").setVisible(false);
				}

				// Clear models if Material VBox is being hidden

				this.clearMaterialModels();
			} catch (error) {
				console.error("Error in onBackMat:", error);
				// Optionally, show a message to the user
				sap.m.MessageToast.show("An error occurred while processing. Please try again.");
			}
		},

		clearMaterialModels: function () {
			const oMaterialWiseContractData = this.getView().getModel("materialModel");
			const oMaterialWiseModelData = this.getView().getModel("modelData");
			const oReDelvNomDCQTableData = this.getView().getModel("RedlvModelData");
			const oDelvNomDCQTableData = this.getView().getModel("DelvModelData");

			// Check if the material model exists and clear data accordingly
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
					FromT: "",
					ToT: "",
					Event: ""
				}]);
			}

			if (oMaterialWiseContractData) {
				oMaterialWiseContractData.setData({}); // Clear contract data
			}

			// Refresh the model bindings if they exist
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

		// ON SELECT ITEM FROM LIST
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
				// Retrieve the selected contract from the event context
				const sContract = oEvent.getSource().getBindingContext("newModelForContracts").getObject();

				// Construct the path for the backend call
				const sPath = `/getContractDetailsAndPastNom?Vbeln=${encodeURIComponent(sContract.Vbeln)}`;

				// Bind the list and fetch data with error handling
				const oBindList = oModel.bindList(sPath);
				const aContexts = await oBindList.requestContexts(0, Infinity);

				// Map the fetched contexts to objects
				const aContracts = aContexts.map(oContext => oContext.getObject());

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

				// sap.m.MessageToast.show("Materials fetched successfully.");
			} catch (oError) {
				// Log the error to the console and display a user-friendly message
				console.error("Error fetching contract details:", oError.message || oError);
				sap.m.MessageBox.error("Failed to fetch contract details. Please try again later.");
			} finally {
				// Ensure the busy indicator is turned off
				oContractsControl.setBusy(false);
			}
		},


		onSelectMaterial: async function (oEvent) {
			const oView = this.getView();
			const oPage = oView.byId("IdPubNomMainScrollContainer");
			const oTable = oView.byId("IdPubNomDelPointTable");
			const oBarDelv = oView.byId("IdPubNomTableHeaderBarForDelv");

			try {
				const reDelvNomDCQTableData = this.getView().getModel("RedlvModelData");
				const delvNomDCQTableData = this.getView().getModel("DelvModelData");
				reDelvNomDCQTableData.setProperty("/RedeliveryPoints", [{
					RedeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "",
					ToT: "",
					Event: ""
				}]);

				delvNomDCQTableData.setProperty("/RedeliveryPoints", [{
					DeliveryPt: "",
					DNQ: "",
					UOM: "",
					FromT: "",
					ToT: "",
					Event: ""
				}]);

				reDelvNomDCQTableData.refresh();
				delvNomDCQTableData.refresh();
				// Set busy indicator to true
				oPage.setBusy(true);
				// Retrieve the binding context
				const oBindingContext = oEvent.getSource().getBindingContext("materialModel");
				if (!oBindingContext) {
					console.error("No binding context found for materialModel.");
					sap.m.MessageBox.warning("No data found for the selected material.");
					return;
				}

				// Get the selected material object
				const oSelectedMaterial = oBindingContext.getObject();
				console.log("Delv and Redelv Data", oSelectedMaterial);
				console.log("Delv and Redelv dynamicFields", oSelectedMaterial.dynamicFields);
				this.calculateDCQStatsByLabels(oSelectedMaterial.dynamicFields)
				console.log("maxDCQVal", maxDCQVal +"....." + minDCQVal);

				let oModelData = oView.getModel("modelData");
				if (!oModelData) {
					oModelData = new sap.ui.model.json.JSONModel();
					oView.setModel(oModelData, "modelData");
				}
				oModelData.setData(oSelectedMaterial);
				const oModelDataRedlv = this.getView().getModel("RedlvModelData");
				const oModelDataDelv = this.getView().getModel("DelvModelData");
				oModelDataRedlv.setProperty("/RedeliveryPoints/0/RedeliveryPt", oSelectedMaterial.RedeliveryPt);
				oModelDataRedlv.setProperty("/RedeliveryPoints/0/UOM", oSelectedMaterial.UOM);

				// Handle visibility of the table
				if (oSelectedMaterial.DeliveryPt) {
					oModelDataDelv.setProperty("/DeliveryPoints/0/DeliveryPt", oSelectedMaterial.DeliveryPt);
					oModelDataDelv.setProperty("/DeliveryPoints/0/UOM", oSelectedMaterial.UOM);
					oTable.setVisible(true);
					oBarDelv.setVisible(true)
				} else {
					oTable.setVisible(false);
					oBarDelv.setVisible(false)
				}

				// Provide success feedback
				sap.m.MessageToast.show("Material selected successfully.");
			} catch (oError) {
				// Log the error and show a message box
				console.error("Error during material selection:", oError.message || oError);
				sap.m.MessageBox.error("An error occurred while processing the material selection. Please try again.");
			} finally {
				// Ensure the busy indicator is turned off
				oPage.setBusy(false);
			}
		},

		calculateDCQStatsByLabels: function (dynamicArray, label) {
			if(dynamicArray.length === 0){
				return;
			}
			for (let index = 0; index < dynamicArray.length; index++) {
				const minMaxDcqVal = dynamicArray[index].value;
				maxDCQVal = Math.max(maxDCQVal, minMaxDcqVal);
				minDCQVal = Math.min(minDCQVal, minMaxDcqVal);
				
			}
		},

		_generateDynamicChart: function (validityFrom, validityTo, dcq, minDCQ, maxDCQ, matchingTktData, matchingAllocatedNom) {

			let oVBox = oView.byId("chartContainer");
			oVBox.destroyItems();
			let oCanvas = document.createElement("canvas");
			oVBox.getDomRef().appendChild(oCanvas);
			let ctx = oCanvas.getContext("2d");
			let labels = [];
			let oneDay = 24 * 60 * 60 * 1000;
			for (let date = new Date(validityFrom); date <= validityTo; date = new Date(date.getTime() + oneDay)) {
				labels.push(new Date(date).toISOString().split("T")[0]);
			}
			let dcqData = Array(labels.length).fill(Number(dcq));
			let minDCQLine = Array(labels.length).fill(Number(minDCQ));
			let maxDCQLine = Array(labels.length).fill(Number(maxDCQ));
			let adnqLine = labels.map(date => {
				let entry = matchingTktData.find(e => new Date(e.Gasday).toISOString().split("T")[0] === date);
				return entry ? entry.Adnq : null;
			});
			let alloNomLine = labels.map(date => {
				let entry = matchingAllocatedNom.find(e => new Date(e.Gasday).toISOString().split("T")[0] === date);
				return entry ? entry.alloNom : null;
			});
			let chartData = {
				labels: labels,
				datasets: [{
						label: 'DCQ',
						data: dcqData,
						borderColor: '#28a745',
						borderWidth: 2,
						borderDash: [5, 5],
						fill: false,
						pointRadius: 0,
						yAxisID: 'y1',
						pointStyle: 'line'
					},
					{
						label: 'Min DCQ',
						data: minDCQLine,
						borderColor: '#87CEEB',
						borderWidth: 2,
						borderDash: [5, 5],
						fill: false,
						pointRadius: 0,
						yAxisID: 'y1',
						pointStyle: 'line'
					},
					{
						label: 'Max DCQ',
						data: maxDCQLine,
						borderColor: 'black',
						borderWidth: 2,
						borderDash: [5, 5],
						fill: false,
						pointRadius: 0,
						yAxisID: 'y1',
						pointStyle: 'line'
					},
					{
						label: 'Adnq',
						data: adnqLine,
						borderColor: 'blue',
						borderWidth: 2,
						fill: false,
						yAxisID: 'y1',
						spanGaps: true,
						pointStyle: 'line'
					},
					{
						label: 'alloQty',
						data: alloNomLine,
						borderColor: 'purple',
						borderWidth: 2,
						borderDash: [2, 2],
						fill: false,
						yAxisID: 'y1',
						spanGaps: true,
						pointStyle: 'line'
					}
				]
			};
			if (this.myChart) {
				this.myChart.data = chartData;
				this.myChart.update();
			} else {
				this.myChart = new Chart(ctx, {
					type: 'line',
					data: chartData,
					options: {
						responsive: true,
						interaction: {
							mode: 'nearest',
							intersect: false
						},
						maintainAspectRatio: false,
						scales: {
							x: {
								type: 'time',
								time: {
									unit: 'month',
									displayFormats: {
										month: 'yyyy-MMM'
									}
								},
								title: {
									text: 'Validity',
									display: true
								}
							},
							// y: { beginAtZero: false, title: { text: 'DCQ Values', display: true } }
							y1: {
								beginAtZero: false,
								title: {
									display: true,
									text: 'DCQ Values'
								},
								position: 'left',
								suggestedMin: Math.min(...dcqData, minDCQ) * 0.9,
								suggestedMax: Math.max(...dcqData, maxDCQ) * 1.1,
								grid: {
									drawOnChartArea: false
								}
							}
						},
						plugins: {
							legend: {
								display: true,
								position: 'bottom',
								labels: {
									usePointStyle: true
								}
							},
							tooltip: {
								enabled: true,
								callbacks: {
									label: function (context) {
										let label = context.dataset.label || '';
										if (label) {
											label += ': ';
										}
										if (context.dataset.label === 'DNQ') {
											label += context.raw.y;
										} else if (context.raw !== null) {
											label += context.raw.toLocaleString();
										}
										return label;
									}
								}
							}
						},
						responsive: true,
						maintainAspectRatio: false,
						layout: {
							padding: {
								top: 20,
								left: 20,
								right: 20,
								bottom: 20
							}
						}
					}
				});
			}
		},

		_addDNQPointToChart: function (channel, event, data) {
			const {
				dnq,
				gasDay
			} = data;
			const xPoint = new Date(gasDay);
			if (!this.myChart.data.datasets.some(ds => ds.label === 'DNQ')) {
				this.myChart.data.datasets.push({
					label: 'DNQ',
					data: [],
					borderColor: 'red',
					pointBackgroundColor: 'red',
					pointRadius: 5,
					fill: false,
					showLine: false,
					yAxisID: 'y1'
				});
			}
			const dnqDataset = this.myChart.data.datasets.find(ds => ds.label === 'DNQ');
			dnqDataset.data.push({
				x: xPoint,
				y: dnq
			});
			this.myChart.update();
		},

		selectContractNo: async function (selectedVbeln, material, Redelivery, Delivery) {
			let salesContractDataModel = oView.getModel("salesContractData");
			salesContractDataModel.setData({});
			console.log("contract data is:", this.contractDataModel);
			if (!this.contractDataModel || this.contractDataModel.length === 0) {
				console.error("Contract data model is empty or undefined.");
				return;
			}
			let filteredContracts = this.contractDataModel.flatMap(contract =>
				contract.to_contract.filter(contractEntry =>
					contractEntry.Vbeln === selectedVbeln &&
					contractEntry.to_material.some(materialEntry =>
						materialEntry.Material === material &&
						materialEntry.to_rdp.some(rdp =>
							rdp.RedeliveryPt === Redelivery &&
							rdp.DeliveryPt === Delivery
						)
					)
				)
			);
			if (filteredContracts.length > 0) {
				let matchingContract = filteredContracts[0];
				let supplierData = this.contractDataModel.find(contract => contract.Customer === matchingContract.Customer);

				let matchingMaterial = matchingContract.to_material.find(materialEntry =>
					materialEntry.Material === material &&
					materialEntry.to_rdp.some(rdp => rdp.RedeliveryPt === Redelivery)
				);

				let matchingRedeliveryPt = matchingMaterial && matchingMaterial.to_rdp.find(rdp => rdp.RedeliveryPt === Redelivery);
				let ItemNo = matchingRedeliveryPt & matchingRedeliveryPt.ItemNo || '';
				let clauseCodeMap = {};

				matchingMaterial.to_item.forEach(item => {
					if (item.ItemNo === ItemNo) {
						clauseCodeMap[item.ClauseCode.trim()] = item.CalculatedValue;
					}
				});
				let salesContractData = {
					...matchingContract,
					Material: matchingMaterial ? matchingMaterial.Material : '',
					ServProfile: matchingMaterial ? matchingMaterial.ServProfile : '',
					DCQ: matchingMaterial ? matchingMaterial.DCQ : '',
					MaxDCQ: clauseCodeMap["Max DCQ" || "Max Dcq" || "MDCQ"] || '',
					MinDCQ: clauseCodeMap["Min DCQ" || "Min Dcq" || "mDCQ"] || '',
					UOM: matchingMaterial ? matchingMaterial.UOM : '',
					DeliveryPt: matchingRedeliveryPt ? matchingRedeliveryPt.DeliveryPt : '',
					RedeliveryPt: matchingRedeliveryPt ? matchingRedeliveryPt.RedeliveryPt : '',
					ItemNo: matchingMaterial.ItemNo,
					Supplier: supplierData ? supplierData.Supplier : '',
					SupplierName: supplierData ? supplierData.SupplierName : ''
				};
				Object.entries(clauseCodeMap).forEach(([key, value]) => {
					salesContractData[key] = value;
				});
				salesContractDataModel.setData(salesContractData);
				console.log("Sales Contract Data:", salesContractData);
				let oServiceProfile = this.getOwnerComponent().getModel();
				let serviceProBindList = oServiceProfile.bindList("/serviceProfileParametersItems");
				await serviceProBindList.requestContexts(0, Infinity).then(aContexts => {
					let aItems = aContexts.map(oContext => {
						let item = oContext.getObject();
						item.serviceParameter = item.serviceParameter.replace(/\s+/g, '');
						return item;
					});
					let servProfileValue = salesContractData.ServProfile;
					let relevantItems = aItems.filter(item => item.serviceProfileName === servProfileValue && item.Nomination_Relevant === true);
					let oList = oView.byId("parameterList");
					let serviceProfDataModel = new sap.ui.model.json.JSONModel({
						parameters: relevantItems
					});
					oList.setModel(serviceProfDataModel, "serviceProfData");
					console.log("salesContractData:", salesContractData);
					console.log("serviceProfData:", serviceProfDataModel.getData());
					this.updateUIFields(salesContractData);
				})
			} else {
				console.warn("No matching contract found for the provided criteria.");
			}
		},

		updateUIFields: function (salesContractData) {
			oView.byId("selectedDate").setValue("");
			oView.byId("dnqGSA").setValue("");
			oView.byId("contractID").setValue(salesContractData.Vbeln);
			oView.byId("materialID").setValue(salesContractData.Material);
			oView.byId("docTypeID").setValue(salesContractData.ContractDescription);
			let delPointTable = oView.byId("IdPubNomDelPointTable");
			if (salesContractData.DeliveryPt) {
				if (delPointTable) {
					delPointTable.setVisible(true);
					oView.byId("IdPubNomDelvPointInput").setValue(salesContractData.DeliveryPt);
					oView.byId("UomDp").setValue(salesContractData.UOM);
				} else {
					console.error("Delivery Point table 'delPointTable' not found");
				}
			} else {
				if (delPointTable) {
					delPointTable.setVisible(false);
				} else {
					console.error("Delivery Point table 'delPointTable' not found");
				}
			}
			let redeliveryPointTable = oView.byId("redPointTable");
			if (redeliveryPointTable) {
				redeliveryPointTable.setVisible(true);
				oView.byId("reDelPointID").setValue(salesContractData.RedeliveryPt);
				oView.byId("uomInput").setValue(salesContractData.UOM);
			} else {
				console.error("Re-Delivery Point table '_IDGenTable2' not found");
			}
			let oList = oView.byId("parameterList");
			if (oList) {
				let aItems = oList.getItems();
				aItems.forEach(function (item) {
					let parameterLabel = item.getLabel().slice(0, -1);
					let parameterValue = salesContractData[parameterLabel];
					if (parameterValue !== undefined) {
						item.setValue(parameterValue.toString());
						item.setVisible(true);
					} else {
						console.log(`Field '${parameterLabel}' not found in salesContractData.`);
						item.setValue("");
						item.setVisible(false);
					}
				});
			} else {
				console.error("List 'parameterList' not found in the view.");
			}
			// oView.byId("remarks").setValue("");
		},

		initModelsForCreate: async function () {
			this.NominationDataModel = [];
			this.purchArray = [];
			let nominationModel = oView.getModel("nominationDataModel")
			let oModelNom = this.getOwnerComponent().getModel();
			let oBindListNom = oModelNom.bindList("/xGMSxGMS_nom");

			await oBindListNom.requestContexts(0, Infinity).then(aContexts => {

				this.NominationDataModel = aContexts.map(oContext => oContext.getObject());
				nominationModel.setData(this.NominationDataModel)
				console.log("Nomination Data:", this.NominationDataModel);

			}).catch(error => {
				console.error("Error fetching Nomination data:", error);
			});

			let purchBindList = oModelNom.bindList("/transportAgreementDetail");
			await purchBindList.requestContexts(0, Infinity).then(aContexts => {
				this.purchArray = aContexts.map(oContext => oContext.getObject());
				console.log("Purchase Data:", this.purchArray);
			}).catch(error => {
				console.error("Error fetching Purchase Agreement data:", error);
			});
			let sPath = "/ZNOMMASTER8";
			let oParameters = {
				"$expand": "to_contract($filter=DocType eq 'S';$expand=to_material($expand=to_rdp,to_item))"
			};
			let oListBinding = oModelNom.bindList(sPath, undefined, undefined, undefined, oParameters);

			await oListBinding.requestContexts(0, Infinity).then(aContexts => {
				this.contractDataModel = aContexts.map(oContext => oContext.getObject());
				console.log("Contract Data Model:", this.contractDataModel);
			}).catch(error => {
				console.error("Error fetching Contract data:", error);
			});
		},

		onliveInputDNQ: function (oEvent) {
			const sValue = oEvent.getParameter("value");

			const oInput = oEvent.getSource(); // Get the Input control

			// Define the min and max values
			const minDCQ = 1000.0; // Example minimum value
			const maxDCQ = 2000.0; // Example maximum value

			// Validate if the value is a float
			const numberValue = parseFloat(sValue);
			let valueState = "None"; // Default value state
			let valueStateText = ""; // Default value state text

			// Check if the input is empty
			if (sValue === "") {
				valueState = "None";
				valueStateText = "";
			} else if (isNaN(numberValue)) {
				// If the value is not a number
				valueState = "Error";
				valueStateText = "Please enter a valid float number.";
			} else if (numberValue < minDCQ) {
				// If the value is less than the minimum
				valueState = "Error";
				valueStateText = `DNQ should be >= ${minDCQ}.`;
			} else if (numberValue > maxDCQ) {
				// If the value is greater than the maximum
				valueState = "Error";
				valueStateText = `DNQ should be <= ${maxDCQ}.`;
			} else {
				// If the value is valid
				valueState = "None";
				valueStateText = "";
			}

			// Set the value state and value state text directly on the Input control
			oInput.setValueState(valueState);
			oInput.setValueStateText(valueStateText);
		},

		DcqValidation: function (oEvent) {
			let salesContractDataModel = oView.getModel("salesContractData");
			let maxDCQ = salesContractDataModel.getProperty("/MaxDCQ" || "/maxDCQ" || "/MDCQ");
			let minDCQ = salesContractDataModel.getProperty("/MinDCQ" || "/minDCQ" || "/mDCQ");
			// GSA Validation
			let dnqGSAInput = oView.byId("dnqGSA");
			if (!dnqGSAInput) {
				console.error("Element with ID 'dnqGSA' not found.");
				return;
			}
			let selectDnqGSA = dnqGSAInput.getValue();
			let enterDnqGSA = parseFloat(selectDnqGSA);
			let selectedEvent = oView.byId("eventInput").getSelectedItem();
			if (selectedEvent) {
				oView.byId("messageGSA").setVisible(true)
				oView.byId("messageGSA").setText("");
			} else {
				if (isNaN(enterDnqGSA)) {
					oView.byId("messageGSA").setVisible(true);
					oView.byId("messageGSA").setText("");
				} else if (enterDnqGSA >= minDCQ && enterDnqGSA <= maxDCQ && enterDnqGSA >= 0) {
					oView.byId("messageGSA").setVisible(true);
					oView.byId("messageGSA").setText("");
					var oSelect = this.byId("eventInput");
					oSelect.setEnabled(false);
				} else {
					var oSelect = this.byId("eventInput");
					oSelect.setEnabled(true);
					this.handleDnqValidationErrors(enterDnqGSA, minDCQ, maxDCQ, "messageGSA");
				}
			}
			// GTA Validation
			if (oView.byId("IdPubNomDelPointTable").getVisible()) {
				let selectDnqGTA = oView.byId("dnqGTA").getValue();
				let enterDnqGTA = parseFloat(selectDnqGTA);
				let GtaSelectedEvent = oView.byId("eventInputGTA").getSelectedItem()
				if (GtaSelectedEvent) {
					GtaSelectedEvent = GtaSelectedEvent & GtaSelectedEvent.getText();
					console.log(GtaSelectedEvent);
					if (GtaSelectedEvent == "No-event") {
						this.handleDnqValidationError(enterDnqGTA, minDCQ, maxDCQ, "messageGTA");
					} else {
						oView.byId("messageGTA").setVisible(true);
						oView.byId("messageGTA").setText("");
					}
				} else {
					if (isNaN(enterDnqGTA)) {
						oView.byId("messageGTA").setVisible(true);
						oView.byId("messageGTA").setText("");
						// oView.byId("messageGTA").setText("*DNQ must be a valid number.");
					} else if (enterDnqGTA >= minDCQ && enterDnqGTA <= maxDCQ && enterDnqGTA >= 0) {
						oView.byId("messageGTA").setVisible(true);
						oView.byId("messageGTA").setText("");
						var oSelect = this.byId("eventInputGTA");
						oSelect.setEnabled(false);
					} else {
						var oSelect = this.byId("eventInputGTA");
						oSelect.setEnabled(true);
						this.handleDnqValidationError(enterDnqGTA, minDCQ, maxDCQ, "messageGTA");
					}
				}
			}
		},

		handleDnqValidationErrors: function (enterDnqGSA, minDCQ, maxDCQ, messageGSA) {
			if (enterDnqGSA >= minDCQ && enterDnqGSA <= maxDCQ && enterDnqGSA >= 0) {
				oView.byId("messageGSA").setVisible(true);
				oView.byId("messageGSA").setText("");
			}
			if (enterDnqGSA < minDCQ) {
				oView.byId("messageGSA").setVisible(true);
				oView.byId("messageGSA").setText("*DNQ should be more than min DCQ ");
			} else if (enterDnqGSA > maxDCQ) {
				oView.byId("messageGSA").setVisible(true);
				oView.byId("messageGSA").setText("*DNQ should be less than max DCQ ");
			} else if (enterDnqGSA <= 0) {
				oView.byId("messageGSA").setVisible(true);
				oView.byId("messageGSA").setText("*DNQ should not be less than 1.");
			}

		},

		handleDnqValidationError: function (enterDnqGTA, minDCQ, maxDCQ, messageGTA) {
			if (enterDnqGTA >= minDCQ && enterDnqGTA <= maxDCQ && enterDnqGTA >= 0) {
				oView.byId("messageGTA").setVisible(true);
				oView.byId("messageGTA").setText("");
			}
			if (enterDnqGTA < minDCQ) {
				oView.byId("messageGTA").setVisible(true);
				oView.byId("messageGTA").setText("*DNQ should be more than min DCQ ");

			} else if (enterDnqGTA > maxDCQ) {
				oView.byId("messageGTA").setVisible(true);
				oView.byId("messageGTA").setText("*DNQ should be less than max DCQ ");
			} else if (enterDnqGTA <= 0) {
				oView.byId("messageGTA").setVisible(true);
				oView.byId("messageGTA").setText("*DNQ should not be less than 1.");
			}
		},

		onSelectOption: function () {
			gasDay = oView.byId("selectedDate").getValue();
			var selectedDate = new Date(gasDay);
			var currentDate = new Date();
			if (selectedDate < currentDate) {
				sap.m.MessageBox.error("Please select a future date.");
				oView.byId("selectedDate").setValue("");
			} else {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "yyyy-MM-dd"
				});
				formattedGasDay = oDateFormat.format(selectedDate);
			}
			this.formattedTimestamp = currentDate.toISOString();
		},

		EventsGSA: function (oEvent) {
			let salesContractDataModel = oView.getModel("salesContractData");
			let maxDCQ = salesContractDataModel.getProperty("/MaxDCQ" || "/maxDCQ" || "/MDCQ");
			let minDCQ = salesContractDataModel.getProperty("/MinDCQ" || "/minDCQ" || "/mDCQ");
			let dnqGSAInput = oView.byId("dnqGSA");
			let selectDnqGSA = dnqGSAInput.getValue();
			let enterDnqGSA = parseFloat(selectDnqGSA);
			let selectedEvent = oEvent.getSource().getSelectedItem();
			if (selectedEvent) {
				selectedEvent = selectedEvent & selectedEvent.getText()
				if (selectedEvent == 'No-event') {
					console.log("reached.");
					this.handleDnqValidationErrors(enterDnqGSA, minDCQ, maxDCQ, "messageGSA");
				} else {
					oView.byId("messageGSA").setVisible(true);
					oView.byId("messageGSA").setText("");
				}
			}
		},

		EventGTA: function (oEvent) {
			let salesContractDataModel = oView.getModel("salesContractData");
			let maxDCQ = salesContractDataModel.getProperty("/MaxDCQ" || "/maxDCQ" || "/MDCQ");
			let minDCQ = salesContractDataModel.getProperty("/MinDCQ" || "/minDCQ" || "/mDCQ");
			let selectDnqGTA = oView.byId("dnqGTA").getValue();
			let enterDnqGTA = parseFloat(selectDnqGTA);
			selectedGTAEvent = oEvent.getSource().getSelectedItem()
			if (selectedGTAEvent) {
				selectedGTAEvent = selectedGTAEvent &  selectedGTAEvent.getText()
				if (selectedGTAEvent == 'No-event') {
					console.log("GtaSelectedEventtttt is blank hua");
					this.handleDnqValidationError(enterDnqGTA, minDCQ, maxDCQ, "messageGTA");
				} else {
					oView.byId("messageGTA").setVisible(true);
					oView.byId("messageGTA").setText("");
				}
			}
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
			// Get the Gasday value from the DatePicker
			let Gasday = this.getView().byId("IdPubNomGasDayPicker").getDateValue();
			const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});
			Gasday = oDateFormat.format(Gasday);

			// Validate Gasday
			if (!Gasday) {
				sap.m.MessageBox.error("Please select a Gas Day!");
				return;
			}

			// Retrieve model data
			const oModelDataRedlv = this.getView().getModel("RedlvModelData").getData();
			const selectedMaterialData = this.getView().getModel("modelData").getData();
			console.log("oModelDataRedlv ", oModelDataRedlv);
			console.log("selectedMaterialData ", selectedMaterialData);

			let nomi_toitem = [];

			// Populate the nomi_toitem array
			for (let i = 0; i < oModelDataRedlv.RedeliveryPoints.length; i++) {
				let intradayNom = {
					"Gasday": Gasday,
					"Vbeln": selectedMaterialData.Vbeln,
					"ItemNo": selectedMaterialData.ItemNo,
					"NomItem": (10 + i).toString(), // Generate NomItem
					"Versn": "",
					"DeliveryPoint": "",
					"RedelivryPoint": oModelDataRedlv.RedeliveryPoints[i].RedeliveryPt,
					"ValidTo": oModelDataRedlv.RedeliveryPoints[i].ToT,
					"ValidFrom": oModelDataRedlv.RedeliveryPoints[i].FromT,
					"Material": selectedMaterialData.Material,
					"Kunnr": "",
					"Auart": selectedMaterialData.Auart,
					"Ddcq": "0.000",
					"Rdcq": "0.000",
					"Uom1": oModelDataRedlv.RedeliveryPoints[i].UOM,
					"Pdnq": oModelDataRedlv.RedeliveryPoints[i].DNQ,
					"Event": oModelDataRedlv.RedeliveryPoints[i].Event,
					"Adnq": "0.000",
					"Rpdnq": "0.000",
					"Znomtk": "",
					"Src": "",
					"Remarks": "",
					"Flag": "",
					"Action": "",
					"Path": "",
					"CustGrp": "",
					"SrvProfile": "",
				};

				nomi_toitem.push(intradayNom);
			}

			let createNomPayLoad = {
				"Gasday": Gasday,
				"Vbeln": selectedMaterialData.Vbeln,
				nomi_toitem: nomi_toitem
			};
			return;
			console.log("createNomPayLoad", createNomPayLoad);
			let oModel = this.getOwnerComponent().getModel();
			let oBindList = oModel.bindList("/znom_headSet");

			// Show busy indicator
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();

			try {
				// Create the entity and wait for the response
				let result = await oBindList.create(createNomPayLoad, true);
				console.log("result ", result);

				// Show success message
				MessageBox.success("Nomination Successfully Submitted");

			} catch (error) {
				// Handle the error case
				console.error("Error during create operation:", error);
				MessageBox.error("An error occurred while submitting the nomination. Please try again.");
			} finally {
				// Hide busy indicator
				busyDialog.close();
			}
			return;
		},

		checkExistingNomination: function (enterDnqGSA) {
			let nominationData = oView.getModel("nominationDataModel").getData()
			let salesContractDataModel = oView.getModel("salesContractData");
			let contractNumber = oView.byId("contractID").getValue();
			let material = salesContractDataModel.getProperty("/Material");
			let gasDay = formattedGasDay;
			let existingNomination = nominationData.find(nom =>
				nom.Vbeln === contractNumber &&
				nom.Material === material &&
				nom.Gasday === gasDay
			);
			if (existingNomination) {
				sap.m.MessageBox.confirm(
					`A nomination already exists for this material on ${gasDay} with DNQ ${existingNomination.PDnq}. Do you want to continue?`, {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function (oAction) {
							if (oAction === sap.m.MessageBox.Action.OK) {
								this.checkNomValue();
							}
						}.bind(this)
					}
				);
			} else {
				this.checkNomValue();
			}
		},

		updateUiAfterSubmit: function () {
			const fieldIds = ["selectedDate", "reDelPointID", "dnqGSA", "uomInput", "eventInput", "contractID",
				"materialID", "docTypeID", "IdPubNomDelvPointInput", "IdPubNomDNQInput", "IdPubNomUOMInput", "IdPubNomEventSelect"
			];
			fieldIds.forEach(id => {
				if (id) {
					oView.byId(id).setValue("");
				}
			});
			let pastNomModel = oView.getModel("tktModel")
			pastNomModel.setData([])
			let oList = oView.byId("parameterList");
			let listModel = oList.getModel("serviceProfData")
			listModel.setProperty("/parameters", [])
			if (this.myChart) {
				this.myChart.destroy();
				this.myChart = null;
			}
			let oVBox = oView.byId("chartContainer");
			oVBox.destroyItems();
		},
		// calling from  inside CheckExistingNomination to validate some checks

		checkNomValue: async function (oEvent) {
			try {
				let salesContractDataModel = oView.getModel("salesContractData");
				let salesContractData = salesContractDataModel.getData();
				if (!formattedGasDay) {
					sap.m.MessageBox.error("Please select a Gas Day!");
					return;
				}
				let currentDate = new Date();
				let creTime = currentDate.toISOString();
				let selectedGasDay = formattedGasDay;
				let contractNumber = oView.byId("contractID").getValue();
				let crepdnq = oView.byId("dnqGSA").getValue();
				let selectedEvent = oView.byId("eventInput").getSelectedItem() & oView.byId("eventInput").getSelectedItem().getText() || '';
				// let remark = oView.byId("remarks").getValue() || '';
				let validFrom = new Date(salesContractDataModel.getProperty("/ValidFrom"));
				let validTo = new Date(salesContractDataModel.getProperty("/ValidTo"));
				let gasDayDate = new Date(selectedGasDay);
				if (gasDayDate < validFrom || gasDayDate > validTo) {
					sap.m.MessageBox.error("The contract validity expired.");
					return;
				}
				let nominationModel = new sap.ui.model.json.JSONModel();
				let arrNom = {
					"Gasday": selectedGasDay,
					"Vbeln": contractNumber,
					"Posnr": salesContractData.ItemNo,
					"Timestamp": creTime,
					"Kunnr": salesContractData.Customer,
					"Auart": salesContractData.Auart,
					"Dcq": salesContractData.DCQ,
					"PDnq": crepdnq,
					"Event": selectedEvent || '',
					"deliveryPoint": salesContractData.DeliveryPt,
					"Redelivery": salesContractData.RedeliveryPt,
					"Material": salesContractData.Material,
				};
				let salesNumber = await this.getPurchaseNumberFromPurchArray(contractNumber);
				if (salesNumber) {
					await this.purchaseNomination(contractNumber, salesNumber);
				} else {
					nominationModel.setData(arrNom);
					oView.setModel(nominationModel, "nomination");
					let oData = oView.getModel('nomination').getData();
					let nomModel = this.getOwnerComponent().getModel();
					let oBindList = nomModel.bindList("/xGMSxGMS_nom");
					let oResponse = await oBindList.create(oData);
					console.log("Nomination created successfully:", oResponse);
					sap.m.MessageBox.success("Nomination created successfully", {
						onClose: function () {
							this.updateUiAfterSubmit()
						}.bind(this)
					});
				}
			} catch (error) {
				console.error("Error creating nomination:", error);
				// MessageBox.error("Failed to create nomination. Please try again.");
			}
		},

		getPurchaseNumberFromPurchArray: function (contractNumber) {
			return new Promise((resolve, reject) => {
				let salesNumber = null;
				let filteredObj = purchArray.find(obj => obj.salesNumber === contractNumber);
				if (filteredObj) {
					salesNumber = filteredObj.salesNumber;
				}
				resolve(salesNumber);
			});
		},
		// for GTA two  line-item one for sales and one for purchase
		purchaseNomination: async function (contractNumber, salesNumber) {
			try {
				let salesContractDataModel = oView.getModel("salesContractData");
				let salesContractData = salesContractDataModel.getData();
				let selectedGasDay = formattedGasDay;
				let currentDate = new Date();
				let creTime = currentDate.toISOString();
				let filteredObj = purchArray.filter(obj => obj.salesNumber === contractNumber);
				if (filteredObj.length > 0) {
					let purchaseModel = new sap.ui.model.json.JSONModel();
					let dnqGSA = oView.byId("dnqGSA").getValue();
					let dnqGTA = oView.byId("dnqGTA").getValue();
					let selectedEvent = oView.byId("eventInput").getSelectedItem() & oView.byId("eventInput").getSelectedItem().getText() || '';
					let GtaSelectedEvent = oView.byId("eventInputGTA").getSelectedItem() & oView.byId("eventInputGTA").getSelectedItem().getText() || '';
					let remark = oView.byId("remarks").getValue();
					let payloads = [{
							"Gasday": selectedGasDay,
							"Vbeln": salesNumber,
							"Posnr": salesContractData.ItemNo,
							"Timestamp": creTime,
							"Kunnr": salesContractData.Customer,
							"Auart": salesContractData.Auart,
							"Dcq": salesContractData.DCQ,
							"PDnq": dnqGSA,
							"Event": selectedEvent || '',
							"Redelivery": salesContractData.RedeliveryPt,
							"Material": salesContractData.Material,
							"Remarks": remark
						},
						{
							"Gasday": selectedGasDay,
							"Vbeln": salesContractData.Vbeln_p,
							"Posnr": salesContractData.ItemNo,
							"Timestamp": creTime,
							"Kunnr": salesContractData.Supplier,
							"Auart": salesContractData.Auart,
							"Dcq": salesContractData.DCQ,
							"PDnq": dnqGTA,
							"Event": GtaSelectedEvent || '',
							"deliveryPoint": salesContractData.DeliveryPt,
							"Material": salesContractData.Material,
							"Remarks": remark
						}
					];
					for (let payload of payloads) {
						purchaseModel.setData(payload);
						oView.setModel(purchaseModel, "purchase");
						let purchaseData = oView.getModel('purchase').getData();
						let purchModel = this.getOwnerComponent().getModel();
						let purchaseBindList = purchModel.bindList("/xGMSxGMS_nom");
						await purchaseBindList.create(purchaseData, true);
					}
					console.log("Both nominations created successfully.");
					MessageBox.success("Nominations created successfully", {
						onClose: function () {
							this.onInit();
							location.reload();
						}.bind(this)
					});
				}
			} catch (error) {
				console.error("Error creating nominations:", error);
				MessageBox.error("Failed to create nominations. Please try again.");
				throw error;
			}
		},

		Onsimulate: function () {
			if (!this._simulateDialog) {
				this._simulateDialog = sap.ui.xmlfragment("com.ingenx.nomination.salesnomination.fragment.simulatePopup", this);
				oView.addDependent(this._simulateDialog);
			}
			this._simulateDialog.open();
			const dnqValue = oView.byId("dnqGSA").getValue();
			const gasDay = oView.byId("selectedDate").getDateValue();
			this._addDNQPointToChart(dnqValue, gasDay)
		},

		// function to add real time indication after OnSimulate press  button

		_addDNQPointToChart: function (dnq, gasDay) {
			const xPoint = new Date(gasDay);
			if (!this.myChart.data.datasets.some(ds => ds.label === 'DNQ')) {
				this.myChart.data.datasets.push({
					label: 'DNQ',
					data: [],
					borderColor: 'red',
					pointBackgroundColor: 'red',
					pointRadius: 5,
					fill: false,
					showLine: false,
					yAxisID: 'y1'
				});
			}

			const dnqDataset = this.myChart.data.datasets.find(ds => ds.label === 'DNQ');
			dnqDataset.data.push({
				x: xPoint,
				y: dnq
			});
			this.myChart.update();
		},

		onCloseSimulateDialog: function () {
			this._simulateDialog.close();
		},
		// Nomination Ends*****************************************************************************




	});



});