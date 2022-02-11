
let passwordRequirements  = {

    //Theorhetically setting these variables to 0 will disable the requirement.
    minLength: 10,
    maxLength: 0, // Don't want employees to have passwords they can't remember!
    minSpecialCharacters: 1,
    minCapLetter: 1, 
    minLowercaseLetter: 1,

    // Booleans to track if we want to enable the strict requirements or not.
    requireSpecialCharacter: typeof(boolean),
    requireCapLetter: typeof(boolean),
    requireLowercaseLetter: typeof(boolean),
    
    // Booleans to enable length requirements
    requireMinLength: typeof(boolean),
    requireMaxLength: typeof(boolean),
};

// TODO: Add more checks for min and max numbers to make sure they aren't below 0
if(passwordRequirements.minLength < 0) passwordRequirements.minLength = 0;

// Double check max Length. Want to make sure it's not below the min requirement.

// if(passwordRequirements.maxLength < 0) passwordRequirements.maxLength = 0;
// if(passwordRequirements.maxLength < passwordRequirements.minLength) passwordRequirements.maxLength = 0;
passwordRequirements.maxLength = (passwordRequirements.maxLength < 0 || passwordRequirements.maxLength < passwordRequirements.minLength) ? 0:passwordRequirements.maxLength; //This should shorten the code compared to the last 2 lines.


if(passwordRequirements.minSpecialCharacters < 0) passwordRequirements.minSpecialCharacters = 0;
if(passwordRequirements.minCapLetter < 0) passwordRequirements.minCapLetter = 0;
if(passwordRequirements.minLowercaseLetter < 0) passwordRequirements.minLowercaseLetter = 0;

// Set password requirement booleans
passwordRequirements.requireMinLength = (passwordRequirements.minLength > 0) ? true:false;
passwordRequirements.requireMaxLength = (passwordRequirements.maxLength > 0) ? true:false;
passwordRequirements.requireSpecialCharacter = (passwordRequirements.minSpecialCharacters > 0) ? true:false;
passwordRequirements.requireCapLetter = (passwordRequirements.minCapLetter > 0) ? true:false;
passwordRequirements.requireLowercaseLetter = (passwordRequirements.minLowercaseLetter > 0) ? true:false;

// Specials character arrays for requirement checking
let specialCharacters  = ['/', '[', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', ';', "'", ':', '"', '\\', '|', ",", ".", "<", ">", "/", "?", "]", "+", "/"]
let capitalLetters  = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const readline = require('readline');
const reader = readline.createInterface({ input: process.stdin, output: process.stdout});

reader.question("Welcome! Please enter a password: ", function(input){

    let passwordMeetsRequirements = true;
    
	// This line closes the connection to the command line interface.
	reader.close()

    // Prevents the password field from being blank.
    if(input.length <= 0) {
        console.log("Input was empty.")

        if(input.length < 0) console.log("What in tarnation?!") //This should never get hit. SHOULD.
        return; 
    }

    // Finally check for Lord of the Rings fans. Those guys are weird.
    if(input.toUpperCase() === "LOTR" || input.toUpperCase() === "LORDOFTHETHERINGS" || input.toUpperCase() === "LORD OF THE RINGS")
    {
        // They just get an instant fail.
        passwordMeetsRequirements = false;
        console.log("Nice try.");
        return;
    }

    // Check password min
    if(passwordRequirements.requireMinLength && input.length < passwordRequirements.minLength) {
        console.log(`Sorry but your password is shorter than ${passwordRequirements.minLength} characters. Please enter something longer.`);
        passwordMeetsRequirements = false;
    }  

    // Check password max
    if(passwordRequirements.requireMaxLength && input.length > passwordRequirements.maxLength) {
        console.log("Sorry your password is too long! Please enter something shorter than ${} characters in length. Please enter something shorter.");
        passwordMeetsRequirements = false;
    }

    // Check special characters
    if(passwordRequirements.requireSpecialCharacter && !containsArrayCheck(input, specialCharacters)) {
        console.log("Your password does not contain any special characters!")
        passwordMeetsRequirements = false;
    }

    // Check capitalization
    if(passwordRequirements.requireCapLetter && !containsArrayCheck(input, capitalLetters)) {
        console.log("Your password does not contain any capital letters!")
        passwordMeetsRequirements = false;
    }

    // Check ...lowercaseization?
    if(passwordRequirements.requireLowercaseLetter && !containsArrayCheck(input, lowercaseLetters)) {
        console.log("Your password does not contain any lowercase letters!")
        passwordMeetsRequirements = false;
    }

    // Finally if the password does or does not meet all of the requirements let the user know.
    if(passwordMeetsRequirements) console.log("Congrats! Your password meets the requirements.");
    else console.log("Sorry but your password did not meet the requirements.");
});


function containsArrayCheck(inputString, arrayToCompare)
{
    tokens = inputString.slice();
    specialSymbolsFound = [];

    containsCharactersFromArray = false;

    for(let i = 0; i < tokens.length; i++)
    {
        for(let j = 0; j < arrayToCompare.length; j++)
        {
            //console.log(`Comparing ${tokens[i]} to ${arrayToCompare[j]}`)
            
            if(tokens[i] === arrayToCompare[j]) {
                specialSymbolsFound.push(tokens[i]);
            }
        }
    }
    //console.log(specialSymbolsFound.length);
    if(specialSymbolsFound.length > 0) containsCharactersFromArray = true;

    return containsCharactersFromArray;
}
