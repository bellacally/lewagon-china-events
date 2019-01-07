function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

const formatTime = date => {
  var date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}



// transform date to the right date format
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }




module.exports = {
  convertToStarsArray: convertToStarsArray,
  formatTime: formatTime,
  renderTime: renderTime
}

// if (res.data.result == 0) {
//   let comms = res.data.lists
//   console.log(comms)
//   for (let c in comms) {
//     let date = util.formatTime(comms[c].ctime)
//     comms[c].ctime = date
//   }
//   that.setData({
//     commentList: comms || [],
//     bookIsBuy: res.data.is_buy
//   });

//   setTimeout(function () {
//     that.setData({
//       commentLoading: false
//     });
//   }, 500);

// }


function renderTime(date) {
  var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
  var Year = da.getFullYear(); //ie火狐下都可以
  var Month = da.getMonth() + 1;
  var Day = da.getDate();
  var Hours = da.getHours();
  var Minutes = da.getMinutes();
  var Seconds = da.getSeconds();
  var CurrentDate = "";
  CurrentDate += Year + "-";
  if (Month >= 10) {
    CurrentDate += Month + "-";
  }
  else {
    CurrentDate += "0" + Month + "-";
  }
  if (Day >= 10) {
    CurrentDate += Day;
  }
  else {
    CurrentDate += "0" + Day;
  }
  if (Hours < 10) {
    Hours = "0" + Hours;
  }
  if (Minutes < 10) {
    Minutes = "0" + Minutes;
  }
  if (Seconds < 10) {
    Seconds = "0" + Seconds;
  }
  return CurrentDate + " " + Hours + ":" + Minutes + ":" + Seconds;
}