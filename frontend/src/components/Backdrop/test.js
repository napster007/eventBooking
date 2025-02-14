const numberOfDaysMonthandYear = async(data) => {
    let days = 0;
    let months = 0;
    let years = 0;


    const findYearCombinations = (arr) => {
        let yearCount = 0;
        const isValidYear = (year) => year >= 1000 && year <= 9999;

        
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                        const year = parseInt(`${arr[i]}${arr[j]}`);
                        
                        if (isValidYear(year)) {
                            console.log(year);
                            yearCount++;
                        }  
            }


        }
        return yearCount;
    };


    for (let value of data) {
        if (value >= 1 && value <= 31) {
            days++;
        }
        if (value >= 1 && value <= 12) {
            months++;
        }
    }

   
    years = findYearCombinations(data);

    return { days, months, years };
}

let numberData = [26,18,13,13,612,-1,17,22,24,22,1,9,3,14,2,10101,8,12,12,14,0];
numberOfDaysMonthandYear(numberData).then(result => console.log(result));




