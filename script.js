if((typeof fetch === "function"))
{
    function fetch(url,done,fail){
        
        if(!(url.constructor == String))
        {
            throw new Error("Błędny adres url: "+url);
        }
        var xhr= new XMLHttpRequest(),
            parcent=0;
        
        xhr.open("GET",url,true);
        
        xhr.onreadystatechange = function(e){
            if(xhr.readyState === 4){
                if(xhr.status!=200)
                {
                    if(typeof fail ==="function")
                        fail(xhr.status);
                    else
                        throw new Error("Nie udało się wykonać zapytania StatusCode:"+xhr.status);
                }
                else{
                    if(typeof done ==="function")
                    {
                        done(xhr.response);
                    }
                    else{
                        console.log("Udało się wykonać zapytanie jednak nie podano funkcji");
                    }
                }
            }
            xhr.onprogress= function(e){
                if(e.total==0)
                    parcent=100;
                    return;
                parcent=e.loaded*100/e.total;
            }


        }
        xhr.send();
        return function(){
            return parcent;
        }
    }
}

function renderItems(that,data){
    that=$(that);
    var idd=parseInt(that.data("id"),10)||0;
    if(data.length==idd)
    {
        idd=0;
    }
    that.data("id",idd+1);


    that.empty();

    var v=JSON.stringify(data[idd],function(k,v){
        var li = $("<li></li>"),
        span = $("<span></span>",{
            text:k
        });

        li.append(span).append(span.clone().text(v));
        that.append(li);
        return v;
    });

}
fetch("https://jsonplaceholder.typicode.com/users",function(data){
    var dane=JSON.parse(data);

    setInterval(function(){
        $(".show").fadeOut(300).queue(function(next){
            renderItems(this,dane);
            next();
        }).fadeIn(300);
    },2000);

});