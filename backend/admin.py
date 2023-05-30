from queue import Queue
import json


class Admin:
    def __init__(self):
        self.help_queue = Queue()
        self.employees = set(self._get_employees())

    def _get_employees(self):
        try:
            with open("employee_id.json", "r") as f:
                employees = json.load(f)
        except FileNotFoundError:
            employees = []
            self._save_employees(employees)
        return employees

    @staticmethod
    def _save_employees(employees):
        with open("employee_id.json", "w") as f:
            json.dump(list(employees), f)

    def validate_employee_id(self, employee_id):
        if employee_id in self.employees:
            return True
        return False

    def add_request(self, category):
        self.help_queue.put(category)

    def get_request(self):
        if not self.help_queue.empty():
            return self.help_queue.get()
        return None
