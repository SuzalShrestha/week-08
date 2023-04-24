function firstStep(input) {
    // Your code here
    let arr = input.split("&");
    return arr;
}

function secondStep(input) {
    // Your code here
    let arr = [];
    input.forEach(element => {
        let miniArr = element.split("=");
        arr.push(miniArr);
    });
    return arr;
}

function thirdStep(input) {
    // Your code here
    //replace + with space
    let arr = [];
    input.forEach(element => {
        let miniArr = [];
        miniArr.push(element[0]);
        miniArr.push(element[1].replace("+", " "));
        arr.push(miniArr);
    });
    return arr;
}

function fourthStep(input) {
    // Your code here
    let arr = [];
    input.forEach(element => {
        let miniArr = [];
        miniArr.push(element[0]);
        miniArr.push(decodeURIComponent(element[1]));
        arr.push(miniArr);
    });
    return arr;
}

function fifthStep(input) {
    // Your code here
    let obj = {};
    input.forEach(element => {
        obj[element[0]] = element[1];
    });
    return obj;
}

function parseBody(str) {
    // Your code here
    let first = firstStep(str);
    let second = secondStep(first);
    let third = thirdStep(second);
    let fourth = fourthStep(third);
    let fifth = fifthStep(fourth);
    return fifth;
}

/******************************************************************************/
/******************* DO NOT CHANGE THE CODE BELOW THIS LINE *******************/

module.exports = {
    firstStep,
    secondStep,
    thirdStep,
    fourthStep,
    fifthStep,
    parseBody
};