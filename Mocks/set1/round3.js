const person = { name: 'Sumit' };
Object.seal(person);
person.age = 25;
delete person.name;
console.log(person);


function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;


    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        const areArrays = Array.isArray(val1) && Array.isArray(val2);

        if (areArrays) {
            if (val1.length !== val2.length || val1.some((v, i) => !deepEqual(v, val2[i]))) {
                return false;
            }
        } else if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
            if (!deepEqual(val1, val2)) return false;
        } else {
            if (val1 !== val2) return false;
        }
    }

    return true;
}