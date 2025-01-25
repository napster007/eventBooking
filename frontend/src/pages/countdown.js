 const countdown = () => {
     const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

     const startCountdown = async () => {
         for (let i = 10; i >= 0; i--) {
             console.log(i);
             await delay(1500);
         }
     };

     startCountdown();
 };

 countdown();