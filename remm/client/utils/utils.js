// 将评分转化为星星数据
function convertToStarsArray(stars) {
  // 根据具体评分数据情况而定
  // var num = stars.toString().substring(0, 1);
  var num = stars;
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

// 检查字符串中是否有keyword
function hasKeyword(keyword, allword) {
  var flag = true;
  if(allword != ""){
    var word_array = allword.split(',');
    for(var i=0; i<word_array.length; i++){
      if(keyword == word_array[i]){
        flag = false;
      }
    }
  }else{
    flag = true;
  }
  return flag;
}

module.exports = {
  starsArray: convertToStarsArray,
  hasKeyword: hasKeyword
}