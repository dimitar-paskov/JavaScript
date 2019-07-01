function calendar([day, month, year])
{
    let date = new Date(year, month - 1, day);
    let firstOfMonth = new Date(year, month - 1, 1);
    let lastOfPreviousMonth = new Date(year, month-1, 0);
    let lastOfMonth = new Date(year, month, 0);
    let startDate;
    let DayOfWeekOf1stOfMonth = firstOfMonth.getDay();

    if (DayOfWeekOf1stOfMonth !== 0) {
        startDate = new Date(year, month-2, lastOfPreviousMonth.getDate() - DayOfWeekOf1stOfMonth+1);
    }
    if (startDate === undefined){
        startDate = new Date(firstOfMonth);
    }


    let html = "<table>\n";
    html += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n";

    for (let j = new Date(startDate); j <= lastOfMonth;) {
        html += "<tr>";
        for (let i = new Date(j), k = 0; k <= 6; i.setDate(i.getDate() + 1), k++) {
            html += `<td`;

            if (i < firstOfMonth) {
                html += ` class="prev-month">`;
            }else if (i > lastOfMonth){
                html +=` class="next-month">`;
            }else if (i.getTime() === date.getTime()){
                debugger;
                html +=` class="today">`
            }else {
                html +=`>`
            }

            html += `${i.getDate()}`;

            html += `</td>`;

        }
        html += "</tr>\n";
        debugger;
        j.setDate(j.getDate() + 7);
    }


    html += "</table>\n";



    console.log( html);


}

calendar([31, 9, 2018]);