var file_path = "2023_HK222/";
var instruction = "Select semester then input student ID. Current semeter is 'HK II 2022-2023'"
window.onload = function() {
  document.getElementById("instruction").innerHTML = instruction;
};

function search() {
  file_path = document.getElementById("semester").value;
  // Get the search value
  var searchValue = document.getElementById("searchField").value;

  var allscore_file_name = "allscores.csv";
  var allscore_table_name = "all_results_table"
  read_filter_display_csv(searchValue, allscore_file_name, allscore_table_name);

  var midterm_file_name = "midterm.csv";
  var midterm_table_name = "midterm_results_table"
  read_filter_display_csv(searchValue, midterm_file_name, midterm_table_name);

  var quiz_file_name = "Quiz.csv";
  var quiz_table_name = "QEA_results_table"
  read_filter_display_csv(searchValue, quiz_file_name, quiz_table_name);
}

function read_filter_display_csv(filterString, file_name, table_name) {
  // Read the CSV file
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      // Parse the CSV data
      var rows = xhr.responseText.split("\n");
      var data = [];
      for (var i = 0; i < rows.length; i++) {
        data.push(rows[i].split(","));
      }

      // Search for matching rows
      var results = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          //if (data[i][j].includes(filterString)) {
          if (data[i][j] == filterString) {
            results.push(data[i]);
            break;
          }
        }
      }

      // Display the results in a table
      clearTable(table_name)
      generateTableHeaders(table_name, data[0]);
      insertRow(table_name, results);
    }
  }
  var fname = course_result_repo +"/" + file_path + "/" + file_name;
  xhr.open("GET", fname, true);
  xhr.send();
}

function clearTable(table_name) {
  document.getElementById(table_name).innerHTML = "";
}

function generateTableHeaders(table_name, headers) {
  var table = document.getElementById(table_name);
  var thead = table.createTHead();
  var row = thead.insertRow();
  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = headers[i];
    row.appendChild(th);
  }
}

function insertRow(table_name, rows_data) {
  
  var table = document.getElementById(table_name);
  if (rows_data.length == 0){
    var row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = "Not found";
  }
  else{
    for (var i = 0; i < rows_data.length; i++) {
      var row = table.insertRow(-1);
      row_items = rows_data[i];
      for (var j = 0; j < row_items.length; j++) {
        var cell = row.insertCell(j);
        cell.innerHTML = row_items[j];
      }
    }
  }

}