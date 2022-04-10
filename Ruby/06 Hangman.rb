class Game

    attr_accessor :secret_word, :masked_word, :missed_word
    attr_reader :attempts


    def initialize(secret_word)
        @secret_word = secret_word
        @masked_word = ""
        @missed_word = []
        @attempts = 15
    end


    def create_masked_word

        secret_word.length.times{ @masked_word.concat("_ ") } 
    end 
    
    
    
    
    def replace_word(guess)
    
        word_arr = secret_word.split('')
        word_arr.each_with_index do |word, idx|
            masked_word[idx * 2] = word if word == guess
        end
        puts "you guess is correct!\n"
        sleep(1)
    end
    
    
    def validate(guess)
    
        if secret_word.include?(guess)
            replace_word(guess)
        else
            puts "Oops, that's the wrong guess!\n\n"
            missed_word.push(guess) if !missed_word.include?(guess)
            puts "Miss: #{missed_word}" 
            sleep(1)
        end
    end
    
    def game_over
    
        if !masked_word.include?('_')
    
            puts "Congrats!  You win!\n\n"
            puts masked_word
            return true
             
        elsif attempts == 0

            puts "Game over. You didn't get the whole word"
            return true
        end
    
    
    end
    
    def player_input
        
        puts "Which letter would yo like to guess?"
        letter = gets.chomp
        return letter if letter.length == 1 && letter =~ /[A-Za-z]/

        puts "ONE LETTER only! Try again: "
        player_input
    end

    def start_game

        create_masked_word

        until game_over

            puts "\n###########################\n\nyou have #{attempts} attempts left\n\n"
            puts "#{masked_word} \n\n"
            guess = player_input
            validate(guess)
            # game_over

            @attempts -= 1
        end
    end



    
    

end

play = Game.new('secret')
play.start_game
