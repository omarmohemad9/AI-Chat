// import md from "./markdown-it/dist/markdown-it.js";
import md from "markdown-it";
import TypeIt from "typeit";
// md().render("omar");
let input = document.getElementById("InputData");
let btnSubmit = document.getElementById("sub");
let chat_Section = document.getElementById("chat");
let API_KEY = "AIzaSyAOuDQ8kGL2nAn6U_ZU76SqDbh5wugMDdI";
let API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// automatic write
new TypeIt("#element", {
  speed: 75,
  waitUntilVisible: true,
})
  .type("What 'can I help with?", { delay: 200 })
  .move(-16)
  .delete(1)
  .move(null, { to: "END" })
  .go();

btnSubmit.onclick = function () {
  createChat();
};
document.onkeydown = (e) => {
  e.keyCode == 13 ? createChat() : "";
};

function createChat() {
  document.getElementById("element").classList.add("remove");
  let val = input.value;
  if (val !== "") {
    let talkerHTML = `
    <div class="talker">
            <p>${val}</p>
        </div>`;
    chat_Section.innerHTML += talkerHTML;
    chat_Section.innerHTML += `
    <div class="waiter ">
            <img src="./img/chat-gpt.png" alt="">
            <p class="disappear">...</p>
            </div>`;
    FetchData(val);
  }
  input.value = "";
  input.focus();
}
const FetchData = (value) => {
  // this fetch to post data
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ contents: [{ parts: [{ text: value }] }] }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createResBot(data);
      document.querySelector(".waiter").remove();
    });
};

const createResBot = (data) => {
  let resposeTxt = data.candidates[0].content.parts[0].text;
  let md_text = md().render(resposeTxt);
  chat_Section.innerHTML += `
          <div class="bot ">
            <img src="./img/chat-gpt.png" alt="">
            <pre>${md_text}</pre>
          </div>`;
};

// create transition to title
window.onload = () => {
  document.getElementById("title").classList.add("appear");
  console.log("s");
};

// disappear placeholder input
input.onfocus = () => {
  input.setAttribute("placeholder", "");
};
input.onblur = () => {
  input.setAttribute("placeholder", "Enter Massage Here...");
};
