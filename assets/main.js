var textoTemp = '######'; 

var indiceTexto = 0;

nick = document.getElementById("nick");

nick.innerHTML = textoTemp + "<span class=\"blink\">_</span>";

function ativaTexto()
{
    let iteracao = 0;
    //let texto = defineTexto();
	let texto = 'cmp0x5'
    let i;
    var timer2 = setInterval( escreveCaracteres, 100 )
    function escreveCaracteres()
    {
        for ( i = 0; i < texto.length; i++ )
        {
            if ( iteracao == 65 )
            {
                clearInterval( timer2 );
                nick.innerHTML = texto += "<span class=\"blink\">_</span>";
                return;
            }
            else
            {
                iteracao++;
                let char1 = geraCaractereAleatorio();
                textoTemp = textoTemp.substring(0, i) + char1 + textoTemp.substring(i+1); 
                nick.innerHTML = textoTemp + "_";
            }
        }
    }
}

setTimeout( ativaTexto, 1000 ); 
setInterval( ativaTexto, 7000 ); 

//function defineTexto()
//{
//    if ( indiceTexto == 2 )
//    {
//        indiceTexto = 0;
//    }
//    let texto;
//    switch ( indiceTexto )
//    {
//        case 0:
//            texto = 'cmp0x5';
//            break;
//        case 1:
//            texto = 'cmp0x5';
//            break;
//        default:
//            texto = 'cmp0x5';
//            break;
//    }
//    indiceTexto++;
//    return texto;
//}
//
function geraCaractereAleatorio()
{
    min = 33;
    max = 126;
    
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    random = String.fromCharCode(random);
    return random;
}

