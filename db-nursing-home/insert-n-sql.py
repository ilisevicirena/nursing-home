import re

def read_tuples_from_file(input_file_path):
    tuples = []

    with open(input_file_path, 'r', encoding='utf-8') as input_file:
        for line in input_file:
            # Use a regular expression to extract tuples
            tuple_match = re.findall(r"\(([^)]+)\)", line)

            if tuple_match:
                # Append the extracted tuples to the list
                tuples.extend(tuple_match)

    return tuples

def write_tuples_to_file(tuples, output_file_path):
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
         output_file.write(tuples)      

# Example usage:
input_file_path = 'output.txt'
output_file_path = 'output-2.txt'
result = read_tuples_from_file(input_file_path)

# Display the result
string=""
for item in result:
    item='(N'+item+'),'
    string+=item
    print(item)

write_tuples_to_file(string, output_file_path)