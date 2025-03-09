const todoList = [];

renderToDoList();

function renderToDoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div> 
     <button class= "delete-btn"
      onclick="
     todoList.splice(${i},1);
     renderToDoList();
     ">Delete</button>
    `;
    todoListHTML += html;
  }

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");

  const dateInputElement = document.querySelector(".js-duedate-input");

  const dueDate = dateInputElement.value;

  const name = inputElement.value;

  todoList.push({ name, dueDate });

  inputElement.value = "";
  dateInputElement.value = "";

  /*
  The variable name holds a copy of the input field's value, not a reference to the field itself. Changing name = "" only updates the variable, not the input field. To clear the field, you must update inputElement.value = "" directly, as it references the actual DOM element.
   */

  renderToDoList();
}

/*

2.	After User Clicks “Add” (addTodo() runs):
	•	name = "Buy milk"
	•	todoList.push("Buy milk") → todoList = ["Buy milk"]
	•	The input field is cleared (inputElement.value = "").
	•	renderToDoList() is called, which:
	•	Loops through todoList.
	•	Generates "<p>Buy milk</p>".
	•	Updates the .js-todo-list element.

*/

/*

The key here is that renderToDoList doesn’t just display the tasks—it completely rebuilds the list's HTML each time it's called. Here’s what happens step by step:

Data Change: When you click the delete button, the inline onclick handler removes an item from the todoList array using todoList.splice(i, 1). This changes the underlying data that represents your tasks.

Re-rendering: Immediately after modifying the array, renderToDoList is called again. This function loops through the updated todoList array and generates a new HTML string that only includes the remaining tasks.

HTML Update: The generated HTML string is then injected into the webpage by setting the innerHTML of the container (i.e., document.querySelector(".js-todo-list").innerHTML = todoListHTML). This completely replaces the old list with the new one.

So even though renderToDoList might seem like it just "shows" the tasks, its real purpose is to ensure the displayed list always matches the current state of your data. Every time the data changes (like when you delete a task), renderToDoList rebuilds and updates the HTML to reflect those changes.

*/
