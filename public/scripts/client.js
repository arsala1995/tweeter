$(document).ready(function () {
  //will uodate and load new tweet container
  $("#new-tweet").submit(submitTweet);
  loadTweets();
});

const createTweetElement = function (obj) {

  //function that will overwrite my created html container where it will add new data
  const $tweet = $(' <article class="tweet-container">');

  const $header = $(`<header>
    <img src=${obj["user"]["avatars"]}>
    <h2>${obj["user"]["name"]}</h2>
    <h5 class="user">${obj["user"]["handle"]}</h5>
  </header>`);

  const $paragraph = $(' <p name="text" class="tweet-given"></p>');
  $paragraph.text(obj["content"]["text"]);
  const formattedDates = new Date(obj["created_at"]);
  const tweetYear = formattedDates.getFullYear();
  const tweetMonth = formattedDates.getMonth();
  const tweetDay = formattedDates.getDay();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDay();

  const year = currentYear - tweetYear;
  const month = currentMonth - tweetMonth;
  const day = currentDay - tweetDay;

  const mainDay = day + (month * 30) + (year * 365);
  //adding days ago by subtracting previous date with new date
  const $submission = $(`<div class="submission2">
    <output type="date">${`${mainDay} Days ago`}</output>
    <output name="emojis" class="emojis" for="tweet-given"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i> </output>
  </div>`);
  //appending the above varibales and adding them together in tweet container
  $tweet.append($header).append($paragraph).append($submission);
  return $tweet;

}

const submitTweet = function (event) {

  event.preventDefault();
  //the tweet that we type in the text field
  const form = $(this);
  const data = form.serialize();
  const valFromText = form.find("textarea").val();

  if ((valFromText.length) > 140) {
    //checks if the text has exceeded the limit
    $(".empty_error").hide();
    $(".length_error").slideDown({
      start: function () {
        $(this).css({
          display: "flex"
        })
      }
    });
  } else if (valFromText.length === 0) {
    //checks if there is no text
    $(".length_error").hide();
    $(".empty_error").slideDown({
      start: function () {
        $(this).css({
          display: "flex"
        })
      }
    });

  } else {
    //if it meets the requirements
   
    $.ajax({
        type: 'POST',
        url: '/tweets',
        data
      })
      .then(() => {
        $(".error_words").text("");
        $(".length_error").slideUp('slow');
        
        $(".error_none").text("");
        $(".empty_error").slideUp('slow');
        
        form.find("textarea").val("");
        form.find(".counter").text(140);
      })
      .then(() => {
        loadTweets();
      })

  }

}


const loadTweets = function () {

  $.ajax({
    type: "GET",
    url: "/tweets",
    success: function (data) {

      renderTweets(data);
    }
  });

}



const renderTweets = function (tweets) {

  $('#tweet-container').empty();

  for (let i = 0; i < tweets.length; i++) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweet-container').prepend($tweet);

  }
}