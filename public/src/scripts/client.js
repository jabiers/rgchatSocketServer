var iframe = document.createElement('iframe');
iframe.style.display = "none";
iframe.src = 'http://rgchatsocketserver.azurewebsites.net/client?token=' + rgchatToken;
document.body.appendChild(iframe);
