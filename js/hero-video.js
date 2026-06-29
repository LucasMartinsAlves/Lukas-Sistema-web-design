export function initHeroVideo(prefersReducedMotion) {
  const introSequence = document.querySelector('.intro-sequence');
  const introBackgroundStage = document.querySelector('.intro-background-stage');
  const introPoster = document.querySelector('.intro-poster');

  if (!introSequence || !introBackgroundStage || !introPoster || prefersReducedMotion) {
    return;
  }

  const heroVideo = document.createElement('video');

  heroVideo.className = 'intro-background-image intro-video';
  heroVideo.muted = true;
  heroVideo.loop = true;
  heroVideo.playsInline = true;
  heroVideo.preload = 'auto';
  heroVideo.width = 1794;
  heroVideo.height = 877;

  const source = document.createElement('source');
  source.src = 'assets/videos/background-video.mp4';
  source.type = 'video/mp4';

  heroVideo.appendChild(source);
  introBackgroundStage.appendChild(heroVideo);

  heroVideo.addEventListener('canplay', async () => {
    try {
      await heroVideo.play();
      introSequence.classList.add('is-video-ready');
    } catch {
      heroVideo.remove();
    }
  }, { once: true });

  heroVideo.load();
}
