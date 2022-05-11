
const GameBoard = (function(){
    
    _board = [...Array(9).keys()]

    return {
        show_board: function (){
            return _board
        },

        place_marker: function(num, marker){
            _board[num] = marker
        },

        win: function(Current_Player){

            const h1 = document.getElementsByTagName('h1')[0]
            h1.textContent = `${Current_Player.getName()} is the winner!`
            this.reset()
            
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

            const buttons = document.querySelectorAll('.grid')
            buttons.forEach((button) => {
                button.textContent = ''
            })
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
    const h1 = document.getElementsByTagName('h1')[0]

    h1.textContent = "Player_1 ('X') Next"

    buttons.forEach((button) => {

        button.onclick = function(){


            if(this.textContent == 'X' || this.textContent == 'O'){
                h1.textContent = 'invalid selection!'
                return
            }
            
            this.textContent = Current_Player.getMarker()

            position = this.dataset.key
            GameBoard.place_marker(position, Current_Player.getMarker())

            Current_Player = players[1 - players.indexOf(Current_Player)]
            h1.textContent = `${Current_Player.getName()}( ${Current_Player.getMarker()} ) Next`

            let tie =  GameBoard.show_board().every(function(e){
                return typeof(e) == 'string'
            }) 

            if (tie == true){
                h1.textContent = " It's a tie! "
                GameBoard.reset()
            }

            GameBoard.win_condition(Current_Player)
        }

    });


})(player, GameBoard)


