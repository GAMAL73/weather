
let input=document.getElementById('input')
let button=document.getElementById('button')
let maxTempNextDay=document.querySelectorAll('.maxTemp')
let mainTempNextDay=document.querySelectorAll('.mainTemp')
let textNextDay=document.querySelectorAll('.textNextDay')
let nextDayIcon = document.getElementsByClassName("next-day-icon")
let nextDayName = document.getElementsByClassName("nextDayName")
let nextDayNum = document.getElementsByClassName("nextDayNum")
let date =new Date()
console.log(date.getDate());
console.log(date.toLocaleDateString("en-Us",{weekday:'long'}));
console.log(date.toLocaleDateString("en-Us",{month:'long'}));
async function getData(city){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=75b09ba771c44e50ab9230630240107&q=${city}&days=3`);
    const data = await response.json();
    console.log(data);
    if (!data.error) {//من شات ومش فاهم لي
      displayFirstDay(data);
      displayNextDay(data);
    }
    // if (data.error=true) {//مش دي المفروض صح ان هو لو في ايرور ميخشش
    //   displayFirstDay(data);
    //   displayNextDay(data);
    // }
    return data;
}

input.addEventListener('input',function(){
    getData(input.value)
})
button.addEventListener('click',function(){
    getData(input.value)
})
function displayFirstDay(data){
    cartona=``
      // data.length لي مش شغاله 
      //(i)  و لي مش عارف اعمل لوب ب
        cartona+=`
          <div class="col-md-12 text-center">
            <div class="content py-2" >
                <div class="tittel-day d-flex justify-content-between align-items-center fs-5 fw-bold border-bottom p-2">
                  <span>${date.toLocaleDateString("en-Us",{weekday:'long'})} <i class="fa-regular fa-sun"></i></span>
                  <span>${date.getDate()} ${date.toLocaleDateString("en-Us",{month:'long'})} <i class="fa-solid fa-calendar-day"></i></span>
                </div>
                <div class="information my-5">
                  <div class=" rounded-2 d-flex w-100 m-auto fs-4 fw-bold justify-content-center align-items-center my-3">
                    <p class="m-0 p-0 text-info">${data.location.name}, ${data.location.country}</p>
                    <i class="fa-solid fa-city mx-2"></i>
                  </div>
                  <span class="fs-big">${data.current.temp_c}°C<i class="fa-solid fa-sun"></i></span>
                  <span class="d-block fs-5 text-info fw-medium">${data.current.condition.text}</span>
                </div>
                <div class="fs-5 my-5 w-100">
                  <span class="mx-3"><i class="fa-solid fa-wind"></i>${data.current.wind_kph}km/h</span>
                  <span class="mx-3"><i class="fa-solid fa-cloud-sun-rain"></i>${data.current.humidity}%</span>
                  <span class="mx-3"><i class="fa-solid fa-meteor"></i>${data.current.wind_dir}</span>
                </div>
              </div>
          </div>
                `
    document.getElementById('demo').innerHTML=cartona;
}
function displayNextDay(data){

  let forCastDay=data.forecast.forecastday
  for(i=0;i<2;i++){
    mainTempNextDay[i].innerHTML=forCastDay[i+1].day.maxtemp_c
    maxTempNextDay[i].innerHTML=forCastDay[i+1].day.mintemp_c
    textNextDay[i].innerHTML=forCastDay[i+1].day.condition.text
    let nextDate=new Date(forCastDay[i+1].date)
    nextDayName[i].innerHTML=nextDate.toLocaleDateString("en-Us",{weekday:'long'})
    nextDayNum[i].innerHTML=nextDate.getDate()
  }
}
getData(city="lon")