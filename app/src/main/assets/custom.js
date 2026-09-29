window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
if ('mediaSession' in navigator) {
  const mediaSession = navigator.mediaSession;

  function updateMediaInfo(title, artist, coverUrl) {
    mediaSession.metadata = new MediaMetadata({
      title: title || "洛雪音乐",
      artist: artist || "",
      artwork: [{ src: coverUrl, sizes: "512x512", type: "image/png" }]
    });
  }

  // 通知栏按钮动作
  mediaSession.setActionHandler('play', () => {
    document.querySelector('audio')?.play();
  });
  mediaSession.setActionHandler('pause', () => {
    document.querySelector('audio')?.pause();
  });
  mediaSession.setActionHandler('previoustrack', () => {
    document.querySelector('.player-prev')?.click();
  });
  mediaSession.setActionHandler('nexttrack', () => {
    document.querySelector('.player-next')?.click();
  });

  // 监听音频播放，自动更新歌曲信息
  const audio = document.querySelector('audio');
  if(audio){
    audio.addEventListener('play', ()=>{
      const title = document.querySelector('.song-title')?.innerText || "洛雪音乐";
      const artist = document.querySelector('.song-artist')?.innerText || "";
      const cover = document.querySelector('.cover-img img')?.src || "";
      updateMediaInfo(title, artist, cover);
    })
  }
}
