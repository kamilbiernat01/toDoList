/***************************
****************************
****************************
------ TASK CONTROLLER  ------
****************************
****************************
***************************/
var taskController = (function() {

  

  let Task = function(id, description, isChecked = 0) {
    this.id = id;
    this.description = description;
    this.isChecked = isChecked;
  };

  // Data structure is private
  let data = {

    tasks: [],
    total: 0
  };

  // Public methods
  return {
    addItem: function(description) {
      let newItem, ID;

      // Create new ID for each Task
      if (data.tasks.length === 0) {
        ID = 0;
      } else {
        ID = data.tasks[data.tasks.length-1].id + 1;
      }

      // Create new item
      newItem = new Task(ID, description);

      // Add to data structure
      data.tasks.push(newItem);

      // Return the new Task
      return newItem;
    },

    deleteItem: function(id) {

      let ids, index;

      // Function returns all ids of all Task Objects in correct order
      ids = data.tasks.map(function(current) {
        return current.id;
      });

      // Finding the index of given id
      index = ids.indexOf(id);

      // If specific index exists, then delete it from data structure
      if (index !== -1) {
        data.tasks.splice(index, 1);
      }
    },

    testing: function() {
      console.log(data);
    }

    
  };

})();

/***************************
****************************
****************************
------ UI CONTROLLER  ------
****************************
****************************
***************************/


var UIController = (function() {
  // Here I put all of inputs
  const DOMelements = {
    inputDescription: '.task-adder',
    inputButton: '.add__btn',
    taskContainer: '.tasks-container',
    taskDelete: '.task__delete',
    taskDeleteIcon: '.fa-trash-alt'
  };

  // All returning are exposed to the Public
  return {
    getInput: function() {
      if (!document.querySelector(DOMelements.inputDescription).value) {
        alert('Empty field');
      } else if (document.querySelector(DOMelements.inputDescription).value.length < 5 || document.querySelector(DOMelements.inputDescription).value.length > 33) {
        alert('5-33 chars');
      } else {


        return {
          description: document.querySelector(DOMelements.inputDescription).value
        };
      }

    },

    addListItem: function(obj) {
      let html, element;
      element = DOMelements.taskContainer;
      // Create HTML string with placeholder text
      html = `<div class="task animated tada" id="task-${obj.id}"><div class="task__text">${obj.description}</div><div class="task__delete"><i class="fas fa-trash-alt"></i></div></div>`;
      // Replace the placeholder text with some actual data
      
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },

    deleteListItem: function(selectorID) {
      let el = document.getElementById(selectorID);
      if (el !== null) {
              // We  can remove only a child thats why I need to go up

              el.parentNode.removeChild(el);
      }

      
    },

    clearField: function() {
      let field = document.querySelector(DOMelements.inputDescription);
      field.value = '';
      field.focus();
      
    },

    getDOMelements: function() {
      return DOMelements;
    }

  };

})();


/***************************
****************************
****************************
-- GLOBAL APP CONTROLLER  --
****************************
****************************
***************************/

var controller = (function(taskCtrl, UICtrl) {

  // Private function
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMelements();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        ctrlAddItem();
      } 
    });

    document.querySelector(DOM.taskContainer).addEventListener('click', ctrlDeleteItem);
    document.querySelector(DOM.taskContainer).addEventListener('click', ctrlDeleteItem);
  }

  
  // Private function
  var ctrlAddItem = function() {
    let input, newItem;
        
    //  1. Get the input data
    input = UICtrl.getInput();

    //  2. Add the item to taskController
    newItem = taskCtrl.addItem(input.description);

    //  3. Add the item to the UI
    UICtrl.addListItem(newItem);

    //  4. Clear the input field
    UICtrl.clearField();
    
  };

  var ctrlDeleteItem = function(event) {
   
    let itemID, ID, splitArray;
    if (event.target.parentNode.parentNode.id !== null) {
      itemID = event.target.parentNode.parentNode.id;
    }
    
    if (itemID) {
      splitArray = itemID.split('-'); 
      ID = parseInt(splitArray[1]);
      taskCtrl.deleteItem(ID);
    }
    if (itemID !== 'tasks-container' && event.target.parentNode.parentNode.id !== null) {
      UICtrl.deleteListItem(itemID);
    }
    
    
  };

  // Public init function
  return {
    init: function() {
      console.log('app started!');
      setupEventListeners();
    }
  };

})(taskController, UIController);

controller.init();