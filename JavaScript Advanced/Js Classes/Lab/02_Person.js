class Person{
    constructor(firstName, lastName, age, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }

    toString(){
        return this.firstName + " " + this.lastName + " (age: " + this.age.toString() + ", email: " + this.email.toString() + ")"; 
    }
}

let person = new Person("Pesho", "Ivanov", 12, "pesho@abv.bg");
console.log(person.toString());
//Pesho Ivanov (age: 12, email: pesho@abv.bg)