const app = getApp();

function playMusic(music) {
  const backgroundAudioManager = wx.getBackgroundAudioManager();
  backgroundAudioManager.title = music.name;
  backgroundAudioManager.epname = music.name;
  backgroundAudioManager.singer = music.singer;
  backgroundAudioManager.coverImgUrl = music.imgUrl;
  // 设置了 src 之后会自动播放
  backgroundAudioManager.src = music.url;

  
  app.globalData.showPlayer = true;
  app.globalData.isPlaying = true;
  app.globalData.playingId = music.id;
  app.globalData.music = music;
}

module.exports = {
  playMusic: playMusic
}