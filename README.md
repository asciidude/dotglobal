# dotglobal
the .env alternative for changeable global variables!

# file structure
the file should be structured as such:
```py
IDENTIFIER: "VALUE" # create a key-value pair, the key being named IDENTIFIER with the sting value of VALUE

# and yes, comments really do exist in dotglobal
             # same with unnecessary whitespace!
```

# the rules
* <b>only</b> one tab or space is required when declaring new key-value pairs
    * that means there should only be one space or tab
    * this, obviously, does not go for comments

* values should be put in quotes, will always return a string
    * if it is not enclosed in quotes (eg. "x") you will get an error

* duplicate keys are <b>NOT</b> looked for, and you will <b>NOT</b> be warned of them
    * instead, whatever is first of the keys will be the return value

# example
```js
// Require dotglobal
const global = require('dotglobal');

// Setup options before initialization
// (^ Options chosen are default, this is just for demonstration pourposes)
global.options.globalFile = '.global';
global.options.nameConvention = true;

// DO NOT CHANGE options.tokens OR options.initialized

// Lex the globalFile provided in options
global.init();

// Search for key in object and log it
global.find('HI', (data) => {
    console.log(data);
});

// Append and re-initialize
global.append('HELLO', 'How are you?', (data, err) => {
    if(err)
        console.log(data, err);

    console.log(data);
});
```

# features
* find variables
* append to global file
* easy to use
* json alternative :>

# documentation

## functions
`global#init()` lex the global file, this is required for dotglobal to work\
`global#find()` find a value in the tokens based off a key, will <b>always</b> return as string\
`global#append()` append to the global file (starts with newline)

## options
`globalFile ''` the file to use for dotglobal to work\
`nameConvention ?` capitalize all letters in keys when you append\
`tokens []` the tokens to use while finding with dotglobal, do not edit (unless you need to debug)\
`initialized ?` used to check if dotglobal is initialized, do not edit (unless you need to debug)