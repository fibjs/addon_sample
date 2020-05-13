const fs = require('fs')
const path = require('path')

exports.mkdirp = function mkdirp (inputp) {
    try {
        if (!fs.exists(inputp))
            fs.mkdir(inputp);
    } catch (e) {
        mkdirp(path.dirname(inputp));
        try {
            fs.mkdir(inputp);
        } catch (e) {}
    }
}

exports.zipFileName = path.resolve(__dirname, 'fibjs_vender.zip')