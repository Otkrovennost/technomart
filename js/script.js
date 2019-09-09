!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
svg4everybody();

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
