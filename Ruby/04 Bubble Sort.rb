arr = [4,3,78,2,0,2]

def sort_array(arr)
    
    index = 0

    while index < arr.length - 1
        if arr[index] > arr[index + 1]
            temp = arr[index]
            arr[index] = arr[index + 1]
            arr[index + 1] = temp
        end
        index += 1
    end
    arr

end

while true
    sort_array(arr)
    puts "Current Array after loop: #{arr}"
    break if arr == arr.sort
end



