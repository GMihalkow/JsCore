class LineManager {
    constructor(stops){
        Array.from(stops).some((st) => {
            if(st.name === undefined || st.name.length === 0 ||
                 isNaN(st.timeToNext) || parseFloat(st.timeToNext) < 0){
                    throw new Error();
            }
            return true;
        });

        this.stops = stops;
        this.duration = 0;
        this.stopsCovered = 0;
        this._delay = 0;
    }

    get currentDelay(){
        return this._delay;
    }

    get currentStop(){
        if(this.stops.length > 0){
            return this.stops[0];
        }
    }

    get atDepot(){
        if(this.stops.length <= 1){
            return true;
        } else {
            return false;
        }
    }

    get nextStopName(){
        if(this.atDepot === true){
            return "At depot.";
        }

        return this.stops[1].name;
    }

    arriveAtStop(minutes){
        if(isNaN(minutes) || parseInt(minutes) < 0 || this.atDepot){
            throw new Error();
        }

        let resultDelay = 0;

        resultDelay = parseInt(minutes) - parseInt(this.currentStop.timeToNext);

        this.stops.shift();
        this._delay += resultDelay;
        this.duration += minutes

        this.stopsCovered++;

        if(this.atDepot){
            return false;
        } else {
            return true;
        }
    }

    toString(){
        let result = "";

        result = "Line summary\n";
        if(this.atDepot){
            result += "- Course completed\n";   
        }
        result += "- Next stop: " + this.nextStopName + "\n";
        result += "- Stops covered: " + this.stopsCovered.toString() + "\n";
        result += "- Time on course: " + this.duration.toString() + " minutes\n";
        result += "- Delay: " + this.currentDelay.toString() + " minutes\n";

        return result.trim();
    }
}

let testStops = [
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0}
];

let testManager = new LineManager(testStops);

while(testManager.atDepot === false) {
    console.log(testManager.toString());
    testManager.arriveAtStop(4);
}

console.log(testManager.toString());
