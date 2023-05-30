import json
import jsonpath
import re
from string import ascii_uppercase
from string import ascii_lowercase
from natural import natural_keys
import inquirer

log_stream = open("my-log-file.txt", "a")
log_stream.write("created\n")

layers = []


def create_pref_end(pre_str):
    str = "Word" + pre_str
    words = re.findall(r'[A-Z][a-z]+', str)
    sorted_words = sorted(words, key=natural_keys)

    final_words = []
    for word in sorted_words:
        final_words.append({"name": word[len("Word"):], "pos": str.index(word)})

    final_words.sort(key=lambda x: x["pos"])

    pushed_words = []
    for obj in final_words:
        pushed_words.append(obj["name"])

    return pushed_words


def read_file():
    with open("Source.json", "r") as file:
        data = json.load(file)
        obj = data["$"]
        paths = jsonpath.paths(obj, "$..*")
        path_list = [path for path in paths if path != []]
        new_res = {}

        for path in path_list:
            try:
                path_str = ".".join(path).replace("-", ".")
                res_obj = jsonpath.parse(path_str)
                prev_path = ""

                for i in range(len(res_obj)):
                    if i == 0:
                        if res_obj[i].expression.value not in new_res:
                            new_res[res_obj[i].expression.value] = {"name": res_obj[i].expression.value}

                        if (
                            res_obj[-1].expression.value == new_res[res_obj[i].expression.value]["name"]
                        ):
                            initials = "".join(filter(str.isupper, res_obj[i].expression.value))
                            new_res[res_obj[i].expression.value]["prefix"] = [
                                initials,
                                create_pref_end(res_obj[i].expression.value)[0],
                                res_obj[i].expression.value,
                            ]
                    else:
                        parent_path = res_obj[i - 1].expression.value
                        current_path = res_obj[i].expression.value

                        if current_path not in new_res[parent_path]:
                            new_res[parent_path][current_path] = {"name": current_path}

                        if res_obj[-1].expression.value == new_res[parent_path][current_path]["name"]:
                            initials = "".join(filter(str.isupper, current_path))
                            new_res[parent_path][current_path]["prefix"] = [
                                initials,
                                create_pref_end(current_path)[0],
                                current_path,
                            ]

                final_res = new_res.copy()
                return final_res

            except Exception as e:
                print(e)


final_keys = {}


def overrun(see_data):
    def obj_select(obj):
        if not obj:
            return

        current_keys = []
        for key in obj.keys():
            if key in selected:
                current_keys.append("selected: " + key)
                final_keys[key] = {}
            else:
                current_keys.append(key)
                final_keys.pop(key, None)

        with open("finalObj.json", "w") as file:
            json.dump(final_keys, file, indent=2)

        questions = [
            inquirer.Checkbox("selectedItem", message="Select an item:", choices=current_keys)
        ]
        answers = inquirer.prompt(questions)
        selected_items = answers["selectedItem"]

        for key in selected_items:
            if key.startswith("selected: "):
                selected_key = key[len("selected: "):]
                obj_select(obj[selected_key])
            else:
                obj_select(obj[key])

    obj_select(see_data)


read_data = read_file()
overrun(read_data)
