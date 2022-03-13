
let para = [ "rock", "paper", "scissors"];

function computer_play(){
    return para[Math.floor(Math.random()*3)];
}



const player_pick = prompt('rock, paper or scissors ?').toLowerCase();
const computer_pick = computer_play();

console.log(computer_pick);

function single_round(player_pick,computer_pick){


    if (player_pick == computer_pick) {console.log("it's a tie!");}

    else {

        switch(player_pick){
            case "rock": computer_pick=="scissors" ? console.log('rock beats scissors. you win') :
                console.log('paper beats rock, you lose!')
            break;
            
            case "scissor": computer_pick=="paper" ? console.log('scisor beats paper. you win') :
                console.log('rock beats scissor, you lose!')
            break;

            case "paper": computer_pick=="rock" ? console.log('paper beats rock, you win') :
                console.log('scissor beats paper, you lose!')
            break;
        }
    }
    
}

single_round(player_pick,computer_pick);