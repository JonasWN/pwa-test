const apiBase = 'https://api.twitch.tv/helix'
const clientId = 'owhlr70a18xvmhe7eferg0bnuy6sjb'

const streamerDisplay = document.querySelector('.mainContainer')

const twitchApi = () => {
  fetch(`${apiBase}/streams?`, {
    headers: {
      'Client-ID': clientId,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)

      json.data.forEach((streamer) => {
        streamerDisplay.innerHTML += `
            <div class="streamer__container">
            <a href="twitch.tv/${streamer.user_name}" target="blank">
            <img class="streamer__thumb"src=${streamer.thumbnail_url.replace(
              '-{width}x{height}',
              ''
            )}" alt="streamers thumbnail">
            </a>
            <h2 class="streamer__title">${streamer.title}</h2>
            <p class="streamer__text"> Name:${streamer.user_name}</p>
            <p class="streamer__text">Viewers Currently: <span class="bold">${
              streamer.viewer_count
            }</span></p>
        </div>
            `
      })
    })
}
twitchApi()
