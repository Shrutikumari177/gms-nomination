const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const externalService = await cds.connect.to('GMS_CONFIG');
    

    const GMSNOMINATIONS_SRV = await cds.connect.to("GMSNOMINATIONS_SRV");
    srv.on('READ', 'nomi_SaveSet', req => GMSNOMINATIONS_SRV.run(req.query));
    srv.on('CREATE', 'nomi_SaveSet', req => GMSNOMINATIONS_SRV.run(req.query));
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

            req.error(500, 'An unexpected error occurred while fetching nominations. Please try again later.');
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
    

    // srv.on('getContractDetailsAndPastNom', async (req) => {
    //     const { DocNo } = req.data;
    
    //     const query = SELECT.from('xGMSxFETCHNOMINATION')
    //         .columns('DocNo', 'Material', 'Redelivery_Point', 'Delivery_Point', 'Item')
    //         .where({ DocNo });
    
    //     const resultRes = await GMSNOMINATIONS_SRV.run(query);
    
    //     if (!resultRes || resultRes.length === 0) {
    //         return null; // Return null if no data found
    //     }
    
    //     // Filter out duplicate Item values
    //     const uniqueItems = [];
    //     const itemSet = new Set();
    
    //     for (const entry of resultRes) {
    //         if (!itemSet.has(entry.Item)) {
    //             itemSet.add(entry.Item);
    //             uniqueItems.push(entry);
    //         }
    //     }
    
    //     return uniqueItems; // Return filtered result with unique Item values
    // });


    // srv.on('getContractDetail', async (req) => {
    //     const { DocNo, Material, Redelivery_Point } = req.data; 
    //     console.log("Received:", DocNo, Material, Redelivery_Point);
    
    //     const query = SELECT.from('xGMSxFETCHNOMINATION')
    //         .columns(
    //             'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point', 
    //             'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To', 
    //             'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype'
    //         )
    //         .where({ DocNo });
    
    //     const resultRes = await GMSNOMINATIONS_SRV.run(query);
    //     console.log("Query Result:", resultRes);
    
    //     if (!resultRes?.length) {
    //         return null;
    //     }
    
    //     // Filter by Material and Redelivery_Point
    //     const matfilter = resultRes.filter(item => 
    //         item.Material === Material && item.Redelivery_Point === Redelivery_Point
    //     );
    //     console.log("Filtered Results:", matfilter);
    
    //     if (!matfilter.length) {
    //         return null;
    //     }
    
    //     // Destructure main fields from the first matched result
    //     const {
    //         Item,
    //         Delivery_Point,
    //         Delivery_Dcq,
    //         Redelivery_Dcq,
    //         Valid_Form,
    //         Valid_To,
    //         SoldToParty,
    //         UOM,
    //         Contracttype
    //     } = matfilter[0];
    
    //     // Remove duplicates from 'data' array
    //     const uniqueData = [];
    //     const seen = new Set();
    
    //     matfilter.forEach(({ Calculated_Value, Clause_Code }) => {
    //         const key = `${Calculated_Value}-${Clause_Code}`;
    //         if (!seen.has(key)) {
    //             seen.add(key);
    //             uniqueData.push({ Calculated_Value, Clause_Code });
    //         }
    //     });
    
    //     return {
    //         DocNo,
    //         Item,
    //         Material,
    //         Redelivery_Point,
    //         Delivery_Point,
    //         Delivery_Dcq,
    //         Redelivery_Dcq,
    //         Valid_Form,
    //         Valid_To,
    //         SoldToParty,
    //         UOM,
    //         Contracttype,
    //         data: uniqueData
    //     };
    // });


    // srv.on('getContractDetail', async (req) => {
    //     const { DocNo, Material, Redelivery_Point } = req.data; 
    //     console.log("Received:", DocNo, Material, Redelivery_Point);
    
    //     const query = SELECT.from('xGMSxFETCHNOMINATION')
    //         .columns(
    //             'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point', 
    //             'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To', 
    //             'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype'
    //         )
    //         .where({ DocNo });
    
    //     const resultRes = await GMSNOMINATIONS_SRV.run(query);
    //     console.log("Query Result:", resultRes);
    
    //     if (!resultRes?.length) {
    //         return null;
    //     }
    
    //     // Get current date in 'YYYY-MM-DD' format
    //     const currentDate = new Date().toISOString().split('T')[0];
    
    //     // Filter by Material, Redelivery_Point, and date range
    //     const filteredResults = resultRes.filter(item => 
    //         item.Material === Material &&
    //         item.Redelivery_Point === Redelivery_Point &&
    //         item.Valid_Form <= currentDate &&
    //         item.Valid_To >= currentDate
    //     );
    //     console.log("Filtered Results:", filteredResults);
    
    //     if (!filteredResults.length) {
    //         return null;
    //     }
    
    //     // Destructure main fields from the first matched result
    //     const {
    //         Item,
    //         Delivery_Point,
    //         Delivery_Dcq,
    //         Redelivery_Dcq,
    //         Valid_Form,
    //         Valid_To,
    //         SoldToParty,
    //         UOM,
    //         Contracttype
    //     } = filteredResults[0];
    
    //     // Remove duplicates based on Calculated_Value and Clause_Code
    //     const uniqueData = [];
    //     const seen = new Set();
    
    //     filteredResults.forEach(({ Calculated_Value, Clause_Code }) => {
    //         const key = `${Calculated_Value}-${Clause_Code}`;
    //         if (!seen.has(key)) {
    //             seen.add(key);
    //             uniqueData.push({ Calculated_Value, Clause_Code });
    //         }
    //     });
    
    //     return {
    //         DocNo,
    //         Item,
    //         Material,
    //         Redelivery_Point,
    //         Delivery_Point,
    //         Delivery_Dcq,
    //         Redelivery_Dcq,
    //         Valid_Form,
    //         Valid_To,
    //         SoldToParty,
    //         UOM,
    //         Contracttype,
    //         data: uniqueData
    //     };
    // });


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
    
        const query = SELECT.from('xGMSxCREATENOMINATION')
            .columns('Material', 'RedelivryPoint')
            .where({ Vbeln: DocNo, Gasday })
            .and('RedelivryPoint', '!=', '');
    
        const resultRes = await GMSNOMINATIONS_SRV.run(query);
    
        if (!resultRes || resultRes.length === 0) {
            return null;
        }
        return resultRes;
    });
    
    srv.on('getRenominationContractData', async (req) => {
        const { DocNo, Material, Redelivery_Point, Gasday } = req.data;
        console.log("Received:", DocNo, Material, Redelivery_Point, Gasday);
    
        // Fetch data from xGMSxFETCHNOMINATION
        const queryNomination = SELECT.from('xGMSxFETCHNOMINATION')
            .columns(
                'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point',
                'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To',
                'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype'
            )
            .where({ DocNo });
    
        const resultNomination = await GMSNOMINATIONS_SRV.run(queryNomination);
        console.log("Query Result (Nominations):", resultNomination);
    
        if (!resultNomination?.length) {
            return null;
        }
    
        // Filter by Material and Redelivery_Point
        const matfilter = resultNomination.filter(item =>
            item.Material === Material && item.Redelivery_Point === Redelivery_Point
        );
        console.log("Filtered Results (Nominations):", matfilter);
    
        if (!matfilter.length) {
            return null;
        }
    
        // Fetch data from xGMSxCREATENOMINATION with Gasday condition
        const queryCreateNomination = SELECT.from('xGMSxCREATENOMINATION')
            .columns(
                'Gasday', 'Vbeln', 'ItemNo', 'NomItem', 'Versn',
                'DeliveryPoint', 'RedelivryPoint', 'ValidTo', 'ValidFrom',
                'Material', 'Pdnq', 'Rpdnq'
            )
            .where({ Vbeln: DocNo, Material, Gasday });
    
        const resultCreateNomination = await GMSNOMINATIONS_SRV.run(queryCreateNomination);
        console.log("Query Result (Create Nominations):", resultCreateNomination);
    
        // Find matching entries for DeliveryPoint and RedeliveryPoint
        const deliveryData = resultCreateNomination.find(item => item.DeliveryPoint === matfilter[0].Delivery_Point);
        const redeliveryData = resultCreateNomination.find(item => item.RedelivryPoint === matfilter[0].Redelivery_Point);
    
        // Extract required fields
        const {
            Item, Delivery_Point, Delivery_Dcq, Redelivery_Dcq,
            Valid_Form, Valid_To, SoldToParty, UOM, Contracttype
        } = matfilter[0];
    
        // Remove duplicates from 'data' array
        const uniqueData = [];
        const seen = new Set();
    
        matfilter.forEach(({ Calculated_Value, Clause_Code }) => {
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
            Valid_Form,
            Valid_To,
            SoldToParty,
            UOM,
            Contracttype,
            Delivery_ValidFrom: deliveryData?.ValidFrom || null,
            Delivery_ValidTo: deliveryData?.ValidTo || null,
            Redelivery_ValidFrom: redeliveryData?.ValidFrom || null,
            Redelivery_ValidTo: redeliveryData?.ValidTo || null,
            Pdnq: deliveryData?.Pdnq || "0.000",
            Rpdnq: redeliveryData?.Rpdnq || "0.000",
            data: uniqueData
        };
    });
    
    



    // srv.on('getRenominationContractData', async (req) => {
    //     const { DocNo, Material, Redelivery_Point } = req.data; 
    //     console.log("Received:", DocNo, Material, Redelivery_Point);
    
    //     const query = SELECT.from('xGMSxFETCHNOMINATION')
    //         .columns(
    //             'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point', 
    //             'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To', 
    //             'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype'
    //         )
    //         .where({ DocNo });
    
    //     const resultRes = await GMSNOMINATIONS_SRV.run(query);
    //     console.log("Query Result:", resultRes);
    
    //     if (!resultRes?.length) {
    //         return null;
    //     }
    
    //     // Filter by Material and Redelivery_Point
    //     const matfilter = resultRes.filter(item => 
    //         item.Material === Material && item.Redelivery_Point === Redelivery_Point
    //     );
    //     console.log("Filtered Results:", matfilter);
    
    //     if (!matfilter.length) {
    //         return null;
    //     }
    
    //     // Destructure main fields from the first matched result
    //     const {
    //         Item,
    //         Delivery_Point,
    //         Delivery_Dcq,
    //         Redelivery_Dcq,
    //         Valid_Form,
    //         Valid_To,
    //         SoldToParty,
    //         UOM,
    //         Contracttype
    //     } = matfilter[0];
    
    //     // Remove duplicates from 'data' array
    //     const uniqueData = [];
    //     const seen = new Set();
    
    //     matfilter.forEach(({ Calculated_Value, Clause_Code }) => {
    //         const key = `${Calculated_Value}-${Clause_Code}`;
    //         if (!seen.has(key)) {
    //             seen.add(key);
    //             uniqueData.push({ Calculated_Value, Clause_Code });
    //         }
    //     });
    
    //     return {
    //         DocNo,
    //         Item,
    //         Material,
    //         Redelivery_Point,
    //         Delivery_Point,
    //         Delivery_Dcq,
    //         Redelivery_Dcq,
    //         Valid_Form,
    //         Valid_To,
    //         SoldToParty,
    //         UOM,
    //         Contracttype,
    //         data: uniqueData
    //     };
    // });
    
    
    
    

   

    // ********************* getContractDetailsAndPastNomByGasDay *****************
    // srv.on('getNominationsDetailByGasDay', async (req) => {
    //     const { Vbeln: rawVbeln, Gasday } = req.data;

    //     // Validate Vbeln
    //     const Vbeln = rawVbeln?.split('?')[0];
    //     if (!Vbeln) return req.error(400, 'Invalid request. Vbeln parameter is required.');

    //     console.log("[INFO] Fetching data for Vbeln:", Vbeln, " ,.....", Gasday);

    //     try {
    //         // Fetch data concurrently
    //         const [
    //             resultContractDetails,
    //             resultMinMax,
    //             resultDelOrRedlv,
    //             resultPastNom,
    //             resultContractMat,
    //             resultIntraDayNomi
    //         ] = await Promise.all([
    //             GMSNOMCP_GMS_SRV.run(SELECT.from('ZNOMMASTER5').where({ Vbeln })),
    //             GMSNOMCP_GMS_SRV.run(SELECT.from('ZNOMMASTER10').where({ Vbeln })),
    //             GMSNOMCP_GMS_SRV.run(SELECT.from('ZNOMMASTER7').where({ Vbeln })),
    //             GMSNOMCP_GMS_SRV.run(SELECT.from('xGMSxPast_Nom').where({ Vbeln })),
    //             GMSNOMCP_GMS_SRV.run(SELECT.from('ZNOMMASTER6').where({ Vbeln })),
    //             ZNOM_CREATE_SRV.run(SELECT.from('ZNOMCPDATA', ['Gasday', 'DeliveryPoint', 'RedelivryPoint', 'ValidTo', 'ValidFrom', 'Material', 'Pdnq', 'Uom1', 'Event']).where({ Vbeln, Gasday }))
    //         ]);

    //         if (!resultContractDetails.length) return req.error(404, 'No contract details found for the provided Vbeln.');

    //         const contractDetails = resultContractDetails[0];

    //         // Prepare lookup maps concurrently
    //         const [minMaxMap, delOrRedlvMap, pastNomMap, intraDayNomMap] = await Promise.all([
    //             Promise.resolve(resultMinMax.reduce((map, { ItemNo, Material, ClauseCode, CalculatedValue }) => {
    //                 const key = `${ItemNo}_${Material}`;
    //                 (map[key] = map[key] || []).push({ label: ClauseCode.trim(), value: CalculatedValue });
    //                 return map;
    //             }, {})),
    //             Promise.resolve(resultDelOrRedlv.reduce((map, item) => {
    //                 map[`${item.ItemNo}_${item.Material}`] = { RedeliveryPt: item.RedeliveryPt, DeliveryPt: item.DeliveryPt };
    //                 return map;
    //             }, {})),
    //             Promise.resolve(resultPastNom.reduce((map, item) => {
    //                 (map[`${item.Vbeln}_${item.Material}`] = map[`${item.Vbeln}_${item.Material}`] || []).push(item);
    //                 return map;
    //             }, {})),
    //             Promise.resolve(resultIntraDayNomi.reduce((map, item) => {
    //                 (map[item.Material] = map[item.Material] || []).push(item);
    //                 return map;
    //             }, {}))
    //         ]);

    //         const customResponse = resultContractMat.map(({ ItemNo, Material, DCQ, UOM }) => {
    //             const key = `${ItemNo}_${Material}`;
    //             return {
    //                 Vbeln: contractDetails.Vbeln,
    //                 Auart: contractDetails.Auart,
    //                 DocType: contractDetails.DocType,
    //                 ValidFrom: contractDetails.ValidFrom,
    //                 ValidTo: contractDetails.ValidTo,
    //                 ContractDescription: contractDetails.ContractDescription,
    //                 ItemNo,
    //                 Material,
    //                 DCQ,
    //                 UOM,
    //                 RedeliveryPt: delOrRedlvMap[key]?.RedeliveryPt || '',
    //                 DeliveryPt: delOrRedlvMap[key]?.DeliveryPt || '',
    //                 PastNominations: pastNomMap[`${contractDetails.Vbeln}_${Material}`] || [],
    //                 dynamicFields: [...(minMaxMap[key] || []), { label: "DCQ", value: DCQ }],
    //                 nominatedItems: intraDayNomMap[Material] || []
    //             };
    //         });

    //         console.log("[INFO] Query successful. Returning response", { count: customResponse.length });
    //         return customResponse;
    //     } catch (error) {
    //         console.error("[ERROR] Error processing getContractDetailsAndPastNom", error);
    //         return req.error(500, 'An unexpected error occurred while fetching contract details and nominations. Please try again later.');
    //     }
    // });


});