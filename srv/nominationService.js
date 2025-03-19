const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const externalService = await cds.connect.to('GMS_CONFIG');
    

    const GMSNOMINATIONS_SRV = await cds.connect.to("GMSNOMINATIONS_SRV");
    srv.on('READ', 'nomi_SaveSet', req => GMSNOMINATIONS_SRV.run(req.query));
    srv.on('CREATE', 'nomi_SaveSet', req => GMSNOMINATIONS_SRV.run(req.query));
    srv.on('UPDATE', 'nomi_SaveSet', async req => { 
        
        let data = await GMSNOMINATIONS_SRV.run(req.query)
        return  data||null
    });

    
    srv.on('READ', 'xGMSxCREATENOMINATION', req => GMSNOMINATIONS_SRV.run(req.query));
    srv.on('READ', 'xGMSxFETCHNOMINATION', req => GMSNOMINATIONS_SRV.run(req.query));
    srv.on('READ', 'znom_headSet', req => GMSNOMINATIONS_SRV.run(req.query));
    srv.on('CREATE', 'znom_headSet', req => GMSNOMINATIONS_SRV.run(req.query));




    srv.on('READ', 'pathAndFuelMapping', async (req) => {
        try {
            const result = await externalService.run(SELECT.from('pathAndFuelMapping'));
            return result;
        } catch (err) {
            console.error('Error fetching data from external service:', err);
            req.error(500, 'Failed to fetch data from external service.');
        }
    })

    srv.on('READ', 'ServiceProfileMaster', async (req) => {
        try {
            const result = await externalService.run(SELECT.from('ServiceProfileMaster'));
            return result;
        } catch (err) {
            console.error('Error fetching data from external service:', err);
            req.error(500, 'Failed to fetch data from external service.');
        }
    });
    srv.on('READ', 'serviceProfileParametersItems', async (req) => {
        try {
            const result = await externalService.run(SELECT.from('serviceProfileParametersItems'));
            return result;
        } catch (err) {
            console.error('Error fetching data from external service:', err);
            req.error(500, 'Failed to fetch data from external service.');
        }
    })
    srv.on('READ', 'Nominationlogic', async (req) => {
        try {
            const result = await externalService.run(SELECT.from('Nominationlogic'));
            return result;
        } catch (err) {
            console.error('Error fetching data from external service:', err);
            req.error(500, 'Failed to fetch data from external service.');
        }
    })

    const GMSNOMCP_GMS_SRV = await cds.connect.to("GMSNOMCP_GMS_SRV");

    srv.on('READ', 'ZNOMMASTER5', req => GMSNOMCP_GMS_SRV.run(req.query));
    srv.on('READ', 'ZNOMMASTER8', async (req) => {
        return await GMSNOMCP_GMS_SRV.run(req.query)
    });
    srv.on('READ', 'xGMSxGMS_nom', req => GMSNOMCP_GMS_SRV.run(req.query));
    srv.on('READ', 'xGMSxPast_Nom', req => GMSNOMCP_GMS_SRV.run(req.query));

    srv.on('READ', 'ZNOMMASTER6', req => GMSNOMCP_GMS_SRV.run(req.query));
    srv.on('READ', 'ZNOMMASTER15', req => GMSNOMCP_GMS_SRV.run(req.query));

    srv.on('READ', 'ZNOMMASTER14', req => GMSNOMCP_GMS_SRV.run(req.query));

    srv.on('READ', 'ZNOMMASTER10', req => GMSNOMCP_GMS_SRV.run(req.query));

    srv.on('READ', 'znompudelivery', req => GMSNOMCP_GMS_SRV.run(req.query));


    // ********************** Publish Nomiantion Contract *********************

   

    srv.on('getNominationsByCustomer', async (req) => {
        try {

            const { SoldToParty } = req.data;
            console.log("DocType", SoldToParty)


            const query = SELECT.from('xGMSxFETCHNOMINATION')
                .columns('DocNo' , 'Contracttype')
                .where({ SoldToParty });


            const resultRes = await GMSNOMINATIONS_SRV.run(query);

            const uniqueResults = [...new Map(resultRes.map(item => [item.DocNo, item])).values()];

            console.log("resultRes after filtering", uniqueResults);

            return uniqueResults;

        } catch (error) {

            req.error(500, error);
            return [];
        }
    });

    srv.on('getContractDetailsAndPastNom', async (req) => {
        const { DocNo } = req.data;
    
        const query = SELECT.from('xGMSxFETCHNOMINATION')
            .columns('DocNo', 'Material', 'Redelivery_Point', 'Delivery_Point', 'Item')
            .where({ DocNo });
    
        const resultRes = await GMSNOMINATIONS_SRV.run(query);
    
        if (!resultRes || resultRes.length === 0) {
            return null; // Return null if no data found
        }
    
        // Filter out duplicates based on Material and Redelivery_Point
        const uniqueEntries = [];
        const seenKeys = new Set();
    
        for (const entry of resultRes) {
            const key = `${entry.Material}-${entry.Redelivery_Point}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueEntries.push(entry);
            }
        }
    
        return uniqueEntries;
    });
    

   

    srv.on('getContractDetail', async (req) => {
        const { DocNo, Material, Redelivery_Point } = req.data; 
        console.log("Received:", DocNo, Material, Redelivery_Point);
    
        const query = SELECT.from('xGMSxFETCHNOMINATION')
            .columns(
                'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point', 
                'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To', 
                'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype'
            )
            .where({ DocNo });
    
        const resultRes = await GMSNOMINATIONS_SRV.run(query);
        console.log("Query Result:", resultRes);
    
        if (!resultRes?.length) {
            return null;
        }
    
        // Filter by Material and Redelivery_Point
        const matfilter = resultRes.filter(item => 
            item.Material === Material && item.Redelivery_Point === Redelivery_Point
        );
        console.log("Filtered by Material and Redelivery_Point:", matfilter);
    
        if (!matfilter.length) {
            return null;
        }
    
        // Get unique items to check if there’s more than one 'Item'
        const uniqueItems = new Set(matfilter.map(item => item.Item));
        console.log("Unique Items:", uniqueItems);
    
        let filteredResults = matfilter;
    
        // Apply date logic only if there’s more than one unique 'Item'
        if (uniqueItems.size > 1) {
            const currentDate = new Date().toISOString().split('T')[0];
            filteredResults = matfilter.filter(item => 
                item.Valid_Form <= currentDate && item.Valid_To >= currentDate
            );
        }
        console.log("Filtered by Date (if multiple items):", filteredResults);
    
        if (!filteredResults.length) {
            return null;
        }
    
        // Destructure main fields from the first matched result
        const {
            Item,
            Delivery_Point,
            Delivery_Dcq,
            Redelivery_Dcq,
            Valid_Form,
            Valid_To,
            SoldToParty,
            UOM,
            Contracttype
        } = filteredResults[0];
    
        // Remove duplicates from 'data' array
        const uniqueData = [];
        const seen = new Set();
    
        filteredResults.forEach(({ Calculated_Value, Clause_Code }) => {
            const key = `${Calculated_Value}-${Clause_Code}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueData.push({ Calculated_Value, Clause_Code });
            }
        });
    
        return {
            DocNo,
            Item,
            Material,
            Redelivery_Point,
            Delivery_Point,
            Delivery_Dcq,
            Redelivery_Dcq,
            Valid_Form,
            Valid_To,
            SoldToParty,
            UOM,
            Contracttype,
            data: uniqueData
        };
    });
    
    



    // *************************Republish Nomination *****************************
  
    srv.on('getContractMatDetailsByGasday', async (req) => {
        const { DocNo, Gasday } = req.data;
    
        // Fetch all matching entries
        const query = SELECT.from('xGMSxCREATENOMINATION')
            .columns('Material', 'RedelivryPoint', 'Versn')
            .where({ Vbeln: DocNo, Gasday })
            .and('RedelivryPoint', '!=', '');
    
        const resultRes = await GMSNOMINATIONS_SRV.run(query);
    
        if (!resultRes || resultRes.length === 0) {
            return null;
        }
    
        // Find the entry with the latest version (max Versn)
        const latestEntry = resultRes.reduce((max, entry) => 
            parseInt(entry.Versn) > parseInt(max.Versn) ? entry : max, resultRes[0]);
    
        return latestEntry;
    });
    

    srv.on('getRenominationContractData', async (req) => {
        const { DocNo, Material, Redelivery_Point, Gasday } = req.data;
        const currentDate = new Date().toISOString().split('T')[0];
    
        // Fetch data from xGMSxFETCHNOMINATION
        const queryNomination = SELECT.from('xGMSxFETCHNOMINATION')
            .columns(
                'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point',
                'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To',
                'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype'
            )
            .where({ DocNo });
    
        const resultNomination = await GMSNOMINATIONS_SRV.run(queryNomination);
        if (!resultNomination?.length) {
            return null;
        }
    
        // Filter by Material and Redelivery_Point
        const matfilter = resultNomination.filter(item =>
            item.Material === Material && item.Redelivery_Point === Redelivery_Point
        );
    
        if (!matfilter.length) {
            return null;
        }
    
        // Get unique items
        const uniqueItems = new Set(matfilter.map(item => item.Item));
        let filteredResults = matfilter;
    
        // If more than one item, filter based on current date
        if (uniqueItems.size > 1) {
            filteredResults = matfilter.filter(item =>
                item.Valid_Form <= currentDate && item.Valid_To >= currentDate
            );
        }
    
        if (!filteredResults.length) {
            return null;
        }
    
        // Find min/max Valid_Form and Valid_To dates
        const minValidForm = filteredResults.reduce((min, item) => item.Valid_Form < min ? item.Valid_Form : min, filteredResults[0].Valid_Form);
        const maxValidTo = filteredResults.reduce((max, item) => item.Valid_To > max ? item.Valid_To : max, filteredResults[0].Valid_To);
    
        // Fetch data from xGMSxCREATENOMINATION
        const queryCreateNomination = SELECT.from('xGMSxCREATENOMINATION')
            .columns(
                'Gasday', 'Vbeln', 'ItemNo', 'NomItem', 'Versn',
                'DeliveryPoint', 'RedelivryPoint', 'ValidTo', 'ValidFrom',
                'Material', 'Pdnq', 'Rpdnq', 'Event'
            )
            .where({ Vbeln: DocNo, Material, Gasday });
    
        const resultCreateNomination = await GMSNOMINATIONS_SRV.run(queryCreateNomination);
    
        if (!resultCreateNomination?.length) {
            return null;
        }
    
        // Get the latest version entry
        const latestEntry = resultCreateNomination.reduce((max, entry) => 
            parseInt(entry.Versn) > parseInt(max.Versn) ? entry : max, resultCreateNomination[0]
        );
    
        // Find matching entries for DeliveryPoint and RedeliveryPoint
        const deliveryData = resultCreateNomination.find(item => 
            item.DeliveryPoint === matfilter[0].Delivery_Point && item.Versn === latestEntry.Versn
        );
    
        const redeliveryData = resultCreateNomination.find(item => 
            item.RedelivryPoint === matfilter[0].Redelivery_Point && item.Versn === latestEntry.Versn
        );
    
        // Extract main fields from first matched result
        const {
            Item, Delivery_Point, Delivery_Dcq, Redelivery_Dcq,
            SoldToParty, UOM, Contracttype
        } = filteredResults[0];
    
        // Remove duplicates from 'data'
        const uniqueData = [];
        const seen = new Set();
        filteredResults.forEach(({ Calculated_Value, Clause_Code }) => {
            const key = `${Calculated_Value}-${Clause_Code}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueData.push({ Calculated_Value, Clause_Code });
            }
        });
    
        return {
            Gasday,
            DocNo,
            Item,
            Material,
            Redelivery_Point,
            Delivery_Point,
            Delivery_Dcq,
            Redelivery_Dcq,
            Valid_Form: minValidForm,
            Valid_To: maxValidTo,
            SoldToParty,
            UOM,
            Contracttype,
            Delivery_ValidFrom: deliveryData?.ValidFrom || null,
            Delivery_ValidTo: deliveryData?.ValidTo || null,
            Redelivery_ValidFrom: redeliveryData?.ValidFrom || null,
            Redelivery_ValidTo: redeliveryData?.ValidTo || null,
            Pdnq: deliveryData?.Pdnq || "0.000",
            Rpdnq: redeliveryData?.Rpdnq || "0.000",
            Event: deliveryData?.Event || redeliveryData?.Event || null,
            data: uniqueData
        };
    });

    srv.on('CREATE', 'systemNomination', async (req) => {
        const {  Vbeln, soldToParty, Material, Rdcq, Uom, RedelivryPoint, Rpdnq, ValidTo, ValidFrom } = req.data;
    
       
        if ( !Vbeln) {
            return req.error(400, "Gasday and Vbeln are required");
        }
    
        const SystemNomData = {Vbeln, soldToParty, Material, Rdcq, Uom, RedelivryPoint, Rpdnq, ValidTo, ValidFrom };
    
        try {
            await cds.run(INSERT.into('app.gms.nomination.systemNomination').entries(SystemNomData));
            return SystemNomData;
        } catch (error) {
            console.error("Error creating SystemNomData:", error);
            return req.error(500, `Failed to create SystemNomData: ${error.message}`);
        }
    });
    srv.on('createSystemNom', async (req) => {
        try {
            const { Vbeln } = req.data;    
            
        } catch (error) {
            
            return req.error(500, error);
        }
    });
    
    
    
    
    
   
    
   

});