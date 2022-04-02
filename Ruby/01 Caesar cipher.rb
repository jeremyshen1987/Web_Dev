alphabat = ('a'..'z').to_a

str = "What a string!"

str_arr = str.split('')

puts str_arr

str_arr_num= str_arr.map{ |letter|
    if alphabat.include?(letter)
        letter = alphabat.index(letter)
    else
        letter
    end
    
}


