const cds = require('@sap/cds');

const cron = require('node-cron');
const nodemailer = require('nodemailer');

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
    // srv.on('READ', 'Nominationlogic', async (req) => {
    //     try {
    //         const result = await externalService.run(SELECT.from('Nominationlogic'));
    //         return result;
    //     } catch (err) {
    //         console.error('Error fetching data from external service:', err);
    //         req.error(500, 'Failed to fetch data from external service.');
    //     }
    // })
    srv.on('READ', 'Nominationlogic', async (req) => {
        try {
            // Extract filters from the request
            const query = SELECT.from('Nominationlogic');
            
            if (req.query.SELECT.where) {
                query.where(req.query.SELECT.where);
            }
    
            const result = await externalService.run(query);
            return result;
        } catch (err) {
            console.error('Error fetching data from external service:', err);
            req.error(500, 'Failed to fetch data from external service.');
        }
    });
    

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
    

   

    srv.on('getContractDetail', async (req) => {
        const { DocNo, Material, Redelivery_Point } = req.data; 
        console.log("Received:", DocNo, Material, Redelivery_Point);
    
        const query = SELECT.from('xGMSxFETCHNOMINATION')
            .columns(
                'DocNo', 'Item', 'Material', 'Redelivery_Point', 'Delivery_Point', 
                'Delivery_Dcq', 'Redelivery_Dcq', 'Valid_Form', 'Valid_To', 
                'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype','Profile'
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
            Contracttype,
            Profile
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
            Profile,
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
                'Calculated_Value', 'Clause_Code', 'SoldToParty', 'UOM', 'Contracttype','Profile'
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
    
        // If multiple items exist, filter based on current date
        if (uniqueItems.size > 1) {
            filteredResults = matfilter.filter(item =>
                item.Valid_Form <= currentDate && item.Valid_To >= currentDate
            );
        }
    
        if (!filteredResults.length) {
            return null;
        }
    
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
    
        // Finding matching entries for DeliveryPoint and RedeliveryPoint
        const deliveryData = resultCreateNomination.find(item => 
            item.DeliveryPoint === matfilter[0].Delivery_Point && item.Versn === latestEntry.Versn
        );
    
        // Finding the latest non-zero Rpdnq entry
        let redeliveryData = resultCreateNomination
            .filter(item => item.RedelivryPoint === matfilter[0].Redelivery_Point)
            .sort((a, b) => parseInt(b.Versn) - parseInt(a.Versn)) // Sort by version descending
            .find(item => parseFloat(item.Rpdnq) > 0) || resultCreateNomination.find(item => item.RedelivryPoint === matfilter[0].Redelivery_Point);
    
        // Extracting main fields from first matched result
        const {
            Item, Delivery_Point, Delivery_Dcq, Redelivery_Dcq,
            SoldToParty, UOM, Contracttype,Profile
        } = filteredResults[0];
    
        // Removing duplicates from 'data'
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
            Profile,
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
    srv.on('updateNomination', async (req) => {
        try {
            const { nominations } = req.data;  // Explicitly extract `nominations`
            console.log("Received Data:", nominations);
    
            if (!Array.isArray(nominations) || nominations.length === 0) {
                return req.error(400, "Invalid nominations data. Expected a non-empty array.");
            }
    
            let updateResults = [];
    
            for (const nomination of nominations) {
                const {
                    Gasday, Vbeln, ItemNo, NomItem, DeliveryPoint, RedelivryPoint, ValidTo, ValidFrom,
                    Material, Timestamp, Nomtk, Kunnr, Auart, Ddcq, Rdcq, Uom1, Pdnq, Event,
                    Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, CustGrp, SrvProfile
                } = nomination;
    
                if (!Gasday || !Vbeln) {
                    updateResults.push({ Gasday, Vbeln, status: "Missing required fields: Gasday or Vbeln" });
                    continue;
                }
    
                const formattedGasday = new Date(Gasday).toISOString().split("T")[0];
    
                const query = UPDATE('nomi_SaveSet')
                    .set({
                        ItemNo, NomItem, DeliveryPoint, RedelivryPoint, ValidTo, ValidFrom,
                        Material, Timestamp, Nomtk, Kunnr, Auart, Ddcq, Rdcq, Uom1, Pdnq, Event,
                        Adnq, Rpdnq, Znomtk, Src, Remarks, Flag, Action, Path, CustGrp, SrvProfile
                    })
                    .where({ Gasday: formattedGasday, Vbeln });
    
                const affectedRows = await GMSNOMINATIONS_SRV.run(query) 
    
                updateResults.push({
                    Gasday, 
                    Vbeln, 
                    status: affectedRows > 0 ? "Updated successfully" : "No matching record found for update"
                });
            }
    
            return updateResults;
        } catch (error) {
            console.error("Error updating nominations:", error);
            return req.error(500, "Internal Server Error");
        }
    });

    srv.on('CREATE', 'systemNomination', async (req) => {
        let { Vbeln, soldToParty, Material, Rdcq, Uom, RedelivryPoint, Rpdnq, ValidTo, ValidFrom } = req.data;
    
        if (!Vbeln) {
            return req.error(400, "Vbeln is required");
        }
    
        if (!ValidFrom || !ValidTo) {
            return req.error(400, "Valid From and Valid To dates are required");
        }
    
        if (new Date(ValidFrom) > new Date(ValidTo)) {
            return req.error(400, "Valid From date cannot be later than Valid To date");
        }
    
        ValidFrom = new Date(ValidFrom).toISOString().split("T")[0];
        ValidTo = new Date(ValidTo).toISOString().split("T")[0];
    
        const SystemNomData = { Vbeln, soldToParty, Material, Rdcq, Uom, RedelivryPoint, Rpdnq, ValidTo, ValidFrom };
    
        try {
            await cds.run(INSERT.into('app.gms.nomination.systemNomination').entries(SystemNomData));
            return SystemNomData;
        } catch (error) {
            console.error("Error creating SystemNomData:", error);
            return req.error(500, `Failed to create SystemNomData: ${error.message}`);
        }
    });

/* ******************* function to generate automatic Nomination everyday ******************/

    // async function generateVirtualNominations(req = null) {
    //     const db = cds.transaction(req || this); // Initialize transaction inside function
    //     const currentDate = new Date();
    //     currentDate.setDate(currentDate.getDate() + 1);
    //     const tomorrow = currentDate.toISOString().split('T')[0];

    //     try {
    //         console.log("🔹 Fetching contracts from systemNomination table...");

    //         const contracts = await db.run(SELECT.from('app.gms.nomination.systemNomination'));

    //         console.log("✅ Contracts retrieved:", contracts.length);

    //         const validContracts = contracts.filter(c =>
    //             tomorrow >= c.ValidFrom && tomorrow <= c.ValidTo
    //         );

    //         console.log("✅ Valid contracts for tomorrow:", validContracts.length);

    //         if (validContracts.length === 0) {
    //             console.log("⚠ No valid contracts found for tomorrow.");
    //             return [];
    //         }

    //         let createdNominations = [];

    //         for (const contract of validContracts) {
    //             let nomi_toitem = [{
    //                 Gasday: tomorrow,
    //                 Vbeln: contract.Vbeln,
    //                 ItemNo: "10",
    //                 NomItem: "10",
    //                 Versn: "",
    //                 DeliveryPoint: "",
    //                 RedelivryPoint: contract.RedelivryPoint,
    //                 ValidTo: "06:00:00",
    //                 ValidFrom: "06:00:00",
    //                 Material: contract.Material,
    //                 Auart: "ZGSA",
    //                 Ddcq: "0.000",
    //                 Rdcq: contract.Rdcq,
    //                 Uom1: contract.Uom,
    //                 Event: "No-Event",
    //                 Adnq: "0.000",
    //                 Rpdnq: contract.Rpdnq
    //             }];

    //             let createNomPayload = {
    //                 Gasday: tomorrow,
    //                 Vbeln: contract.Vbeln,
    //                 nomi_toitem
    //             };

    //             console.log("🔹 Creating nomination entry:", createNomPayload);

    //             try {
                    
    //                 const newNomination = await GMSNOMINATIONS_SRV.run(INSERT.into('znom_headSet').entries(createNomPayload));
             
    //                 console.log("✅ Nomination created successfully:", newNomination);
    //                 createdNominations.push(newNomination);
    //             } catch (error) {
    //                 console.error("❌ Error while creating nomination:", error.message);
    //             }
    //         }

    //         console.log("✅ Total nominations created:", createdNominations.length);
    //         return createdNominations;

    //     } catch (error) {
    //         console.error("❌ Error in VirtualNominations Job:", error.message);
    //         return [];
    //     }
    // }



    // async function generateVirtualNominations(req = null) {
    //     const db = cds.transaction(req || this);
    //     const currentDate = new Date();
    //     currentDate.setDate(currentDate.getDate() + 1);
    //     const tomorrow = currentDate.toISOString().split('T')[0];
    
    //     try {
    //         console.log("🔹 Fetching contracts from systemNomination table...");
    //         const contracts = await db.run(SELECT.from('app.gms.nomination.systemNomination'));
    
    //         console.log("✅ Contracts retrieved:", contracts.length);
    
    //         const validContracts = contracts.filter(c =>
    //             tomorrow >= c.ValidFrom && tomorrow <= c.ValidTo
    //         );
    
    //         console.log("✅ Valid contracts for tomorrow:", validContracts.length);
    
    //         if (validContracts.length === 0) {
    //             console.log("⚠ No valid contracts found for tomorrow.");
    //             return [];
    //         }
    
    //         let createdNominations = [];
    
    //         for (const contract of validContracts) {
    //             let nomi_toitem = [{
    //                 Gasday: tomorrow,
    //                 Vbeln: contract.Vbeln,
    //                 ItemNo: "10",
    //                 NomItem: "10",
    //                 Versn: "",
    //                 DeliveryPoint: "",
    //                 RedelivryPoint: contract.RedelivryPoint,
    //                 ValidTo: "06:00:00",
    //                 ValidFrom: "06:00:00",
    //                 Material: contract.Material,
    //                 Auart: "ZGSA",
    //                 Ddcq: "0.000",
    //                 Rdcq: contract.Rdcq,
    //                 Uom1: contract.Uom,
    //                 Event: "No-Event",
    //                 Adnq: "0.000",
    //                 Rpdnq: contract.Rpdnq
    //             }];
    
    //             let createNomPayload = {
    //                 Gasday: tomorrow,
    //                 Vbeln: contract.Vbeln,
    //                 nomi_toitem
    //             };
    
    //             console.log("🔹 Creating nomination entry:", createNomPayload);
    
    //             try {
    //                 const newNomination = await GMSNOMINATIONS_SRV.run(INSERT.into('znom_headSet').entries(createNomPayload));    
    //                 console.log("✅ Nomination created successfully:", newNomination);
    //                 createdNominations.push(newNomination);
    //                 let CustomerEmail ="ashwani.sharma@ingenxtec.com"
    //                 // Send email notification
    //                 await sendNominationEmail(CustomerEmail, contract.Vbeln);
    
    //             } catch (error) {
    //                 console.error("❌ Error while creating nomination:", error.message);
    //             }
    //         }
    
    //         console.log("✅ Total nominations created:", createdNominations.length);
    //         return createdNominations;
    
    //     } catch (error) {
    //         console.error("❌ Error in VirtualNominations Job:", error.message);
    //         return [];
    //     }
    // }
    
    // // Function to send email
    // async function sendNominationEmail(email, salesOrder) {
    //     try {
    //         const transporter = nodemailer.createTransport({
    //             service: "gmail",
    //             auth: {
    //                 user: "deepanshugoyal2906@gmail.com",
    //                 pass: "oczl lrgb avot vfpv", 
    //             },
    //         });
    
    //         const mailConfig = {
    //             from: "deepanshugoyal2906@gmail.com",
    //             to: email,
    //             subject: `Notification for Sales Nomination ${salesOrder}`,
    //             text: `
    //                 Dear Customer,
                    
    //                 Your nomination for Sales Order ${salesOrder} has been successfully created. You can view the details in your account.
                    
    //                 Best regards,
    //                 Ingenx Technology Pvt Ltd
    //             `,
    //         };
    
    //         const res = await transporter.sendMail(mailConfig);
    //         console.log(`✅ Email sent successfully to ${email}:`, res.messageId);
    
    //     } catch (error) {
    //         console.error(`❌ Error sending email to ${email}:`, error.message);
    //     }
    // }

    async function generateVirtualNominations(req = null) {
        const db = cds.transaction(req || this);
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const tomorrow = currentDate.toISOString().split('T')[0];
    
        try {
            console.log("🔹 Fetching contracts from systemNomination table...");
            const contracts = await db.run(SELECT.from('app.gms.nomination.systemNomination'));
    
            console.log("✅ Contracts retrieved:", contracts.length);
    
            const validContracts = contracts.filter(c =>
                tomorrow >= c.ValidFrom && tomorrow <= c.ValidTo
            );
    
            console.log("✅ Valid contracts for tomorrow:", validContracts.length);
    
            if (validContracts.length === 0) {
                console.log("⚠ No valid contracts found for tomorrow.");
                return [];
            }
    
            let createdNominations = [];
            let nominationDetails = [];
    
            for (const contract of validContracts) {
                let nomi_toitem = [{
                    Gasday: tomorrow,
                    Vbeln: contract.Vbeln,
                    ItemNo: "10",
                    NomItem: "10",
                    Versn: "",
                    DeliveryPoint: "",
                    RedelivryPoint: contract.RedelivryPoint,
                    ValidTo: "06:00:00",
                    ValidFrom: "06:00:00",
                    Material: contract.Material,
                    Auart: "ZGSA",
                    Ddcq: "0.000",
                    Rdcq: contract.Rdcq,
                    Uom1: contract.Uom,
                    Event: "No-Event",
                    Adnq: "0.000",
                    Rpdnq: contract.Rpdnq
                }];
    
                let createNomPayload = {
                    Gasday: tomorrow,
                    Vbeln: contract.Vbeln,
                    nomi_toitem
                };
    
                console.log("🔹 Creating nomination entry:", createNomPayload);
    
                try {
                    const newNomination = await GMSNOMINATIONS_SRV.run(INSERT.into('znom_headSet').entries(createNomPayload));
                    console.log("✅ Nomination created successfully:", newNomination);
                    createdNominations.push(newNomination);
    
                    // Collect data for email report
                    nominationDetails.push({
                        ContractNo: contract.Vbeln,
                        Gasday: tomorrow,
                        Material: contract.Material,
                        DCQ: contract.Rdcq,
                        RPDNQ: contract.Rpdnq
                    });
                    
    
                } catch (error) {
                    console.error("❌ Error while creating nomination:", error.message);
                }
            }
    
            if (nominationDetails.length > 0) {
                let CustomerEmail = "ashwani.sharma@ingenxtec.com";
                await sendNominationEmail(CustomerEmail, nominationDetails);
            }
    
            console.log("✅ Total nominations created:", createdNominations.length);
            return createdNominations;
    
        } catch (error) {
            console.error("❌ Error in VirtualNominations Job:", error.message);
            return [];
        }
    }
    async function sendNominationEmail(email, nominations) {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "deepanshugoyal2906@gmail.com",
                    pass: "oczl lrgb avot vfpv",
                },
            });
    
            // Generate the table
            let tableRows = nominations.map(nom => `
                <tr>
                    <td style="border:1px solid #ddd; padding:8px;">${nom.ContractNo}</td>
                    <td style="border:1px solid #ddd; padding:8px;">${nom.Gasday}</td>
                    <td style="border:1px solid #ddd; padding:8px;">${nom.Material}</td>
                    <td style="border:1px solid #ddd; padding:8px;">${nom.DCQ}</td>
                    <td style="border:1px solid #ddd; padding:8px;">${nom.RPDNQ}</td>
                </tr>
            `).join("");
    
            let htmlContent = `
                <p>Dear Customer,</p>
                <p>Your nominations have been successfully created. Below are the details:</p>
                <table style="border-collapse:collapse; width:100%; border:1px solid #ddd;">
                    <tr>
                        <th style="border:1px solid #ddd; padding:8px; background-color:#f2f2f2;">Contract No</th>
                        <th style="border:1px solid #ddd; padding:8px; background-color:#f2f2f2;">Gas Day</th>
                        <th style="border:1px solid #ddd; padding:8px; background-color:#f2f2f2;">Material</th>
                        <th style="border:1px solid #ddd; padding:8px; background-color:#f2f2f2;">DCQ</th>
                        <th style="border:1px solid #ddd; padding:8px; background-color:#f2f2f2;">RPDNQ</th>
                    </tr>
                    ${tableRows}
                </table>
                <p>Best regards,</p>
                <p>Ingenx Technology Pvt Ltd</p>
            `;
    
            const mailConfig = {
                from: "deepanshugoyal2906@gmail.com",
                to: email,
                subject: "Nomination Report",
                html: htmlContent
            };
    
            const res = await transporter.sendMail(mailConfig);
            console.log(`✅ Email sent successfully to ${email}:`, res.messageId);
    
        } catch (error) {
            console.error(`❌ Error sending email to ${email}:`, error.message);
        }
    }
    
    
    
    

    cron.schedule("15 09 * * *", async () => {
        console.log("⏳ Running VirtualNominations job at 14:45 IST...");
        await generateVirtualNominations();
    });
    
    
    
    
    
    
    

    srv.on('READ', 'VirtualNominations', async (req) => {
        console.log("🔹 Manually triggering VirtualNominations job...");
        // return await generateVirtualNominations(req);
    });
// ******************************************************************************************************
    






    
    








   


    


    


    


    
  
});