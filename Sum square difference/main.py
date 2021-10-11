sum_square = square_sum = 0
for i in range(1, 101):
    sum_square += 1**2
    square_sum += i

square_sum = square_sum ** 2
resultat = square_sum ** 2 - sum_square
print("Résultat")
print(resultat)