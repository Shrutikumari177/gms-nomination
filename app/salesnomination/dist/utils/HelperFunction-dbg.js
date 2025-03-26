sap.ui.define(["sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageBox"],
    function (Fragment,Filter,FilterOperator,MessageBox) {
   "use strict";
   return {

    // code is using for opening a value help dialog
       _openValueHelpDialog: function (oController, fragmentId, fragmentName) {
           let oView = oController.getView();

           if (!oController[fragmentId]) {
               return Fragment.load({
                   id: oView.getId(),
                   name: fragmentName,
                   controller: oController
               }).then(oDialog => {
                   oController[fragmentId] = oDialog;
                   oView.addDependent(oController[fragmentId]);
                   oController[fragmentId].open();
               }).catch(error => {
                   console.warn("Fragment not Loading", error);
               });
           } else {
               oController[fragmentId].open();
           }
       },

       //set the selected item's value inside input field from value help    
       _valueHelpSelectedValue : function(oEvent,oController,inputId){
           let inputValue = oController.byId(inputId)
           let sSelect = oEvent.getParameter("selectedItem")
           let sValue = sSelect.getTitle()
          if(sValue){
            inputValue.setValue(sValue)
            oEvent.getSource().getBinding("items").filter([]);
            return sValue
          }
          else{
            console.warn("Selected Value Not Found!!")
          }
       },

    

      // code is using for searching the item
       _valueHelpLiveSearch: function (oEvent, filterField, id,oControl) {
        let sValue = oEvent.getParameter("value") || oEvent.getParameter("query") || oEvent.getParameter("newValue");
        let oBinding = oEvent.getSource().getBinding("items");
        if (sValue) {
            let oFilter = new sap.ui.model.Filter(filterField, FilterOperator.Contains, sValue);
            oBinding.filter([oFilter]);
        } else {
            oBinding.filter([]);
        }
        if(id && oControl){
        let oValueHelp = oControl.getView().byId(id);
        if (oValueHelp) {
            oBinding.attachEventOnce("dataReceived", function (oData) {
                let aItems = oBinding.getCurrentContexts();
                if (!aItems || aItems.length === 0) {
                    oValueHelp.setNoDataText("No Data");
                } else {
                    oValueHelp.setNoDataText(""); 
                }
            });
        }
      }
    },
    

    // read data based on property 
    _getSingleEntityDataWithParam : async function(oControl,url,property,param){
       let oModel = oControl.getOwnerComponent().getModel()
       let oBindList = oModel.bindList(`/${url}(${property}='${param}')`)
       try {
        let oContext = await oBindList.requestContexts(0,Infinity)
        let oData = oContext.map(context=>context.getObject())
        if(oData.length===0){
            return sap.m.MessageToast.show("Data Not Found")
        }
        return oData
       } catch (error) {
        console.log(`Error occurred while reading data from the '${url}' entity : `, error)
       }
    },
    validateDNQ: async function (oView, valueMap, customerNo) {
        try {
            const oModel = oView.getModel();
            if (!oModel) {
                throw new Error("OData model not found on the view.");
            }
    
            const oFilter = new sap.ui.model.Filter("CustomerNo", sap.ui.model.FilterOperator.EQ, customerNo);
            const oBindList = oModel.bindList("/Nominationlogic", null, null, [oFilter]);
            
            const oContext = await oBindList.requestContexts(0, Infinity);
            const customerRules = oContext.map((context) => context.getObject());
    
            if (!customerRules.length) {
                console.info(`No rules found for CustomerNo: ${customerNo}`);
                return true; // No rules, so no validation errors
            }
    
            const groupedRules = customerRules.reduce((groups, rule) => {
                const key = rule.logic || "NONE"; 
                (groups[key] ||= []).push(rule); 
                return groups;
            }, {});
            
            let validationFailed = false; 
    
            Object.entries(groupedRules).forEach(([logic, rules]) => {
                let isValid = logic === "AND";
    
                rules.forEach((rule) => {
                    const value1 = valueMap[rule.SP1];
                    const value2 = valueMap[rule.SP2];
    
                    if (value1 === undefined || value2 === undefined) {
                        console.warn(`Values missing for SP1: ${rule.SP1} or SP2: ${rule.SP2}`);
                        return;
                    }
    
                    const operatorChecks = {
                        "<=": value1 <= value2,
                        ">=": value1 >= value2,
                        "=": value1 === value2,
                        "!=": value1 !== value2
                    };
    
                    const conditionMet = operatorChecks[rule.logicaloperator];
    
                    // Validate with dynamic error messages
                    if (logic === "AND") {
                        isValid = isValid && conditionMet;
                    } else if (logic === "OR") {
                        isValid = isValid || conditionMet;
                    } else if (!conditionMet) { 
                        MessageBox.error(rule.message || `${rule.SP1} validation failed against ${rule.SP2}`);
                        validationFailed = true;
                    }
                });
    
                // Group-level error messages
                if ((logic === "AND" && !isValid) || (logic === "OR" && !isValid)) {
                    const groupErrorMsg = rules.map((rule) => rule.message || `${rule.SP1} validation failed`).join("\n");
                    MessageBox.error(groupErrorMsg);
                    validationFailed = true;
                }
            });
    
            return !validationFailed; 
    
        } catch (error) {
            console.error("Validation error:", error);
            MessageBox.error("An error occurred during validation.");
            return false;
        }
    },
    
 
    
    
    
    
    _getSingleEntityData: async function (oControl, url) {
        let oModel = oControl.getOwnerComponent().getModel();
        let oBindList = oModel.bindList(`/${url}`);
        try {
            let oContext = await oBindList.requestContexts(0, Infinity);
            let oData = oContext.map((context) => context.getObject());
            if (oData.length === 0) {
                console.log(`No data found for '${url}'.`);
            }
            return oData;
        } catch (error) {
            console.error(`Error occurred while reading data from the '${url}' entity:`, error);
            return [];
        }
    }
    

   
   
     
   };
});