
def cipher_text(str, shift_factor)

alphabat_down = ('a'..'z').to_a
alphabat_Uppr = ('A'..'Z').to_a
alphabat = alphabat_down + alphabat_Uppr



str_arr = str.split('')


str_arr_num= str_arr.map{ |letter|
    if alphabat.include?(letter)
        letter = alphabat.index(letter)
    else
        letter
    end
}




shifted_str_num = str_arr_num.map{ |num|
    if num.class == Integer
        if (num < 26 && num + shift_factor > 26) || (num > 26 && num + shift_factor > 52)
            num = num + shift_factor - 26
        else
            num = num + shift_factor
        end

    else
        num
    end
}

shifted_arr = shifted_str_num.map { |num|
    if num.class == Integer
        num = alphabat[num]
    else 
        num
    end
}

cipher_text = shifted_arr.join('')

puts cipher_text

end

cipher_text('What a string!', 5)
