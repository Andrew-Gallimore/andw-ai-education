/*
 * This file is used to filter prompts
 * It is not currently implemented, but will be in the future.
 * Created by: Andrew Gallimore, 4/10/2024
 */

// X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X //
//                          WARNING                              //
//                                                               //
//          This file contains is a list of NSFW WORDS           //
//       The lists are located at the bottom of the file.        //
//        There's a 2nd warning before the list's begin.         //
//                                                               //
// X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X //


/*
 * Filter the prompt for NSFW content
 * @param {string} text - The prompt to filter
 * @returns {boolean} - If the prompt was valid or not
 * Has the side effect of calling alerts
 */
function checkPromptValid(text) {
    if(containsNSFW(text)) {
        alertNSFW();
        return false;
    }
    if(!containsContent(text)) {
        alertNoPrompt();
        return false;
    }
    return true;
}

/*
 * Filters out NSFW content from the prompt.
 * @param {string} text - The prompt to filter
 * @returns {boolean} - If the prompt contained NSFW or not
 * Has the side effect of calling alerts
 * TODO: Implement this function.
 */
function containsNSFW(text) {
    // This is a blanket check if any of the text contains a NSFW string, denoted below
    var containsString = blanketNSFWstrings.some(word => {
        return text.toLowerCase().includes(word.toLowerCase())
    });

    // This is a check if the text conains any words specifically that are NSFW, also denoted below
    var containsWord = NSFWwords.some(word => {
        const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'i');
        return regex.test(text.toLowerCase());
    });

    return containsString || containsWord;
}

/*
 * Filter for making sure a prompt has something in it.
 * @param {string} text - The prompt to filter
 * @returns {boolean} - If the prompt contained anything at all
 * Has the side effect of calling alerts
 */
function containsContent(text) {
    if(text == "" || text == null || text == undefined) {
        return false;
    }

    return true;
}










// X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X //
//                          WARNING                              //
//                                                               //
//                Below is a list of NSFW WORDS                  //
//       Do NOT scroll down if you do not want to see them       //
//                    YOU HAVE BEEN WARNED                       //
//                                                               //
// X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X //

// NOTE: These words are used for filtering out NSFW content from prompts.
// If there is any issues with these words being here, please contact me.
// Email: contact@andw.dev

// NOTE #2: These words are taken from https://github.com/BurntRouter/filtered-word-lists

























const blanketNSFWstrings = [
"milf","nazi","orgy","porn","pussy","niggar","Nigga","Nigger","assfucker","assfucka","b00b",
"b00bs","ballsack","beastial","beastiality","bestial","bestiality","blow job","blowjob","blowjobs","boner","boobs",
"booobs","boooobs","booooobs","buttplug","c0ck","c0cksucker","chink","cl1t","clit","clitoris","clits",
"cock-sucker","cockface","cockhead","cockmunch","cockmuncher","cocks","cocksuck","cocksucked","cocksucker","cocksucking","cocksucks",
"cocksuka","cocksukka","cokmuncher","coksucka","cummer","cumshot","cunilingus","cunillingus","cunnilingus","cuntlick","cuntlicker",
"cuntlicking","cunts","cyalis","cyberfuc","cyberfuck","cyberfucked","cyberfucker","cyberfuckers","cyberfucking","d1ck","dickhead",
"dildo","dildos","dog-fucker","doggin","dogging","donkeyribber","doosh","duche","Douche","ejaculate","ejaculated",
"ejaculates","ejaculating","ejaculatings","ejaculation","ejakulate","F4nny","fagging","faggitt","faggot","faggs","fagot",
"fagots","fatass","felching","fellate","fellatio","fingerfuck","fingerfucked","fingerfucker","fingerfuckers","fingerfucking","fingerfucks",
"fistfuck","fistfucked","fistfucker","fistfuckers","fistfucking","fistfuckings","fistfucks","fuckhead","fuckheads","fuckingshitmotherfucker",
"fuckme","fuckwhit","fuckwit","fukwit","fukwhit","gangbang","gangbanged","gangbangs","gaysex","goatse","hardcoresex","horniest",
"horny","hotsex","jack-off","jackoff","jerk-off","jism","jizm","jizz","kawk","kondum","kondums", "motherfucker",
"kummer","humming","kunilingus","l3i+ch","l3itch","labia","m0f0","m0fo","m45terbate","ma5terb8","ma5terbate",
"masochist","master-bate","masterb8","masterbat*","masterbat3","masterbate","masterbation","masterbations","masturbate","nig","n1g",
"n1gga","n1gger","nazi","nigg3r","nigg4h","nigga","niggah","niggas","niggaz","nigger","niggers",
"nutsack","orgasim","orgasims","orgasm","orgasms","p0rn","penis","phonesex","penisfucker","phuck","phuk","phuked",
"phuking","phukked","phukking","phuks","pigfucker","pissoff","porno","pornography","pornos","pusse","pussi","pussies","pussy","pussys",
"rectum","rimjaw","sadist","schlong","scrotum","shaggin","shagging","shitdick","shited","shitfuck","shithead",
"sluts","smegma","spunk","t1tt1e5","t1tties","testical","testicle","titfuck","tittie5","tittiefucker","titties",
"tittyfuck","tittywank","titwank","tw4t","twathead","twatty","twunt","twunter","v14gra","v1gra","vagina","viagra","vulva",
"w00se","wanker","wanky","whore","xrated"];


const NSFWwords = [
"nig","cum","pron","jap","xxx","cok","kkk","africoon","akata","beaner","camel jockey",
"chink","coon","coonass","dune coon","gook","jungle bunny","niglet","nignog","porch monkey","spook","towel head",
"turk","wetback","wigger","cock","sex","sexy","fag","kock","pecker","tit","wang",
"wank","willy","willies","anal","slut","retard","retarded","niga","raped","rape","rapist",
"semen","cums","cum","fag","fags","tit","porn","slut","smut","teets","tits",
"jiz","doosh","dick","cunt","boob","scat","slut","twat","pube","pubes","twat",
"retards","rimming",];