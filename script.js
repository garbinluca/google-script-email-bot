function sendTosano2faCodeToTelegram() {
  try {
    var searchString = 'from: example@example.com'
    var threads = GmailApp.search(searchString, 0, 1);

    if (threads.length) {
      var subject = threads[0].getFirstMessageSubject();
      var code = subject.replace('AuthCode: ', '');

      // Make a POST request with form data.
      var formData = JSON.stringify({
        "Records": [
          {
            "EventSource": "ws",
            "Message": "`" + code + "`"
          }
        ]
      });

      var options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': formData
      };

      UrlFetchApp.fetch('https://endpoint.com', options);
      GmailApp.moveThreadsToTrash(threads);

    }

  } catch (error) {
    Logger.log('Failed with error %s', error.message);
  }

}
