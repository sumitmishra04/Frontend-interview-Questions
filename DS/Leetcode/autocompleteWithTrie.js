function Trie(ch) {
    this.ch = ch;
    this.isTerminal = false;
    this.map = {}; // map of a character node to node(child) {'a': node}
    this.words = []; // list of words in that subtree
  }

function TrieAdd (str, i, root) {
    if (i === str.length) {
      root.isTerminal = true;
      return;
    }
    if (!root.map[str[i]]) {
      root.map[str[i]] = new Trie(str[i]);
    }
    root.words.push(str);
    TrieAdd(str, i + 1, root.map[str[i]]);
  };
  

function TrieSearch (str, i, root) {
    if (i === str.length) {
      return root.words;
    }
    if (!root.map[str[i]]) {
      return [];
    }
    return TrieSearch(str, i + 1, root.map[str[i]]);
  };