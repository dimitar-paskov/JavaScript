let obj = (function solve() {


    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return (`Post: ${this.title}` + '\n' + `Content: ${this.content}`);
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let rating = this.likes - this.dislikes;
            let result = super.toString() + '\n' + `Rating: ${rating}`;

            if (this.comments.length > 0) {
                result += '\n' + 'Comments:';
                this.comments.forEach(x => {
                    result += '\n * ' + x;
                })

            }
            return result;
        }
    }

    class BlogPost extends Post{
        constructor(title, content, views){
            super(title, content);
            this.views = views;
        }

        view(){
            this.views +=1;
            return this;
        }
        toString() {

            return super.toString() + '\n' + `Views: ${this.views}`;

        }
    }
    return {Post, SocialMediaPost, BlogPost}
})();

let post = new obj.Post("Post", "Content");
console.log(obj);
console.log(post.toString());

let scm = new obj.SocialMediaPost("TestTitle", "TestContent", 25, 30);

// scm.addComment("Good post");
// scm.addComment("Very good post");
// scm.addComment("Wow!");

console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
let bp = new obj.BlogPost('test', 'contenttest', 16);
bp.view().view();
console.log(bp.toString());