class ModalController {
  constructor(modalWindow) {
    this.modalWindow = modalWindow;
    this.modalBG = modalWindow.previousElementSibling;
    this.closeBtn = this.modalWindow.children[0];
    this.modalMessage = modalWindow.children[1];
    this.playAgainBtn = modalWindow.children[2];
    this.messageEventType = null;
  }

  getMessageEventType() {
    return this.messageEventType;
  }
  
  setMessageEventType(str) {
    this.messageEventType = str;
  }

  open(message) {
    this.modalBG.classList.remove('d-none');
    this.modalWindow.classList.remove('d-none');
    this.modalMessage.innerHTML = message;

    setTimeout(() => {
      this.modalBG.classList.add('open');
      this.modalWindow.classList.add('open');
    }, 20);
  }

  close() {
    this.modalBG.classList.remove('open');
    this.modalWindow.classList.remove('open');
    this.modalMessage.innerHTML = '';

    setTimeout(() => {
      this.modalBG.classList.add('d-none');
      this.modalWindow.classList.add('d-none');
    }, 20);
  }

  displayPlayAgainBtn() {
    this.playAgainBtn.classList.contains('game-over__false') && this.playAgainBtn.classList.remove('game-over__false');
  }

  hidePlayAgainBtn() {
    !this.playAgainBtn.classList.contains('game-over__false') && this.playAgainBtn.classList.add('game-over__false');
  }
}
