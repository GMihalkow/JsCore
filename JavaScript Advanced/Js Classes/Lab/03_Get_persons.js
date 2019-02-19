function solve(){
    class Person{
        constructor(firstName, lastName, age, email){
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.email = email;
        }
    
        toString(){
            if(this.lastName === undefined){
                this.lastName = "undefined";
            } 
            if(this.email  === undefined){
                this.email = "undefined";
            }
            if(this.age  === undefined){
                this.age = "undefined";
            }
            return this.firstName.toString() + " " + this.lastName.toString() + " (age: " + this.age.toString() + ", email: " + this.email.toString() + ")"; 
        }
    }

    let resultArr = [
        new Person("Maria", "Petrova", 22, "mp@yahoo.com"),
        new Person("SoftUni"),
        new Person("Stephan", "Nikolov", 25),
        new Person("Peter", "Kolev", 24, "ptr@gmail.com")]

    return resultArr;
}

Array.from(solve()).forEach((el) => {
    console.log(el.toString());
});
// Maria Petrova (age: 22, email: mp@yahoo.com)
// SoftUni undefined (age: undefined, email: undefined)
// Stephan Nikolov (age: 25, email: undefined)
// Peter Kolev (age: 24, email: ptr@gmail.com)
