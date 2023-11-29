import re

def read_lines_from_file(input_file_path):
    with open(input_file_path, 'r', encoding='utf-8') as input_file:
        datalines = (line.rstrip('\r\n') for line in input_file)
        # Convert the generator to a list to store the lines
        lines = list(datalines)
    return lines

def write_tuples_to_file(tuples, output_file_path):
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
         output_file.write(tuples)      

# Example usage:
input_file_path = 'postal-codes-bih.txt'
output_file_path = 'insert-bih.txt'
result = read_lines_from_file(input_file_path)

string=''
# Display the result
for item in result:
    itemParts=item.split(' – ')
    postal_code = itemParts[0]
    city = itemParts[1].split(',')[0]
    string=string+"(N'"+city+"','"+postal_code+"',1),"
   
    #print(item)

write_tuples_to_file(string, output_file_path)
#(N'Prijes','79293',1);
# Write the lines to another file
# write_lines_to_file(result, output_file_path)
