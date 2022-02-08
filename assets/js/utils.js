'use strict'

function domElementGenerator (selector, parentSelector, className='', innerHTML='') {
        const element = document.createElement(selector);
        console.log(className);
        if (className) {element.classList.add(className)};
        if (innerHTML) {element.innerHTML = innerHTML};
        const parent = document.querySelector(parentSelector);
        parent.append(element);
        return element;
    };

function listResolve (selected, item, parentSelector) {

        const parent = document.querySelector(parentSelector);

    new item({... selected, parent}).render();
};
