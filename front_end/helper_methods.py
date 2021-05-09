import requests
import json

def menu():
    print('============================')
    print('1. Login')
    print('2. Create new user')
    print('3. Create new account')
    print('4. List all accounts')
    print('5. Remove specific account')
    print('6. Update specific account')
    print('7. Log out')
    print('8. Exit program')
    print('============================')


def create_user(host, username, password):
    data = {
        'username': username,
        'password': password
    }
    URL = host + '/createuser'
    r = requests.post(url = URL, data = data)
    return r.text

def login(host, username, password):
    data = {
        'username': username,
        'password': password
    }
    URL = host + '/login'
    r = requests.post(url = URL, data = data)
    return r.text

def create_account(host, username, password, account_name, account_password):
    data = {
        'username': username,
        'password': password,
        'accountname': account_name,
        'accountpassword': account_password
    }
    URL = host + '/createaccount'
    r = requests.post(url = URL, data = data)
    return r.text

def show_account_list(host, username, password):
    data = {
        'username': username,
        'password': password
    }
    URL = host + '/accountlist'
    r = requests.post(url = URL, data = data)
    # test = json.load(r.text)
    account_list = json.loads(r.text)
    print_list(account_list)

def print_list(account_list):
    for obj in account_list:
        print('Account Name: ', obj['accountname'], ' Password: ', obj['accountpassword'])
        # print(key)

def delete_account(host, username, password, account_name):
    data = {
        'username': username,
        'password': password,
        'accountname': account_name,
    }
    URL = host + '/deleteaccount'
    r = requests.post(url = URL, data = data)
    return r.text

def update_account(host, username, password, account_name, account_password, new_account_name, new_account_password):
    data = {
        'username': username,
        'password': password,
        'accountname': account_name,
        'accountpassword': account_password,
        'newaccountname': new_account_name,
        'newaccountpassword': new_account_password,
    }
    URL = host + '/updateaccount'
    r = requests.post(url = URL, data = data)
    return r.text

def logout(host, username, password):
    data = {
        'username': username,
        'password': password
    }
    URL = host + '/logout'
    r = requests.post(url = URL, data = data)
    return r.text

