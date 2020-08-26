if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(
      function (registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })

  let deferredPrompt

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()

    deferredPrompt = e

    document.querySelector('.install').classList.remove('hidden')
  })

  document.querySelector('.install-button').addEventListener('click', (e) => {
    // Hide the app provided install promotion
    document.querySelector('.install').classList.add('hidden') // Show the install prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
    })
  })
}

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status)
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then((reg) => {
      var options = {
        body: 'Here is a notification body!',
        icon: '/mario.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
      }
      reg.showNotification('Hello There', options)
    })
  }
})
