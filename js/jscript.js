
function getDays() {
  var daysInMonth = moment("2018-01", "YYYY-MM").daysInMonth();
  var arrDays = [];

  while(daysInMonth) {
    var current = moment().date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }

  arrDays.forEach(function(item) {
  var day = item.format("dddd/DD");
  $('#days').append('<li>'+day+'</li>');
  });


  var x = moment().month();
  console.log(x);
}

function init() {

  getDays();
}




$(document).ready(init);
