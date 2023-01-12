function getElementByClassName(className, node) {
    let elem = null
  if (node.childNodes.length) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (!elem && child.nodeType === 1) {
        if (child.className.split(" ").includes(className)) {
          elem = child;
          break
        }
         getElementByClassName(className, child);
      }
    }
  }
      return elem
}

console.log(getElementByClassName("top", document.body));
