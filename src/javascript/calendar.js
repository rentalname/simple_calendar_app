window.App = {};
!function($){
    App.Calendar = function(){

        var currentDate = new Date();
        var $calendar;

        this.attachCalendar = function($cal, date){
            $calendar = $cal;
            if(date !== void(0)){
                this.currentDate = date;
            }
            draw($calendar);
        };
        this.setCurrentDate = function(date){
            this.currentDate = date;
        };
        this.currentYear = function(){
            return currentYear();
        };
        this.currentMonth = function(){
            return _currentMonth() + 1;
        };
        this.currentDay = function(){
            return _currentDay();
        };
        this._currentWday = function(){
            return currentDate.getDay();
        };
        this.currentWday = function(){
            var weekDays = ["日", "月", "火", "水", "木", "金", "土"];
            return weekDays[this._currentWday()];
        };

        var currentYear = function(){
            return currentDate.getFullYear();
        };
        var _currentMonth = function(){
            return currentDate.getMonth();
        };
        var _currentDay = function(){
            return currentDate.getDate();
        };
        var firstAtMonth = function(){
            var y = currentYear();
            var m = _currentMonth();
            return new Date(y, m, 1);
        };
        var lastAtMonth = function(){
            var y = currentYear();
            var m = _currentMonth();
            return new Date(y, m + 1, 0)
        };
        var draw = function(){
            $month = appendMonth();
            $week = appendWeek($month);
            $week = paddingBlankDay($week);
            appendExistDay($month, $week)
        };

        var $_month = $("<div class='cal-month'></div>");
        var appendMonth = function(){
            var dup = $_month.clone();
            $calendar.append(dup);
            return dup;
        };

        var $_week = $("<ul class=cal-week></ul>");
        var appendWeek = function($month){
            var dup = $_week.clone();
            $month.append(dup);
            return dup;
        };

        var $_day = $("<li class=cal-day></li>");
        var paddingBlankDay = function($week){
            for(var i = -(firstAtMonth().getDay()); i < 0; i++) {
                $week.append($_day.clone());
            }
            return $week;
        };
        var appendExistDay = function($month, $week){
            var currentWeek = $week;
            for(var i = 1; i <= lastAtMonth().getDate(); i++) {
                //次の週をDOMに挿入
                if ((firstAtMonth().getDay() + i - 1) % 7 === 0) {
                    currentWeek = appendWeek($month);
                }
                var dup = $_day.clone();
                dup.text(i);
                currentWeek.append(dup);
            }
        };
    };
}($);

calendar = new App.Calendar();

$("#year").text(calendar.currentYear());
$("#month").text(calendar.currentMonth());
$("#day").text(calendar.currentDay());
$("#wday").text(calendar.currentWday());

calendar.attachCalendar($("#cal"));
