let notify = (() => {
  $(document).on({
    ajaxStart: () => $('#loadingBox').show(),
    ajaxStop: () => $('#loadingBox').fadeOut()
  });

  function showInfo (message) {
    setTimeout(() => {
      let infoBox = $('#successBox');
      infoBox.on("click", function(e){
        let target = $(e.target);
        target.fadeOut();
      });
      
      infoBox.text(message);
      infoBox.fadeIn();
      setTimeout(() => infoBox.fadeOut(), 5000);
    }, 700);
  }

  function showError(message) {
    setTimeout(() => {    
      let errorBox = $('#errorBox');
      errorBox.on("click", function(e){
        let target = $(e.target);
        target.fadeOut();
      });

      errorBox.text(message);
      errorBox.fadeIn();
      setTimeout(() => errorBox.fadeOut(), 5000);
    }, 700);
  }

  function handleError (reason) {
    showError(reason.responseJSON.description)
  }

  return {
    showInfo,
    showError,
    handleError
  }
})();