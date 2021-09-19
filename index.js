const fs = require('fs');
const moo = require('moo');

module.exports.options = {
    globalFile: '.global',
    nameConvention: true,
    initialized: true,
    tokens: []
}

const lexer = moo.compile({
    whitespace: /[ \t]+/,
    comment: /#.*?$/,
    identifier: /[a-zA-Z_][a-zA-Z_0-9]*/,
    equals: ':',
    value: /"(?:\\["\\]|[^\n"\\])*"/,
    newline: { match: [/\r\n/, /\n/], lineBreaks: true }
});

module.exports.init = async (callback) => {
    try {
        lexer.reset(fs.readFileSync(this.options.globalFile, 'utf-8'));

        while(true) {
            const token = (lexer.next());
        
            if(!token)
                break;
        
            this.options.tokens.push(token);
        }
    } catch(err) {
        if(!callback) return;
        callback('Error recieved (.init)', err);
    }

    this.options.initialized = true;
}

module.exports.append = async (key, value, callback) => {
    if(!this.options.initialized) {
        if(!callback) return;
        return callback('Error recieved (.append)', Error('globfile is not initialized'));
    }

    try {
        await fs.appendFileSync(this.options.globalFile, this.options.nameConvention ? `\r\n${key.toUpperCase()}: "${value}"` : `\r\n${key}: "${value}"`, 'utf-8');

        this.options.tokens = [];
        this.init();
        
        if(!callback) return;
        return callback(this.options.nameConvention ? `Wrote ${key.toUpperCase()}: "${value}"` : `Wrote ${key}: "${value}"` + `to ${this.options.globalFile}`, undefined);
    } catch (err) {
        if(!callback) return;
        return callback('Error recieved (.append)', err);
    }
}

const filter_arr = (arr, searchKey, callback) => {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].type === 'identifier') {
            if(arr[i].value === searchKey) {
                return callback(i);
            }
        }
    }
}

module.exports.find = async (searchKey, callback) => {
    if(!this.options.initialized) {
        if(!callback) return;
        return callback('Error recieved (.find)', Error('globfile is not initialized'));
    }
    
    filter_arr(this.options.tokens, searchKey, (i) => {
        if(!callback) return;

        const value = this.options.tokens[i + 3];
        if(value.type !== "value") return callback('Error recieved (.find)', Error('cannot read value that is not enclosed in parentethies ("x")'));

        return callback(value.value.toString().substring(1, value.value.length - 1), undefined);
    });
}