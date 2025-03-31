let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTaskToLocalStorage() {
  const input = document.getElementById("task-input");
  if (input.value) {
    const randomNumber1 = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    const randomNumber2 = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    const randomString = input.value.slice(0, 3);
    const id = randomString + randomNumber1 + "" + randomNumber2;

    allTasks.push({
      taskText: input.value,
      id: id
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));

    renderTask();
    input.value = "";
  } else {
    alert("Write something on the taskbar");
  }
}

function renderTask() {
  let taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";
  allTasks.forEach((task, index) => {
    taskContainer.innerHTML += `
    <div id=${task.id}>
      <h3 style="font-size: 1.2rem; color: #272727; text-align: center; margin-bottom: 10px;">Task ${index + 1}</h3>
      <div style="font-size: 1rem; color: #131313; text-align: left;" class="taskTexts">
        ${task.taskText}
      </div>
      <hr style="margin: 15px 0px;">
      <div style="display: flex; flex-direction: column; row-gap: 10px;">
        <span onclick="deleteFromLocalStorage(${task.id})" class="button-1"><i class="fa-solid fa-trash"></i>Delete</span>
        <span onclick="editTask(${task.id})" class="button-1"><i class="fa-solid fa-pen-to-square"></i>Edit</span>
      </div>
    </div>
    `;
  });
}

renderTask();


function deleteFromLocalStorage(id) {
  allTasks = allTasks.filter( task => task.id !== id.id)
  localStorage.setItem('tasks', JSON.stringify(allTasks))
  renderTask()
}


function editTask(id){
  allTasks = allTasks.filter( task => task.id !== id.id)
  localStorage.setItem('tasks', JSON.stringify(allTasks))
  renderTask()
  
  const input = document.getElementById("task-input");
  
  input.value = id.querySelector(".taskTexts").innerText.trim();
  input.focus();
}

document.getElementById("task-input").addEventListener("keydown", (e)=>{
  if(e.key === 'Enter'){
    addTaskToLocalStorage()
    document.getElementById("task-input").blur()
  }
})

// type / to jump on the add task section
document.body.addEventListener('keyup', e => {
  if(e.key === '/'){
    document.getElementById("task-input").focus()
  }
})