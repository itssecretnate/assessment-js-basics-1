
const passwordRequirements  = {
    // Setting these variables to 0 will disable the check.
    minLength: 8,
    maxLength: 0,
    minSpecialCharacters: 0,
    minCapLetter: 0, 
    minLowercaseLetter: 0,
    minNumber: 1,
}

// Specials character arrays for requirement checking
let specialCharacters  = ['/', '[', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', ';', "'", ':', '"', '\\', '|', ",", ".", "<", ">", "?", "]", "+"]
let capitalLetters  = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

//#region Error checking password requirements.
passwordRequirements.minLength = (passwordRequirements.minLength < 0) ? 0:passwordRequirements.minLength;

// Double check max Length. Want to make sure it's not below the min requirement.
passwordRequirements.maxLength = (passwordRequirements.maxLength < 0 || passwordRequirements.maxLength < passwordRequirements.minLength) ? 0:passwordRequirements.maxLength;
passwordRequirements.minSpecialCharacters = (passwordRequirements.minSpecialCharacters < 0) ? 0:passwordRequirements.minSpecialCharacters;
passwordRequirements.minCapLetter = (passwordRequirements.minCapLetter < 0) ? 0:passwordRequirements.minCapLetter;
passwordRequirements.minLowercaseLetter = (passwordRequirements.minLowercaseLetter < 0) ? 0:passwordRequirements.minLowercaseLetter;
//#endregion

const readline = require('readline');
const reader = readline.createInterface({ input: process.stdin, output: process.stdout});

reader.question("Welcome! Please enter a password: ", function(input){

    // This line closes the connection to the command line interface.
	reader.close()

    // Prevents the password field from being blank.
    if(input.length <= 0) {
        console.log("Input was empty.")

        if(input.length < 0) console.log("What in tarnation?!") //This should never get hit. SHOULD.
        return; 
    }
    else checkPassword(input);
});

function checkPassword(input) {
    let passwordMeetsRequirements = true;

    
    // Finally check for Lord of the Rings fans. Those guys are weird.
    if(input.toUpperCase() === "LOTR" || input.toUpperCase() === "LORDOFTHETHERINGS" || input.toUpperCase() === "LORD OF THE RINGS")
    {
        // They just get an instant fail.
        passwordMeetsRequirements = false;
        console.log("Cannot be a Lord of the rings fan.");
        return;
    }

    // Check password min
    if(passwordRequirements.minLength > 0 && input.length < passwordRequirements.minLength) {
        console.log(`Password is shorter than ${passwordRequirements.minLength} characters in length.`);
        passwordMeetsRequirements = false;
    }  

    // Check password max
    if(passwordRequirements.maxLength > 0 && input.length > passwordRequirements.maxLength) {
        console.log(`Password is longer than ${passwordRequirements.maxLength} characters in length.`);
        passwordMeetsRequirements = false;
    }

    // Check special characters
    if(passwordRequirements.minSpecialCharacters > 0 && !containsArrayCheck(input, specialCharacters)) {
        console.log(`Password contains less than ${passwordRequirements.minSpecialCharacters} special characters.`);
        passwordMeetsRequirements = false;
    }

    // Check capitalization
    if(passwordRequirements.minCapLetter > 0 && !containsArrayCheck(input, capitalLetters)) {
        console.log(`Password contains less than ${passwordRequirements.minCapLetter} capital letters.`);
        passwordMeetsRequirements = false;
    }

    // Check ...lowercaseization?
    if(passwordRequirements.minLowercaseLetter > 0 && !containsArrayCheck(input, lowercaseLetters)) {
        console.log(`Password contains less than ${passwordRequirements.minLowercaseLetter} lowercase letters.`);
        passwordMeetsRequirements = false;
    }

    // Check min number?
    if(passwordRequirements.minNumber > 0 && !containsArrayCheck(input, numbers)) {
        console.log(`Password contains less than ${passwordRequirements.minNumber} numbers.`);
        passwordMeetsRequirements = false;
    }

    // Finally if the password does or does not meet all of the requirements let the user know.
    if(passwordMeetsRequirements) console.log("Congrats! Your password meets the requirements.");
    else console.log("Sorry but your password did not meet the requirements.");
}

function containsArrayCheck(inputString, arrayToCompare)
{
    tokens = inputString.slice();
    specialSymbolsFound = [];

    containsCharactersFromArray = false;

    for(let i = 0; i < tokens.length; i++) {
        for(let j = 0; j < arrayToCompare.length; j++) {
            if(tokens[i] == arrayToCompare[j]) {
                specialSymbolsFound.push(tokens[i]);
            }
        }
    }
    
    if(specialSymbolsFound.length > 0) containsCharactersFromArray = true;

    return containsCharactersFromArray;
}
