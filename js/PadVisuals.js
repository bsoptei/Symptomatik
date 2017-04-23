class PadVisuals {
  static createDivs(className, index, clickResponse, mouseoverResponse) {
    var div = document.createElement("div");
    div.className = className;
    div.id = className + index;
    div.addEventListener("mousedown", clickResponse);
    div.addEventListener("mouseover", mouseoverResponse);

    var blockContextMenu = function (evt) {
      evt.preventDefault();
    };
    div.addEventListener('contextmenu', blockContextMenu);
    return div;
  }

  static append(child, parent) {
    var containers = document.getElementsByClassName(parent.className);
    containers[parent.index].appendChild(child);
  }

  static toggleClass(element, classOne, classTwo) {
    element.className = (element.className === classOne) ? classTwo : classOne;
  }

  static changeClass(element, className) {
    element.className = className;
  }

  static displaySource(source) {
    var filename = source.replace(/^.*[\\\/]/, '')
    document.getElementById("display_source").innerHTML = (filename === '')? "empty": filename;
  }
}
