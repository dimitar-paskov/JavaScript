//sammy.js get routes without changing the url / location hash 

$.sammy(function() {

  app.get('#/exams/new', function(context) { 
 
       // display the modal 
  
      window.setTimeout( function(){
        context.app.location_proxy.unbind();
        context.app.setLocation('#/'); 
        context.app.last_location = '#/';
        context.app.location_proxy.bind();
      }, 55 ); // sammy hack
      return false;    


   }); 


  app.get('#/exams/:id', function(context) { 
      
     // display the modal 
    
      window.setTimeout( function(){
        context.app.location_proxy.unbind();
        context.app.setLocation('#/'); 
        context.app.last_location = '#/';
        context.app.location_proxy.bind();
      }, 55 ); // sammy hack
      return false;

   }); 
 

})
