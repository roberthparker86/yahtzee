class Dice {
  constructor() {
    this.valuesArray = [1, 2, 3, 4, 5];
    this.one = 'fa-dice-one';
    this.two = "fa-dice-two";
    this.three = "fa-dice-three";
    this.four = "fa-dice-four";
    this.five = "fa-dice-five";
    this.six = "fa-dice-six";
  }

  generateDice() {
    const targetSelector = document.querySelector('aside');

    this.valuesArray.forEach(value => {
      const newITag = document.createElement('i');
      newITag.classList.add('fas', 'dice');

      switch(value) {
        case 1:
          newITag.classList.add(this.one);
          break;
        case 2:
          newITag.classList.add(this.two);
          break;
        case 3:
          newITag.classList.add(this.three);
          break;
        case 4:
          newITag.classList.add(this.four);
          break;
        case 5:
          newITag.classList.add(this.five);
          break;
        default:
          newITag.classList.add(this.six);
      }

      targetSelector.append(newITag);
    });
  }
};