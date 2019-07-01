function dart(){
    $('#firstLayer').on('click', addGreenPoints);
    $('#secondLayer').on('click', addYellowPoints);
    $('#thirdLayer').on('click', addOrangePoints);
    $('#fourthLayer').on('click', addRedPoints);
    $('#fifthLayer').on('click', addPurplePoints);
    $('#sixthLayer').on('click', addBluePoints);
    let onTurn = 'Home';

    function addGreenPoints(event) {
        // event.stopPropagation();
        let points = +$('tbody tr').eq(0).children().eq(1).text().split(' ')[0];
        console.log(points);

        if (onTurn === 'Home'){
            let score = +$('#Home p').eq(0).text();
            console.log(score);
            score += points;
            $('#Home p').eq(0).text(score);
            onTurn = 'Away';
            $('#turns p').eq(0).text('Turn on Away');
            $('#turns p').eq(1).text('Next is Home');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }
        }else{
            let score = +$('#Away p').eq(0).text();
            console.log(score);
            score += points;
            $('#Away p').eq(0).text(score);
            onTurn = 'Home';
            $('#turns p').eq(0).text('Turn on Home');
            $('#turns p').eq(1).text('Next is Away');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }

        }

        if (points >= 100){
            disableClicks();
        }

    }

    function addYellowPoints(event) {
        event.stopPropagation();
        let points = +$('tbody tr').eq(1).children().eq(1).text().split(' ')[0];
        console.log(points);

        if (onTurn === 'Home'){
            let score = +$('#Home p').eq(0).text();
            console.log(score);
            score += points;
            $('#Home p').eq(0).text(score);
            onTurn = 'Away';
            $('#turns p').eq(0).text('Turn on Away');
            $('#turns p').eq(1).text('Next is Home');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }
        }else{
            let score = +$('#Away p').eq(0).text();
            console.log(score);
            score += points;
            $('#Away p').eq(0).text(score);
            onTurn = 'Home';
            $('#turns p').eq(0).text('Turn on Home');
            $('#turns p').eq(1).text('Next is Away');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }

        }

        if (points >= 100){
            disableClicks();
        }

    }

    function addOrangePoints(event) {
        event.stopPropagation();
        let points = +$('tbody tr').eq(2).children().eq(1).text().split(' ')[0];
        console.log(points);

        if (onTurn === 'Home'){
            let score = +$('#Home p').eq(0).text();
            console.log(score);
            score += points;
            $('#Home p').eq(0).text(score);
            onTurn = 'Away';
            $('#turns p').eq(0).text('Turn on Away');
            $('#turns p').eq(1).text('Next is Home');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }
        }else{
            let score = +$('#Away p').eq(0).text();
            console.log(score);
            score += points;
            $('#Away p').eq(0).text(score);
            onTurn = 'Home';
            $('#turns p').eq(0).text('Turn on Home');
            $('#turns p').eq(1).text('Next is Away');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }

        }

        if (points >= 100){
            disableClicks();
        }

    }

    function addRedPoints(event) {
        event.stopPropagation();
        let points = +$('tbody tr').eq(3).children().eq(1).text().split(' ')[0];
        console.log(points);

        if (onTurn === 'Home'){
            let score = +$('#Home p').eq(0).text();
            console.log(score);
            score += points;
            $('#Home p').eq(0).text(score);
            onTurn = 'Away';
            $('#turns p').eq(0).text('Turn on Away');
            $('#turns p').eq(1).text('Next is Home');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }
        }else{
            let score = +$('#Away p').eq(0).text();
            console.log(score);
            score += points;
            $('#Away p').eq(0).text(score);
            onTurn = 'Home';
            $('#turns p').eq(0).text('Turn on Home');
            $('#turns p').eq(1).text('Next is Away');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }

        }

        if (points >= 100){
            disableClicks();
        }

    }

    function addPurplePoints(event) {
        event.stopPropagation();
        let points = +$('tbody tr').eq(4).children().eq(1).text().split(' ')[0];
        console.log(points);

        if (onTurn === 'Home'){
            let score = +$('#Home p').eq(0).text();
            console.log(score);
            score += points;
            $('#Home p').eq(0).text(score);
            onTurn = 'Away';
            $('#turns p').eq(0).text('Turn on Away');
            $('#turns p').eq(1).text('Next is Home');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }
        }else{
            let score = +$('#Away p').eq(0).text();
            console.log(score);
            score += points;
            $('#Away p').eq(0).text(score);
            onTurn = 'Home';
            $('#turns p').eq(0).text('Turn on Home');
            $('#turns p').eq(1).text('Next is Away');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }

        }

        if (points >= 100){
            disableClicks();
        }

    }

    function addBluePoints(event) {
        event.stopPropagation();
        let points = +$('tbody tr').eq(5).children().eq(1).text().split(' ')[0];
        console.log(points);

        if (onTurn === 'Home'){
            let score = +$('#Home p').eq(0).text();
            console.log(score);
            score += points;
            $('#Home p').eq(0).text(score);
            onTurn = 'Away';
            $('#turns p').eq(0).text('Turn on Away');
            $('#turns p').eq(1).text('Next is Home');
            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }
        }else{
            let score = +$('#Away p').eq(0).text();
            console.log(score);
            score += points;
            $('#Away p').eq(0).text(score);
            onTurn = 'Home';
            $('#turns p').eq(0).text('Turn on Home');
            $('#turns p').eq(1).text('Next is Away');

            if (score >= 100){
                console.log('disable click check');
                disableClicks();
            }

        }



    }

    function disableClicks() {
        console.log('disable click function');

        $('#firstLayer').off('click');
        $('#secondLayer').off('click');
        $('#thirdLayer').off('click');
        $('#fourthLayer').off('click');
        $('#fifthLayer').off('click');
        $('#sixthLayer').off('click');
    }

}