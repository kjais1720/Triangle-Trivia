const nav = document.querySelector('nav');
const navToggle = document.querySelector('.toggle-nav');

navToggle.addEventListener('click',()=>{
    nav.classList.toggle('show');
})
const labels = document.querySelectorAll('label');
const output = document.querySelector('.output')

const answers = {
    'question1': '2',
    'question2': '3',
    'question3': '1',
    'question4': '2',
    'question5': '1',
    'question6': '2',
    'question7': '3',
    'question8': '1',
    'question9': '2',
    'question10': '3'
}

let res=0;
let clickedQuestionNum;
const correctlyAnsweredQuestions = [];

labels.forEach(label => {
    label.addEventListener('click', function(e) {
        clickedQuestionNum = label.children[0].name;
        if(label.children[0].value == answers[clickedQuestionNum]){
            if(!correctlyAnsweredQuestions.includes(clickedQuestionNum)){
                res++;
                correctlyAnsweredQuestions.push(clickedQuestionNum);
            }
        } else{
            if(res>0 && correctlyAnsweredQuestions.includes(clickedQuestionNum)){ //If the result is not already '0'
                res--;
            }
        }
    })
})


let quizResult = () => {
   output.innerText = `Your score is ${res}`  
}

let isInputPositiveAndNonZero = value => Number(value) >0 ? true : false;


let validateTriangle = () =>{
    const angles = document.querySelectorAll('.angle-input');
    let angleSum = 0;
    let outputText = "";

    angles.forEach(angle =>{
        if(angle.value!=0) angleSum += Number(angle.value);
        else outputText = "It is not a valid triangle."
    });

    if(angleSum === 180 && outputText === '') outputText = "It is a valid triangle";
    else outputText = "It is not a valid triangle";
    
    output.innerText = outputText;
}

let calcHypo = () => { 
    const sides = document.querySelectorAll('.side-input');
    let hypotenuse;

    if(isInputPositiveAndNonZero(sides[0].value) && isInputPositiveAndNonZero(sides[1].value)){
        hypotenuse = Math.sqrt(Number(sides[0].value**2) + Number(sides[1].value**2));
        output.innerText = "The hypotenuse is : "+hypotenuse.toFixed(4);
    } else output.innerText = "Value of sides must be positive & non-zero";
}

let calcArea = () => {
    let sides = document.querySelectorAll('.input-text');
    sides = [...sides];
    const [a,b,c] = sides.map(side => Number(side.value))
    // const [a,b,c] = [Number(sides[0].value), Number(sides[1].value), Number(sides[2].value)];
    
    let areSidesPositive = true;
    for(const n of [a,b,c]){
        !isInputPositiveAndNonZero(n) && (areSidesPositive = false);
    }
    
    if(validateSides(a,b,c) && areSidesPositive){
    const sp = (a+b+c)/2;
    const area = Math.sqrt(sp*(sp-a)*(sp-b)*(sp-c));
    output.innerText = `The area of the triangle is ${area.toFixed(2)}`;
    } else {
        if(!areSidesPositive) output.innerText = "Sides must be positive & Non-negative";
        else output.innerText = `The entered side lengths cannot form a triangle.`;
    }

}


// To validate whether the input sides will form a valid triangle or not.
//In a triangle, the sum of any two sides will always be bigger than the third side.
function validateSides(a,b,c){ 
    let sides = [a,b,c];
    const largestSideIndex = sides.indexOf(Math.max(a,b,c));
    const smallestSideIndex = sides.indexOf(Math.min(a,b,c));
    
    for(let i = 0; i<sides.length; i++){
        if(i != smallestSideIndex && i != largestSideIndex){ //The side which is neither the biggest nor the smallest
            return((sides[i]+sides[smallestSideIndex]) > sides[largestSideIndex]);
        }
    }
}
