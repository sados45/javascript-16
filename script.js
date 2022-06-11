//______________ASYNCHRONOUS__________________

//asenkronize, senkronize olmayan anlamindadir. mesela biz alert özelligi veriyoruz. asagida kodlar yazili, ama alert ekranini kapatmak zorunda kaliyoruz. alertimiz bloklaniyor. bu verlerin gelm esi uzun sürebilir, ve bloklanmasini da istemiyoruz. buna biz asenkronize function diyoruz. 

//AJAX 0 Asynchronous Javascript and XML = 
// verilerin gelmesini beklemeden islemi yapmaasi hak. 

// API= Application Programming Interface: amaci web serverlarin birbirleriyle iletisimini sagliyor.  bir yerden hava durumu, döviz kurlari alma islemini yapiyor. bir lokantada getir götür islerini yapan garsonlar gibi.  Api leri kullandigimiz adres: public apis github 

const countriesContainer=document.querySelector(".countries")
//function getCountries(country){

//     const request = new XMLHttpRequest();//bu sekilde bir AJAX istegi olusturuyoruz. 
// request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   console.log(data)
//   console.log("selfej")

//   request.addEventListener("load", function(){ //bu load oldugunda ben yükleme yapayim demek . mesela bazi durumlarda image in yüklenmesini beklenmeden sayfanin acilmasi islemi ni ajax bunlardan biri. 
//     console.log(this.responseText)
//     const data = JSON.parse(this.responseText) [0] // bu bilginin datayaya gelmesi icin JSON.parse i kullaniyoruz. burada bir güzel parantez icinde bilgi kullanildigi icin sifirinci elemani olmus oluyor. 
//     yada son satiri söyle yazabiliriz. sifincisini almayi düsünmeden;
//     const [data] = JSON.parse(this.responseText);
//     console.log(data)

  
//     const content = `
//     <div class="card country" style="width: 18rem;">
//          <img class="country-image card-img-top" src="${data.flag}">
//          <div class="country-data card-body">
//              <h5 class="country-name card-title">${data.name}</h3>
//              <h5 class="country-region card-title">${data.region}</h5>
//              <p class="country-row card-text">${data.population}</p>
//              <p class="country-row card-text">${data.languages[0].name}</p>
//              <p class="country-row card-text">${data.currencies[0].name}</p>
//          </div>
//      </div>
//      `; //bu hazirladigimiz content i Html icindeki "countries" icine ekleme yapmamiz gerekiyor. yukariya const countriesContainer olarak yaziyoruz. 

//     countriesContainer.insertAdjacentHTML("beforeend", content); //görmedigimiz yöntemlerden biri. ÖNEMLI...
//     countriesContainer.style.opacity = 1
//  });
 // } yukarida bir istek attik. API den gelen cevapla datamizi bir degiskene atadik. 

// getCountries("portugal")

  function renderCountry(data){
    
    const content = `
    <div class="card country" style="width: 18rem;">
         <img class="country-image card-img-top" src="${data.flag}">
         <div class="country-data card-body">
             <h5 class="country-name card-title">${data.name}</h3>
             <h5 class="country-region card-title">${data.region}</h5>
             <p class="country-row card-text">${data.population}</p>
             <p class="country-row card-text">${data.languages[0].name}</p>
             <p class="country-row card-text">${data.currencies[0].name}</p>
         </div>
     </div>
     `; //bu hazirladigimiz content i Html icindeki "countries" icine ekleme yapmamiz gerekiyor. yukariya const countriesContainer olarak yaziyoruz. 

    countriesContainer.insertAdjacentHTML("beforeend", content); //görmedigimiz yöntemlerden biri. ÖNEMLI...
    countriesContainer.style.opacity = 1
  }
      //CALLBACK HELL:
/*
      function getCountriesAndNeighbours (country){
      const request = new XMLHttpRequest();
      request.open("GET", `https://restcountries.com/v2/name/${country}`);
      request.send();
   
  
    request.addEventListener("load", function(){ 
      const [data] = JSON.parse(this.responseText);
      renderCountry(data)
      console.log(data)
      



      const [neighbours] = data.borders// datanin 0sifirincisi demek yerine neighbor köseli parantez icine alabiliriz. burada bunu yaparak ESP yani ispanya yi console a yazdirdik.  
      //console.log(neighbours)
      const request2 = new XMLHttpRequest();
      request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener("load", function () {
        //console.log(this.responseText)
        const data2 = JSON.parse(this.responseText)
        renderCountry(data2)

      });
    
   })
}

getCountriesAndNeighbours ("portugal") //bu ic ice aldigimiz function ve constlara CALLBACK HELL deniyormus.
*/
const req = fetch ( "https://restcountries.com/v2/name/portugal")//fetch ,ajax gibi bir isteme istek araci. 
console.log(req) //console a promise{pending} yazdirdi. istegigimi yapma icn bekleme asamasinda. burada bir söz adik bir veri gelecek demek oluyor. 

//Promise Liecycle events
//pending
//settled -> fulfilled, rejected fulfilled  istegi dogru bir sekilde gönderdin demek. rejected ise baglanti offline oldugunda istedigimiz reddedilmis oldugunda yaziyor. 
//consuming promise bu sözü tüketecegiz. 


//CONSUME____________:


function getCountryData (country){

  fetch( `https://restcountries.com/v2/name/${country}`)
  .then(res=>res.json())//fetch ile istekte bulunduk. then cevap geldigi zaman demek. 
    .then(response => {
      renderCountry(response[0])
      const neighbour =response [0].borders[0]
     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)

    })
      .then(data =>data.json())
      .then(neighbour => renderCountry(neighbour))//buraya istedigimiz kadar then ekleyebiliriz. 
      .catch(err => alert(err.message)) //eger hatali veren error calisan kisimlar varsa bunlari bu sekilde network baglantisi koptugunda bu sekilde bulabiliyoruz. yani rejected halindeyken. catch bunlsri yakaliyor. 

    //const neighbour = response[0].borders[0]
    //console.log(res.json()) //burada fetch ile cagirmamiz nedenilye yukarida ajax ile yapmistik. bu nedenle, console dan isterken (res.json)() seklinde istiyoruz. yani response.json, async function dir. anlamlandiramadigimiz birsey olsa da o bize bir promise dönüyor. 
    //return res.json() // bu bu sekilde kullaniliyor. javascriptin bir özelligi.
  //.then(function(response){//yukarida addEventListener ile load yapiyoruz. burada ise ayni ise yuklendiginde demek icin then kelimesini kullaniyoruz. 
}
  
  // console.log(response)
  //   renderCountry(response[0])
  //bana burada bir sonuc geliyor ve ben bunu kullaniyorum demekmis consume ve promise burada. 

  const btn = document.querySelector(".btn")
  btn.addEventListener("click", () => getCountryData("portugal"))

//getCountryData("portugal") //bu sekilde 4 satir kodla yukaridaki bütün kodlari kisaca yazmis olduk. 