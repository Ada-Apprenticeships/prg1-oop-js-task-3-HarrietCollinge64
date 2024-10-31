PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { 
  return /^[0-9]\d*$/.test(value.toString())
}  


function validatePriority(priority) { 
  return priority == "LOW" || priority == 1 ? 1
  : priority == "MEDIUM" || priority == 3 ? 3
  : priority == "HIGH" || priority == 5 ? 5
  : priority == "URGENT" || priority == 7 ? 7 
  : 1
}


function todaysDate () {
  // date in format 'dd/mm/yyyy hh:mm:ss
  const now = new Date()
  return `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
}


class Task {
  #added;
  #title;
  #priority;

  constructor(title, priority){
    this.#title = title
    this.#priority = priority
    this.#added = todaysDate()
  }
  get title() {
    return this.#title
  }
  get priority() {
    return this.#priority
  }
  set priority(newPriority) {
    this.#priority = validatePriority(newPriority)
  }
  get added() {
    return this.#added
  }
 
}


class ToDo {
    #tasks;
    constructor(tasks){
      this.#tasks = tasks
      this.tasksList = []
    }
    add(Task){
      this.tasksList.push(Task)
      return(this.tasksList.length)
    }
    remove(title){
      // creates a new array with all tasks except <title>
      const initialLength = this.tasksList.length;
      this.tasksList = this.tasksList.filter(task => task.title !== title);
      // if new array is shorter than initial array then a task has been removed 
      return this.tasksList.length < initialLength
    }
    list(priority = 0){
      // filters task based on priority condition then transforms the filtered tasks into a new array
      const priorityList = this.tasksList
      .filter(task => task.priority === priority || priority === 0)
      .map(task => [task.added, task.title, task.priority]);

      return priorityList;
    }
    task(title) {
      // returns the task that matches the title  
      if (this.tasksList.find(task => task.title === title)) {
        return task
      } 
     throw new Error(`Task '${title}' Not Found`)
    }
  }

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}