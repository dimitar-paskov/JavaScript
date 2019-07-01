function solve(name, age, weight, height) {
    let BMI = 'BMI';
    let status = 'status';
    let recommendation = 'recommendation';

    let personalChart = {
        name,
        personalInfo:{
            age,
            weight,
            height,
        },
        BMI:Math.round(weight*10000/(height * height)),
    };

    if (personalChart[BMI] < 18.5){
        personalChart[status] = 'underweight';
    }else if (personalChart[BMI] < 25){
        personalChart[status] = 'normal';
    }else if (personalChart[BMI] < 30){
        personalChart[status] = 'overweight';
    }else if (personalChart[BMI] >= 30){
        personalChart[status] = 'obese';
    }

    if (personalChart[status] === 'obese'){
        personalChart[recommendation] = 'admission required';
    }

    return personalChart;
}

solve("Honey Boo Boo", 9, 57, 137);
solve("Peter", 29, 75, 182);