let idInstance = document.getElementById("id_instance");
let apiTokenInstance = document.getElementById("api_token_instance");

let getSettingsBtn = document.getElementById("settings_button");
let getStateInstanceBtn = document.getElementById("state_button");
let sendMessageBtn = document.getElementById("send_button");
let sendFileBtn = document.getElementById("send_file_button");

let messageNumber = document.getElementById("message_number");
let message = document.getElementById("message");

let fileNumber = document.getElementById("file_number");
let fileLink = document.getElementById("file_link");

const fetchApiRes = document.getElementById("fetch_api_res");

async function getSettings() {
  let url = `https://${idInstance.value.slice(
    0,
    4
  )}.api.greenapi.com/waInstance${idInstance.value}/getSettings/${
    apiTokenInstance.value
  }`;
  console.log(url);
  const response = await fetch(url);
  const respText = await response.json();
  fetchApiRes.textContent = JSON.stringify(respText, null, 4);
}

async function getStateInstance() {
  let url = `https://${idInstance.value.slice(
    0,
    4
  )}.api.greenapi.com/waInstance${idInstance.value}/getStateInstance/${
    apiTokenInstance.value
  }`;
  const response = await fetch(url);
  const respText = await response.json();
  fetchApiRes.textContent = JSON.stringify(respText, null, 4);
}

function replaceNumber(num) {
  num = num.replace("+", "");
  num = num.replace(" ", "");
  num = num.replace("(", "");
  num = num.replace(")", "");
  num = num.replace("-", "");
  return num;
}

function getNameFromLink(link) {
  let name = link.split("/");
  if (name[name.length - 1] === "") {
    return name[name.length - 2];
  }
  return name[name.length - 1];
}

async function sendMessage() {
  let url = `https://${idInstance.value.slice(
    0,
    4
  )}.api.greenapi.com/waInstance${idInstance.value}/sendMessage/${
    apiTokenInstance.value
  }`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      chatId: `${replaceNumber(messageNumber.value)}@c.us`,
      message: message.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respText = await response.json();
  fetchApiRes.textContent = JSON.stringify(respText, null, 4);
}

async function sendFileByUrl() {
  let url = `https://${idInstance.value.slice(
    0,
    4
  )}.api.greenapi.com/waInstance${idInstance.value}/sendFileByUrl/${
    apiTokenInstance.value
  }`;

  console.log(url);
  console.log(getNameFromLink(fileLink.value));
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      chatId: `${replaceNumber(fileNumber.value)}@c.us`,
      urlFile: fileLink.value,
      fileName: getNameFromLink(fileLink.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respText = await response.json();
  fetchApiRes.textContent = JSON.stringify(respText, null, 4);
}

getSettingsBtn.addEventListener("click", getSettings);
getStateInstanceBtn.addEventListener("click", getStateInstance);
sendMessageBtn.addEventListener("click", sendMessage);
sendFileBtn.addEventListener("click", sendFileByUrl);
