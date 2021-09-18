# globfile
the .env alternative for changeable global variables!

# install
`npm i globfile --save`

# file structure
the file should be structured as such:
```py
IDENTIFIER: "VALUE" # create a key-value pair, the key being named IDENTIFIER with the sting value of VALUE

# and yes, comments really do exist in globfile
             # same with unnecessary whitespace!
```

# the rules
* <b>only</b> one tab or space is required when declaring new key-value pairs
    * that means there should only be one space or tab
    * the spaces/tabs before the key do not matter
    * this, obviously, does not go for comments

* values should be put in quotes, will always return a string
    * if it is not enclosed in quotes (eg. "x") you will get an error

* duplicate keys are <b>NOT</b> looked for, and you will <b>NOT</b> be warned of them
    * instead, whatever is first of the keys will be the return value

* key-value pairs on the same line is allowed but not reccomended

# example
```js
// Require globfile
const globfile = require('globfile');

// Setup options before initialization
// (^ Options chosen are default, this is just for demonstration pourposes)
globfile.options.globalFile = '.global';
globfile.options.nameConvention = true;

// DO NOT CHANGE options.tokens OR options.initialized

// Lex the globalFile provided in options
globfile.init();

// Search for key in object and log it
globfile.find('HI', (data) => {
    console.log(data);
});

// Append and re-initialize
globfile.append('HELLO', 'How are you?', (data, err) => {
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
`global#init()` lex the global file, this is required for globfile to work\
`global#find()` find a value in the tokens based off a key, will <b>always</b> return as string\
`global#append()` append to the global file (starts with newline)

## options
`globalFile ''` the file to use for globfile to work\
`nameConvention ?` capitalize all letters in keys when you append\
`tokens []` the tokens to use while finding with globfile, do not edit (unless you need to debug)\
`initialized ?` used to check if globfile is initialized, do not edit (unless you need to debug)