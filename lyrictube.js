// LEMBRAR DO MUTATIONOBSERVER
//console.log("first");
var videotitle, str, artist, song, lyric, original, clone, url, finaltext, refgexp, url;
var key = "8f5de93bb08580c9ce5b50b875397b5c";
var newdivclass = "action-panel-content yt-uix-expander yt-card yt-card-has-padding yt-uix-expander-collapsed";
var wasseted = 0;
var blacklist = new Array("[", "(", "feat");
var DEBUG = 1;

function debug(output) {
    if (DEBUG) console.log(output);
}
//debug("1");

function tratarTitulo() {
    var videotitleaux = videotitle.toLowerCase();
    console.log(videotitleaux);
    var aux;
    for (var i = 0; i <= blacklist.length - 1; i++) {
        if (videotitleaux.includes(blacklist[i])) {
            aux = videotitleaux.indexOf(blacklist[i]);
            videotitleaux = videotitleaux.slice(0, aux);
        }
    }
    console.log(videotitleaux)
    return videotitleaux;
}

function tirablacklist(title) {
    var videotitleaux = title.toLowerCase();
    //console.log(videotitleaux);
    var aux;
    for (var i = 0; i <= blacklist.length - 1; i++) {
        if (videotitleaux.includes(blacklist[i])) {
            aux = videotitleaux.indexOf(blacklist[i]);
            videotitleaux = videotitleaux.slice(0, aux);
        }
    }
    //console.log(videotitleaux)
    return videotitleaux;
}
//debug("2");

function trataResposta(filejson){
    debug("trataResposta antes");
    var b = JSON.stringify(filejson);
    lyric = b.replace(/\\n/g, '<br/>');
    debug(lyric);
    /*if(){
       setLyric3();
       }*/
    
    debug("trataResposta depois");
}

function setLyric() {
    console.log("setLyric");
    original = document.getElementById('action-panel-details');
    clone = original.cloneNode(true); // "deep" clone
    clone.id = "idlyrics"; // there can only be one element with an ID
    clone.querySelector('strong').textContent = "Lyric of:            .:" + videotitle + ":.";
    clone.querySelector('p').innerHTML = lyric;
    clone.querySelector('#watch-description-extras').style.display = "none";
    document.querySelector('#action-panel-details').after(clone);
}
//debug("3");

function setLyric2() {
    var a = mainhandler();
    if (a != null) {
        var b = JSON.stringify(a);
        lyric = b.replace(/\\n/g, '<br/>');
        //console.log("Vai chamar setLyric");
        //console.log("setLyric");
        original = document.getElementById('action-panel-details');
        clone = original.cloneNode(true); // "deep" clone
        clone.id = "idlyrics"; // there can only be one element with an ID
        clone.querySelector('strong').textContent = "Lyric of:            .:" + videotitle + ":.";
        clone.querySelector('p').innerHTML = lyric;
        clone.querySelector('#watch-description-extras').style.display = "none";
        document.querySelector('#action-panel-details').after(clone);
    }
    else {
        console.log("Não conseguiu tratar o nome");
    }
}
//debug("4");

function setLyric3(filejson) {
    debug("setlyric3 before");
    var b = JSON.stringify(filejson);
    lyric = b.replace(/\\n/g, '<br/>');
    original = document.getElementById('action-panel-details');
    clone = original.cloneNode(true); // "deep" clone
    clone.id = "idlyrics"; // there can only be one element with an ID
    clone.querySelector('strong').textContent = "Lyric of:            .:" + videotitle + ":.";
    clone.querySelector('p').innerHTML = lyric;
    clone.querySelector('#watch-description-extras').style.display = "none";
    document.querySelector('#action-panel-details').after(clone);
    debug("setlyric3 after");
    return 0;
}
//debug("9");
class Pai {
    constructor(objeto) {
        this.next = objeto;
    }
    trabalhatitulo() {}
    validatitulo(artista, musica) {
        //console.log("getJSON");
        //supostotitulo = tratarTitulo().split("-");
        debug("pai valida before");
        var xhr = new XMLHttpRequest();
        var innerurl = "https://api.vagalume.com.br/search.php" + "?art=" + artista + "&mus=" + musica + "&apikey={" + key + "}";
        xhr.open('GET', innerurl);
        //console.log("Antes");
        //xhr.onload = function () {
        xhr.onload = function () {
            debug("xhronload passou");
            if (xhr.status == 200) {
                debug("Chamada XML 200 before");
                debug(innerurl);
                trataResposta(JSON.parse(xhr.responseText).mus[0].text);
                //setLyric3(JSON.parse(xhr.responseText).mus[0].text);
                //return 0;
                debug("Chamada XML 200 after");
            }
            else {
                console.log('Erro ao consultar a letra da música ' + xhr.status);
                debug(innerurl);
                if (this.next != null) {
                    this.next.trabalhatitulo();
                }
                else {
                    return null;
                }
            }
        };
        xhr.onerror = function (e) {
            console.log("Deu algum erro!" + xhr.statusText);
        }
        xhr.timeout = function () {
            console.log("Timeout");
        }
        xhr.send();
        debug("pai valida after");
    }
};
class Filho4 extends Pai {
    trabalhatitulo() {
        super.validatitulo();
    }
};
class Filho3 extends Pai {
    trabalhatitulo() {
        super.validatitulo();
    }
};
class Filho2 extends Pai {
    trabalhatitulo() {
        debug("Filho2 Entrou");
        str = tirablacklist(videotitle).split("-");
        super.validatitulo(str[1],str[0]);
    }
};
class Filho1 extends Pai {
    trabalhatitulo() {
        debug("Filho1 trabalhatitulo before");
        str = tirablacklist(videotitle).split("-");
        debug("Filho1 trabalhatitulo after");
        return super.validatitulo(str[0], str[1]);
    }
};

