var tempText = '######'; 

nick = document.getElementById("nick");

nick.innerHTML = tempText + "<span class=\"blink\">_</span>";

function activateText()
{
    let it = 0;
	let texto = 'cmp0x5'
    let i;
    var timer2 = setInterval( writeChars, 100 )
    function writeChars()
    {
        for ( i = 0; i < texto.length; i++ )
        {
            if ( it == 65 )
            {
                clearInterval( timer2 );
                nick.innerHTML = texto += "<span class=\"blink\">_</span>";
                return;
            }
            else
            {
                it++;
                let char1 = getRandomChar();
                tempText = tempText.substring(0, i) + char1 + tempText.substring(i+1); 
                nick.innerHTML = tempText + "_";
            }
        }
    }
}

setTimeout( activateText, 1000 ); 
setInterval( activateText, 7000 ); 


function getRandomChar()
{
    min = 33;
    max = 126;
    
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    random = String.fromCharCode(random);
    return random;
}

