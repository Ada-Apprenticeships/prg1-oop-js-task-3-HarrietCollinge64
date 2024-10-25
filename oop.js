PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { // value can be a string or a number (integer)
  const regex =  /^[0-9]\d*$/
  return regex.test(value.toString());
}  


function validatePriority(priority) { // value can be a string or a number (integer)
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

  //(title, priority)
  _added;
  _title;
  _priority;

  constructor(title, priority){
    this._title = title
    this._priority = priority
    this._added = todaysDate()
  }
  get title() {
    return this._title
  }
  get priority() {
    return this._priority
  }
  set priority(newPriority) {
    this._priority = validatePriority(newPriority)
  }
  get added() {
    return this._added
  }
 
}


class ToDo {
    _tasks
    constructor(tasks){
      this._tasks = tasks
      this.tasksList = []
    }
    add(Task){
      this.tasksList.push(Task)
      return(this.tasksList.length)
    }
    remove(title){
      let removed = false
      for (let i = 0; i < this.tasksList.length; i++) {
        if (this.tasksList[i].title === title) {
          this.tasksList.splice(i,1)
          removed = true
        }
        
      }
      return removed
    }
    list(priority = 0){
      let priorityList = []
      for (let i = 0; i < this.tasksList.length; i++) {
        if (this.tasksList[i].priority === priority || priority === 0) {
          priorityList.push([this.tasksList[i].added, this.tasksList[i].title, this.tasksList[i].priority])
        }
      }
      return priorityList
    }
    task(title) {
      for (let i = 0; i < this.tasksList.length; i++) {
        if (this.tasksList[i].title === title) {
          return this.tasksList[i]
        }
      }
      throw new Error(`Task '${title}' Not Found`)
    }
  }








// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}