import requests
# URL = "http://localhost:3000/test"

# r = requests.get(url = URL)
# print(r)


URL = "http://localhost:3000/login"
data = {'username': 'test',
        'password': 'testpassword',}

r = requests.post(url = URL, data = data)
print(r.text)

print('test in between to see if requests is async call')

URL = "http://localhost:3000/createaccount"
data = {'username': 'test',
        'password': 'testpassword',
        'accountname': 'pornaylmao@test.com',
        'accountpassword': 'password',
        }

r = requests.post(url = URL, data = data)
print(r.text)


URL = "http://localhost:3000/accountlist"
data = {'username': 'test',
        'password': 'testpassword',
        }

r = requests.post(url = URL, data = data)
print(r.text)


URL = "http://localhost:3000/updateaccount"
data = {'username': 'test',
        'password': 'testpassword',
        'accountname': 'haaa',
        'accountpassword': '123123',
        'newaccountname': 'so sad',
        'newaccountpassword': '1337',
        }

r = requests.post(url = URL, data = data)
print(r.text)


URL = "http://localhost:3000/deleteaccount"
data = {'username': 'test',
        'password': 'testpassword',
        'accountname': 'pornaylmao@test.com',
        }

r = requests.post(url = URL, data = data)
print(r.text)


URL = "http://localhost:3000/logout"
data = {'username': 'test',
        'password': 'testpassword',
        }

r = requests.post(url = URL, data = data)
print(r.text)

