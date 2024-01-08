function customRender(mainContainer, reactElement){
    // const domElement = document.createElement(reactElement.type);
    // domElement.innerHTML = reactElement.childern;
    // domElement.setAttribute("href", reactElement.props.href);
    // domElement.setAttribute("target", reactElement.props.target);

    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.childern;
    for(let prop in reactElement.props){
        if(prop === "children") continue;
        domElement.setAttribute(prop, reactElement.props[prop])
    }

    mainContainer.appendChild(domElement);
}


const reactElement = {
    type : "a",
    props : {
        href: "https://www.google.com",
        target: "_blank"
    },
    childern: "Click me to visit children",
}


const mainContainer = document.querySelector("#root");

customRender(mainContainer, reactElement);