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

var res=0;
var clickedQuestionNum;
const correctlyAnsweredQuestions = [];
labels.forEach((label)=>{
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


function quizResult() {
   output.innerText = `Your score is ${res}`  
}
function validateTriangle(){
    const angles = document.querySelectorAll('.angle-input');
    var angleSum;
    angleSum = 0;
    let outputText = "";
    
    angles.forEach((angle)=>{
        angleSum += Number(angle.value);
        if(Number(angle.value == 0)){
            outputText = `This is not a valid triangle `;
        }
    });
    if(angleSum === 180){
        if(outputText==''){
            outputText = "It is a valid triangle";
        }
    } else{
        outputText = "It is not a valid triangle";
    }
    output.innerText = outputText;
}

function calcHypo(){
    const sides = document.querySelectorAll('.side-input');
    var hypotenuse;
    hypotenuse = Math.sqrt(Number(sides[0].value**2) + Number(sides[1].value**2));
    output.innerText = "The hypotenuse is : "+hypotenuse.toFixed(4);
}

function calcArea(){
    const sides = document.querySelectorAll('.input-text');
    const [a,b,c] = [Number(sides[0].value), Number(sides[1].value), Number(sides[2].value)];

    if(validateSides(a,b,c)){
    const sp = (a+b+c)/2;
    const area = Math.sqrt(sp*(sp-a)*(sp-b)*(sp-c));
    output.innerText = `The area of the triangle is ${area.toFixed(4)}`;
    } else output.innerText = `Enter valid side lengths, such that the sum of 2 sides is always bigger than the third side`;

}

function validateSides(a,b,c){
    const largestSide = Math.max(a,b,c);
    const smallestSide = Math.min(a,b,c);
    
    for(const i of [a,b,c]){
        if(i != smallestSide && i != largestSide){
            if ((i+smallestSide) > largestSide) return true;
            else return false;
        }
    }
}
