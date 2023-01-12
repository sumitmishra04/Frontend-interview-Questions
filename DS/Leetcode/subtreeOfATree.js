function index(tree1, tree2) {
  if (!tree1) {
    return false;
  } else if (isSameTree(tree1, tree2)) {
    return true;
  }
  return index(tree1.left, tree2) || index(tree1.right, tree2);
}

function isSameTree(s, t) {
  if (s === null || t === null) {
    return s === null && t === null;
  } else if(s.val === t.val) {
    return isSameTree(s.left, t.left) && isSameTree(s.right, t.right)
  } else {
      return false
  }
}
