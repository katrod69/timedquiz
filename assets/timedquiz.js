

const startBtn = document.querySelector(".startBtn");
const quitBtn = document.querySelector(".quitBtn button");
const restartBtn = document.querySelector(".restartBtn button");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeLine = document.querySelector("header .timeLine");
const timerText = document.querySelector(".timer .timerText");
const timerCount = document.querySelector(".timer .timerSec");

const nextBtn = document.querySelector("footer .nextBtn");
const bottom_ques_counter = document.querySelector("footer .totalQue");


startBtn.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); 
    showQuestions(0); 
    queCounter(1); 
    startTimer(60); 
    startTimerLine(0); 
 }


restartBtn.onclick = ()=>{
    quizBox.classList.remove("activeQuiz"); 
    showQuestions(0); 
    queCounter(1); 
    startTimer(60); 
    startTimerLine(0); 
 }

let timeValue =  60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart = resultBox.querySelector(".buttons .restart");
const quit = resultBox.querySelector(".buttons .quit");

restartBtn.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); 
    resultBox.classList.remove("activeResult"); 
    timeValue = 60; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timerText.textContent = "Time Left"; 
    nextBtn.classList.remove("show"); 
}
quitBtn.onclick = ()=>{
    window.location.reload(); 
}

nextBtn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuestions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timerText.textContent = "Time Left"; 
        nextBtn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult();
    }
}
// quiz questions
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    optionList.innerHTML = option_tag; 
    
    const option = optionList.querySelectorAll(".option");

    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = optionList.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        timeValue -= 10
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){ 
                optionList.children[i].setAttribute("class", "option correct"); 
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); 
    }
    nextBtn.classList.add("show"); 
}
function showResult(){
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult"); 
    const scoreText = resultBox.querySelector(".score_text");
    if (userScore > 3){ 
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore > 1){ 
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timerCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timerCount.textContent; 
            timerCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            const allOptions = optionList.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){ 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled"); 
            }
            nextBtn.classList.add("show"); 
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        timeLine.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}