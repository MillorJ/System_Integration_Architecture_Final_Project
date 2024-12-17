WORKING: 
crm-system: 
    cd crm-system
    node app.js


Errors: 
    cd inventory-system
    node app.js
        Error:
            Database connection error: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
                at _handleConnectionErrors (E:\SystemInteg\System_Integration_Architecture_Final_Project\node_modules\mongoose\lib\connection.js:1089:11)
                at NativeConnection.openUri (E:\SystemInteg\System_Integration_Architecture_Final_Project\node_modules\mongoose\lib\connection.js:1040:11) {
            reason: TopologyDescription {
                type: 'Unknown',
                servers: Map(1) { '127.0.0.1:27017' => [ServerDescription] },
                stale: false,
                compatible: true,
                heartbeatFrequencyMS: 10000,
                localThresholdMS: 15,
                setName: null,
                maxElectionId: null,
                maxSetVersion: null,
                commonWireVersion: 0,
                logicalSessionTimeoutMinutes: null
            },
            code: undefined
            }

  Support-system:
    cd inventory-system
    node app.js
    Error:
        (node:2340) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
        (Use `node --trace-warnings ...` to show where the warning was created)
        (node:2340) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
        Support System is running on port 3003
        Error connecting to Support Database: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
