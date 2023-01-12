function Stack() {
    const data = []
    return {
        pop: function () {
            if(data.length > 0) {
                return data.pop()
            }
        },
        push : function (value) {
            data.push(value)
        }
    }
}

const st = new Stack()
st.push(1)
st.push(2)
st.push(3)
st.push(4)

console.log(st.pop())
console.log(st.pop())
console.log(st.pop())
console.log(st.pop())
console.log(st.pop())