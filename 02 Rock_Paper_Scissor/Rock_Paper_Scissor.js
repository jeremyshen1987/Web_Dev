
let para = [ "rock", "paper", "scissors"];

function computer_play(){
    return para[Math.floor(Math.random()*3)];
}

console.log(computer_play());

const player_pick = prompt('rock, paper or scissors ?').toLowerCase;
const computer_pick = computer_play();

function single_round(player_pick,computer_pick){
    
}