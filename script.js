var trenutniPokusaj = 1;
var trenutniKey = 1;
var kombinacija = [];

const znakovi = ['S', 'P', 'T', 'H', 'K', 'Z'];
const dobitna = [];

window.onload = function() {
    for (var i = 0; i < 4; i++) {
        dobitna.push(znakovi[Math.floor(Math.random() * 6)]);
    }
}

function odabranSimbol(simbol) {
    if (trenutniKey <= 4 && trenutniPokusaj <= 6) {
        var pokusajRef = document.getElementById("attempt-" + trenutniPokusaj);
        var pokusajCell = pokusajRef.getElementsByClassName('key-' + trenutniKey)[0];
        
        switch(simbol) {
            case 'S':
                pokusajCell.innerHTML = '<img src="/img/skocko.png" onclick="izbaciSimbol()">';
                break;
            case 'K':
                pokusajCell.innerHTML = '<img src="/img/karo.png" onclick="izbaciSimbol()">';
                break;
            case 'P':
                pokusajCell.innerHTML = '<img src="/img/pik.png" onclick="izbaciSimbol()">';
                break;
            case 'H':
                pokusajCell.innerHTML = '<img src="/img/srce.png" onclick="izbaciSimbol()">';
                break;    
            case 'T':
                pokusajCell.innerHTML = '<img src="/img/tref.png" onclick="izbaciSimbol()">';
                break;
            case 'Z':
                pokusajCell.innerHTML = '<img src="/img/zvijezda.png" onclick="izbaciSimbol()">';
                break;
        }
        kombinacija.push(simbol);
    }
    
    if (trenutniKey < 5)
        trenutniKey++;

    return simbol;
}

function izbaciSimbol() {
    trenutniKey--;
    kombinacija.pop();
    var pokusajRef = document.getElementById("attempt-" + trenutniPokusaj);
    var pokusajCell = pokusajRef.getElementsByClassName('key-' + trenutniKey)[0];
    pokusajCell.innerHTML = '';
}

function izracunajRezultate(divRef) {
    if (trenutniKey == 5 && divRef[divRef.length - 1] == trenutniPokusaj) {
        var izlaz = ['B', 'B', 'B', 'B'];
        var preostali = dobitna.slice();

        for (var j = 0; j < 4; j++) {
            if (kombinacija[j] == dobitna[j]) {
                izlaz[j] = 'Z';
                kombinacija[j] = '0';
                preostali[j] = '0';
            }
        }
        for (var j = 0; j < 4; j++) {
            if (kombinacija[j] != '0') {
                for (var k = 0; k < 4; k++) {
                    if (kombinacija[j] == preostali[k]) {
                        preostali[k] = '0';
                        kombinacija[j] = '0';
                        izlaz[j] = 'Y';
                        break;
                    }
                }
            }
        }

        izlaz.sort(function(a,b) {
            if (a < b) return 1;
            else if (a > b) return -1;
            else return 0;
        });

        var rez = dodajRezultate(divRef, izlaz);
        trenutniKey = 1;
        trenutniPokusaj++;
        kombinacija = [];

        if (rez || trenutniPokusaj > 6) {
            trenutniPokusaj = 7;
            rezultat = document.getElementById('final');

            for (var i = 0; i < dobitna.length; i++) {
                switch(dobitna[i]) {
                    case 'S':
                        dobitna[i] = 'skocko';
                        break;
                    case 'P':
                        dobitna[i] = 'pik';
                        break;
                    case 'K':
                        dobitna[i] = 'karo';
                        break;
                    case 'T':
                        dobitna[i] = 'tref';
                        break;
                    case 'H':
                        dobitna[i] = 'srce';
                        break;
                    case 'Z':
                        dobitna[i] = 'zvijezda';
                        break;
                }
            }

            rezultat.innerHTML = '<div class="key key-1">'
            +  '<img src="/img/' + dobitna[0] + '.png">'
            + '</div>'
            + '<div class="key key-2">'
            +  '<img src="/img/' + dobitna[1] + '.png">'    
            +'</div>'
            +'<div class="key key-3">'
            +  '<img src="/img/' + dobitna[2] + '.png">'   
            +'</div>'
            + '<div class="key key-4">'
            +  '<img src="/img/' + dobitna[3] + '.png">'   
            + '</div>';

            if (rez) {
                alert("Cestitamo! Pogodili ste kombinaciju!");
            }
            else {
                alert("Niste uspjeli pogoditi kombinaciju. Pokusajte ponovo!")
            }
        }
    }

}

function dodajRezultate(divRef, izlaz) {
    let div = document.getElementById(divRef);
    var pogodjen = true;

    for (var i = 0; i < izlaz.length; i++) {
        if (izlaz[i] == 'B') {
            izlaz[i] = 'white-cell';
            pogodjen = false;
        } 
        else if (izlaz[i] == 'Y') {
            izlaz[i] = 'yellow-cell';
            pogodjen = false;
        }
            
        else
            izlaz[i] = 'green-cell';
    }



    div.innerHTML = '<table>'
    + '<tr>'
    + '<td class="' + izlaz[0] +  '"></td>'
    + '<td class="' + izlaz[1] +  '"></td>'
    + '<td class="' + izlaz[2] +  '"></td>'
    + '<td class="' + izlaz[3] +  '"></td>'
    + '</tr>'
    + '</table>';
    
    return pogodjen;
}