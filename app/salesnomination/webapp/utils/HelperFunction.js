sap.ui.define(["sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator"],
    function (Fragment,Filter,FilterOperator) {
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
   
   
    
  
    

    //read all data of a entity  
    _getSingleEntityData :async function(oControl,url){
        let oModel = oControl.getOwnerComponent().getModel()
        let oBindList = oModel.bindList(`/${url}`)
        try {
            let oContext = await  oBindList.requestContexts(0,Infinity)
            let oData = oContext.map(context=>context.getObject())
            if(oData.length === 0){
                return console.log("Data Not Found")
            }
            return oData
        } catch (error) {
            console.log(`Error occurred while reading data from the '${url}' entity : `, error)
        }
    },

   
   
     
   };
});