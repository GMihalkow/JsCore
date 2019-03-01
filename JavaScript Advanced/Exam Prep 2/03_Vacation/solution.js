class Vacation{
    constructor(organizer, destination, budget){
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }
 
    get numberOfChildren(){
        let totalKidsCount = 0;

        Object.keys(this.kids).forEach((gr) => {
            totalKidsCount += Array.from(this.kids[gr]).length;
        });

        return totalKidsCount;
    }

    registerChild(name, grade, budget){
        if(this.kids[grade] === undefined){
            this.kids[grade] = [];
        }

        if(parseFloat(budget) >= this.budget){
            let result = name.toString() + "-" + budget.toString();

            let doesKidExist = Array.from(this.kids[grade]).some((kid) => {
                let splitKidInfo = kid.split("-");
                let kidName = splitKidInfo[0];

                if(kidName === name){
                    return true;
                }
                return false;
            });

            if(doesKidExist === true){
                return name.toString() + " is already in the list for this " + this.destination.toString() + " vacation.";
            } else {
                this.kids[grade].push(result);

                return this.kids[grade];
            }
        } else {
            return name.toString() + "'s money is not enough to go on vacation to " + this.destination.toString() + ".";
        }
    }

    removeChild(name, grade){
        let kidInfo = "";
        if(this.kids[grade] === undefined){
            return "We couldn't find " + name.toString() + " in " + grade.toString() + " grade.";
        } else if(this.kids[grade].length === 0){
            return "We couldn't find " + name.toString() + " in " + grade.toString() + " grade.";
        }

        let doesKidExist = Array.from(this.kids[grade]).some((k) => {
            let splitElement = k.split("-");
            let kidName = splitElement[0];

            if(kidName === name){
                kidInfo = k;
                return true;
            }
            return false;
        });

        if(doesKidExist === true){
            let kidIndex = Array.from(this.kids[grade]).indexOf(kidInfo);

            (this.kids[grade]).splice(kidIndex, 1);

            return this.kids[grade];
        } else {
            return "We couldn't find " + name.toString() + " in " + grade.toString() + " grade.";
        }
    }

    toString(){
        if(this.numberOfChildren === 0){
            return "No children are enrolled for the trip and the organization of " + this.organizer.toString() + " falls out...";
        } else {
            let result = "";
            result += this.organizer.toString() + " will take " + this.numberOfChildren.toString() + " children on trip to "+ this.destination.toString() + "\n";

            Object.keys(this.kids).sort((a, b) => parseInt(a) - parseInt(b)).forEach((grd) => {
                if(Array.from(this.kids[grd]).length !== 0){
                    result += "Grade: " + grd.toString()  + "\n";
                    Array.from(this.kids[grd]).forEach((kid, kidIndex) => {
                        let currentIndex = parseInt(kidIndex) + 1;
    
                        result += currentIndex.toString() + ". " + kid.toString() + "\n";
                    });
                }
            });

            return result;
        }
    }
}

let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
vacation.registerChild('Gosho', 5, 2000);
vacation.registerChild('Lilly', 6, 2100);

console.log(vacation.removeChild('Gosho', 9));

vacation.registerChild('Pesho', 6, 2400);
vacation.registerChild('Gosho', 5, 2000);

console.log(vacation.removeChild('Lilly', 6));
console.log(vacation.registerChild('Tanya', 5, 6000))
