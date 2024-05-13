import json

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def stringify(value):
    if isinstance(value, str):
        return f"'{value}'"
    elif value is None:
        return 'NULL'
    return str(value)  # Convert non-string values to strings

def generate_insert_queries(data):
    queries = []
    if data:
        attributes = list(data[0].keys())  # Extract attribute names from the first person object
        for person in data:
            query = "EXEC "+procedure_name+" "
            query += ', '.join([f"@{attr}={stringify(person.get(attr))}" for attr in attributes])
            queries.append(query)
    return queries
    
if __name__ == "__main__":
    file_path = 'furniture-status-data.json'
    output_file_path = 'insert-proc-furniture-status.sql'
    procedure_name = 'changeFurnitureStatus'
    json_data = read_json_file(file_path)
    queries = generate_insert_queries(json_data)

    with open(output_file_path, 'w') as output_file:
        for query in queries:
            output_file.write(query + ";\n")
