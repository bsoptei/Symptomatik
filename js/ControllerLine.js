class ControllerLine {
  constructor(name){
    this.name = name;
    this.visual = this.createVisual();
  }

  createVisual(){
    return PadVisuals.createDivs("pad_line", this.name, function(){});
  }

  display() {
    PadVisuals.append(this.visual, new Parent("wrapper", 0));
  }
}
