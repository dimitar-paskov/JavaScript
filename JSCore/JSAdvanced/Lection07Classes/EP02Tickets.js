function solve(arr, sortBy){
    let ticketArr = [];

    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = +price;
        this.status = status;
    }

    arr.forEach(x=>{
        let [destination, price, status ] = x.split("|");
        ticketArr.push(new Ticket(destination, price, status));
    });

    if (sortBy !== "price"){
        ticketArr = ticketArr.sort((a,b) => {
            return (a[sortBy].localeCompare( b[sortBy]));
        });
    } else{
        ticketArr = ticketArr.sort((a,b) => {
            return (a[sortBy] -  b[sortBy]);
        });
    }

    // console.log(ticketArr)
    return ticketArr;

}


solve(
    ["Philadelphia|94.20|available",
                   "New York City|95.99|available",
                   "New York City|95.99|sold",
                   "Boston|126.20|departed"],
"destination");