// 1. 유저가 값을 입력한다.
// 2. + 버튼을 클릭하면, 할일이 추가되어진다..
// 3. delete 버튼을 누르면 할일이 삭제되어진다.
// 4. check 버튼을 누르면 할일이 끝나면서 취소선이 그어진다...
    // check 버튼을 클릭하는 순간 true false로 false가 true
    // true이면 끝난걸로 간주하고 취소선이 그어진다.
    // false이면 안끝난걸로 간주하고 그대로 보여준다..

// 5. 진행중, 끝남 탭을 누르면 할일이 끝나면서 ,언더바가 이동한다.
// 6. 끝남탭은 끝난 아이템만, 진행중인 탭은 진행중인 아이템만
// 7. 전체탭을 누르면 다시 전체 아이템으로 돌아옴.

// 함수 입장에서는 어떤 아이템을 눌렀는지 어떻게 알수가 있냐구요???
// 내가 누굴 선택했는지 알아야 그 아이템만 취소선을 그릴 수 있게 될 것입니다.... 

// const uniqueId = Math.random().toString(36).substr(2, 9);

// slice(0, 4);

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll("#task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];


addButton.addEventListener("click", addTask);

for(let i=1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}

console.log(tabs);
function addTask() {
    // console.log("click되는지 확인해 볼까요?");
    let task = {
        id : randomIdGenerate(), 
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let list = [];
    if(mode == "all") {
        list = taskList;
    } else {
        list = filterList;
    // } else if (mode == "ongoing" || mode == "done")과 else와 같은 값
    }
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    // console.log("체크되었나요? 안되었나요? 에러가없기를");
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            // ***바로 위에 문장은 무조건 암기. !은 not과 같은 의미
            break;
        }
    }
    
    if(mode != "all") {
        for(let i=0; i < filterList.length; i++) {
            if(filterList[i].id == id) {
                filterList.splice(i,1);
                break;
            }
        }
    }
    // 따로 추가한 영역, 체크시 바로 이동한다

    render()
    // 함수 작성하고 꼭 불러와야 한다
    console.log(taskList);
}

function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    // console.log("삭제될까요?");
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id==id){
            taskList.splice(i, 1);
            break;
            // 갯수가 적을 땐 상관 없는데 break를 안넣어 주면 해당 값 이외에도 수식이 계속 불필요하게 돌게 된다
        }
    }
    render();
    console.log(taskList);
}

function filter(event) {
    // console.log("클릭이 되는지 확인",event.target.id); 
    filterList = [];   
    mode = event.target.id;    
    if(mode == "all") {        
    } else if (mode == "ongoing") {
        for(let i=0; i < taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);                             
            }
        }                     
    } else if (mode == "done") {
        for(let i=0; i < taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }         
    }
    render();
}
// 동적인 부분을 표현할 때 $로 표현
// 주석 밑에 부분은 전체적으로 중요하니 숙지