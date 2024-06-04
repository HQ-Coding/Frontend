const todoList =[{
    title :'hello ',
    text:'i am hq',
    dueDate : '2023-03-01',
    time : '21:00'
},{
    title :'wellcome ',
    text:'i am hq',
    dueDate : '2023-03-01',
    time : '21:00'
}
];

renderTodoList()

function renderTodoList(){
    let todoListHtml = '';

for (let i = 0; i < todoList.length ; i++){
    let todObject = todoList[i];

    const {title,text,dueDate,time} =todObject;
    const html = `
    <div class ="task">

    <div>
    <p id="task-title" class="title${i}" contentEditable="false">${title}</p>
    <p id="task-text" class="text${i}" contentEditable="false">${text}</p>
    </div>
    
    <div class='date-time'>
    <input type="date" class="date editDateTodo${i}" value="${dueDate}" readonly >
    <input type="time" class="time editTimeTodo${i}" value="${time}" readonly >
    <button class='save${i} save' style="scale:0">Save</button>
    </div>

    <div class='buttons'><!---------------------->
    <div>${i +1}</div>

    <button id="editButton${i}"   onclick='editTask(${i})'>
    <span class="material-symbols-outlined">
    edit
    </span>
    </button> 

    <button onclick="
    todoList.splice(${i},1);renderTodoList()">
    <span class="material-symbols-outlined">
    delete
    </span>
    </button> 

    </div><!---------------------------------->
    </div>
    `;
    
    todoListHtml += html
}
    document.querySelector('.addedtodo').innerHTML= todoListHtml
   
}

function addtodo(){

    const todoTitle = document.querySelector('.todo-title');
    const title = todoTitle.value;

    const todoText = document.querySelector('.todo-text');
    const text = todoText.value;

    const dateInputElement =document.querySelector('.dueTodo')
    const dueDate = dateInputElement.value ;

    const timeInputElement =document.querySelector('.timeTodo')
    const time = timeInputElement.value ;
    
    todoList.push({
        title :title ,
        text:text,
        dueDate : dueDate,// or just write dueDate
        time : time
    });
    todoTitle.value = ''
    todoText.value = '';
    dateInputElement.value = ''
    timeInputElement.value = ''
    renderTodoList()
}

function editTask(i){

    const editTitle = document.querySelector(`.title${i}`)
    const editText = document.querySelector(`.text${i}`)
    const editDate = document.querySelector(`.editDateTodo${i}`)
    const editTime = document.querySelector(`.editTimeTodo${i}`)

    const save = document.querySelector(`.save${i}`)
    save.style.scale = 1
    
    editTitle.contentEditable = true
    editText.contentEditable = true
    
    editDate.removeAttribute("readonly")
    editTime.removeAttribute("readonly")

    save.addEventListener('click',()=>{
        
        todoList[i].title = editTitle.innerHTML;
        todoList[i].text = editText.innerHTML;
        todoList[i].dueDate = editDate.value || todoList[i].dueDate;
        todoList[i].time = editTime.value || todoList[i].time;
        console.log(editDate.innerHTML)
        renderTodoList()

        // render re write the html so we dont need to do the bellow code
        // save.style.scale = 0
        // editTitle.contentEditable = false
        // editText.contentEditable = false
        // editDate.setAttribute("readonly")
        // editTime.setAttribute("readonly")
    })

};
    