// Initial Data
let currentQuestion = 0; //Variável que irá armazenar a questão atual
let correctAnswers = 0;

showQuestion();

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Functions
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]; //Acessa a pergunta

        let pct = Math.floor((currentQuestion / questions.length) *100); //Cálculo da largura da barra de progressão superior

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none'; //Esconde a div scoreArea
        document.querySelector('.questionArea').style.display = 'block'; //Mostra a div questionArea

        document.querySelector('.question').innerHTML = q.question;//A div .question irá receber a questão
        document.querySelector('.options').innerHTM = ''; //As opções são zeradas

        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>` //Aqui são inseridas as opções (Detalhe para o parseInt(i) + 1)
                            //Obs: data-op servirá para armazenar o id da opção
        }
        document.querySelector('.options').innerHTML = optionsHtml; //Após optionsHtml ser preenchido com as alternativas, é incluido na div options

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent); //Coloca uma ação de clique em cada alternativa

        })

    } else{
        finishQuiz();
    }
}
function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op')); //Define a variável clickedOption com o atributo de data-op

    if(questions[currentQuestion].answer === clickedOption){
        console.log("ACERTOU!");
        correctAnswers += 1; //Aumenta +1 no contador de correctAnswers
    }
    currentQuestion += 1; //Aumenta +1 no contador de currentQuestion
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Vamos estudar, meu amigo';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if((points >= 30) && (points < 70)){
        document.querySelector('.scoreText1').innerHTML = 'Estude mais um pouco';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Estude mais um pouco';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }else if(points === 100){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block'; //Mostra a div score
    document.querySelector('.questionArea').style.display = 'none'; //Esconde a div questionArea
    document.querySelector('.progress--bar').style.width = `100%`; 
}
function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}
