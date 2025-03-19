(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function n(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?t(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function r(t,n,r){return(n=function(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}const o=function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector),o=function(){c()?u():a()},i=function(n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""},c=function(){return n.some((function(e){return!e.validity.valid}))},u=function(){r.classList.add(e.inactiveButtonClass),r.disabled=!0},a=function(){r.classList.remove(e.inactiveButtonClass),r.disabled=!1},l=function(){o(),n.forEach((function(n){n.addEventListener("input",(function(){!function(n){n.validity.valid?i(n):function(n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),r.classList.add(e.errorClass),r.textContent=n.validationMessage}(n)}(n),o()}))}))};return{enableValidation:function(){t.addEventListener("submit",(function(e){return e.preventDefault()})),l()},resetValidation:function(){u(),n.forEach(i)}}};function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==i(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===i(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e){var t=function(){e.classList.remove("popup_opened"),document.removeEventListener("keydown",n)},n=function(e){"Escape"===e.key&&t()};return{open:function(){e.classList.add("popup_opened"),document.addEventListener("keydown",n)},close:t,setEventListeners:function(){e.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close-button"))&&t()}))}}},s=function(e,t){var n=e.querySelector(".popup__form"),r=n.querySelectorAll(".popup__input"),o=n.querySelector(".popup__save-button"),i=o.textContent,c=l(e),a=function(){return Array.from(r).reduce((function(e,t){return e[t.name]=t.value,e}),{})},s=function(){o.disabled=!0,o.textContent="Saving..."},f=function(){o.disabled=!1,o.textContent=i};return n.addEventListener("submit",(function(e){e.preventDefault(),s(),t(a()).finally((function(){return f()}))})),c.setEventListeners(),u(u({},c),{},{close:function(){n.reset(),c.close()},getInputs:a,setInputValues:function(e){r.forEach((function(t){void 0!==e[t.name]&&(t.value=e[t.name])}))},startLoading:s,stopLoading:f})};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p,d,m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},y=function(e){var t=e.baseUrl,r=e.headers,o=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return fetch("".concat(t,"/").concat(e),n({method:o,headers:r},c&&{body:JSON.stringify(c)})).then(i)},i=function(e){return e.ok?e.json():Promise.reject("".concat(e.status," ").concat(e.statusText))};return{getUserProfile:function(){return o("users/me")},getCards:function(){return o("cards")},addCard:function(e){return o("cards","POST",e)},removeCard:function(e){return o("cards/".concat(e),"DELETE")},updateUserProfile:function(e){return o("users/me","PATCH",e)},updateUserAvatar:function(e){return o("users/me/avatar","PATCH",e)},likeCard:function(e){return o("cards/".concat(e,"/likes"),"PUT")},unlikeCard:function(e){return o("cards/".concat(e,"/likes"),"DELETE")}}}({baseUrl:"https://nomoreparties.co/v1/wff-cohort-34",headers:{authorization:"c377a36a-1c8b-489a-9449-519744310279","Content-Type":"application/json"}}),v=function(e){var t=e._id,n=e.isLike,r=e.toggleLike,o=e.numberOfLikes;(n?y.unlikeCard(t):y.likeCard(t)).then((function(e){o(e.likes),r()})).catch((function(e){return console.log("Ошибка: ".concat(e))}))},b=function(e,t){return U.open(e,t)},_=function(e){B.setDeleteCard(e),B.open()},S=(".cards__list",p=function(e){return function(e,t,n,r,o,i){var c=document.querySelector("template").content.querySelector(".cards__item").cloneNode(!0),u=c.querySelector(".cards__item-image"),a=c.querySelector(".cards__item-number-likes"),l=c.querySelector(".cards__delete"),s=c.querySelector(".cards__item-like"),f=e.likes.some((function(e){return e._id===t}));c.querySelector(".cards__item-title").textContent=e.name,u.src=e.link,u.alt=e.name,a.textContent=e.likes.length,t!==e.owner._id&&l.remove(),f&&s.classList.add("cards__item-like_active");var p=function(){f=!f,s.classList.toggle("cards__item-like_active")},d=function(e){a.textContent=e.length},m=function(){return c.remove()};return s.addEventListener("click",(function(){return i({_id:e._id,isLike:f,toggleLike:p,numberOfLikes:d})})),null==l||l.addEventListener("click",(function(){return o({_id:e._id,deleteCard:m})})),u.addEventListener("click",(function(){return r(e.name,e.link)})),c}(e,A.getUserId(),0,b,_,v)},d=document.querySelector(".cards__list"),{renderItems:function(e){d.innerHTML="",e.forEach((function(e){return d.prepend(p(e))}))},addItem:function(e){d.prepend(p(e))}}),g=o(m,document.querySelector(".popup__form")),h=o(m,document.querySelector(".popup__form")),E=o(m,document.querySelector(".popup__form"));g.enableValidation(),h.enableValidation(),E.enableValidation();var O,C,L,P,j,k,q,w,D,x,A=(O={nameElement:document.querySelector(".profile__name"),aboutElement:document.querySelector(".profile__job"),avatarElement:document.querySelector(".profile__avatar")},L=O.nameElement,P=O.aboutElement,j=O.avatarElement,{getProfileData:function(){return{name:L.textContent,about:P.textContent}},updateProfile:function(e){var t=e.name,n=e.about,r=e.avatar,o=e._id;t&&(L.textContent=t),n&&(P.textContent=n),r&&(j.src=r,j.alt=t),o&&(C=o)},getUserId:function(){return C}}),I=s(document.querySelector(".popup_type_add-card"),(function(e){return y.addCard(e).then((function(e){S.addItem(e),I.close()})).catch((function(e){return console.error("Error: ".concat(e))}))})),T=s(document.querySelector(".popup_type_edit-profile"),(function(e){return y.updateUserProfile(e).then((function(e){A.updateProfile(e),T.close()})).catch((function(e){return console.error("Error: ".concat(e))}))})),U=function(e){var t=e.querySelector(".popup__image-title"),n=e.querySelector(".popup__image");t&&n||console.error("Image title or image view not found in popup!");var r=l(e);return r.setEventListeners(),{open:function(e,o){console.log("Opening popup with name:",e,"link:",o),n&&t&&(n.alt=e,n.src=o,t.textContent=e),r.open()},close:function(){return r.close()}}}(document.querySelector(".popup_type_image-view")),V=s(document.querySelector(".popup_type_update-avatar"),(function(e){return y.updateUserAvatar({avatar:e.avatar}).then((function(e){A.updateProfile(e),V.close()})).catch((function(e){return console.error("Error: ".concat(e))}))})),B=(k=document.querySelector(".popup_type_delete-card"),q=function(e){return y.removeCard(e._id).then((function(){e.deleteCard(),B.close()})).catch((function(e){return console.error("Error: ".concat(e))}))},D=k.querySelector(".popup__save-button_place_delete-card"),(x=l(k)).setEventListeners(),u(u({},x),{},{setDeleteCard:function(e){w=e},open:function(){x.open(),D.addEventListener("click",(function(){return q(w)}),{once:!0})},close:function(){return x.close()}}));Promise.all([y.getUserProfile(),y.getCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,c,u=[],a=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=i.call(n)).done)&&(u.push(r.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];A.updateProfile(o),S.renderItems(i)})).catch((function(e){return console.error("Error fetching data: ".concat(e))})),document.querySelector(".profile__add-button").addEventListener("click",(function(){g.resetValidation(),I.open()})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){T.setInputValues(A.getProfileData()),T.open()})),document.querySelector(".profile__avatar-edit-button").addEventListener("click",(function(){h.resetValidation(),V.open()}))})();