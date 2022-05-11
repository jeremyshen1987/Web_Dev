
const GameBoard = (function(){
    
    _board = [...Array(9).keys()]

    return {
        show_board: function (){
            console.log(_board)
        },

        place_marker: function(num, marker){
            _board[num] = marker
        },

        win: function(Current_Player){

            console.log(`${Current_Player.getName()} win!`)
        },

        win_condition: function(Current_Player){
            for(i = 0; i < 7; i += 3){
                if(_board[i] == _board[i + 1] && _board[i + 1] == _board[i + 2]){
                    this.win(Current_Player)
                }
            }

            for(i = 0; i < 3; i += 1){
                if(_board[i] == _board[i + 3] && _board[i + 3] == _board[i + 6]){
                    this.win(Current_Player)
                }
            }
            if((_board[0] == _board[4] && _board[4] == _board[8]) || (_board[2] == _board[4] && _board[4] == _board[6])){
                this.win(Current_Player)
            }
        },

        reset: function(){
            _board = [...Array(9).keys()]
        }


    }
    
})()


const player = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;

    return{
        getName,
        getMarker
    }
}


const control = (function(){

    const p1 = player('Player_1','X')
    const p2 = player('Player_2', 'O')


    const players = [p1, p2]

    let Current_Player = p1

    const buttons = document.querySelectorAll('.grid')


    buttons.forEach((button) => {

        button.onclick = function(){
            
            this.textContent = Current_Player.getMarker()

            position = this.dataset.key
            GameBoard.place_marker(position, Current_Player.getMarker())


            GameBoard.win_condition(Current_Player)

            Current_Player = players[1 - players.indexOf(Current_Player)]

        }

    });


})(player, GameBoard)


