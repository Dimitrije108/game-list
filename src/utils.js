export { createForm, createInput, createDiv, createBtn, createEditIcon, createTrashIcon, createCancelIcon };
import * as d3 from "d3";

const createForm = () => {
    const newForm = document.createElement('form');
    newForm.classList.add('lib-form');
    return newForm;
};

const createInput = () => {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = 'lib-input';
    newInput.name = 'lib-input';
    newInput.placeholder = 'Name';
    newInput.minLength = 1;
    newInput.maxLength = 50;
    newInput.setAttribute("required", "");
    return newInput;
};

const createDiv = (txtContent, className) => {
    const newDiv = document.createElement('div');
    newDiv.textContent = txtContent;
    newDiv.classList.add(className);
    return newDiv;
};

const createBtn = (txtContent, className) => {
    const newBtn = document.createElement('button');
    newBtn.textContent = txtContent;
    newBtn.classList.add(className);
    return newBtn;
};

const createEditIcon = (container, size) => {
    const svg = d3.select(container)
        .append("svg")
        .attr("width", size)
        .attr("height", size)
        .attr("viewBox", "0 0 24 24")
        .attr("class", "lib-rename");

    const g1 = svg.append("g")
        .attr("id", "Complete");

    const g2 = g1.append("g")
        .attr("id", "edit");

    const g3 = g2.append("g");

    g3.append("path")
        .attr("d", "M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8")
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", "1");

    g3.append("polygon")
        .attr("fill", "none")
        .attr("points", "12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8")
        .attr("stroke", "#000000")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", "1");
};

const createTrashIcon = (container, size) => {
    const svg = d3.select(container)
        .append("svg")
        .attr("width", size)
        .attr("height", size)
        .attr("viewBox", "0 0 32 32")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("fill", "#000000");

    const g1 = svg.append("g")
        .attr("id", "SVGRepo_iconCarrier");

    g1.append("style")
        .attr("type", "text/css")
        .text(".trash-icon{fill:#111918;} .st0{fill:#0B1719;}");

    g1.append("path")
        .attr("class", "trash-icon")
        .attr("d", "M20,26.5v-16c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v16c0,0.276-0.224,0.5-0.5,0.5 S20,26.776,20,26.5z M28,5v1c0,0.552-0.448,1-1,1l-1.847,22.166C25.066,30.203,24.2,31,23.16,31H8.84 c-1.04,0-1.907-0.797-1.993-1.834L5,7C4.448,7,4,6.552,4,6V5c0-1.105,0.895-2,2-2h7V2c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v1 h7C27.105,3,28,3.895,28,5z M14,3h4V2h-4V3z M25.997,7H6.003l1.84,22.083C7.887,29.601,8.32,30,8.84,30H23.16 c0.52,0,0.953-0.399,0.997-0.917L25.997,7z M27,5c0-0.552-0.448-1-1-1H6C5.448,4,5,4.448,5,5v1h22V5z M17.5,27 c0.276,0,0.5-0.224,0.5-0.5v-16c0-0.276-0.224-0.5-0.5-0.5S17,10.224,17,10.5v16C17,26.776,17.224,27,17.5,27z M14.5,27 c0.276,0,0.5-0.224,0.5-0.5v-16c0-0.276-0.224-0.5-0.5-0.5S14,10.224,14,10.5v16C14,26.776,14.224,27,14.5,27z M11.5,27 c0.276,0,0.5-0.224,0.5-0.5v-16c0-0.276-0.224-0.5-0.5-0.5S11,10.224,11,10.5v16C11,26.776,11.224,27,11.5,27z");
};

const createCancelIcon = (container) => {
    const svg = d3.select(container)
        .append("svg")
        .attr("width", 24)
        .attr("height", 24)
        .attr("viewBox", "0 0 21 21")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("fill", "#000000")
        .attr("class", "cancel-svg");

    const outerGroup = svg.append("g")
        .attr("fill", "none")
        .attr("fill-rule", "evenodd")
        .attr("stroke", "#000000")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 0.8)
        .attr("transform", "translate(2 2)")
        .attr("class", "cancel-svg-style");

    outerGroup.append("circle")
        .attr("cx", 8.5)
        .attr("cy", 8.5)
        .attr("r", 8);

    const innerGroup = outerGroup.append("g")
        .attr("transform", "matrix(0 1 -1 0 17 0)");

    innerGroup.append("path")
        .attr("d", "m5.5 11.5 6-6");

    innerGroup.append("path")
        .attr("d", "m5.5 5.5 6 6");
}