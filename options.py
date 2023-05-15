OBJECT = {
    'foo': {
        'tRGET': 123,
        'other': 456
    },
    'bar': {
        'selected baz': 245,
        'select test': ''
    }
}
AWNSER = {
    "selectedItem": 'foo',
    "action": 'view'
}

def select_key(selected, obj):
    
        
    user = input("enter a key: ")
    if user in selected:
        selected.remove(user)
    else:
        selected.append(user)


selected = []

current_obj = OBJECT
while isinstance(current_obj, dict):
    for key in current_obj:
        if key in selected:
            print("selected: ", key)
        else:
            print(key)

    action = input('what do you want to do: ')
    if action == "select":
        select_key(selected, current_obj)
    elif action == "view":
        current_obj = current_obj[selected[0]]


# while isinstance(current_obj, dict):
    # current_obj = select_key(current_obj)

# print(current_obj)

