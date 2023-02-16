const fileBtn = document.getElementById("fileBtn");
const editor = document.getElementById("editor");
const titles = document.getElementById("titles");
const list = document.getElementById("list");
const bullet = document.getElementById("bullet");
const exitBlock = document.getElementById("exit");
const dataButton = document.getElementById("dataButton");

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
bullet.onclick = (e) => {
  document.execCommand("insertUnorderedList");
};
exitBlock.onclick = (e) => {
  document.execCommand("outdent");
};

dataButton.onclick = () => {
  const data = dataExtractor(editor);
  console.log(data);
};

function dataExtractor(element) {
  let data = {};
  // let i = 0;
  extractor(element);
  function extractor(elements) {
    let childElements = elements.childNodes;
    for (let i = 0; i < childElements.length; i++) {
      const element = childElements[i];
      if (element.nodeType === 1) {
        if (
          element.nodeName !== "OL" &&
          element.nodeName !== "UL" &&
          element.nodeName !== "IMG"
        ) {
          if (
            element.childNodes.length === 1 &&
            element.innerText.trim() !== ""
          ) {
            // console.log(element);
            data[`${i}tag${Math.random()} + ${element.nodeName}`] =
              element.innerText;
          } else {
            // console.dir(element);
            extractor(element);
          }
        } else {
          if (element.nodeName !== "IMG") {
            let listData = {};
            const listElements = element.childNodes;
            for (let listPos = 0; listPos < listElements.length; listPos++) {
              const element = listElements[listPos];
              if (element.nodeName === "LI") {
                listData[
                  `${listPos}tag${Math.random()} + ${element.nodeName}`
                ] = element.innerText;
              }
            }
            data[`${i}tag${Math.random()} + ${element.nodeName}`] = {
              ...listData,
            };
          }
        }
      } else {
        if (element.data.trim() !== "") {
          data[`${i}tag${Math.random()} + p`] = element.data.trim();
        }
      }
      // console.dir(element);
    }
  }
  return data;
}
