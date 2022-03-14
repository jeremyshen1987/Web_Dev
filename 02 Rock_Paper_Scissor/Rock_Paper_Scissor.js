
let para = [ "rock", "paper", "scissors"];

function computer_play(){
    return para[Math.floor(Math.random()*3)];
}



function single_round(player_pick,computer_pick){


    if (player_pick == computer_pick) {console.log("it's a tie!");}

    else {

        switch(player_pick){
            case "rock": computer_pick=="scissors" ? (console.log('rock beats scissors. you win'), player_score+=1) :
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
    
}


let player_score = 0,
    computer_score = 0;


function main(){

    for(let i = 0; i < 5; i++){


        let player_pick = prompt('rock, paper or scissors ?').toLowerCase();
        const computer_pick = computer_play();

        while(true){

            if (player_pick !== 'rock' && player_pick !== 'paper' && player_pick !== 'scissors'){
                player_pick = prompt('invalid input! select one of them: rock, paper or scissors')
            }
            else{
                break;
            }
        }

        console.log(computer_pick);

        single_round(player_pick,computer_pick);

        console.log('player score: ' + player_score);
        console.log('computer score: ' + computer_score);

    };

(player_score > computer_score) ? console.log(`Game Over, you win! \n final score: Player:${player_score} Computer:${computer_score}`) :
(player_score < computer_score) ? console.log(`Game Over, Computer win! \n final score: Player:${player_score} Computer:${computer_score}`) :
console.log(`Game Over, Draw! \n final score: Player:${player_score} Computer:${computer_score}`);

}

main();
