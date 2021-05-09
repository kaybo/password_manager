import requests
import helper_methods

#change this as needed
host = "http://localhost:3000"

saved_username = ""
saved_password = ""

while True:
	try:
		helper_methods.menu()
		user_input = int(input("Input: "))
		print(" ")
	except ValueError:
		print("\nInvalid input\n")
		continue

	if user_input == 1:
		if len(saved_password) == 0 and len(saved_password) == 0:
			user_name = str(input('input username: '))
			password = str(input('input password: '))
			respond = helper_methods.login(host, user_name, password)
			if respond == 'login successful':
				saved_username = user_name
				saved_password = password
			print('\n', respond, '\n')
		else:
			print('\nYou are already logged in. Please log out first')

	elif user_input == 2:
		user_name = str(input('input username: '))
		password = str(input('input password: '))
		respond = helper_methods.create_user(host, user_name, password)
		print(respond)

	elif user_input == 3:
		if len(saved_password) > 0 and len(saved_password) > 0:
			account_name = str(input('input account name: '))
			account_password = str(input('input account password: '))
			respond = helper_methods.create_account(host, saved_username, saved_password, account_name, account_password)
			print(respond)
		else:
			print('\nPlease login first\n')

	elif user_input == 4:
		if len(saved_password) > 0 and len(saved_password) > 0:
			respond = helper_methods.show_account_list(host, saved_username, saved_password)
		else:
			print('\nPlease login first\n')

	elif user_input == 5:
		if len(saved_password) > 0 and len(saved_password) > 0:
			remove_account_name = str(input('input account name: '))
			respond = helper_methods.delete_account(host, saved_username, saved_password, remove_account_name)
			print(respond)
		else:
			print('\nPlease login first\n')
		

	elif user_input == 6:
		if len(saved_password) > 0 and len(saved_password) > 0:
			account_name = str(input('input account name: '))
			account_password = str(input('input account password: '))
			update_account_name = str(input('input updated account name: '))
			update_account_password = str(input('input updated account password: '))
			respond = helper_methods.update_account(host, saved_username, saved_password, account_name, account_password, update_account_name, update_account_password)
			print('\n',respond)
		else:
			print('\nPlease login first\n')

	elif user_input == 7:
		saved_password = ""
		saved_username = ""
		print('successfully logged out')

	elif user_input == 8:
		break