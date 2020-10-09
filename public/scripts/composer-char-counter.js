$(document).ready(function() {
console.log("Ready");
$("#tweet-text").keyup(function() {
  // console.log("new values:", $(this).val().length);
  const count = $(this).val().length;
 let $counter = $(this).parent().find(".counter");
$counter.text(140-count);

if(count > 140){
  $counter.css("color", "red");
}
else {
  $counter.css("color", "black");
}

});

});



