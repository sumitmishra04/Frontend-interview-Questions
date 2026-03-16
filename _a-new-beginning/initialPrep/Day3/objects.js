const original = {
  name: "Sumit",
  details: {
    age: 33,
    skills: ["React", "Node"],
    joined: new Date("2024-05-20"),
  },
};

const copy = deepClone(original);
copy.details.skills.push("GraphQL");

console.log(original.details.skills); // ["React", "Node"]
console.log(copy.details.skills); // ["React", "Node", "GraphQL"]
console.log(copy.details.joined === original.details.joined); // false
