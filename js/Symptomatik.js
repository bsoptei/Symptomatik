class Symptomatik {

  static initialize() {
    var fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', readSingleFile, false);

    function readSingleFile(e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target.result.split(',');
        Symptomatik.createInterface(contents);
        document.getElementById("loaded_project").innerHTML = file.name;
        Symptomatik.removeOpenMenuItem();
        Symptomatik.addCloseMenuItem();
        Symptomatik.addSourceDisplay();
      };
      reader.readAsText(file);
    }

  }

  static createInterface(audioSource){
    var myAudioInterface = new AudioInterface(4, 11);
    myAudioInterface.createModules();
    myAudioInterface.loadSound(audioSource);
    myAudioInterface.display();
  }

  static removeOpenMenuItem() {
    var menu = Symptomatik.obtainMenuElement();
    var openProjectMenuItem = document.getElementById("open_project");
    menu.removeChild(openProjectMenuItem);
  }

  static addCloseMenuItem() {
    Symptomatik.addMenuItem("close_project",
                            "menu_wrapper",
                            "",
                            "Close project",
                            Symptomatik.closeProject);
  }

  static addSourceDisplay() {
    Symptomatik.addMenuItem("", "", "display_source", "", null);
  }

  static addMenuItem(divId, divClassName, pId, text, onClick) {
    var menu = Symptomatik.obtainMenuElement();
    var divToAdd = document.createElement("div");
    if (divClassName.length > 0) divToAdd.className = divClassName;
    if (divId.length > 0) divToAdd.id = divId;
    var pToAdd = document.createElement("p");
    pToAdd.className = "menu_item";
    if (pId.length > 0) pToAdd.id = pId;
    pToAdd.onclick = onClick;
    var textnode = document.createTextNode(text);
    pToAdd.appendChild(textnode);
    divToAdd.appendChild(pToAdd);
    menu.appendChild(divToAdd);
  }

  static obtainMenuElement() {
    return document.getElementById("program_menu");
  }

  static closeProject() {
    location.reload();
  }
}
