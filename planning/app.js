$( function() {
  $.fn.rowTable = function(){
    $('.table tbody tr').each(function(index) {
      var aHref = $(this).find('a');
      var aCount = $(this).find('a').length;
      var thHeight = aCount * 35;
      $(this).attr('data-count-element-by-row', aCount);
      $(this).css('height',thHeight+'px');
      $(aHref).each(function(i){
        if(i > 0){
          posTop=i*35;
          $(this).css('top',posTop+'px');
        }else{
          posTop=2;
          $(this).css('top',posTop+'px');
        }
      });
    });
  }
  $.fn.cellTable = function(){
    $('.table tbody tr td').each(function(index) {
      var aHref = $(this).find('a');
      var aCount = $(this).find('a').length;
      var thHeight = aCount * 35;
      $(this).attr('data-count-element-by-cell', aCount);
    });
  }
});

$(document).ready(function(){
  $('.table tbody tr').rowTable();
  $('.table tbody tr td').cellTable();

  $('.rdv').each(function(index) {
    var rdvHour = $(this).attr('data-rdv-hour'),
        rdvWidth = rdvHour*100;
    $(this).css('width',rdvWidth+'%');
    $(this).css("background-color", "#"+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6));
  }); 

  $(".rdv").draggable({
    helper:'clone',
    zIndex:10,
    ghosting:true,
    opacity:0.8,
    obstacle:'.rdv',
    preventCollision:true,
    start: function(event, ui){
      $(this).draggable('instance').offset.click = {
        left: Math.floor(ui.helper.width() / 2),
        top: Math.floor(ui.helper.height() / 2)
      }
    }
  });

  $(".table tbody tr td").droppable({
    accept: ".rdv",
    drop: function(event, ui) {
      ui.draggable.appendTo($(this)).css({
        top: "2px",
        left: "0"
      });
      $(this).cellTable();
      $('.table tbody tr').rowTable();
    },
    over: function(event, ui) {},
    out: function(event, ui) {
      $('.table tbody tr').rowTable();
    }
  });
});