

var newEventArray = []; //global variable


!function() {

  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
      window.setTimeout(function() {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();

    this.drawLegend();
  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth(); });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth(); });

      //Append the Elements
      this.header.appendChild(this.title); 
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    
      
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;
    
    //display current month
    var currMonth = this.current._d.getMonth()+1;

    //added logic onnly display events if they are of current month
    this.events.forEach(function(ev) {
      var theMonth = (ev.dates).split("/")[0]; 
      
      
      if(theMonth == currMonth){
        //console.log("current month is: " + theMonth);
        //only display if it's in the current month   
        var theDay = (ev.dates).split("/")[1];
        ev.date = self.current.clone().date(theDay);
      }
      
      
    });
    
    
    if(this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = 'month new';
    }
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
    outer.addEventListener('click', function() {
      self.openDay(this);
    });

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));


    //Events
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  }

  Calendar.prototype.drawEvents = function(day, element) {
    if(day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if(ev.date != undefined){

          if(ev.date.isSame(day, 'day')) {
            memo.push(ev);
          }
        }
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.openDay = function(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if(currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if(currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function(memo, ev) {
      if(ev.date!=undefined){
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
      }
      
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  }

  Calendar.prototype.renderEvents = function(events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function(ev) {
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '', ev.eventName);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if(!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if(currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  Calendar.prototype.drawLegend = function() {
    var legend = createElement('div', 'legend');
    var calendars = this.events.map(function(e) {
      return e.calendar + '|' + e.color;
    }).reduce(function(memo, e) {
      if(memo.indexOf(e) === -1) {
        memo.push(e);
      }
      return memo;
    }, []).forEach(function(e) {
      var parts = e.split('|');
      var entry = createElement('span', 'entry ' +  parts[1], parts[0]);
      legend.appendChild(entry);
    });
    this.el.appendChild(legend);
  }

  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();







!function() {
  var data = [
    { eventName: 'Eating with Myself', calendar: 'Food', color: 'orange' , dates: '3/1' },
    
    { eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'blue', dates: '3/8'  },
    { eventName: 'Demo New App to the Board', calendar: 'Work', color: 'blue', dates: '3/10'  },
    { eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'blue', dates: '3/9'  },

    { eventName: 'School Play', calendar: 'Kids', color: 'yellow' , dates: '3/5' },
    { eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow', dates: '3/13'  },
    { eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' , dates: '3/21' },
    { eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' , dates: '3/25' },

    { eventName: 'Free Tamale Night', calendar: 'Other', color: 'green', dates: '3/9'  },
    { eventName: 'Bowling Team', calendar: 'Other', color: 'green', dates: '3/16'  },
    { eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' , dates: '3/18' },
    { eventName: 'Startup Weekend', calendar: 'Other', color: 'green', dates: '3/22'  }
  ];



function addDate() {

    

  //alert("addDate called");

  //get data that was sent through scheduledEvent
  $.get('/scheduledEvent', function(events) {
    //console.log(events);
    
  
    for(var i =0; i < events.events.length; i++){
      
      var newEvent = {
        "eventName": events.events[i].starttime + " at " + events.events[i].eventName + " with " + events.events[i].friend, 
        "calendar": events.events[i].calendar, 
        "color": events.events[i].color, 
        "dates": events.events[i].dates
      };



      var dataExist;
      for(var key in data){
        if(data.hasOwnProperty(key)){
            if(data[key].eventName === newEvent.eventName && 
              data[key].calendar === newEvent.calendar &&
              data[key].color === newEvent.color &&
              data[key].dates === newEvent.dates){
                dataExist = true;
            }
        }
      }

    

      if(!dataExist){
        newEventArray.push(newEvent);
      }

      
    
    }

    //console.log(data);
    //console.log(newEventArray);
    
    
    for(var index in newEventArray){
      //console.log("inside for loop");
      //console.log(newEventArray[index]);
      data.push(newEventArray[index]);
    }
    
    
    
    
    var calendar = new Calendar('#calendar', data);
  });

}  
  
  addDate();

}();



// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  "use strict";
	initializePage();
})

function initializePage() {
    console.log("initialized");
    //deleteItem();

    resizeAllInputEvents();
    
}


function deleteItem(){
  $('#event').click(function(e){
    console.log("deleting event");
    e.preventDefault();
    var infoText = ($(this)[0].innerText);
    $.post('/unScheduleEvent', {text: infoText});

  });
  
}

function resizeAllInputEvents(){
  var eventLength = document.getElementsByClassName('time').length;
    for(var i = 0; i< eventLength; i++ ){
      resizable(document.getElementsByClassName('time')[i],8);
      resizable(document.getElementsByClassName('place')[i],8.3);
      resizable(document.getElementsByClassName('name')[i],8.5);
	  }
}

function resizable (el, factor) {
  var int = Number(factor) || 7.7;
  function resize() {
    el.style.width = ((el.value.length+1) * int) + 'px';
  }
  var e = 'keyup,keypress,focus,blur,change'.split(',');
  for (var i in e){
    el.addEventListener(e[i],resize,false);
  } 
  resize();
}
