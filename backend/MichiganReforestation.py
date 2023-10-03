import pandas as pd

land_prices_mi = pd.read_csv('land_prices_michigan.csv')
mich_vals = pd.read_csv('michigan_vals.csv')

land_prices = (land_prices_mi['Cost (dollars per acre)']).tolist()
mich_vals['Land_Prices'] = land_prices

mich_vals.to_csv('michigan_vals.csv', index=False)

