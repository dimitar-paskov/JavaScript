$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
       $.get('catTemplate.hbs')
           .then(res =>{
               let template = Handlebars.compile(res);
               $('#allCats').html(template({cats}));

              $('button').on('click', showHideInfo);
               function showHideInfo(event) {

                   const btn = $(event.target);

                   if(btn.text() === 'Show status code'){
                       btn.next().css('visibility', 'visible');
                       btn.text('Hide status code');
                   }else{
                       btn.next().css('visibility', 'hidden');
                       btn.text('Show status code');
                   }
               }

           })
    }

});
