const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]; //creates the houses array
let sortedStudents = []; //initilizes the sorted students array

document
  .getElementById("startSortingBtn")
  .addEventListener("click", function () {
    document.getElementById("startSortingBtn").style.display = "none"; //the start sorting button will be hidden once it is clicked
    document.getElementById("sortingForm").style.display = "block"; //the form will be hidden at first until the sorting button is clicked
  }); 

document.getElementById("sortBtn").addEventListener("click", function (event) { //adds an event listener to the sortBtn
  event.preventDefault(); //prevents the page from reloading
  const studentName = document.getElementById("studentName").value; //this selects the studentName id and takes the value that is entered into it and stores it in studentName
  const house = houses[Math.floor(Math.random() * houses.length)]; //this takes the length of the houses array and uses the Math.random() function to generate a random number by multiplying them and then Math.floor ensures it is a integer and then that is the index of the houses array which is stored in the house variable
  sortStudent(studentName, house); //this sorts the student by calling the sortStudent function
});

function sortStudent(studentName, house) { 
  const student = { name: studentName, house: house }; //object created called student that holds the functions paramaters 
  document.getElementById("sortingForm").reset(); //this clears the input where the students name is entered

  sortedStudents.push(student); //this adds the student object to the sortedStudents array
  displaySortedStudents(sortedStudents); //this calls the function displaySortedStudents and passez it the sortedStudents array which will show the sorted student along with the other sorted students
}

function filterStudentsByHouse(house) { //this is what makes the house buttons work along with the filterButtons
  if (house === "all") {
    displaySortedStudents(sortedStudents); //if the house is "all" it will display all the sortedStudents array
  } else {
    const filteredStudents = sortedStudents.filter( //if the house is not "all", this will create another array using the filter method that will go through each student object in the sortedStudents array and check if the house property of the student object matches the house parameter, and then store it in filteredStudents
      (student) => student.house === house
    );
    displaySortedStudents(filteredStudents); //this will call the displaySortedStudents function again with filteredStudents array showing the students of a specific house
  }
}

function displaySortedStudents(students) {
  const sortedStudentsDiv = document.getElementById("sortedStudents"); //this selects the sortedStudents id from the HTML and stores it in sortedStudentsDiv
  sortedStudentsDiv.innerHTML = ""; //this sets the inner HTML content of sortedStudentsDiv to an empty string making sure anything is cleared before displaying the list of sorted students

  students.forEach((student) => { //this is a forloop that iterates through each student object in the students array
    const card = document.createElement("div"); //this creates a new card for each student by creating a new div element in the HTML
    card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <p class="card-text">House: ${student.house}</p>
                <button class="btn btn-danger" onclick="expelStudent('${student.name}')">Expel</button>
            </div>
        `; //this sets the content of the card div element that was created by using a template literal aka using the backticks

    sortedStudentsDiv.appendChild(card); //this adds the card div element as a child of the sortedStudentsDiv container or adds the student card to the web page
  });
}

const filterButtons = document.querySelectorAll(".filter-btn"); //this selects all the elements with the class filter-btn and stores them in the filterButtons variable
filterButtons.forEach((btn) => { 
  btn.addEventListener("click", function () {
    const house = this.getAttribute("data-house");
    filterStudentsByHouse(house); 
  }); //this loops through each element above in the filterButtons and adds a click event listener to each button and uses the getAttribute method to get the value of the data-house attribute from the clicked button. After getting the house name from the data-house attribute, the filterStudentsByHouse will filter and display students based on the selected house

});
