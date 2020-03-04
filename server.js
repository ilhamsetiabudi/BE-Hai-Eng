const r = require('restify')
const pg = require('pg')
const dc = require('./Config/dbp.config.json')
const middleware = require('restify-cors-middleware')
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
var pool = new pg.Pool(dc.config)

pool.connect(function(err){
    if (err){
        console.log('Not able to get connection' + err);
        process.exit()
    } else {
        console.log('[DATABASE] connected');
        const server = r.createServer()
        const port = process.env.PORT || 3003 
        const cors = middleware({
            origins: ['*'],
            allowHeaders: ['Authorization']
        });
        
        server.pre(cors.preflight);
        server.use(cors.actual);
        server.use(r.plugins.queryParser())
        server.use(r.plugins.bodyParser({mapParams : false}))

        require('./Routes/routes')(server)
        
        server.listen(port, () => {
        console.log('[SERVER] running at port ' + port);
        })
    }
})
