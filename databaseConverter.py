import argparse
import csv
import json

def convert_folha_de_pagamentos(args):
    with open(args.file, newline='', encoding='utf-8') as csvfile:
        converted_json = []
        reader = csv.reader(csvfile)
        
        for line in reader:
            # print(line)
            if line[0] != '':
                cell = {'name': line[0], 'situation': line[3], 'role': line[4], 'type': line[5], 'date': line[6], 'workload': line[8], 'paymentType': line[9], 'wage': line[12]}
                converted_json.append(cell)

        with open(f'fdp-{converted_json[0]['date']}.json', 'w', encoding='utf-8') as file:
            json.dump(converted_json, file, indent=4)

# Função principal para configurar e analisar os argumentos
def main():
    parser = argparse.ArgumentParser(description="Database converter")

    subparsers = parser.add_subparsers(dest='command')

    # Define o subcomando para converter a folha de pagamentos
    parser_folha = subparsers.add_parser('folhaDePagamento', help='Convert csv to json of folha de pagamentos')
    parser_folha.add_argument('file', help='Csv file location')
    parser_folha.set_defaults(func=convert_folha_de_pagamentos)

    args = parser.parse_args()

    # Executa a função correspondente ao subcomando
    if hasattr(args, 'func'):
        args.func(args)
    else:
        parser.print_help()

if __name__ == '__main__':
    main()