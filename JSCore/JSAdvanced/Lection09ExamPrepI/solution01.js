function addDestination() {
    let inputs = document.querySelectorAll('.inputData');
    let answer = [];
    let isEmptyAnyOfTheInputs = false;

    // inputs.forEach(x => {
    //     if (x.value) {
    //         answer.push(x.value)
    //     } else {
    //         isEmptyAnyOfTheInputs = true;
    //     }
    // });

    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].value){
            answer.push(inputs[i].value);
        } else{
            isEmptyAnyOfTheInputs = true;
        }
    }

    if (!isEmptyAnyOfTheInputs){
        answer = answer.join(', ');

        let tbody = document.getElementById('destinationsList');
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = answer;
        tr.appendChild(td1);



        let season = document.getElementById('seasons').options[document.getElementById('seasons').selectedIndex].text;
        let td2 = document.createElement('td');
        td2.textContent = season;
        tr.appendChild(td2);

        tbody.appendChild(tr);

        let oldVal = document.getElementById(season.toLowerCase()).value;
        oldVal++;
        document.getElementById(season.toLowerCase()).value = oldVal;

    }

    // inputs.forEach(x=>{
    //     x.value = '';
    // })
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
    }
}