'use strict'
$(function() { 
    if (!UF) var UF = {};
    UF.stream = 'http://sc.ultima.fm:8001/stream/1/stream.mp3';
    UF.audio = $('#audio');
    UF.audio_source = UF.audio.find('source');
    UF.event_type = 'click';
    UF.player_btn = $('.player-btn');
    UF.player = {
        el: $('.player')[0],
        el_play: $('#audio')[0],
        el_author: $('.player-track-artist'),
        el_song: $('.player-track-title'),
        duration: $('.pp-text-right'),
        state: 'pause',
        setVolume: function() {
            $(UF.player.el_play).prop("volume", "0.5");
        },
        updateMeta: function() {
            $.get("http://sc.ultima.fm:8001/currentsong?sid=1",
                function(data) {
                    data = data || '';
                    var meta = data.split('-');
                    $(UF.player.el_author).html(meta[0]);
                    $(UF.player.el_song).html(meta[1]);
                }
            );
        }
    }
    UF.player_btn.on(UF.event_type, playStopPlayer);
    UF.player.updateMeta();
    UF.player.setVolume();
    setInterval(function() {
        UF.player.updateMeta();
    }, 5000);

    $("#slider").slider({
        animate: true,
        range: "min",
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        slide: function(event, ui) {
            $('#audio').prop("volume", ui.value);
        }
    });

    function playStopPlayer() {
        if (UF.player.state == 'play') {
            UF.audio.trigger('pause');
            UF.player.state = 'pause';
            UF.player_btn.removeClass('player-btn-pause')
        } else {
            UF.audio.trigger('load'); 
            UF.audio.trigger('play');
            UF.player.state = 'play';
            UF.player_btn.addClass('player-btn-pause');
        }
    }
})