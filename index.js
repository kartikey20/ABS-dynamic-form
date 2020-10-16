var currentTab = 0; // Current tab is set to be the first tab (0)

/* Add default value to person*/

$(document).on("input", "#n_people", function () {
  var coins = $("#n_people").val();
  $(".title_text").text(`Person ${coins}`);
});

/* tooltip */

$(".tooltips").append("<span></span>");
$(".tooltips:not([tooltip-position])").attr("tooltip-position", "bottom");

$(".tooltips").mouseenter(function () {
  $(this).find("span").empty().append($(this).attr("tooltip"));
});

$(document).ready(function () {
  $('input[type="radio"]').click(function () {
    if ($(this).attr("id") == "yes") {
      $("#electric").show();
    } else {
      $("#electric").hide();
    }
  });
});

//clone tabs according to number of people

$("#n_people")
  .on("change", function () {
    var noi = $(this).val();
    var e = $("#tab_1");
    var elm = '<span class="step"' + "</span>";
    $(`#tab_1:gt(0)`).remove();
    //var present = e.length;
    for (var i = 1; i < noi; i++) {
      e.clone(true)
        .find(".title_text")
        .text(`Person ${i}`)
        .end()
        .insertBefore(e);
      $("#progress-bar").append(elm);
    }
  })
  .trigger("change");

showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab"); // Hide the current tab:
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  document.getElementsByClassName(
    "title_text"
  ).innerHTML = `New text!${currentTab}`;
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, n, d;
  valid = true;
  n = document.getElementById("n_people").value;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  d = document.getElementsByClassName("select-text");
  var optionSelIndex = d.options[e.selectedIndex].value;
 if(d!=null){
   if(){}
   
 }
  // Exit the function if input is not a interger

  if (isNaN(n)) {
    return false;
  }

  // A loop that checks every input field in the current tab:

  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
