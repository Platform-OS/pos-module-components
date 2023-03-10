!function(){document.querySelectorAll('[data-pos-component="Select"]').forEach((e=>{const t=e.querySelector(".pos-select__placeholder"),s=e.querySelector(".pos-select__opener"),i=e.querySelector(".pos-select__options"),n=e.querySelector(".pos-select__head");let o=-1;const d=t=>{t.stopPropagation(),i.classList.toggle("hidden");const s=e.querySelectorAll(".pos-select__opener > div");s[0].classList.toggle("hidden"),s[1].classList.toggle("hidden")},a=t=>{t.stopPropagation(),i.classList.add("hidden");const s=e.querySelectorAll(".pos-select__opener > div");s[0].classList.remove("hidden"),s[1].classList.add("hidden"),l(-1)},l=e=>{const t=i.children[o],s=i.children[e];t&&t.classList.remove("bg-highlighted"),s&&(s.scrollIntoView({behavior:"smooth",block:"center"}),s.classList.add("bg-highlighted")),o=e};n.addEventListener("click",d),document.addEventListener("click",(t=>{!e.contains(t.target)&&a(t)})),s.addEventListener("click",d),t.addEventListener("click",d),e.addEventListener("keydown",(e=>{if(40===e.keyCode&&o<i.children.length-1&&(e.preventDefault(),l(o+1)),38===e.keyCode&&o>0&&(e.preventDefault(),l(o-1)),13===e.keyCode||32===e.keyCode)if(e.preventDefault(),-1==o)d(e);else{const e=i.children[o].querySelector('[type="checkbox"]');e?e.click():i.children[o].click()}27===e.keyCode&&a(e)}));const c=e.querySelector(".pos-select--multi-native");if(c){e.querySelectorAll('[type="checkbox"]').forEach((s=>{s.addEventListener("change",(()=>{const i=e.querySelector(`option[value="${s.value}"]`);i.selected=!i.selected;e.querySelector(`[data-value="${s.value}"]`).classList.toggle("hidden");e.querySelectorAll('[type="checkbox"]:checked').length?t.classList.add("hidden"):t.classList.remove("hidden")}))}));e.querySelectorAll(".pos-select__tags > div").forEach((t=>{t.addEventListener("click",(s=>{s.stopPropagation();const i=t.getAttribute("data-value");e.querySelector(`input[value="${i}"]`).click();e.querySelector(`option[value="${i}"]`).selected=!1,t.classList.add("hidden")}))})),c.addEventListener("change",(()=>{e.querySelectorAll(".pos-select--multi-native > option").forEach((s=>{const i=s.value,n=e.querySelector(`input[value="${i}"]`),o=e.querySelector(`[data-value="${i}"]`);s.selected?(n.checked=!0,o.classList.remove("hidden")):(n.checked=!1,o.classList.add("hidden"));e.querySelectorAll('[type="checkbox"]:checked').length?t.classList.add("hidden"):t.classList.remove("hidden")}))}))}const r=e.querySelector(".pos-select--simple-native");if(r){e.querySelector(".pos-select__tags").addEventListener("click",d);const s=()=>{e.querySelectorAll(".pos-select__tags > div").forEach((e=>{e.getAttribute("data-value")==r.value?e.classList.remove("hidden"):e.classList.add("hidden")}));e.querySelectorAll(".pos-select__options > div").forEach((e=>{e.getAttribute("data-value")==r.value?e.classList.add("bg-highlighted"):e.classList.remove("bg-highlighted")})),r.value?t.classList.add("hidden"):t.classList.remove("hidden")};e.querySelectorAll(".pos-select__options > div").forEach((e=>{const t=e.getAttribute("data-value");e.addEventListener("click",(e=>{r.value=t;const i=new Event("change");r.dispatchEvent(i),d(e),s()}))})),r.addEventListener("change",(()=>{s()}))}}));const e=(e,t=!1)=>{const s=document.querySelector(`[data-popup-id="${e}"]`),i=document.querySelector(`[data-backdrop-id="${e}"]`);if(t?(s.classList.add("hidden"),i.classList.add("hidden")):(s.classList.toggle("hidden"),i.classList.toggle("hidden")),t||s.classList.contains("hidden"))s.setAttribute("aria-hidden",!0);else{s.setAttribute("aria-hidden",!1);const e=s.querySelector("input");e&&e.focus()}},t=t=>{e(t,!0)};document.querySelectorAll("[data-popup-open-id]").forEach((t=>{t.addEventListener("click",(s=>{s.stopPropagation();const i=t.getAttribute("data-popup-open-id");e(i)}))}));document.querySelectorAll("[data-popup-id]").forEach((s=>{const i=s.getAttribute("data-popup-id"),n=s.getAttribute("data-closed");"true"===s.getAttribute("data-closable")&&(s.addEventListener("keydown",(e=>{27===e.keyCode&&t(i)})),document.addEventListener("click",(e=>{!s.contains(e.target)&&t(i)}))),"false"===n&&e(i)}));document.querySelectorAll('[data-pos-component="Accordion"]').forEach((e=>{const t=e.querySelectorAll(".pos-accordion__title"),s="true"===e.getAttribute("data-pos-accordion-multiopen");t.forEach((e=>{e.addEventListener("click",(()=>{const i=e.nextElementSibling;e.firstElementChild.classList.toggle("rotate-180"),i.style.maxHeight?(i.style.maxHeight=null,e.setAttribute("aria-expanded",!1)):(i.style.maxHeight=i.scrollHeight+"px",e.setAttribute("aria-expanded",!0),s||t.forEach((t=>{if(t!==e){const e=t.nextElementSibling;t.firstElementChild.classList.add("rotate-180"),e.style.maxHeight=null,t.setAttribute("aria-expanded",!1)}})))}))}))}));document.querySelectorAll('[data-pos-component="Tabs"]').forEach((e=>{const t=[...e.querySelectorAll(".pos-tabs__tab")],s=e.querySelectorAll(".pos-tabs__panel");let i=null,n=null;const o=e=>{const s=e.currentTarget;"ArrowLeft"==e.key&&(e.preventDefault(),s===i?n.focus():(index=t.indexOf(s),t[index-1].focus())),"ArrowRight"==e.key&&(e.preventDefault(),s===n?i.focus():(index=t.indexOf(s),t[index+1].focus())),"Home"==e.key&&(e.preventDefault(),i.focus()),"End"==e.key&&(e.preventDefault(),n.focus())};t.forEach(((e,d)=>{e.addEventListener("click",(()=>{t.forEach(((t,i)=>{e===t?(t.classList.add("pos-tabs__tab--active"),s[i].classList.remove("hidden"),t.setAttribute("aria-selected","true"),t.setAttribute("tabindex","0")):(t.classList.remove("pos-tabs__tab--active"),s[i].classList.add("hidden"),t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1"))}))})),s[d].classList.add("hidden"),i||(i=e,s[d].classList.remove("hidden"),e.setAttribute("aria-selected","true"),e.setAttribute("tabindex","0")),n=e,e.addEventListener("keydown",o)})),i.classList.add("pos-tabs__tab--active")}));document.querySelectorAll('[data-pos-component="more-less"]').forEach((e=>{const t=e.querySelector(".more-less__short"),s=e.querySelector(".more-less__full"),i=e.querySelector(".more-less__button--more"),n=e.querySelector(".more-less__button--less");i.addEventListener("click",(()=>{t.classList.add("hidden"),s.classList.remove("hidden")})),n.addEventListener("click",(()=>{t.classList.remove("hidden"),s.classList.add("hidden")}))}));document.querySelectorAll('[data-pos-component="Dropdown"]').forEach((e=>{const t=e.querySelector("[data-dropdown-trigger]"),s=e.querySelector("[data-dropdown-content]"),i=e.querySelector("[data-dropdown-arrow]");let n;const o=e=>{e.stopPropagation(),s.classList.add("hidden"),s.setAttribute("aria-hidden","true")},d=()=>{if(!i)return;const e=t.getBoundingClientRect(),n=s.getBoundingClientRect(),o=i.getBoundingClientRect();i.style.left=e.left-n.left+e.width/2-o.width/2+"px",i.classList.remove("invisible")};window.addEventListener("resize",(()=>{clearTimeout(n),n=setTimeout(d,200)})),t.addEventListener("click",(()=>{s.classList.toggle("hidden"),"true"===s.getAttribute("aria-hidden")?s.setAttribute("aria-hidden","false"):s.setAttribute("aria-hidden","true"),d()})),document.addEventListener("click",(t=>{!e.contains(t.target)&&o(t)})),s.addEventListener("click",o),e.addEventListener("keydown",(e=>{27===e.keyCode&&o(e)}))})),window.posComponents||(window.posComponents={}),window.posComponents.flash=function(e,t,s){const i=this;i.settings={},i.settings.container=document.querySelector('[data-pos-component="flashes"]'),i.settings.template=i.settings.container.querySelector("[data-flash-template]"),i.settings.contentSelector="[data-flash-content]",i.settings.close="[data-flash-close]",i.settings.notification=null,i.settings.autohide=void 0!==(null==s?void 0:s.autohide)?s.autohide:"success"===e,i.settings.delay=!!(null==s?void 0:s.delay)&&s.delay,i.settings.debug=!!(null==s?void 0:s.debug)&&s.debug;let n=null;i.init=()=>{i.settings.delay?setTimeout((()=>{i.show()}),i.settings.delay):i.show(),i.settings.autohide&&(n=setTimeout((()=>{i.hide()}),i.settings.debug?700:5e3))},i.show=()=>{i.settings.notification=i.settings.template.content.firstElementChild.cloneNode(!0),i.settings.notification.querySelectorAll("[data-flash] > div > div").forEach((t=>{t.matches(`[data-flash-${e}]`)||t.remove()})),i.settings.notification.querySelector(i.settings.contentSelector).innerHTML=t,i.settings.notification.querySelector(i.settings.close).addEventListener("click",(()=>{i.hide()}),{once:!0}),i.settings.notification.classList.add("flash-loading"),i.settings.notification=i.settings.container.appendChild(i.settings.notification)},i.hide=()=>{clearTimeout(n),i.settings.notification.classList.add("flash-unloading"),i.settings.notification.addEventListener("animationend",(()=>{i.settings.notification.remove()}))},i.init()},document.dispatchEvent(new Event("apiFlashReady"))}();