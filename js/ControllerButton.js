class ControllerButton {
  constructor(parentIndex,
              buttonIndex,
              htmlClass,
              audioInterface) {
    this.sound = new Audio();
    this.parentIndex = parentIndex;
    this.buttonIndex = buttonIndex;
    this.name = parentIndex.toString() + "_" + buttonIndex.toString();
    this.htmlClass = htmlClass;
    this.visual = this.createVisual();
    this.audioInterface = audioInterface;
    var _this = this;
    this.startAgain = function() {_this.startLoop(true);}
    this.deactivate = function() {_this.deactivateVisuals();};

  }

  isGlobalController() {
    return (this.parentIndex === 1 || this.buttonIndex === 1);
  }

  hasSoundSource() {
    return (this.sound.src !== '');
  }

  createVisual() {
    return PadVisuals.createDivs(this.htmlClass,
                                this.name,
                                this.clickEffect(),
                                this.mousoverEffect());
  }

  clickEffect() {
    var _this = this;
    if (this.isGlobalController()) {
      return function(e) {
        e = e || window.event;
        _this.audioInterface.controllGlobal(_this, e.which)};
      } else {
      return function(e) {_this.trigger(e.which)};
    }
  }

  mousoverEffect() {
    var _this = this;
    if (this.isGlobalController()) {
      return function() {};
    } else {
      return function() {PadVisuals.displaySource(_this.sound.src)};
    }
  }

  trigger(mouseButton) {
    if (this.hasSoundSource()){
      if (mouseButton === 2) {
        this.playSound();
        this.toggleVisuals();
      } else if (mouseButton === 1) {
        this.startLoop(false);
        this.activateVisuals();
      } else if (mouseButton === 3) {
        this.stopLoop();
        this.deactivateVisuals();
      }
    }
  }

  playSound(){
    var audio = this.sound;
    if (audio.paused) {
      this.startLoop(true);
    } else {
      this.stopLoop();
    }
  }

  display(){
    PadVisuals.append(this.visual, new Parent("pad_line", this.parentIndex - 1));
  }

  toggleVisuals() {
    PadVisuals.toggleClass(this.visual, "square", "square_active")
  }

  activateVisuals() {
    PadVisuals.changeClass(this.visual, "square_active");
  }

  deactivateVisuals() {
    PadVisuals.changeClass(this.visual, "square");
  }

  startLoop(repeatOn) {
    var audio = this.sound;
    audio.preload = "auto";
    this.sound.currentTime = 0;
    audio.play();
    if(repeatOn) {
      this.manageEventListeners(audio, this.startAgain, this.deactivate);
    } else {
      this.manageEventListeners(audio, this.deactivate, this.startAgain);
    }
  }

  stopLoop() {
    this.sound.pause();
  }

  manageEventListeners(element, toAdd, toRemove) {
    element.removeEventListener('ended', toRemove, false);
    element.addEventListener('ended', toAdd, false);
  }
}
