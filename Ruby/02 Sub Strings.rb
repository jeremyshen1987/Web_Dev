
dictionary = ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"]
sorted_dictionary = dictionary.sort_by(&:length)

def count(kw_arr, word, word_count)

    i = 0

    while i <= (kw_arr.length - word.length) do

        constructed_word = kw_arr[i...(i + word.length)].join('')

        puts "current iteration #{i}"
        puts "constructed word is #{constructed_word}"

        if constructed_word == word
            if word_count[word] == nil
                word_count[word] = 1
                puts "count is 1"
            else
                word_count[word] += 1
                puts "count wnet up"
            end
        else
            puts "condition not met"

        end

        i += 1
    end

    return word_count
    
end


def main(*args, sorted_dictionary)

    word_count = {}
    args.each do |arg|

        puts "!!!!!!!!!!!!!!!!!#{arg}!!!!!!!!!!!!!!!"

        kw_arr = arg.downcase.split('')  

        sorted_dictionary.each do |word|

            puts "word from sorted_dictionary is #{word}"
            count(kw_arr, word, word_count)
            
        end
        
    end
    
    puts word_count
end

main("Howdy partner, sit down! How's it going?", "horn it sit below",sorted_dictionary)




