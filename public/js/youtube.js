var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'sRwVQwdY8sc',
          events: {
            'onReady': onPlayerReady
          }
        });
      }

        function onPlayerReady(event) {
         event.target.playVideo();
      }

      function stopVideo() {
        player.stopVideo();
      }