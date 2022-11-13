  let data =[];
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function(response){
    data=response.data.data;
    //初始值載入
    init();
    chartData();
   renderC3();
  }).catch( (error) => console.log(error));

  let newChartData = [];
  const cardList=document.querySelector(".cardList");
  const searchCountInfo=document.querySelector(".result-searchInfo p");
  const searchArea=document.querySelector(".searchArea");
  const addTicket=document.querySelector(".btn-addTicket");

  let searchCount=0;
  
//初始值
  function init(){
    let str="";
    data.forEach(function(item,index){
        str+=`<li class="card-item">
        <div class="card-img">
            <img src=${item.imgUrl} alt="">
        
        <div class="card-location">
            <p>${item.area}</p>
        </div>
        <div class="card-star">
            <p>${item.rate}</p>
        </div>
    </div>
        <div class="card-content">
        <div class="card-title">
            <h1>${item.name}</h1>
        </div>
        <p>${item.description}</p>
        <div class="care-program">
            <p>
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="card-num"> ${item.group} </span> 組
              </p>
            <p class="card-price">
              TWD <span class="card-item-price">$${item.price}</span>
            </p>
        </div>
    </div>
    </li>`;
    })
   
    cardList.innerHTML=str;
   searchCountInfo.textContent=`本次搜尋共${data.length}筆資料`;

  }

  //地區搜尋監聽
  searchArea.addEventListener("change",function(e){
    let content="";
    let count=0;

    let aryFilter=data.filter(function(item){
      return e.target.value=="全部地區" ? true : e.target.value==item.area ? true : false ;
    })

    aryFilter.forEach(function(item,index){
  
        content+=`<li class="card-item">
        <div class="card-img">
            <img src=${item.imgUrl} alt="">
        
        <div class="card-location">
            <p>${item.area}</p>
        </div>
        <div class="card-star">
            <p>${item.rate}</p>
        </div>
    </div>
        <div class="card-content">
        <div class="card-title">
            <h1>${item.name}</h1>
        </div>
        <p>${item.description}</p>
        <div class="care-program">
            <p>
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="card-num"> ${item.group} </span> 組
              </p>
            <p class="card-price">
              TWD <span class="card-item-price">$${item.price}</span>
            </p>
        </div>
    </div>
    </li>`;

    count++;
    })
    cardList.innerHTML=content;
    searchCountInfo.textContent=`本次搜尋共${count}筆資料`;
  })

//新增套票
  addTicket.addEventListener("click",function(e){
    const ticketName=document.querySelector(".ticketName");
    const ticketImgUrl=document.querySelector(".ticketImgUrl");
    const ticketArea=document.querySelector(".ticketArea ");
    const ticketAmount=document.querySelector(".ticketAmount");
    const ticketGroup=document.querySelector(".ticketGroup");
    const ticketStar=document.querySelector(".ticketStar");
    const ticketDescription=document.querySelector(".ticketDescription");
    const cardInfo={};
    cardInfo.Id=data.length;
    cardInfo.name=ticketName.value;
    cardInfo.imgUrl=ticketImgUrl.value;
    cardInfo.area=ticketArea.value;
    cardInfo.price=ticketAmount.value;
    cardInfo.group=ticketGroup.value;
    cardInfo.rate=ticketStar.value;
    cardInfo.description=ticketDescription.value;
    data.push(cardInfo); 
    init();
    chartData();
    renderC3();
    document.getElementById("ticketForm").reset();
 
  })

  //取得chart資料
  function chartData(){
  let totalObj = {};
  data.forEach(function(item,index){
    if(totalObj[item.area]){
      totalObj[item.area] += 1;
    }else{
      totalObj[item.area] =1;
   }
  })
  
    newChartData = [];
   let area = Object.keys(totalObj);
  area.forEach(function(item,index){
    let ary = [];
    ary.push(item);
    ary.push(totalObj[item]);
    newChartData.push(ary);
    
   })
  }


  function renderC3()
  {
    // 將 newChartData 丟入 c3 產生器
   const chart = c3.generate({
     bindto: "#chart",
     data: {
        columns: newChartData,
        type : 'donut',
     },
     donut: {
     title: "套票地區比重"
     }
   });

}