// Require dotglobal
const global = require('./index');

// Setup options before initialization
// (^ Options chosen are default, this is just for demonstration pourposes)
global.options.globalFile = '.global';
global.options.nameConvention = true;

// Lex the globalFile provided in options
global.init();

// Search for key in object and log it
global.find('HI', (data, err) => {
    if(err)
        throw err;

    console.log(data);
});

// Append and re-initialize
global.append('HELLO', 'How are you?', (data, err) => {
    if(err)
        console.log(data, err);

    console.log(data);
});