import React from 'react';
import {Bar} from 'react-chartjs';

import './BookingChart.css'

const BOOKING_BUCKETS = {
    'Cheap':{
        min:0,
        max :100
    },
    'Normal': {
        min:101,
        max :200
    },
    'Expensive': {
        min:201,
        max :100000000
    }
}

const BookingsChart = props => {

    const chartData ={labels:[],datasets:[]};
    let values =[];
    for(const bucket in BOOKING_BUCKETS){
        const filteredBookingsCount = props.bookings.reduce((prev,current) => {
            console.log(current.event.price);
            if(current.event.price > BOOKING_BUCKETS[bucket].min && current.event.price < BOOKING_BUCKETS[bucket].max){
                return prev + 1;
            }else{
                return prev;
            }
           
        },0);
        values.push(filteredBookingsCount)
        chartData.labels.push(bucket);
        chartData.datasets.push({
            fillColor:"rgba(220,220,220,0.5)",
            strokeColor:"rgba(220,220,220,0.8)",
            highLightFill:"rgba(220,220,220,0.75)",
            highLightStroke:"rgba(220,220,220,1)",
            data:values
        });

        values=[...values];
        values[values.length -1]=0;

    }
     
    return <div className="chartDataBox"><Bar data={chartData}/></div> ;
};


export default BookingsChart;