#!/usr/bin/env fibjs

const fs = require('fs')
const path = require('path')
const http = require('http')
require('ssl').loadRootCerts()
const zip = require('zip')

const hc = new http.Client()

if (process.env.http_proxy) {
    hc.proxyAgent = process.env.http_proxy
    console.log(`[install] http hc using proxyAgent: ${hc.proxyAgent}`);
}

const commitsh = process.env.VENDER_COMMITISH || `63c465ce1c3b9c33057e61f8503874c7b29cf977`
const url = `https://github.com/fibjs/fibjs_vender/archive/${commitsh}.zip`

const { zipFileName } = require('./utils')

if (!fs.exists(zipFileName)) {
    console.info(`would download zip from ${url}`);
    const download_res = hc.get(url)

    if (download_res.statusCode !== 200) {
        console.error(`download error from url -- ${url}`);
        process.exit();
    }
    fs.writeFile(zipFileName, download_res.body.readAll());
}

const mkdirp = require('./utils').mkdirp
const VENDER_DIR = path.resolve(__dirname, './vender');

const zipFile = zip.open(zipFileName)

const topDir = zipFile.namelist()[0].split(path.sep)[0]
// process.exit()

if (process.platform === 'win32') {
    soft_extract()
} else {
    process.run('unzip', [ zipFileName ])
    if (fs.exists(VENDER_DIR))
        try {
            fs.unlink(VENDER_DIR)
        } catch (error) {}
    process.run('mv', [ topDir, 'vender' ])
}

process.exit();

function soft_extract () {
    const existed_dir = {};
    zipFile.namelist().forEach((zpath) => {
        if (!zpath.endsWith('.h') && !zpath.endsWith('.hpp')) return ;
    
        const tuple = zpath.split(path.sep)
        const relpath = tuple.slice(1).join(path.sep);
        
        if (
            !relpath.startsWith('exlib')
            && !relpath.startsWith('v8')
            && !relpath.startsWith('jssdk')
            && !relpath.endsWith('.cmake')
        ) return ;
    
        // is directory
        if (zpath.endsWith(path.sep)) return ;
    
        const tpath = path.resolve(VENDER_DIR, relpath);
    
        try {
            const dir = path.dirname(tpath);
            if (!existed_dir[dir]) {
                mkdirp(dir);
                existed_dir[dir] = true;
            }
    
            if (!fs.exists(tpath)) {
                zipFile.extract(zpath, tpath, () => void 0);
                console.log(`[extract] written ${tpath}`)
            }
                
        } catch (error) {}
    })
}
