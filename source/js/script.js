var feedbackPopupLink = document.querySelector(".modal-opener");

if(feedbackPopupLink) {
  var feedbackPopup = document.querySelector(".modal--feedback");
  var form = feedbackPopup.querySelector(".feedback__form");
  var userName = feedbackPopup.querySelector("[name=name]");
  var userEmail = feedbackPopup.querySelector("[name=email]");
  var userMessage = feedbackPopup.querySelector("[name=information]");

  feedbackPopupLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.add("modal--show");
    feedbackPopup.classList.remove("modal--error");
    userName.focus();
  });

  form.querySelector(".feedback__submit").addEventListener("click", function(evt) {
    if(!userName.value || !userEmail.value || !userMessage.value) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal--error");
      form.offsetWidth = form.offsetWidth;
      feedbackPopup.classList.add("modal--error");
    }
  });
}

var productsLinks = document.querySelectorAll(".good__control--basket");

if(productsLinks) {
  var productPopup = document.querySelector(".add-product");
  var productContinue = productPopup.querySelector(".add-product__button--back");

  var productLinkHandler = function(productLink) {
    productLink.addEventListener("click", function(evt) {
      evt.preventDefault();
      productPopup.classList.add("modal--show");
    });
    productContinue.addEventListener("click", function() {
      productPopup.classList.remove("modal--show");
    });
  };

  for(var i = 0; i < productsLinks.length; i++) {
    productLinkHandler(productsLinks[i]);
  };
}

var mapLink = document.querySelector(".info__button-map");

if(mapLink) {
  var mapPopup = document.querySelector(".modal-map");

  mapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopup.classList.add("modal--show");
  });
}

var modalClosers = document.querySelectorAll(".modal__closer");
var modalCloseHandler = function(closer) {
  closer.addEventListener("click", function(evt) {
    evt.preventDefault();
    closer.parentNode.classList.remove("modal--show");
  });
}

for(var k = 0; k < modalClosers.length; k++) {
  modalCloseHandler(modalClosers[k]);
}

var modals = document.querySelectorAll(".modal");
document.addEventListener("keydown", function(evt) {
  if(evt.keyCode === 27) {
    for(var j = 0; j < modals.length; j++) {
      modals[j].classList.remove("modal--show");
    }
  }
});
