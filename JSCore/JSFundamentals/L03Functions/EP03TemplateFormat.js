function solve(arr) {
    let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<quiz>\n";
    for (let i = 0; i < arr.length; i += 2) {
        let question = arr[i];
        let answer = arr[i + 1];


        xml += insertQA(question, answer);

    }

    xml +=  "</quiz>\n";
    console.log(xml);

    function insertQA(question, answer) {
        let xml = "  <question>\n" +
            `    ${question}\n` +
            "  </question>\n" +
            "  <answer>\n" +
            `    ${answer}\n` +
            "  </answer>\n";

        return xml;
    }

}
solve(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]);