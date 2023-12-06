import pandas as pd
import numpy as np

def assign_classes(df, column_name, output_col, labels):
    col_sorted = df[column_name].sort_values().reset_index(drop=True)
    quantiles = [-float('inf')]

    n = 7
    for i in range(1, n):
        q = col_sorted.quantile(i / n)
        quantiles.append(q)
    quantiles.append(float('inf'))

    df[output_col] = pd.cut(df[column_name], bins=quantiles, labels=labels, right=False, duplicates='drop')
    return df


def update_csv(in_filename, out_filename, columns, class_columns, labels):
    df = pd.read_csv(in_filename)
    for i in range(len(columns)):
        name = columns[i]
        class_column = class_columns[i]
        label = labels[i]
        df = assign_classes(df, name, class_column, label)
    print(df.head())
    df.to_csv(out_filename, index=False)


def calculate_quantiles(df, column_name, n=7):
    col_sorted = df[column_name].sort_values().reset_index(drop=True)
    quantiles = [-float('inf')]

    for i in range(1, n):
        q = col_sorted.quantile(i / n)
        quantiles.append(q)

    quantiles.append(float('inf'))

    return quantiles