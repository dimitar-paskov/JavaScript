$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $("#cat-template");

        $('#allCats').loadTemplate(source, cats.map(function(cat) {
            cat.statusCode = "Status Code: " + cat.statusCode;
            cat.imageLocation = `images/${cat.imageLocation}.jpg`;

            return cat;
        }));

        $('#allCats').find("button.btn").on("click", toggleInfo);
    }

    function toggleInfo(ev) {
        let target = $(ev.target);

        target.next().toggle();

        if(target.next().css("display") === "none") {
            target.text("Show status code");
        } else {
            target.text("Hide status code");
        }
    }
});