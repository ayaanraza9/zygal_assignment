//Creating Months Array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
//Creating Days Array
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const createCalandarObject = function (totalDays, firstDay) {
  //All things have been set to default initially
  const defaultWeekDays = [false, false, false, false, false, false, false];
  // we taken the array and spread it to have the elemnent spreaded
  const calandarObject = [[...defaultWeekDays]];
  let dayIndex = firstDay;
  let weekIndex = 0;
  //we took a for loop & added the days & index of day
  for (let day = 0; day < totalDays; day += 1) {
    //adding elements inside the calenderObject to intialize the key to the days
    calandarObject[weekIndex][dayIndex] = day + 1;
    //checking the day index is <= arr.length so value will be 0
    //& pointer will point towards the start
    if (dayIndex === 6) {
      calandarObject.push([...defaultWeekDays]);
      weekIndex += 1;
      dayIndex = 0;
    } else {
      dayIndex += 1;
    }
  }
  return calandarObject;
};

// month - value starts from 1 ( january )
const getDaysInMonth = function (month, year) {
  //0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
};

//by default month starts from zero
const getFirstDayInMonth = function (month, year) {
  return new Date(year, month - 1, 1).getDay(); // 0 - 6
};

// / Constructing the html markup for the calander
const constructCalanderUI = function (calandar) {
  const weekDaysMarkup = days.map(
    //slice is selecting SUN from SUNDAY
    (day) => `<div class="day-cell"> ${day.slice(0, 3).toUpperCase()} </div> `
  );

  const weeksMarkup = calandar.map((week) => {
    const daysMarkup = week.map((day) => {
      // if day is found we display the day else display nothing
      return `<div id="day-${day ? day : ""}" class="day-cell"> ${
        day ? `<span> ${day}</span>` : ""
      } </div>`;
    });
    //joining the days name to make a row
    return `
                  <div class="week-row">
                      ${daysMarkup.join("")}
                  </div>
              `;
  });
  //now adding days in every month
  weeksMarkup.unshift(`<div class="week-row">${weekDaysMarkup.join("")}</div>`);
  let htmlMarkup = weeksMarkup.join("");
  document.getElementById("calander-root").innerHTML = htmlMarkup;
  console.log("htmlMarkup", htmlMarkup);
};
//Highlighting Entered Date
const toggleHighlightDate = (date) => {
  const dayCell = document.getElementById(`day-${date}`);
  if (dayCell) {
    if (dayCell.className.indexOf("active") > -1) {
      dayCell.className += "day-cell";
    } else dayCell.className += " active";
  }
};

//  Handle change of month and year and show updated calander
const changeCalanderMonthYear = function (month, year) {
  const totalDaysInMonth = getDaysInMonth(month, year);
  const firstDayInMonth = getFirstDayInMonth(month, year);
  const calander = createCalandarObject(totalDaysInMonth, firstDayInMonth);
  console.log("calander", calander);
  constructCalanderUI(calander);
};
//It generates the calender corresponding to the current date
const initiateCalander = () => {
  //it dynamicaly adding month select tag
  const monthsOptionsMarkup = months
    .map((month, index) => `<option value="${index + 1}"> ${month} </option>`)
    .join("");
  //it dynamicaly adding Year select tag
  let yearsOptions = "";
  for (let year = 1900; year < 2050; year += 1) {
    yearsOptions += `<option value="${year}">${year}</option>`;
  }
  document.getElementById("year-select").innerHTML = yearsOptions;
  document.getElementById("month-select").innerHTML = monthsOptionsMarkup;

  const today = new Date();
  const currentYear = today.getFullYear();
  //.getMonth method will give month index start from zero
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  document.getElementById("year-select").value = currentYear;
  document.getElementById("month-select").value = currentMonth;
  changeCalanderMonthYear(currentMonth, currentYear);
  toggleHighlightDate(currentDate);
  //we created the custom elements to be used in further code
  window.selectedMonth = currentMonth;
  window.selectedYear = currentYear;
};

initiateCalander();
//Highlighting the entered date
document.getElementById("enter-date-btn").addEventListener("click", () => {
  const dateVal = document.getElementById("date-select").value;
  if (dateVal && !isNaN(dateVal)) {
    toggleHighlightDate(dateVal);
  }
});
//Changing celender according to month
document.getElementById("month-select").addEventListener("change", (event) => {
  window.selectedMonth = event.target.value;
  changeCalanderMonthYear(window.selectedMonth, window.selectedYear);
});
// Changing celender according to year
document.getElementById("year-select").addEventListener("change", (event) => {
  window.selectedYear = event.target.value;
  changeCalanderMonthYear(window.selectedMonth, window.selectedYear);
});
