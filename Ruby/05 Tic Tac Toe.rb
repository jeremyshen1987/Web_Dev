class Board

    @@round_num = 1

    @@BOARD =  [
        [1,2,3],
        [4,5,6],
        [7,8,9]
        ]

    @@board_new_game = @@BOARD

    
    def self.display_board
        @@board_new_game.each do |arr|
            puts "    " + arr.each {|elm| elm}.join('-')
        end
    end

    def self.display_rounds
        @@round_num
    end

    def self.modify_round
        @@round_num += 1
    end

    def self.modify_board
        @@board_new_game
    end

    def self.win_condition
        a = @@board_new_game
        for i in 0..2
            if ( a[0][i] == a[1][i] && a[1][i] == a[2][i] ) || ( a[i][0] == a[i][1] && a[i][1] == a[i][2]) || ( a[0][0] == a[1][1] && a[1][1] == a[2][2] ) || ( a[0][2] == a[1][1] && a[1][1] == a[2][0] )
                return "you win"
            end
        end
    end

end


class Players

    attr_accessor :name, :marker
  

    def select_name(var_name)

        puts "\n\n#{var_name}, please enter your name: "
    
        while true
    
            player_name = gets.chomp
            if player_name.length < 12
              break
            end
            
            puts "please limit your name to 12 characters !"
            puts "Enter your name again: "
    
        end
    
        @name = player_name
    end

    def select_marker

        puts "\n\nNow select your marker (letter 'o' or 'x') "

        while true

            player_marker = gets.chomp
            if player_marker == 'o' || player_marker == 'x'
                break
            end
            puts "Either letter 'o' or 'x'. pick again: "
        end

        @marker = player_marker
    end
end


player1 = Players.new()
player2 = Players.new()

player1.select_name("player_1")
player1.select_marker

player2.select_name("player_2")
player2.marker = player1.marker =='o' ?  'x' : 'o'

puts "\n\nplayer 1 name is #{player1.name} and the marker is #{player1.marker}"
puts "player 2 name is #{player2.name} and the marker is #{player2.marker}\n\n"

i = 0
while i < 10

    puts "\n\nRound #{Board.display_rounds}\n\n"

    cur_player = Board.display_rounds.even? ? player2 : player1

    Board.display_rounds
    Board.display_board

    puts "\n\n#{cur_player.name}, select a number to place your marker: #{cur_player.marker}"

    board_dup = Board.modify_board
    validated =false

    while validated == false

        select_num = gets.chomp.to_i

        board_dup.each_with_index do |arr,row|
            arr.each_with_index do |elm,col|
                if elm == select_num
                    board_dup[row][col] = cur_player.marker
                    validated = true
                end
            
            end
        end
        
        puts "that's not a valid selection!" if validated == false
    end

    w = Board.win_condition
    if w == "you win"
        Board.display_board
        puts "\nGame Over! #{cur_player.name} win!\n"
        break
    end

    if i == 8
        Board.display_board
        puts "\nGame Over! It's a Draw!\n"
        break
    end

    Board.modify_round 
    i += 1
    
end