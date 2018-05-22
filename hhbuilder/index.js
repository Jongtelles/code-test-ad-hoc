'use strict';

// helper function to select the first DOM element match
function $(selector) {
  return document.querySelector(selector);
}

// adding event listeners to the document
document.addEventListener('DOMContentLoaded', function () {
  // assigning our DOM buttons to variables in order to assign them onclick listeners
  var add = $('.add');
  var submit = $('button[type="submit"]');
  // creating an empty array to hold all of our household members
  var hhData = [];
  // button on click event for adding a member to the household
  add.onclick = function (event) {
    // assigning variables to our DOM element values
    var ageInput = parseInt($('input[name="age"]').value);
    var relInput = $('select[name="rel"]').value;
    var smokerInput = $('input[name="smoker"]');
    // creating DOM elements to display our household and members
    var listItem = document.createElement('li');
    var age = document.createElement('p');
    var relationship = document.createElement('p');
    var smoker = document.createElement('p');
    var removeItem = document.createElement('button');
    // putting our values into an object that will be pushed to our hhData array
    var personData = {
      age: ageInput,
      relationship: relInput,
      smoker: smokerInput.checked,
    };
    // labeling our button
    removeItem.innerText = 'Remove';
    // ensuring the page doesn't reload on submit
    event.preventDefault();
    // conditionals for form validation
    if (ageInput === 0 || isNaN(ageInput)) {
      return alert('Age that is > 0 is required.');
    }
    if (relInput === '' || relInput === '---') {
      return alert('Relationship is required.');
    }
    // conditional to change our smokerInput variable to a string
    if (smokerInput.checked === true) {
      smokerInput = 'Yes';
    } else smokerInput = 'No';
    // setting the HTML based on our variables
    age.innerHTML = 'Age: ' + ageInput;
    relationship.innerHTML = 'Relationship: ' + relInput;
    smoker.innerHTML = 'Smoker: ' + smokerInput;
    // adding an onclick listener to our buttons created dynamically
    removeItem.addEventListener('click', function () {
      // logic to remove the personData object from the hhData array
      // and remove the created <li> node
      var arrIndex = hhData.indexOf(personData);
      hhData.splice(arrIndex, 1);
      listItem.remove();
    });
    // appending our elements to the DOM to display
    listItem.append(age);
    listItem.append(relationship);
    listItem.append(smoker);
    listItem.append(removeItem);
    $('.household').append(listItem);
    hhData.push(personData);
    $('form').reset();
  };
  // button on click event for submitting the household
  submit.onclick = function (event) {
    var dataOutput = $('.debug');
    // assigning current household array to a new variable
    var finalData = hhData;
    // creating an empty object to hold our household members
    var household = {};
    // ensuring the page doesn't reload on submit
    event.preventDefault();
    // validating that we have at least one person in the household
    if ($('.household').children.length === 0) {
      return alert('Please add at least one member to the houeshold.');
    }
    // looping through our household array and creating key/value pairs in
    // our previously empty household object
    for (var i = 0; i < finalData.length; i++) {
      household[i + 1] = finalData[i];
    }
    // this loop will always clear the children of the debug DOM element
    // before displaying the new data
    while (dataOutput.lastChild) {
      dataOutput.removeChild(dataOutput.lastChild);
    }
    // displaying serialized household data in the DOM
    dataOutput.style.display = 'block';
    dataOutput.append(JSON.stringify(household));
    $('form').reset();
  };
});
