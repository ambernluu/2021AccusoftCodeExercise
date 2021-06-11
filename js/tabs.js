//for switching between canvas tabs and setting canvas not selected as inactive
    $(document).ready(function(){
    $('#tabs li a:not(:first)').addClass('inactive');
    $('.container').hide();
    $('.container:first').show();
    $('#tabs li a').click(function(){
        let t = $(this).attr('id');
      if($(this).hasClass('inactive')){ 
        $('#tabs li a').addClass('inactive');           
        $(this).removeClass('inactive');
        
        $('.container').hide();
        $('#'+ t + 'C').fadeIn('slow');
     }
    });
});
