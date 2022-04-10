class Words
  
    attr_accessor :words
  
    def initialize
  
      @words = []
    end
  
    def load_words
  
      line = File.readlines('google-10000-english-no-swears.txt', chomp:true).each do |li|
        words.push(li) unless li.length < 5 || li.length > 12 || words.include?(li)
      end
    end
  
    def rand_word
      load_words
      return words[rand(100)]
    end
  
  end
  


class Game

    attr_accessor :secret_word, :masked_word, :missed_guess, :correct_guess
    attr_reader :attempts


    def initialize(secret_word)
        @secret_word = secret_word
        @masked_word = ""
        @missed_guess = []
        @correct_guess = []
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
            correct_guess.push(guess) unless correct_guess.include?(guess)
            replace_word(guess)
        else
            puts "Oops, that's the wrong guess!\n\n"
            missed_guess.push(guess) if !missed_guess.include?(guess) 
            sleep(1)
        end
    end
    
    def game_over
    
        if !masked_word.include?('_')
    
            puts "Congrats!  You win!\n\n"
            puts masked_word
            return true
             
        elsif attempts == 0

            puts "No attempts left. The word is: #{secret_word}"
            return true
        end
    
    
    end
    
    def player_input
        
        puts "Which letter would yo like to guess?"
        letter = gets.chomp
        return letter if letter.length == 1 && letter =~ /[a-z]/ && !correct_guess.include?(letter) && !missed_guess.include?(letter)
        if correct_guess.include?(letter) || missed_guess.include?(letter)
            puts "\nYou already guessed that.\n\n"
        else
            puts "ONE LOWERECASE LETTER only! Try again: "
        end
        
        player_input
    end

    def start_game

        create_masked_word

        until game_over
            puts "\nMissed: #{missed_guess}" unless missed_guess.empty?
            puts "###########################\n\nyou have #{attempts} attempts left\n\n"
            puts "#{masked_word} \n\n"
            guess = player_input
            validate(guess)
            # game_over

            @attempts -= 1
        end
    end



    
    

end


get_words = Words.new
play = Game.new(get_words.rand_word)
play.start_game
