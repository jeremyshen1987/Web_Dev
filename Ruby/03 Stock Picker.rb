Arr = [17,3,6,9,15,8,6,1,13]

profict_dict = {}

difference = Arr.each do |price|

    current_day = Arr.find_index(price)
    future_day = Arr.find_index(price) + 1


    while future_day < Arr.length
        profit = Arr[future_day] - Arr[current_day] 

        # there is more than one possible combo to archieve max profit, hence append them to the array seperated by nil
        profict_dict[profit].push(nil,current_day,future_day) if profit > 0 && profict_dict.include?(profit)

        profict_dict[profit] = [current_day,future_day] if profit > 0 && profict_dict.include?(profit) == false
        future_day += 1
        
    end

end

max_profit_day = profict_dict.sort[-1]
puts max_profit_day
        

