
const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click',single_round))



let para = [ "rock", "paper", "scissor"];

function computer_play(){
    return para[Math.floor(Math.random()*3)];
}

let player_score = 0,
    computer_score = 0;



function single_round(){


    const computer_pick = computer_play();
    const player_pick = this.classList.value;

    console.log('AI pick ' + computer_pick)
    console.log('your pick ' + player_pick)


    if (player_pick == computer_pick) {console.log("it's a tie!");}

    else {

        switch(player_pick){
            case "rock": computer_pick=="scissor" ? (console.log('rock beats scissor. you win'), player_score+=1) :
                (console.log('paper beats rock, you lose!'), computer_score+=1)
            break;
            
            case "scissor": computer_pick=="paper" ? (console.log('scisor beats paper. you win'), player_score+=1) :
                (console.log('rock beats scissor, you lose!'), computer_score+=1)
            break;

            case "paper": computer_pick=="rock" ? (console.log('paper beats rock, you win'), player_score+=1) :
                (console.log('scissor beats paper, you lose!'), computer_score+=1)
            break;
        }
    }

    const selection = document.querySelector('.selection');
    selection.textContent = `You picked: ${player_pick} , Computer picked: ${computer_pick}`;

    const score = document.querySelector('.score');
    score.textContent = `Player Score: ${player_score}   Computer Score: ${computer_score}`


    if(player_score >= 5){

        selection.textContent = ''
        score.textContent = 'Hooray! You win 5 rounds first!'


        player_score = 0
        computer_score = 0



    } else if (computer_score >= 5){

        selection.textContent = ''
        score.textContent = 'Game Over! Computer win 5 rounds first'

        player_score = 0
        computer_score = 0


    }


    
}