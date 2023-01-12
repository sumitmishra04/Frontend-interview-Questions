// at this point the num doesnt reflect the new value
let firstState
const React = {
    state: null,
  useState: function (initialValue) {
    this.state = this.state || initialValue;
    function setState(newVal) {
      this.state = newVal;
    }
    return [this.state, setState];
  },
  render: (component) => {
    const a = component();
    a.render();
    return a;
  },
};

const myApp = () => {
  let [num, setNum] = React.useState(1);
  return {
    render: () => {
      console.log(num);
    },
    click: () => setNum(num + 1),
  };
};

let app = React.render(myApp);
app.click();
app = React.render(myApp);
