const editor = document.getElementById("editor");
const data = {};
const childs = editor.childNodes;

childs.forEach((child, key, parent) => {
  if (child.nodeType === 1) {
    console.log({ child, key, parent }); //element_node
  }
  if (child.nodeType === 3) {
    console.log({ child, key, parent }); //content_of_node
  }
});
