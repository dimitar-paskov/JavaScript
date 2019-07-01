let test = (()=>{
    let count = 0;
    let bugsList = [];
    let idstr = 'ID';
    let status = 'status';
    let author = 'author';
    let severity = 'severity';
    let description = 'description';
    let outSelector = '';

    function report(author, description, reproducible, severity) {
        let bug = {
            ID: count++,
            status: 'Open',
            author,
            description,
            reproducible,
            severity
        }
        bugsList.push(bug);
        output(outSelector);
    }

    function setStatus(id, newStatus) {
        bugsList.find(x => x[idstr] === id)[status] = newStatus;
        output(outSelector);

    }
    function remove(id) {
        bugsList = bugsList.filter(item => item[idstr] !== id);
        output(outSelector);
    }
    function sort(method) {

        if (method === 'author'){
            bugsList.sort((a,b) => a[author].localeCompare(b[author]));
        } else if (method === 'severity') {
            bugsList.sort((a,b) => a[severity] - b[severity]);
        }else {
            bugsList.sort((a,b) => a[idstr] - b[idstr]);
        }
        output(outSelector);
    }

    function output(selector) {
        let $element = $(selector);
        $element.empty();
        outSelector = $element;
        bugsList.forEach(x=>{

            let idValue = 'report_' + x[idstr];
            let submittedBy = 'Submitted by: ' + x[author];
            let statAndSeverity = x[status] + " | " + x[severity];

            let $div = $('<div>');
            $div.addClass('report').attr('id', idValue)
                .append($('<div>').addClass('body').append($('<p>').text(x[description])))
                .append($('<div>').addClass('title')
                    .append($('<span>').addClass(author).text(submittedBy))
                    .append($('<span>').addClass(status).text(statAndSeverity)))
            $element.append($div);
        })

    }

    function print() {
        console.log(bugsList);
    }



    let expose = {
        report,
        setStatus,
        remove,
        sort,
        output,
        print,
    };

    return expose;


})();
test.output('#content');
test.report('kiwi', 'judge rip', true, 5);
// test.report('Pesho', 'Ova e mio novo bug1', true, 17);
// test.report('Gosho', 'Ova e mio novo bug2', true, 16);
// test.report('Tosho', 'Ova e mio novo bug3', true, 15);
// test.setStatus(1,'Critical');
// test.sort('author');
// // test.print();
// test.sort('ID');
// // test.print();
// test.sort('severity');
// // test.print();
// test.output('#content');
