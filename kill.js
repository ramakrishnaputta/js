if ('serviceWorker' in navigator) {
  console.info('Service Wroker Present');
  if (Notification.permission !== 'granted') {
    navigator.serviceWorker.register('./sw.js').then(() => {
      return navigator.serviceWorker.ready;
    }).then((reg) => {
      reg.pushManager.subscribe({userVisibleOnly: true}).then((sub) => {
        console.log('Subscribe', sub.endpoint);
        const endpoint = sub.endpoint;
        fetch('register.php', {
          method: 'POST',
          body: JSON.stringify({key: endpoint})
        }).catch((error) => {
          console.log('Error', error);
        });
      });
    }).catch((error) => {
      console.log('Error', error);
    });
  }
}else {
  console.error('Service Worker Not Present');
}
