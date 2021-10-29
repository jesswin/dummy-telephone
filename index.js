const textField = document.querySelector("#telephone"); //Instance of textBox.

let timer; //Timer for longPress.

let isLongPress = false; //To decide whether to execute buttonClick or not.

let lastCharSet = null; //For checking if last characterSet was same.

let counter = 0; //Mainting the count of buttonClick.

let keyPadTimer; //To confirm the text in textBox.

let data; //Data to append in textbox.

let text = textField.value; //fetching the from textBox.

// main logic for buttonClick.
document.addEventListener("click", (e) => {
  // Debouncing, to let user click and change letter.
  clearTimeout(keyPadTimer);
  e.preventDefault();

  //condition if there was a longPress.
  if (!isLongPress) {
    //condition if the lastCharacterSet was same and counter was less than charterSet length.
    if (e.target.value === lastCharSet && counter < e.target.value.length) {
      counter++;
      data = e.target.value[counter - 1]; //storing it in data variable to append in textbox.
    }

    //condition if the lastCharacterSet was null (starting of program) and counter was less than charterSet length.
    else if (lastCharSet == null && counter < e.target.value.length) {
      counter++;
      data = e.target.value[counter - 1]; //storing it in data variable to append in textbox.
    }

    //condition if the lastCharacterSet was not same.
    else if (e.target.value !== lastCharSet) {
      text = textField.value; //getting data again because user is pressing a different key.
      counter = 0;
      counter++;
      data = e.target.value[counter - 1];
    }

    //condition if counter exceeded the length of currentCharacterSet.
    else {
      counter = 0; //resetting the counter.
      counter++;
      data = e.target.value[counter - 1];
    }

    textField.value = text + data; //appending the final data/letter
    lastCharSet = e.target.value; //updating the lastCharacterSet to current

    //Timer to confirm the data/letter in textBox
    keyPadTimer = setTimeout(() => {
      text = textField.value;
      counter = 0;
    }, 1200);
    //after 800ms this data will be confirmed and will not be editable
  }
  isLongPress = false; // setting flag to false after a longPress to allow it to get into buttonClick
});
//button Logic ends here

//To clear the longPress Timer
const mouseUpHandler = () => {
  clearTimeout(timer);
};

//To set longPress Timer
const mouseDownHandler = (number) => {
  timer = setTimeout(() => {
    console.log(number);
    textField.value = textField.value + number;
    text = textField.value;
    isLongPress = true;
  }, 800);
};