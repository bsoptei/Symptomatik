class AudioInterface {
  constructor(numOfLines, numOfButtonsPerLine){
    this.numOfLines = numOfLines;
    this.numOfButtonsPerLine = numOfButtonsPerLine;
    this.lines = [];
    this.buttons = [];
  }

  createModules(){
    for (var i = 1; i <= this.numOfLines; i++) {
      this.lines.push(new ControllerLine(i.toString()));
      this.createSubModules(i);
    }
  }

  createSubModules(i){
    for (var j = 1; j <= this.numOfButtonsPerLine; j++) {
      this.createButtons(i, j);
    }
  }

  createButtons(parentIndex, buttonIndex){
    var buttonHTMLclass = (parentIndex === 1 || buttonIndex === 1) ? "bulkController": "square";
    this.buttons.push(new ControllerButton(parentIndex,
                                          buttonIndex,
                                          buttonHTMLclass,
                                          this));
  }

  display(){
    this.displayItems(this.lines);
    this.displayItems(this.buttons);
  }


  displayItems(items){
    items.forEach(function(item){
      item.display();
    });
  }

  loadSound(source) {
    var _this = this;
    var i = 0;
    this.buttons.forEach(function(button){
      if (!button.isGlobalController()) {
        if (_this.sourceIsLegit(source[i])) {
          button.sound.setAttribute('src', source[i]);
        }
        i++;
      }
    });
  }

  sourceIsLegit(src) {
    return src != undefined && src.includes('.wav');
  }

  controllGlobal(globalController, mouseButton) {
    var _this = this;
    this.buttons.forEach(function(controllerButton){
      if (globalController.parentIndex === 1 && globalController.buttonIndex === 1) {
          _this.reactToGlobal(controllerButton, mouseButton, true);
      } else if (globalController.parentIndex === 1) {
          _this.reactToGlobal(controllerButton,
                              mouseButton,
                              globalController.buttonIndex === controllerButton.buttonIndex);
      } else {
          _this.reactToGlobal(controllerButton,
                              mouseButton,
                              globalController.parentIndex === controllerButton.parentIndex);
      }
    });
  }

  reactToGlobal(controllerButton, mouseButton, condition) {
    if (!controllerButton.isGlobalController()
        && controllerButton.hasSoundSource()
        && condition) {
          controllerButton.trigger(mouseButton);
    }
  }

}
