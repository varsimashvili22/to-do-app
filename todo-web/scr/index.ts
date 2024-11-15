interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
  const taskList: Task[] = [];
  let taskId = 1;
  
  const taskInput = document.getElementById("new-task") as HTMLInputElement;
  const addTaskButton = document.getElementById("add-task") as HTMLButtonElement;
  const taskListElement = document.getElementById("task-list") as HTMLUListElement;
  
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      const newTask: Task = {
        id: taskId++,
        text: taskText,
        completed: false,
      };
  
      taskList.push(newTask);
      renderTasks();
      taskInput.value = ""; 
      console.log("here");
    }
  });
  
  function renderTasks() {
    taskListElement.innerHTML = "";
    taskList.forEach((task) => {
      const taskElement = document.createElement("li");
      taskElement.classList.toggle("completed", task.completed);
  
      const taskText = document.createElement("span");
      taskText.textContent = task.text;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(task.id));
  
      taskElement.appendChild(taskText);
      taskElement.addEventListener("click", () => toggleTaskCompletion(task.id));
      taskElement.appendChild(deleteButton);
  
      taskListElement.appendChild(taskElement);
    });
  }
  
  function toggleTaskCompletion(taskId: number) {
    const task = taskList.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      renderTasks();
    }
  }
  
  function deleteTask(taskId: number) {
    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);
      renderTasks();
    }
  }
  