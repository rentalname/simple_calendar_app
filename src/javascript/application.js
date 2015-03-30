calendar = new App.Calendar();

$("#year").text(calendar.currentYear());
$("#month").text(calendar.currentMonth());
$("#day").text(calendar.currentDay());
$("#wday").text(calendar.currentWday());

calendar.attachCalendar($("#cal"));
updateCurrentDate();


$("#control").find(".prev").on('click', function(){
    calendar.showPrevMonth();
    updateCurrentDate();
});

$("#control").find(".next").on('click', function(){
    calendar.showNextMonth();
    updateCurrentDate();
});

function updateCurrentDate(){
    var y = calendar.currentYear();
    var m = ("0" + calendar.currentMonth()).slice(-2);
    $("#control").find(".current_date").text(y + '/' + m);
}