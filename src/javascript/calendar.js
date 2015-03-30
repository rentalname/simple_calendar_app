window.App = {};
!function($){
    App.Calendar = function(){

        var currentDate = new Date();
        var $calendar;
        var domParts = (function(){
            var monthParts = $("<div class='cal-month'></div>");
            var weekParts  = $("<ul class=cal-week></ul>");
            var dayParts   = $("<li class=cal-day></li>");

            return {
                month: function(){
                    return monthParts.clone();
                },
                week: function(){
                    return weekParts.clone();
                },
                day: function(day){
                    var parts = dayParts.clone();
                    parts.html(day);
                    return parts;
                }
            }
        })();

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
        this.showNextMonth = function(){
            $calendar.find(".cal-month").remove();
            this.attachCalendar($calendar, setNextMonth());
        };
        this.showPrevMonth = function(){
            $calendar.find(".cal-month").remove();
            this.attachCalendar($calendar, setPrevMonth());
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
        var setNextMonth = function(){
            currentDate.setMonth(currentDate.getMonth() + 1);
            return currentDate
        };
        var setPrevMonth = function(){
            currentDate.setMonth(currentDate.getMonth() - 1);
            return currentDate
        };
        var draw = function(cal){
            var month = appendMonth(cal);
            var week = appendWeek(month);
            week = paddingBlankDay(week);
            appendExistDay(month, week)
        };

        var appendMonth = function(cal){
            var m = domParts.month();
            cal.append(m);
            return m;
        };

        var appendWeek = function($month){
            var week = domParts.week();
            $month.append(week);
            return week;
        };

        var paddingBlankDay = function($week){
            for(var i = -(firstAtMonth().getDay()); i < 0; i++) {
                $week.append(domParts.day("&nbsp;"));
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

                currentWeek.append(domParts.day(i));
            }
        };
    };
}(jQuery);
