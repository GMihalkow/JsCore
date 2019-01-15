function NextDay(year, month, day){
    let str = `${year}-${month}-${day}`;
    
    let date = new Date(str);
    date.setDate(date.getDate() + 1);
    date.setMonth(date.getMonth() + 1);

    let result = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    return result;
}

console.log(NextDay(2016, 10, 1));