
const GameBoard = (function(){
    
    _board = [...Array(9).keys()]

    return {
        show_board: function (){
            console.log(_board)
        },

        place_marker: function(num, marker){
            _board[num] = marker
        },

        win_condition: function(){
            for(i = 0; i < 7; i += 3){
                if(_board[i] == _board[i + 1] && _board[i + 1] == _board[i + 2]){
                    win()
                }
            }

            for(i = 0; i < 3; i += 1){
                if(_board[i] == _board[i + 3] && _board[i + 3] == _board[i + 6]){
                    win()
                }
            }
            if((_board[0] == _board[4] && _board[4] == _board[8]) || (_board[2] == _board[4] && _board[4] == _board[6])){
                win()
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


const control = function(){

    // GameBoard.place_marker(3, 'X')

    // GameBoard.show_board()

}


const buttons = document.querySelectorAll('.grid')


buttons.forEach((button) => {
    button.onclick = function(){
        
        this.textContent = 'X'

        position = this.dataset.key
        GameBoard.place_marker(position, 'X')

    }
});