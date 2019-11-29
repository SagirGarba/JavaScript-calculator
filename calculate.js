$(document).ready(function() {
    // clear the console
    console.clear();
    
    // variable declaration
    var entryVal = "0";
    var maxLength = 10;
    var maxHistoryLength = 20;
    var calcHistory = "";
    var shownHistory = "";
    
    // buttons
    (function addMouseEvents() {
      // can be refactored using a function
      $("#zero").mousedown(function() {calcButtonDown("zero", true)});
      $("#zero").mouseup(function() {calcButtonDown("zero", false)});
      $("#decimal").mousedown(function() {calcButtonDown("decimal", true)});
      $("#decimal").mouseup(function() {calcButtonDown("decimal", false)});
      $("#equals").mousedown(function() {calcButtonDown("equals", true)});
      $("#equals").mouseup(function() {calcButtonDown("equals", false)});
      $("#one").mousedown(function() {calcButtonDown("one", true)});
      $("#one").mouseup(function() {calcButtonDown("one", false)});
      $("#two").mousedown(function() {calcButtonDown("two", true)});
      $("#two").mouseup(function() {calcButtonDown("two", false)});
      $("#three").mousedown(function() {calcButtonDown("three", true)});
      $("#three").mouseup(function() {calcButtonDown("three", false)});
      $("#add").mousedown(function() {calcButtonDown("add", true)});
      $("#add").mouseup(function() {calcButtonDown("add", false)});
      $("#four").mousedown(function() {calcButtonDown("four", true)});
      $("#four").mouseup(function() {calcButtonDown("four", false)});
      $("#five").mousedown(function() {calcButtonDown("five", true)});
      $("#five").mouseup(function() {calcButtonDown("five", false)});
      $("#six").mousedown(function() {calcButtonDown("six", true)});
      $("#six").mouseup(function() {calcButtonDown("six", false)});
      $("#subtract").mousedown(function() {calcButtonDown("subtract", true)});
      $("#subtract").mouseup(function() {calcButtonDown("subtract", false)});
      $("#seven").mousedown(function() {calcButtonDown("seven", true)});
      $("#seven").mouseup(function() {calcButtonDown("seven", false)});
      $("#eight").mousedown(function() {calcButtonDown("eight", true)});
      $("#eight").mouseup(function() {calcButtonDown("eight", false)});
      $("#nine").mousedown(function() {calcButtonDown("nine", true)});
      $("#nine").mouseup(function() {calcButtonDown("nine", false)});
      $("#multiply").mousedown(function() {calcButtonDown("multiply", true)});
      $("#multiply").mouseup(function() {calcButtonDown("multiply", false)});
      $("#clear").mousedown(function() {calcButtonDown("clear", true)});  
      $("#clear").mouseup(function() {calcButtonDown("clear", false)});
      $("#clearEntry").mousedown(function() {calcButtonDown("clearEntry", true)});  
      $("#clearEntry").mouseup(function() {calcButtonDown("clearEntry", false)});
      $("#backspace").mousedown(function() {calcButtonDown("backspace", true)});  
      $("#backspace").mouseup(function() {calcButtonDown("backspace", false)});
      $("#divide").mousedown(function() {calcButtonDown("divide", true)});  
      $("#divide").mouseup(function() {calcButtonDown("divide", false)});
    })();
    (function addEntryEvents() {
      $("#zero").click(function() {updateCalcEntry("0")});
      $("#decimal").click(function() {updateCalcEntry(".")});
      $("#one").click(function() {updateCalcEntry("1")});
      $("#two").click(function() {updateCalcEntry("2")});
      $("#three").click(function() {updateCalcEntry("3")});
      $("#four").click(function() {updateCalcEntry("4")});
      $("#five").click(function() {updateCalcEntry("5")});
      $("#six").click(function() {updateCalcEntry("6")});
      $("#seven").click(function() {updateCalcEntry("7")});
      $("#eight").click(function() {updateCalcEntry("8")});
      $("#nine").click(function() {updateCalcEntry("9")});    
    })();
    (function addMathEvents() {
      $("#divide").click(function() {updateCalcHistory("/")});
      $("#multiply").click(function() {updateCalcHistory("*")});
      $("#subtract").click(function() {updateCalcHistory("-")});
      $("#add").click(function() {updateCalcHistory("+")});
    })();
    $("#clearEntry").click(function() {
      entryVal = "0";
      $("#calcEntry").html(entryVal);
    });
    $("#clear").click(function() {
      entryVal = "0";
      $("#calcEntry").html(entryVal);
      calcHistory = "";
      $("#calcHistory").html("NO HISTORY");
    });
    $("#backspace").click(function() {
      // remove the last character; if entryVal.length = 1 then entryVal = "0"
      if (entryVal.length == 1) {
        entryVal = "0";
      } else {
        entryVal = entryVal.slice(0, -1);
      }    
      $("#calcEntry").html(entryVal);
    });
    $("#equals").click(function() {
      if (entryVal.length > 0 && entryVal !== "0") {
        calcHistory = "(" + calcHistory + entryVal + ")";
      }
      if (calcHistory.length > 0) {
        var lastChar = calcHistory.slice(-1);
        if ($.inArray(lastChar, mathFuncs) > 0) {
          calcHistory = calcHistory.slice(0, -1);
        }
        if (calcHistory.length > maxHistoryLength) {
          shownHistory = "..." + calcHistory.slice(-(maxHistoryLength));
        } else {
          shownHistory = calcHistory;
        }
        $("#calcHistory").html(shownHistory);
        var equals = eval(calcHistory).toString();
        if (equals.length > maxLength) {
          equals = equals.substring(0, maxLength);
        }
        $("#calcEntry").html(equals);
        entryVal = "0";
      }
    });
    
    // button animation
    function calcButtonDown(buttonName, addClass) {
      if (addClass) {
        $("#" + buttonName).addClass("calc-button-down");
      } else {
        $("#" + buttonName).removeClass("calc-button-down");
      }
    }
    
    // update feedback
    function updateCalcEntry(val) {
      if (entryVal.length < maxLength) {
        if (entryVal == "0" && val == ".") {
          entryVal = "0.";
        } else if (entryVal == "0") {
          entryVal = val;
        } else if (val == "." && entryVal.indexOf(".") >= 0) {
          return;
        } else {
          entryVal += val;
        }       
      $("#calcEntry").html(entryVal);
      }
    }
    
    function updateCalcHistory(val) {
      var lastChar = calcHistory.slice(-1);
      if (entryVal.length > 0 && entryVal !== "0") {
        if ($.inArray(lastChar, mathFuncs) > -1) {
          calcHistory = calcHistory + entryVal + val;
        } else {
          calcHistory = entryVal + val;
        }
        entryVal = "0";
        $("calcEntry").html(entryVal);
      } else if (calcHistory.length > 0) {
        if ($.inArray(lastChar, mathFuncs) > -1) {
          calcHistory = calcHistory.slice(0, -1);
        }
        calcHistory = calcHistory + val;
      }
      if (calcHistory.length > maxHistoryLength) {
        shownHistory = "..." + calcHistory.slice(-(maxHistoryLength));
      } else {
        shownHistory = calcHistory;
      }
      $("#calcHistory").html(shownHistory);
    }
    
    // tips
    $("#tipText").html(tips[0]);
    
    function rotateTip() {
      // #tipText for tip div
      $("#tipText").html(getNextTip($("#tipText").html()));
    }
    
    (function rotateTips() {
      setInterval(function() {rotateTip();}, 10000)    
    })();
    
    function getNextTip(lastTip) {
      // return the next tip
      var lastTipIndex = tips.indexOf(lastTip);
      var nextTipIndex = (lastTipIndex == (tips.length - 1) || lastTipIndex == -1) ? 0 : lastTipIndex + 1
      return tips[nextTipIndex];
    }
    
  });
  
  var tips = [
    "Display limited to 10 characters.",
    'Use backspace (<i class="fa fa-arrow-left" aria-hidden="true"></i>) to delete one character.',
    "Pressing CE will clear only the current entry.",
    "Pressing C will clear the history."
  ]
  var mathFuncs = ["/", "*", "-", "+"];
  