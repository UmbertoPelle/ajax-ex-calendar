function changeMonth() {
  var selectMonth = $('.mesi');
  var value;
  selectMonth.change(function () {
    value = selectMonth.val()
    getDays(value);
  });
}

function getDays(value) {
  var target = $('.test-calendar');
  target.text("");
  var currentMonth = moment('2018-'+value,'YYYY-M');
  var howManyDays = currentMonth.daysInMonth();

  var template = $('#month-template').html();
  var compiled = Handlebars.compile(template);

  var month2018 = $('#month-2018');

  month2018.text(currentMonth.format('MMMM')+'-2018');

  for (var i = 1; i <= howManyDays; i++) {
    var dateComplete = moment({year:currentMonth.year(), month:currentMonth.month(),day:i});
    var daysHTML = compiled({
      'dateComplete': dateComplete.format('YYYY-MM-DD'),
      'day': i +' - '+ dateComplete.format('dddd')
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
    var festivita = $('.test-calendar div[data-dateComplete='+arrayHoliday[i]['date']+']');
    festivita.addClass('holidays');
    festivita.append(' <h3> ' + arrayHoliday[i]['name'] + ' </h3> ');
  }
}

function init() {
  changeMonth();
  getDays();
}




$(document).ready(init);
