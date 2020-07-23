
function getDays() {
  var target = $('#target-month');
  target.text("");
  var currentMonth = moment('2018-01');
  var howManyDays = currentMonth.daysInMonth();

  var template = $('#month-template').html();
  var compiled = Handlebars.compile(template);

  for (var i = 1; i <= howManyDays; i++) {
    var dateComplete = moment({year:currentMonth.year(), month:currentMonth.month(),day:i});
    var daysHTML = compiled({
      'dateComplete': dateComplete.format('YYYY-MM-DD'),
      'day': i
    });
    target.append(daysHTML)
  }


  getHolidays(currentMonth);
}

function getHolidays(currentMonth) {
  var mese = currentMonth.month();
  var anno = currentMonth.year();

  $.ajax({
    url:'https://flynn.boolean.careers/exercises/api/holidays',
    data:{
      'year':anno,
      'month':mese
    },
    method:'GET',
    success:function (data) {
      var arrayHoliday=data['response'];
      checkHoliday(arrayHoliday);
    },
    error:function (error) {
      console.log('error');
    }
  });
}

function checkHoliday(arrayHoliday) {
  for (var i = 0; i < arrayHoliday.length; i++){
    var festivita = $('#target-month li[data-dateComplete='+arrayHoliday[i]['date']+']');
    festivita.addClass('holidays');
    festivita.append(' - ' + arrayHoliday[i]['name']);
  }
}

function init() {
  getDays();
}




$(document).ready(init);
