/*global $*/

$(document).ready(function()
{
    var apikey = '9897548a6e8c4be38f831392e607a9f0';
    var leftInput = "";
    var centInput = "";
    var rightInput = "";
    
    $("#submit").click(function(event)
    {
        event.preventDefault();
        
        $("#left").empty();
        $("#left").append("<h1>Left-Wing Media</h1>");
        
        $("#center").empty();
        $('#center').append("<h1>Centered Media</h1>");
        
        $("#right").empty();
        $("#right").append("<h1>Right-Wing Media</h1>");
        
        //Assign leftInput to an API code
        leftInput = $("#left-wing-select").val();
        switch(leftInput)
        {
            case "Buzzfeed":
                leftInput = "buzzfeed";
                break;
            case "ABC News":
                leftInput = "abc-news-au";
                break;
            case "IGN":
                leftInput = "ign";
                break;
            case "The Huffington Post":
                leftInput = "the-huffington-post";
                break;
        }
        
        centInput = $("#centrist-select").val();
        //Assign centInput to an API code
        switch(centInput)
        {
            case "BBC News":
                centInput = "bbc-news";
                break;
            case "CNN":
                centInput = "cnn";
                break;
            case "CNBC":
                centInput = "cnbc";
                break;
            case "The New York Times":
                centInput = "the-new-york-times";
                break;
            case "The Washington Post":
                centInput = "the-washington-post";
                break;
        }
        
        rightInput = $("#right-wing-select").val();
        switch(rightInput)
        {
            case "The Wall Street Journal":
                rightInput = "the-wall-street-journal";
                break;
            case "Breitbart":
                rightInput = "breitbart-news";
                break;
        }
        
        getNews(apikey, leftInput, "left");
        getNews(apikey, centInput,"center");
        getNews(apikey, rightInput, "right");
    });
});

function getNews(apiKey, source, col)
{
    $.ajax({
        url: 'https://newsapi.org/v1/articles',
        data:
        {
            source: source,
            apiKey: apiKey
        },
        type: 'GET',
        dataType: 'JSON',
        success: function(serverResponse)
        {
            console.log("Success");
            console.log(serverResponse);
            
            var arr = serverResponse.articles;
            for(var i = 0; i < arr.length; i++)
            {
                //Article block, has a specific ID based on the column and counter variable
                $("#" + col).append('<div class="article" id="article' + col + i + '" style="border-top: 2px solid #e6ecf0; text-color:#8FB299;"></div>');
                /* All subsequent jQuery calls seek out the ID based on article + column + counter variable
                   Ex: #articleLeft0
                */
                //Image block
                $("#article" + col + i).append('<img src="' + arr[i].urlToImage + '"style="max-width: 25%; float: left; padding: 2px">');
                $("#article" + col + i).append('<div class="section" id="articleSection' + col + i + '" style="width: 75%; margin-left: 25%; clear: left"> </div>');
                //Article headline and link
                $("#articleSection" + col + i).append('<a href="' + arr[i].url + '" style="color:#FFFFFF; width: 75%;">' + arr[i].title + '</a>');
                //Publish time
                $("#articleSection" + col + i).append(arr[i].publishedAt);
            }
        }
    });
}