import pandas as pd

def filter_states(input,output):
    states = ['GA', 'IL', 'IN', 'MI', 'MN', 'NE', 'NC', 'OH', 'OK', 'SC', 'WI']

    df = pd.read_csv(input)

    filtered_df = df[df['Abbreviation'].isin(states)]

    filtered_df.to_csv(output, index=False)

if __name__ == '__main__':
    filter_states('reforestationDB.csv','filter-reforest.csv')
