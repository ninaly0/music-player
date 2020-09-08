var audio = document.querySelector('audio');
var artistName = document.querySelector('.player_artist');
var title = document.querySelector('.player_title');
var cover = document.querySelector('.player_cover img');


var time = {
    currentTime : document.querySelector('.player_currentTime'),
    duration : document.querySelector('.player_duration'),
    progressBar : document.querySelector('.player_progressBar'),
    progressValue : document.querySelector('.player_progress_value')
};

var settings = {
    dot : document.querySelector('.player_dot'),
    menu : document.querySelector('.player_menu'),
    like : document.querySelector('.player_like'),
    liked : document.querySelector('.player_liked')
};

var controls = {
    bigPrev : document.querySelector('.player_previous'),
    bigNext : document.querySelector('.player_next'),
    repeat : document.querySelector('.player_repeat'),
    shuffle : document.querySelector('.player_shuffle'),
    previous : document.querySelector('.player_prev_btn'),
    play : document.querySelector('.playBtn'),
    pause : document.querySelector('.pauseBtn'),
    next : document.querySelector('.player_next_btn')
};

var songs = [
    {
        artist : 'Always Never',
        title : 'Wylin\'',
        cover : 'covers/Always Never.jpg',
        src : 'audio/AlwaysNever-Wylin’.mp3'
    },
    {
        artist : 'Angèle',
        title : 'Ta reine',
        cover : 'covers/Angele.jpg',
        src : 'audio/Angèle - Ta Reine  _ A COLORS SHOW.mp3'
    },
    {
        artist : 'Imany',
        title : 'No more fight',
        cover : 'covers/Imany.jpg',
        src : 'audio/Imany-No_more_fight.mp3'
    },
    {
        artist : 'Mass',
        title : 'Regarde moi',
        cover : 'covers/Mass.jpg',
        src : 'audio/Mass_Regarde-moi.mp3'
    },
    {
        artist : 'Sjava',
        title : 'Umama',
        cover : 'covers/Sjava.jpg',
        src : 'audio/Sjava - Umama _ A COLORS SHOW.mp3'
    },
    {
        artist : 'Years & Years',
        title : 'Hypnotised',
        cover : 'covers/Years and Years.jpg',
        src : 'audio/Years&years-Hypnotised.mp3'
    },
    {
        artist : 'Yseult',
        title : 'Corps',
        cover : 'covers/Yseult.jpg',
        src : 'audio/Yseult-Corps.mp3'
    }
];

var currentIndexSong = 0;
var hasRepeat = false;
var hasShuffle = false;
var hasFirstDurationChange = false;

setSong(currentIndexSong);


settings.dot.addEventListener('click', function(){
    settings.menu.classList.toggle('is-active');
});
settings.like.addEventListener('click', function(){
    this.classList.toggle('is-active');
});

controls.play.addEventListener('click', function(){
    audio.play();
});
controls.pause.addEventListener('click', function(){
    audio.pause();
});
audio.addEventListener('play', function(){
    controls.play.style.display = 'none';
    controls.pause.classList.add('is-active');
});
audio.addEventListener('pause', function(){
    controls.play.style.display = '';
    controls.pause.classList.remove('is-active');
})

audio.addEventListener('ended', function(){
    if ( hasRepeat ){
        audio.currentTime = 0;
        audio.play();
    } else {
        nextSong();
    }
});

//L'évènement durationchange est déclenché quand l'attribut de durée est mis à jour.
audio.addEventListener('durationchange', function(){
    time.duration.textContent = formatTime(audio.duration);
    if(hasFirstDurationChange){
        this.play();
    } else {
        hasFirstDurationChange = true;
    }

});

//La position de la tête de lecture dans le média indiquée par l'attribut currentTime de l'élément a changée.
audio.addEventListener('timeupdate', function(){
    time.currentTime.textContent = formatTime(audio.currentTime)
    time.progressValue.style.width = (audio.currentTime / audio.duration)*100 + '%';
});

time.progressBar.addEventListener('click', function(event){
    // renvoie la taille et la position relative de progressBar dans le viewport
    var rect = this.getBoundingClientRect();
    // event.clientX = position relative de là ou l'évènement s'est passé ( donc là où nous avons cliqué)
    var distance = event.clientX - rect.left;
    console.log(distance);
    audio.currentTime = (distance / rect.width) * audio.duration;
});


controls.previous.addEventListener('click', prevSong);
controls.bigPrev.addEventListener('click', prevSong);
controls.next.addEventListener('click', nextSong);
controls.bigNext.addEventListener('click', nextSong);


controls.shuffle.addEventListener('click', function(){
    hasShuffle = !hasShuffle;
});
controls.repeat.addEventListener('click', function(){
    hasRepeat = !hasRepeat;
});


function setSong(index){
    artistName.textContent = songs[index].artist;
    title.textContent = songs[index].title;
    cover.setAttribute('src', songs[index].cover);
    audio.setAttribute('src', songs[index].src);
};

function prevSong(){
    currentIndexSong--;

    if( currentIndexSong < 0 ){
        currentIndexSong = songs.length -1
    }
    setSong(currentIndexSong);
}

// si shuffle = true, FAIRE ranmdom TANT QUE ramdom songs est 

function nextSong() {

    if( hasShuffle ){
        do{
            var randomIndex = Math.floor(Math.random() * songs.length);
        }
        while (randomIndex === currentIndexSong)

        currentIndexSong = randomIndex;

    } else {
        currentIndexSong++;

        if(currentIndexSong >= songs.length) {
            currentIndexSong = 0;
        }
    }
    setSong(currentIndexSong);
}

function formatTime (timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60 );
    var seconds = Math.round(timeInSeconds % 60);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if ( seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
};










