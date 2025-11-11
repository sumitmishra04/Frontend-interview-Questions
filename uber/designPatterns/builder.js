// 🎯 User Class
class User {
    constructor() {
        this.name = "";
        this.age = 0;
        this.email = "";
        this.address = "";
        this.phone = "";
    }
}

// 🎯 User Builder
class UserBuilder {
    constructor(name) {
        this.user = new User();
        this.user.name = name;
    }

    setAge(age) {
        this.user.age = age;
        return this;
    }

    setEmail(email) {
        this.user.email = email;
        return this;
    }

    setAddress(address) {
        this.user.address = address;
        return this;
    }

    setPhone(phone) {
        this.user.phone = phone;
        return this;
    }

    build() {
        return this.user;
    }
}

// ✅ Creating User Profiles with Builder
const user1 = new UserBuilder("John Doe")
    .setAge(30)
    .setEmail("john@example.com")
    .setPhone("123-456-7890")
    .build();

console.log(user1);
/*
{
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  address: '',
  phone: '123-456-7890'
}
*/

const user2 = new UserBuilder("Alice")
    .setEmail("alice@example.com")
    .setAddress("123 Main St")
    .build();

console.log(user2);
/*
{
  name: 'Alice',
  age: 0,
  email: 'alice@example.com',
  address: '123 Main St',
  phone: ''
}
*/
