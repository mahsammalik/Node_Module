function cssHasPseudo(n){var t=[],e=n.createElement("x");function o(){requestAnimationFrame(function(){t.forEach(function(t){var o=[];[].forEach.call(n.querySelectorAll(t.n),function(u){var i=[].indexOf.call(u.parentNode.children,u)+1,c=t.t.map(function(n){return t.n+":nth-child("+i+") "+n}).join(),r=u.parentNode.querySelector(c);(t.e?!r:r)&&(o.push(u),e.innerHTML="<x "+t.o+">",u.setAttributeNode(e.children[0].attributes[0].cloneNode()),n.documentElement.style.zoom=1,n.documentElement.style.zoom=null)}),t.u.forEach(function(e){-1===o.indexOf(e)&&(e.removeAttribute(t.o),n.documentElement.style.zoom=1,n.documentElement.style.zoom=null)}),t.u=o})})}function u(n){try{[].forEach.call(n.cssRules||[],function(n){if(n.selectorText){var e=decodeURIComponent(n.selectorText.replace(/\\(.)/g,"$1")).match(/^(.*?)\[:(not-)?has\((.+?)\)\](.*?)$/);if(e){var o=":"+(e[2]?"not-":"")+"has("+encodeURIComponent(e[3]).replace(/%3A/g,":").replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/%2C/g,",")+")";t.push({i:n,n:e[1],e:e[2],t:e[3].split(/\s*,\s*/),o:o,u:[]})}}else u(n)})}catch(n){}}[].forEach.call(n.styleSheets,u),o(),new MutationObserver(function(e){e.forEach(function(e){[].forEach.call(e.addedNodes||[],function(n){1===n.nodeType&&n.sheet&&u(n.sheet)}),[].push.apply(t,t.splice(0).filter(function(t){return t.i.parentStyleSheet&&t.i.parentStyleSheet.ownerNode&&n.documentElement.contains(t.i.parentStyleSheet.ownerNode)})),o()})}).observe(n,{childList:!0,subtree:!0}),n.addEventListener("focus",o,!0),n.addEventListener("blur",o,!0),n.addEventListener("input",o)}
