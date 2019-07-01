function calendar([day, month, year]) {

    let date = new Date(year, month - 1, day);
    let firstOfMonth = new Date(year, month - 1, 1);
    let lastOfPreviousMonth = new Date(year, month - 1, 0);
    let lastOfMonth = new Date(year, month, 0);
    let startDate;
    let DayOfWeekOf1stOfMonth = firstOfMonth.getDay();
    if (DayOfWeekOf1stOfMonth===0){
        DayOfWeekOf1stOfMonth = 6;
    }else{
        DayOfWeekOf1stOfMonth--;
    }

    let locale = "en-us";
    let captionStr = date.toLocaleString(locale, {month: "long"});
    captionStr += " "+ year;



     $('#content').append($('<table>')
                  .append($('<caption>').text(captionStr))
                  .append($('<tbody>')
                      .append($('<tr>')
                          .append($('<th>').text('Mon'))
                          .append($('<th>').text('Tue'))
                          .append($('<th>').text('Wed'))
                          .append($('<th>').text('Thu'))
                          .append($('<th>').text('Fri'))
                          .append($('<th>').text('Sat'))
                          .append($('<th>').text('Sun')))
                  ));

     let $tbody = $('table tbody');
     let count = 1 - DayOfWeekOf1stOfMonth;
     while (count <= lastOfMonth.getDate() ) {
         $tbody.append($('<tr>'));
         let $tr = $('tr:last');
         for (let i = 0; i < 7; i++){
             if (count===date.getDate()){
                 $tr.append($('<td>').addClass('today').text((count < 1 || count > lastOfMonth.getDate())?'':count));
             } else{
                 $tr.append($('<td>').text((count < 1 || count > lastOfMonth.getDate())?'':count));

             }
             count++;
         }
     }
}

