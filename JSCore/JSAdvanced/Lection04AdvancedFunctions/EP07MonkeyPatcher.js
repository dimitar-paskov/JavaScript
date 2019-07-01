function solution(input) {

    if (input === 'upvote') {
        this.upvotes++;
    } else if (input === 'downvote') {
        this.downvotes++;
    } else if (input === 'score') {
        let result = [];
        let upvote = this.upvotes;
        let downvote = this.downvotes;
        let balance = upvote - downvote;

        let rating = '';
        if (upvote + downvote < 10){
            rating = 'new';
        } else if ((upvote/ (upvote+downvote)) > 0.66) {
            rating = 'hot';
        }else if (balance >= 0 && upvote + downvote > 100){
            rating = 'controversial';
        }else if (balance < 0){
            rating = 'unpopular';
        } else{
            rating = 'new';
        }


        if (upvote + downvote > 50) {
            let added = 0
            let bigger = Math.max(upvote, downvote);
            added = Math.ceil(0.25 * bigger);
            upvote += added;
            downvote += added;
        }


        result.push(upvote);
        result.push(downvote);
        result.push(balance);
        result.push(rating);
        return result;
    }

}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 132,
    downvotes: 68,
    sol: solution
};
// solution.call(post, 'downvote');
// solution.call(post, 'upvote');
let score = solution.call(post, 'score');
console.log(score);
// for (let i = 0; i < 50; i++){
solution.call(post, 'downvote');
// }
score = solution.call(post, 'score');
console.log(score);
solution.call(post, 'upvote');
solution.call(post, 'upvote');
score = solution.call(post, 'score');
console.log(score);
 for (let i = 0; i < 38; i++){
solution.call(post, 'upvote');
 }
score = solution.call(post, 'score');
console.log(score);
solution.call(post, 'downvote');
score = solution.call(post, 'score');
console.log(score);

console.log(post)

