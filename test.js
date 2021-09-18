// Require dotglobal
const globfile = require('./index');

// Setup options before initialization
// (^ Options chosen are default, this is just for demonstration pourposes)
globfile.options.globalFile = '.global';
globfile.options.nameConvention = true;

// Lex the globalFile provided in options
globfile.init();

// Search for key in object and log it
globfile.find('HI', (data, err) => {
    if(err)
        throw err;

    console.log(data);
});

// Append and re-initialize
globfile.append('HELLO', 'How are you?', (data, err) => {
    if(err)
        console.log(data, err);

    console.log(data);
});