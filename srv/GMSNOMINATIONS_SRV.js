const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const GMSNOMINATIONS_SRV = await cds.connect.to("GMSNOMINATIONS_SRV"); 
      srv.on('READ', 'xGMSxCREATENOMINATION', req => GMSNOMINATIONS_SRV.run(req.query)); 
}