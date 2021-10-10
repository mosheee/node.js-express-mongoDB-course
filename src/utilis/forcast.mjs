import request from "request";


export const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8eb563a7ddecf0b90952d9009fa1bd23&query=' + latitude + ',' + longitude + '&units=m';
    request({ url , json: true }, (error, {body}) => {
        if (error) {
            callback('somthing go wrong', undefined)
        } else if (body.error){
            callback('Unable to find location',undefined)
        } 
        else {
            const temp = body.current.temperature;
            callback(undefined , 'the temp is ' + temp )
        }
    })
}


