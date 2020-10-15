var currentTab = 0;
// Current tab is set to be the first tab (0)
$(".tooltips").append("<span></span>");
$(".tooltips:not([tooltip-position])").attr("tooltip-position", "bottom");

$(".tooltips").mouseenter(function () {
  $(this).find("span").empty().append($(this).attr("tooltip"));
});
//clone tabs according to number of people

$("#n_people")
  .on("change", function () {
    var noi = $(this).val();
    var e1 = $("#tab_1");
    var e2 = $("#tab_2");
    var e3 = $("#tab_3");

    $(`#tab_1:gt(0)`).remove();
    $(`#tab_2:gt(0)`).remove();
    $(`#tab_3:gt(0)`).remove();
    //var present = e.length;
    for (var i = 0; i < noi - 1; i++) {
      e1.clone().insertAfter(e1);
      e2.clone().insertAfter(e2);
      e3.clone().insertAfter(e3);
    }
  })
  .trigger("change");

showTab(currentTab);

// Display the current tab

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
  /*   if (n == 1 && !validateForm()) return false;
   */ x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }

  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    n,
    valid = true;
  n = document.getElementById("n_people").value;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

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
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
