function drawClock() {
    for (var i = 0; i < 60; i++) {
  
      const repere = $("<div/>", { class: "repere repere-" + i });
      repere.css({
        "-webkit-transform": "rotate(" + 6 * i + "deg)",
        "-moz-transform": "rotate(" + 6 * i + "deg)",
        transform: "rotate(" + 6 * i + "deg)"
      });
      $('.cadran').append(repere);
    }
  }
  
  function getCurrentTimeDataInSeconds() {
    
    var date = new Date();
    return {
      hours: date.getHours() * 3600,
      minutes: date.getMinutes() * 60,
      seconds: date.getSeconds()
    };
  }
  
  function applyTransformRotate(selector, angle) {
    $(selector).css({
      "-webkit-transform": "rotate(" + angle + "deg)",
      "-moz-transform": "rotate(" + angle + "deg)",
      transform: "rotate(" + angle + "deg)"
    });
  }
  
  function updatePositions() {
    const $secondes = $('.secondes');
    var { hours, minutes, seconds } = getCurrentTimeDataInSeconds(),
        hoursAngle = (hours + seconds + minutes) / (3600 / (360 / 12)),
        minutesAngle = (minutes + seconds) / (60 / (360 / 60)),
        secondsAngle = seconds / (1 / (360 / 60));
    
    if(secondsAngle === 0) {
      secondsAngle = 360;
      setTimeout(function() {
        $secondes.removeClass('transition-enabled');
        applyTransformRotate('.secondes', 0);
        
        setTimeout(function() {
          $secondes.addClass('transition-enabled');
        }, 100);
      }, 100);
    }
  
    applyTransformRotate('.secondes', secondsAngle);
    applyTransformRotate('.minutes', minutesAngle);
    applyTransformRotate('.heures', hoursAngle);
  
    setTimeout(updatePositions, 1000);
  }
  
  $(function () {
    drawClock();
    updatePositions();
  });
  
  