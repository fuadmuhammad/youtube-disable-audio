// ==UserScript==
// @name        youtube disable audio
// @namespace   http://fuad.com
// @include     http://*.youtube.com*
// @include     https://*.youtube.com*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var player_id = (unsafeWindow.document.querySelector("#c4-player")                       // Channel video
			 	|| unsafeWindow.document.querySelector("#player div#movie_player")          // Default HTML5 Video
			 	|| unsafeWindow.document.querySelector("#player > div.html5-video-player")) 
player_id.mute();

var mp3_list = [];
var current_track = 0;

var audio_player = unsafeWindow.document.createElement('audio');

GM_xmlhttpRequest({
    method: 'GET',
		url: 'https://archive.org/download/MurottalAlQuranRadioRodja756Am',
    onload: function(resp){			
			alert(resp.responseText);
			var el = document.createElement('html');
			el.innerHTML = resp.responseText
			var matches = el.querySelectorAll("html body.navia.dirlisting div#wrap div.container.container-ia pre a");
			var index=0;
			for (var i=0;i<matches.length; i++){
				//if(matches[i].href.endsWith('mp3')){
  			if(matches[i].href.endsWith('mursalaat.mp3') || matches[i].href.endsWith('insaan.mp3')){
					var str_href = matches[i].href;
					var new_str = str_href.replace("youtube.com","archive.org/download/MurottalAlQuranRadioRodja756Am")     			
					mp3_list[index]=new_str;
					alert(new_str);
					index++;
  			}
			}
			//audio_player.src = 'file:///D:/Mp3/AsSudais/Sudais-075.mp3';
			//audio_player.src = 'http://download.quranicaudio.com/quran/madinah_1419/001.mp3';
			alert(mp3_list[current_track]);
			audio_player.src = mp3_list[current_track];
			audio_player.src = 'http://statics.ilmoe.com/kajian/users/cepu/Adzan-Dan-Murotal-Mahad-Cepu/1-Surat-Alfatihah-Murotal--Ustadz-Abu-Amina--Aljawiy-Mahad-Annashihah-Cepu.mp3'
			//audio_player.autoplay= true;
			//audio_player.preload = 'auto';
			audio_player.addEventListener('ended',function(){
				alert("The audio has ended");
				audio_player.play();
			});
			/*audio_player.onended = function(){
				alert("next");
				current_track++;
				if(current_track>mp3_list.length-1){
					current_track = 0;
				}
				alert(mp3_list[current_track]);
				audio_player.src = mp3_list[current_track];
				alert("next 2");
				//audio_player.autoplay= true;
				audio_player.load();
				audio_player.play();
			};*/
			audio_player.load();
			audio_player.play();
    }
});
