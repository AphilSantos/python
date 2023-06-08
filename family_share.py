def get_float_input(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")

def get_int_input(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please enter a valid integer.")

def get_yes_no_input(prompt):
    while True:
        answer = input(prompt).lower()
        if answer in ['yes', 'y']:
            return True
        elif answer in ['no', 'n']:
            return False
        else:
            print("Please answer with 'yes' or 'no'.")

def main():
    total_amount = get_float_input("Enter the total amount to be divided: ")
    num_siblings = get_int_input("Enter the number of siblings: ")

    sibling_shares = []

    for i in range(num_siblings):
        print(f"--- Sibling {i + 1} ---")
        
        is_single = get_yes_no_input("Is the sibling single? (yes/no): ")
        monthly_salary = get_float_input("Enter the monthly salary: ")
        monthly_expenses = get_float_input("Enter the monthly expenses: ")
        budget_allocation = get_float_input("Enter the budget allocation factor (e.g. 0.1 for 10%): ")
        
        if is_single:
            disposable_income = monthly_salary - monthly_expenses
        else:
            num_dependents = get_int_input("Enter the number of dependents: ")
            disposable_income = (monthly_salary - monthly_expenses) / (1 + num_dependents)
        
        share = disposable_income * budget_allocation
        sibling_shares.append(share)

    sum_of_shares = sum(sibling_shares)
    normalized_shares = [share * total_amount / sum_of_shares for share in sibling_shares]

    print("\n--- Result ---")
    for i, share in enumerate(normalized_shares):
        print(f"Share for sibling {i + 1}: {share:.2f}")

if __name__ == "__main__":
    main()
