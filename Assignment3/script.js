//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

function foldRow(rowID){
  var row = document.getElementById(rowID);
  if (row.style.display == 'none') {
    row.style.display = 'table-row';
  }
  else {
    row.style.display = 'none';
  }
}

document.getElementById("button").disabled = true;

let studentCount = 3;

// Function to add a new student row
function addTableRow() {
  studentCount++;
  var table = document.getElementById("myTable");
  var rowCurrent = table.rows.length;
  
  
  var row = table.insertRow(rowCurrent); 
  
  
  row.insertCell(0).innerHTML = `<input type="checkbox" onclick="toggleRowSelection(this)"/><br /><br /><img src="down.png" width="25px" onclick="foldRow('row-${studentCount * 2}')"/>`;
  row.insertCell(1).innerHTML = `Student ${studentCount}`;
  row.insertCell(2).innerHTML = `Teacher ${studentCount}`;
  row.insertCell(3).innerHTML = "Approved";
  row.insertCell(4).innerHTML = "Fall";
  row.insertCell(5).innerHTML = "TA";
  row.insertCell(6).innerHTML = "12345";
  row.insertCell(7).innerHTML = "100%";

  
  
  var detailsRow = table.insertRow(rowCurrent + 1);
  detailsRow.id = `row-${studentCount * 2}`;
  detailsRow.classList.add("dropDownTextArea");
  detailsRow.style.display = "none";
  detailsRow.innerHTML = `<td colspan="8">
                           Advisor:<br /><br />
                           Award Details<br />
                           Summer 1-2014(TA)<br />
                           Budget Number: <br />
                           Tuition Number: <br />
                           Comments:<br /><br /><br />
                           Award Status:<br /><br /><br />
                         </td>`;
  
  alert(`Student ${studentCount} Record added successfully`);
}

// Function to toggle row selection
function toggleRowSelection(checkbox, studentId) {
  var row = checkbox.parentElement.parentElement;
  var submitButton = document.getElementById("button");

  if (checkbox.checked) {
    column8.style.display = 'table-cell';
    column9.style.display = 'table-cell';
    row.insertCell(8).innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;
    row.insertCell(9).innerHTML = `<button onclick="editRow(this)">Edit</button>`;
    row.style.backgroundColor = "yellow";
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "orange";
  } else {
    row.deleteCell(8);
    row.deleteCell(8);
    row.style.backgroundColor = "";
    var allUnchecked = document.querySelectorAll("#myTable input[type='checkbox']:checked").length === 0;
    
    if (allUnchecked) {
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "grey";
      column8.style.display = 'none';
      column9.style.display = 'none';
    }
  }
}

// Function to delete a row
function deleteRow(button) {
  var row = button.parentElement.parentElement;
  var studentName = row.cells[1].textContent;
  if(confirm(`Do you want to delete ${studentName}`)) {
    var detailsRow = row.nextElementSibling; 
    row.remove();
    if (detailsRow && detailsRow.classList.contains('dropDownTextArea')) {
      detailsRow.remove();
    }
    alert(`${studentName} Record deleted successfully`);
  }

  var allUnchecked = document.querySelectorAll("#myTable input[type='checkbox']:checked").length === 0;
    
  if (allUnchecked) {
    var submitButton = document.getElementById("button");
    column8.style.display = 'none';
    column9.style.display = 'none';
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "grey";
  } 
}

// Function to edit a row
function editRow(button) {
  var row = button.parentElement.parentElement;
  var studentName = row.cells[1].textContent; 
  // var advisorName = row.cells[2].textContent;
  // var semester = row.cells[4].textContent;
  // var awardStatus = row.cells[3].textContent;
  // var budgetNumber = row.cells[6].textContent;
  // var type = row.cells[5].textContent;
  // var percentage = row.cells[7].textContent;

  // Construct the edit popup
  var editDetails = `Edit details of ${studentName}\nEdit Student Name:`;
  var confirmation = prompt(editDetails, `${studentName}`);
  if (confirmation) {
    row.cells[1].innerHTML = `${confirmation}`;
    alert(`${confirmation} data updated successfully`);
  }
}

// Disable the submit button when the page loads
document.getElementById("button").disabled = true;