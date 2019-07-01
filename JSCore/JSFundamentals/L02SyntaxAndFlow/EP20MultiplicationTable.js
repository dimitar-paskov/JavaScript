
    function solve(n){
        console.log("<table border='1'>");

        let result = "<tr><th>x</th>";
        for (let i = 1; i <= n; i++){
            result += `<th>${i}</th>`;
        }
        result += "</tr>\n";

        for (let i = 1; i <= n; i++){
            result += `<tr><th>${i}</th>`
            for (let j = 1; j <= n; j++){
                result += `<td>${j*i}</td>`;
            }
            result += "</tr>\n";
        }

        result += "</table>"

        console.log(result);

    }
solve(5);






//document.body.innerHTML = solve(5);