
let passwordRequirements  = {
    minLength: 10,
    maxLength: 20, // Don't want employees to have passwords they can't remember!
    
    // Need some security :(
    minSpecialCharacters: 1, 
    minCapLetter: 1, 
    minLowercaseLetter: 1,

    // Booleans to track if we want to enable the strict requirements or not.
    requireSpecialCharacter: true,
    requireCapLetter: true,
    requireLowercaseLetter: false,
    
    // Booleans to enable length requirements
    requireMinLength: true,
    requireMaxLength: false,
};

let specialSymbols  = [
    '!', '@', '#', '$', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', //and so on but I'm lazy. 
]

let passwordMeetsRequirements = false;

const readline = require('readline');
const reader = readline.createInterface({ input: process.stdin, output: process.stdout});

reader.question("Welcome! Please enter a password: ", function(input){

	// This line closes the connection to the command line interface.
	reader.close()

    // Check password min
    if(passwordRequirements.requireMinLength) {
        if(input.length < passwordRequirements.minLength) {
        console.log(`Sorry but your password is shorter than ${passwordRequirements.minLength} characters. Please enter something longer.`);
        passwordMeetsRequirements = false;
    }
    else {
        console.log("Password meets Min length.")
        passwordMeetsRequirements = true;
    }
}  

    // Check password max
    if(passwordRequirements.requireMaxLength) {

        if(input.length > passwordRequirements.maxLength) {
            console.log("Sorry your password is too long! Please enter something shorter than ${} characters in length. Please enter something shorter.");
            passwordMeetsRequirements = false;
        }
        else {
            console.log("Password meets max requirements")
            passwordMeetsRequirements = true;
        }
    }

    // if(passwordRequirements.requireSpecialCharacter) {
    //     checkForSpecialSymbols(input, specialSymbols);
    // }

    // Finally if the password does or does not meet all of the requirements let the user know.
    if(passwordMeetsRequirements) console.log("Congrats! Your password meets the requirements.");
    else console.log("Sorry but your password did not meet the requirements.");
});


// function checkForSpecialSymbols(inputString, arrayToCheck)
// {
//     tokens = inputString.split();

//     for(let i = 0; i < tokens.length; i++)
//     {
//         for(let j = 0; j <specialSymbols.length; j++)
//         {
//             if(tokens[i] === specialSymbols[j]) 
//         }
//     }

// }