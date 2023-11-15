# React Todo App with API Integration

Welcome to the React Todo App! This app integrates with a dummy API to perform CRUD operations on todo items. Please note that all changes made are temporary and will be reset upon refreshing the app.

# Features

1. ### Fetch Todo Items:

- On app load, it fetches todo items from the API - https://jsonplaceholder.typicode.com/todos.
- Displays the fetched todo items in the app.

2. ### Add Todo Item:

- Adds a new todo item using a POST call to the API.
- Updates the React state to reflect the added item.

3. ### Update Todo Item:

- Updates an existing todo item using a PATCH call to the API.
- Reflects the changes in the React state.

4. ### Delete Todo Item:

- Deletes a todo item using a DELETE call to the API.
- Removes the item from the React state.

5. ### Authentication:

- User authentication is implemented to secure the app.
- Ensure that you are logged in to perform CRUD operations.

6. ### Notifications:

- Notifications are used to inform users about the success or failure of API calls.
- Success and error messages are displayed to enhance user experience.

# Getting Started
1. ### Clone the Repository:
```bash
git clone https://github.com/NagarjunHM/todo-app.git
cd todo-app
```

2. ### Install Dependencies:
```bash
npm install
```
3. ### Run the App:
```bash
npm run dev
```
# Important Notes

All changes made (addition, update, delete) are temporary.
Refreshing the app will reset the data to its initial state.

Notifications will inform you about the status of API calls.
Pay attention to success and error messages for feedback.
