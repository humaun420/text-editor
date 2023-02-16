const editor = document.getElementById("editor");

let data = dataExtractor(editor)
console.log(data);

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
// const data = {};
// const childs = editor.childNodes;
// const data = extractor(editor);
// console.log(data);
// function extractor(parent) {
//   const data = {};
//   function nodeFnder(element) {
//     const childNodes = element.childNodes;
//     for (let i = 0; i < childNodes.length; i++) {
//       const element = childNodes[i];
//       if (element.nodeType === 1) {
//         if (element.childNodes.length > 1) {
//           if (element.nodeName === "OL" || element.nodeName === "UL") {
//             console.log("list found", i);
//           } else {
//             nodeFnder(element);
//             console.log("big element", { element, i });
//           }
//         } else {
//           if (
//             element.nodeName !== "IMG" &&
//             element.nodeName !== "BR" &&
//             element.innerHTML !== "<br>" &&
//             element.data !== "\n      "
//           ) {
//             console.log("small element", { element, i });
//             data[
//               `${Math.floor(Math.random() * 100000000)}+${i}+${
//                 element.nodeName
//               }`
//             ] = element.innerHTML;
//           }
//         }
//       }
//       if (element.nodeType === 3) {
//         console.log("text element", { element });
//         if (element.data !== "\n      ") {
//           console.log("small element", { element, i });
//           data[`${Math.floor(Math.random() * 100000000)}+${i}+p`] =
//             element.data;
//         }
//       }
//       // console.log({element,i});
//     }
//   }
//   nodeFnder(parent);
//   return data;
//   // console.log({ childNodes });
//   // console.log({ data });
// }

// const data = nodeFnder(editor);

// function nodeFnder(parent = document.childNodes) {
//   const childs = parent.childNodes;
//   const data = {};
//   childs.forEach((child, key, parent) => {
//     if (child.nodeType === 1) {
//       // console.log({ child, key, parent });
//       const newData = nodeFnder(child);
//       console.log({ newData });
//       data[`${child.nodeName}`] = child.innerText;
//     }
//     if (child.nodeType === 3) {
//       // console.log({ child, key, parent }); //content_of_node
//       data[`${child.nodeName}`] = child.innerText;
//     }
//   });
//   return data;
// }

// console.log({ data });
