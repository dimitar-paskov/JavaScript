$(function () {

    const url = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students';
    const username = 'guest';
    const password = 'guest';

    const base64auth = btoa(username + ":" + password);
    const authHeaders = {
        "Authorization": "Basic " + base64auth,
        "Content-type": "application/json"
    };



    function add(){

        const ID = +$('#ID').val();
        const FirstName = $('#firstName').val();
        const LastName = $('#lastName').val();
        const FacultyNumber = $('#facultyNumber').val();
        const Grade = +$('#grade').val();

        console.log(ID);
        console.log(FirstName);
        console.log(LastName);
        console.log(FacultyNumber);
        console.log(Grade);



        // const data = `{
        //     "ID":${ID},
        //     "FirstName": "${FirstName}",
        //     "LastName": "${LastName}",
        //     "FacultyNumber": "${FacultyNumber}",
        //     "Grade": ${Grade}}`;

        const data = {ID,FirstName, LastName, FacultyNumber, Grade};

        console.log(data);

        $.ajax({
            type: 'post',
            url,
            data: JSON.stringify(data),
            headers: authHeaders
        }).then(loadAll)
            .catch(displayError);

    }


    loadAll();
    function loadAll() {

        $('table').empty();
        $('table').append(`<tbody>`);
        $('tbody').append(`<tr>
        <th>N</th>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Faculty Number</th>
        <th>Grade</th>
    </tr>`);

        let addBtn = $('<button>Add</button>');
        addBtn.on('click', add);

        let tr = $('<tr>');
        tr.append($('<td>').append(addBtn))
            .append(`<td><input type="text" id="ID"></td>`)
            .append(`<td><input type="text" id="firstName"></td>`)
            .append(`<td><input type="text" id="lastName"></td>`)
            .append(`<td><input type="text" id="facultyNumber"></td>`)
            .append(`<td><input type="text" id="grade"></td>`);


        $('#results').append(tr);


        $.ajax({
            type: 'get',
            url,
            headers: authHeaders
        }).then(displayStudents)
            .catch(displayError);

    }

    function displayStudents(students) {
        students.sort((a,b)=>{
            return a.ID - b.ID;
        });
        let n = 1;
        for (const student of students) {
            showStudent(student, n++);

        }
    }

    function showStudent(student, n) {
        const ID = student.ID;
        const FirstName = student.FirstName;
        const LastName = student.LastName;
        const FacultyNumber = student.FacultyNumber;
        const Grade = student.Grade;

        let tr = $('<tr>');
        tr.append(`<td>${n}</td>`)
            .append(`<td>${ID}</td>`)
            .append(`<td>${FirstName}</td>`)
            .append(`<td>${LastName}</td>`)
            .append(`<td>${FacultyNumber}</td>`)
            .append(`<td>${Grade}</td>`);

        $('#results').append(tr);

    }

    function displayError(err) {
        console.log(err);
    }
})


/*https://github.com/hammer4/SoftUni/blob/master/JS%20Applications/06.%20AJAX%20with%20Promises%20Exercises/01.%20Students/students.js
function students() {
    let baseSurviceUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students";
    let kinveyUsername = "guest";
    let kinveyPassword = "guest";
    let base64Auth = btoa(kinveyUsername + ":" + kinveyPassword);

    loadStudents();

    function loadStudents() {
        let request = {
            url: baseSurviceUrl,
            method: "GET",
            headers: {
                "Authorization": "Basic " + base64Auth
            }
        };

        $.get(request)
            .then(displayStudents);
    }

    function displayStudents(students) {
        $('#results').find('tr').nextAll().remove();
        students = students.sort((a,b) => a.ID - b.ID);
        for(let student of students){
            $("#results")
                .append($('<tr>')
                    .append($('<td>').text(student.ID))
                    .append($('<td>').text(student.FirstName))
                    .append($('<td>').text(student.LastName))
                    .append($('<td>').text(student.FacultyNumber))
                    .append($('<td>').text(student.Grade))
                );
        }
    }

    $('#addStudent').click(function (ev) {
        ev.preventDefault();
        let ID = Number($('#ID').val());
        let FirstName = $('#FirstName').val();
        let LastName = $('#LastName').val();
        let FacultyNumber = $('#FacultyNumber').val();
        let Grade = Number($('#Grade').val());

        let facultyNumberRegex = /^\d+$/;

        if(FirstName.trim() != "" && LastName.trim() != "" && facultyNumberRegex.test(FacultyNumber)){
            let request = {
                url: baseSurviceUrl,
                method: "POST",
                headers: {
                    "Authorization": "Basic " + base64Auth,
                    "Content-type": "application/json"
                },
                data: JSON.stringify({
                    ID: ID,
                    FirstName: FirstName,
                    LastName: LastName,
                    FacultyNumber: FacultyNumber,
                    Grade: Grade
                })
            };

            $.ajax(request)
                .then(loadStudents);
        }
    });
}
*/