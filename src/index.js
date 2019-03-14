import _ from 'lodash';
import "./App.scss"

console.log("this works");
function component() {
    let element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack in not fun'], ' ');

    return element;
}

document.body.appendChild(component());