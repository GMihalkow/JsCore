function GenerateFitnessRate(dayOfWeek, serviceName, timeOfDay){

    if(dayOfWeek == `Monday` || dayOfWeek == `Tuesday` || dayOfWeek == `Wednesday` || dayOfWeek == `Thursday` || dayOfWeek == `Friday`){
        switch(serviceName){
            case `Fitness`:{
                if(timeOfDay >= 8.00 && timeOfDay <= 15.00){
                    return 5.00;
                }
                
                if(timeOfDay > 15.00 && timeOfDay <= 22.00){
                    return 7.50;
                }
            }break;

            case `Sauna`:{

                if(+timeOfDay >= 8.00 && +timeOfDay <= 15.00){
                    return 4.00;
                }

                if(timeOfDay > 15.00 && +timeOfDay <= 22.00){
                    return 6.50;
                }
                
            }break;

            case `Instructor`:{
                if(timeOfDay >= 8.00 && timeOfDay <= 15.00){
                    return 10.00;
                }
                
                if(timeOfDay > 15.00 && timeOfDay <= 22.00){
                    return 12.50;
                }
            }break;
        }
    }

    if(dayOfWeek == `Saturday` || dayOfWeek == `Sunday`){
        switch(serviceName){
            case `Fitness`:{
                if(timeOfDay >= 8.00 && timeOfDay <= 15.00){
                    return 8.00;
                }
                
                if(timeOfDay > 15.00 && timeOfDay <= 22.00){
                    return 8.00;
                }
            }break;

            case `Sauna`:{
                if(timeOfDay >= 8.00 && timeOfDay <= 15.00){
                    return 7.00;
                }
                
                if(timeOfDay > 15.00 && timeOfDay <= 22.00){
                    return 7.00;
                }
            }break;

            case `Instructor`:{
                if(timeOfDay >= 8.00 && timeOfDay <= 15.00){
                    return 15.00;
                }
                
                if(timeOfDay > 15.00 && timeOfDay <= 22.00){
                    return 15.00;
                }
            }break;
        }
    }
}

console.log(GenerateFitnessRate(`Sunday`, `Fitness`, 22.00));