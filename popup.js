const input = document.getElementById("input");
const btnClnLine = document.getElementsByClassName("cleanLineBreaks")[0];
console.log("btnClnLine", btnClnLine);
const btnClnEmoji = document.getElementsByClassName("removeEmojis")[0];
const btnClnQuote = document.getElementsByClassName("convertQuotes")[0];
const btnClnSpace = document.getElementsByClassName("trimWhitespace")[0];
const btnCopy = document.getElementsByClassName("copyText")[0];

btnClnLine.addEventListener("click", function () {
  let newInput = input.value.replace(/\r?\n|\r/g, " ");
  console.log("after cleanLineBreaks->", newInput);
  document.getElementById("input").value = newInput;
});

btnClnEmoji.addEventListener("click", function () {
  let newInput = input.value.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])|/g,
    ""
  );

  console.log("after removeEmojis->", newInput);
  document.getElementById("input").value = newInput;
});

btnClnQuote.addEventListener("click", function () {
  console.log("input", input);
  let newInput = input.value.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  console.log("after convertQuotes->", newInput);
  document.getElementById("input").value = newInput;
});

btnClnSpace.addEventListener("click", function () {
  let newInput = input.value.replace(/[ \t]+/g, " ");
  console.log("after trimWhitespace->", newInput);
  document.getElementById("input").value = newInput;
});

btnCopy.addEventListener("click", function () {
  navigator.clipboard.writeText(input.value);

  notifySuccess();
  console.log("notifySuccess ran");
});

/* Ref: https://stackoverflow.com/a/64542953
 */
function notify(type, message) {
  (() => {
    let n = document.createElement("div");
    let id = Math.random().toString(36).substr(2, 10);
    n.setAttribute("id", id);
    n.classList.add("notification", type);
    n.classList.add("fade_out");
    n.innerText = message;
    document.getElementById("notification-area").appendChild(n);
    setTimeout(() => {
      var notifications = document
        .getElementById("notification-area")
        .getElementsByClassName("notification");
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].getAttribute("id") == id) {
          notifications[i].remove();
          break;
        }
      }
    }, 5000);
  })();
}

function notifySuccess() {
  notify("success", "Cleaned text copied!");
}
