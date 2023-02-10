const fileBtn = document.getElementById("fileBtn");
const editor = document.getElementById("editor");
const titles = document.getElementById("titles");
const list = document.getElementById("list");
const bullet = document.getElementById("bullet");
const exitBlock = document.getElementById("exit");

editor.oninput = (e) => {
  e.preventDefault();
  console.log(editor.innerHTML);
};

editor.onkeydown = (e) => {};

editor.onselectstart = (e) => {
  let selection = document.getSelection();
  selection.removeAllRanges();
  let range = new Range();
  range.selectNodeContents(editor);
  selection.addRange(range);
  console.log({ range, selection });
  // document.execCommand("backColor", true, "red");
};
titles.onclick = (e) => {
  if (titles.value !== "undefined") {
    let title = document.createElement(titles.value);
    let lastChild = editor.querySelector(":last-child");
    title.innerText = "Edit Title";
    if (!lastChild) editor.appendChild(title);
    if (lastChild && lastChild.nodeName !== title.nodeName) {
      editor.appendChild(title);
    }
  }
};

fileBtn.onchange = (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  let img = new Image();
  reader.readAsDataURL(file);
  reader.onloadend = (e) => {
    img.src = e.target.result;
    document.execCommand("insertImage", false, e.target.result);
    document.execCommand("insertLineBreak");
    // document.execCommand("insertLineBreak");
    // document.execCommand("insertImage", false, e.target.result);
    // editor.appendChild(img);
    // editor.appendChild(document.createElement("br"));
    // editor.appendChild(document.createElement("br"));
  };
};

list.onclick = (e) => {
  document.execCommand("insertOrderedList");
};
exitBlock.onclick = (e) => {
  document.execCommand("outdent");
};
