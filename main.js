var quoteTitel = "";
var quoteContent = "";

function getQuote() {
    return $.ajax({
        type: 'GET',
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
            var post = data[0];
            quoteTitel = post.title;
            quoteContent = post.content;
        },
        cache: false
    });
}

function firstLoad() {
    $('#quoteTitle').text('- ' + quoteTitel);
    $('#quoteContent').html(quoteContent);
    $('#quoteText').addClass('fadeInDown');
    $("#quoteText").css("visibility", "visible");
}

$(document).ready(function(){
    $("#quoteText").css("visibility", "hidden");
    $.when(getQuote()).done(function(){firstLoad();});
    $("#getQuoteButton").on('click', function(e) {
        e.preventDefault();
        $('#quoteText').removeClass('fadeInDown');
        $('#quoteText').addClass('fadeOut');
        setTimeout(function(){
            $.when(getQuote()).done(function(a1){
                $('#quoteText').removeClass('fadeOut');
                $('#quoteTitle').text('- ' + quoteTitel);
                $('#quoteContent').html(quoteContent);
                $('#quoteText').addClass('fadeInDown');
            });
        }, 500);
    });
    $('#tweetQuote').on('click', function(e) {
        $(this).attr("href", 'https://twitter.com/intent/tweet?hashtags=FCC,QuoteGen&related=freecodecamp&text=' + $('#quoteContent').text() + $('#quoteTitle').text());
    });
});
