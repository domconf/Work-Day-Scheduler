// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // Set day and time using day.js
  const currentTime = dayjs();
  $("#currentDay").text(currentTime.format("dddd, MMMM D, YYYY, H:m"));

  //Set time blocks
  $(".time-block").each(function () {
    const blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentTime.hour()) {
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    }
    else if (blockHour === currentTime.hour()) {
      $(this).removeClass("past");
      $(this).addClass("present");
      $(this).removeClass("future");
    }
    else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });

  //Load saved data from localStorage
  $(".description").each(function () {
    const id = $(this).closest(".time-block").attr("id");
    const schedule = localStorage.getItem(id);
    if (schedule !== null) {
      $(this).text(schedule);
    }
  });

  //Added function for save button
  $(".saveBtn").on("click", function () {
    const id = $(this).closest(".time-block").attr("id");
    const schedule = $(this).siblings(".description").val();
    localStorage.setItem(id, schedule);
  });

});