function mainhandler() {
    debug("mainhandler before");
    var filho4 = new Filho4(null);
    var filho3 = new Filho3(filho4);
    var filho2 = new Filho2(filho3);
    var filho1 = new Filho1(filho2);
    debug("mainghandler after");
    return filho1.trabalhatitulo();
}

function verificaJSON(artista, musica) {
    //console.log("getJSON");
    //supostotitulo = tratarTitulo().split("-");
    //console.log(str[0], str[1]);
    var xhr = new XMLHttpRequest();
    var innerurl = "https://api.vagalume.com.br/search.php" + "?art=" + artista + "&mus=" + musica + "&apikey={" + key + "}";
    xhr.open('GET', innerurl);
    //console.log("Antes");
    //xhr.onload = function () {
    xhr.onload = function () {
        console.log("teste111");
        if (xhr.status == 200) {
            console.log("Entrou API");
            //var a = JSON.parse(xhr.responseText).mus[0].text;
            //var b = JSON.stringify(a);
            //lyric = b.replace(/\\n/g, '<br/>');
            //console.log("Vai chamar setLyric");
            //setLyric();
            return JSON.parse(xhr.responseText).mus[0].text;
        }
        else {
            console.log('Erro ao consultar a letra da música ' + xhr.status);
            console.log(seila);
            return false;
        }
    };
    xhr.onerror = function (e) {
        console.log("Deu algum erro!" + xhr.statusText);
    }
    xhr.timeout = function () {
        console.log("Timeout");
    }
    console.log("teste");
    xhr.send();
    console.log("teste2");
}

function getJSON(supostotitulo) {
    console.log("getJSON");
    videotitle = document.getElementById("eow-title").textContent;
    str = tratarTitulo().split("-");
    //console.log(str[0], str[1]);
    var xhr = new XMLHttpRequest();
    var seila = "https://api.vagalume.com.br/search.php" + "?art=" + str[0] + "&mus=" + str[1] + "&apikey={" + key + "}";
    xhr.open('GET', seila);
    console.log("Antes");
    //xhr.onload = function () {
    xhr.onload = function () {
        console.log("teste111");
        if (xhr.status == 200) {
            console.log("Entrou API");
            var a = JSON.parse(xhr.responseText).mus[0].text;
            var b = JSON.stringify(a);
            lyric = b.replace(/\\n/g, '<br/>');
            console.log("Vai chamar setLyric");
            setLyric();
        }
        else {
            console.log('Erro ao consultar a letra da música ' + xhr.status);
            console.log(seila);
        }
    };
    xhr.onerror = function (e) {
        console.log("Deu algum erro!" + xhr.statusText);
    }
    xhr.timeout = function () {
        console.log("Timeout");
    }
    console.log("teste");
    xhr.send();
    console.log("teste2");
}
//debug("5");
document.addEventListener('DOMNodeInserted', function (event) {
    //console.log("vai");
    if (window.location.href.includes('youtube.com/watch')) {
        //console.log(window.location.href);
        if (window.location.href != url) {
            if (videotitle != document.getElementById("eow-title").textContent) {
                //console.log("Chamou");
                //getJSON();
                videotitle = document.getElementById("eow-title").textContent;
                setLyric2();
                url = window.location.href;
            }
        }
    }
    else {
        url = window.location.href;
    }
});
//debug("6");