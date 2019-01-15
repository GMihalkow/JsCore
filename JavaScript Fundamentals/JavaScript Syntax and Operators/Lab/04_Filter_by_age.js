function FilterByAge(minAge, firstPersonName, firstPersonAge, secondPersonName, secondPersonAge){
    if(+firstPersonAge >= +minAge){
        let result = {};
        result.name = firstPersonName;
        result.age = firstPersonAge;
        console.log(result);
    }
    if(+secondPersonAge >= +minAge){
        let result = {};
        result.name = secondPersonName;
        result.age = secondPersonAge;
        console.log(result);
    }
}

FilterByAge(12, "Ivan", 15, "Asen", 20);
