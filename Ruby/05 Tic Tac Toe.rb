class Board

    @@BOARD =  [
                [1,2,3],
                [4,5,6],
                [7,8,9]
                ]

    @@board_new_game = @@BOARD

    @@round_num = 0
    
    def self.display_board
        @@board_new_game.each do |arr|
            puts "    " + arr.each {|elm| elm}.join('-')
        end
    end


end


class Players

    attr_accessor :name, :marker
  
    def initialize(name,marker)

        @name = name
        @marker = marker
        
    end



end


class Main

    def select_name

        puts "please enter your name: "

        while true

            player_name = gets.chomp
            break if player_name.length < 12

            puts "please limit your name to 12 characters !"
            puts "Enter your name again: "

        end

        return player_name
    end

    def select_marker

        puts "Now select your marker (letter 'o' or 'x') "

        while true

            player_marker = gets.chomp
            break if player_marker == 'o' || player_marker == 'x'
            puts "Either letter 'o' or 'x'. pick again: "
        end

        return player_marker
    end

    player1_name = select_name
    player1_marker = select_marker

    player2_name = select_name
    player2_marker = player1_marker == 'o' ?  'x' : 'o'

    player1 = Players.new(player1_name, player1_marker)
    player2 = Players.new(player2_name, player2_marker)



    Board.display_board



end