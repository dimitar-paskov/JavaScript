function main(input) {
    let school = {};

    for (let i = 0; i < input.length; i++) {

        let [t1, student, t2, grade, t3, score] = input[i].split(/: |, /).filter(t => t !== '');
        score = +score;
        grade = +grade + 1;

        // let matches = /Student name: ([A-Z][a-z]+), Grade: (\d{1,2}), Graduated with an average score: (\d\.\d{2})/.exec(input[i]);
        // if (matches !== null) {
        //     let student = matches[1];
        //     let grade = +matches[2] + 1;
        //     let score = +matches[3];

        if (score >= 3) {
            if (!school[grade]) {
                school[grade] = {};
            }
            school[grade][student] = score;
        }

        //  }

    }

    Object.keys(school)
        .sort((a, b) => a - b)
        .forEach(x => {
            console.log(`${x} Grade`);
            console.log("List of students: " + Object.keys(school[x]).join(", "));
            let avgGrade = 0;
            if (Object.keys(school[x]).length === 0 && school[x].constructor === Object) {

            } else {
                avgGrade = (Object.values(school[x]).reduce((acc, cur) => acc += cur)) / (Object.keys(school[x]).length);
            }
            console.log('Average annual grade from last year: ' + avgGrade.toFixed(2));
            console.log();
        })

    //  console.log(school);

}

main([
    'Student name: Ethan, Grade: 9, Graduated with an average score: 5.66',
    'Student name: George, Grade: 8, Graduated with an average score: 2.83',
    'Student name: Steven, Grade: 10, Graduated with an average score: 4.20',
    'Student name: Joey, Grade: 9, Graduated with an average score: 4.90',
    'Student name: Angus, Grade: 11, Graduated with an average score: 2.90',
    'Student name: Bob, Grade: 11, Graduated with an average score: 5.15',
    'Student name: Daryl, Grade: 8, Graduated with an average score: 2.95',
    'Student name: Bill, Grade: 9, Graduated with an average score: 6.00',
    'Student name: Philip, Grade: 10, Graduated with an average score: 5.05',
    'Student name: Peter, Grade: 11, Graduated with an average score: 4.88',
    'Student name: Gavin, Grade: 10, Graduated with an average score: 4.00'])