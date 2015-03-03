function answer(question_id){
  console.log("does answer know its id?")
  console.log(question_id);
  var value_id = '#answer-'  + question_id
  console.log($(value_id).val())
  console.log("...")

  $.ajax({
    url : "answer/", // the endpoint
    type : "POST", // http method
    data : { answer_text : $(value_id).val(), q_id: question_id }, // data sent with the post request

    // handle a successful response
    success : function(json) {
        $(value_id).val(''); // remove the value from the input
        console.log(json); // log the returned json to the console
        console.log("success"); // another sanity check
        var talkstring = "#talk-" + question_id
        $(talkstring).append(
          "<li><div class = \"row-fluid\"><div class = \"span1 text-center\"><span class=\"icon-arrow-up gray-glyph up-vote-temp\" value = \""+ json.answer_id + "\" aria-hidden=\"true\"></span><br/><span id = \"talk-votes-" + json.answer_id + "\">" + json.votes + "</span><br/><span class=\"icon-arrow-down gray-glyph down-vote-temp\" value = \""+ json.answer_id + "\" aria-hidden=\"true\"></span></div><div class = \"span8\"><p><a class = \"hidden-link\" href=\"/users/profile/\"><i>" + json.answer_username + "</i></a>   <i class = \"answer-small\">"+ json.is_teacher + "</i></br>" + json.answer_text + "</p></div></div><hr/></li>");
          console.log("success");
          $('.up-vote-temp').on('click', function(event){
              event.preventDefault();
              console.log("up-vote clicked");  // sanity check
              var answer_id = $(this).attr('value');
              console.log(answer_id);
              upvote(answer_id);
          });

          $('.down-vote-temp').on('click', function(event){
              event.preventDefault();
              console.log("down-vote clicked");  // sanity check
              var answer_id = $(this).attr('value');
              console.log(answer_id);
              downvote(answer_id);
          });
    },

    // handle a non-successful response
    error : function(xhr,errmsg,err) {
        $('#results-'+question_id).html("<div class='alert-box alert radius' data-alert>"+errmsg+
            ": You must be logged in to answer a question! <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        setTimeout(function(){
          $('#results-'+question_id).html("");
        }, 2500);
    }
  });

}

function upvote(answer_id){
  console.log("does answer know its id?")
  console.log(answer_id);

  $.ajax({
    url : "upvote/", // the endpoint
    type : "POST", // http method
    data : { a_id: answer_id }, // data sent with the post request

    // handle a successful response
    success : function(json) {
        console.log(json); // log the returned json to the console
        console.log("success"); // another sanity check
        var talkstring = "#talk-votes-" + answer_id;
        $(talkstring).html(json.upvotes)
          console.log("success");
    },

    // handle a non-successful response
    error : function(xhr,errmsg,err) {
        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
            " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
    }
  });

}

function downvote(answer_id){
  console.log("does answer know its id?")
  console.log(answer_id);
  
  $.ajax({
    url : "downvote/", // the endpoint
    type : "POST", // http method
    data : { a_id: answer_id }, // data sent with the post request

    // handle a successful response
    success : function(json) {
        console.log(json); // log the returned json to the console
        console.log("success"); // another sanity check
        var talkstring = "#talk-votes-" + answer_id;
        $(talkstring).html(json.upvotes)
          console.log("success");
    },

    // handle a non-successful response
    error : function(xhr,errmsg,err) {
        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
            " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
    }
  });

}