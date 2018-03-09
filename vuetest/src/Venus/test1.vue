<template>
    <div class="main">
        <div class="div2"></div>
        <div class="div">
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            <div class="div1">AAA</div>
            <div class="div1">AAAAAAAAAAAAAAAAAAAAA</div>            
        </div>
        <div class="diva">12312231</div>
        <div class="container">
               12312312312313                        
            <div class="container_mini">
            </div>
        </div>
        <div class='maina'>
           <div class="mid">a s</div>            
           <div class="left"></div>
           <div class="right"></div>
        </div>
    </div>
    
</template>
<script>
Function.prototype.bindCopy = function(_this, args) {
  var __this = this;
  var context = [].slice.call(arguments, 1);
  return function() {
    var arg = [].slice.call(arguments);
    var fin = context.concat(arg);
    return __this.apply(_this, fin);
  };
};

export default {
  methods: {},
  mounted() {
    document.querySelector(".maina").addEventListener(
      "click",
      debouncess(
        2000,
        function() {
          console.log("click");
        },
        true
      )
    );
  }
};
function f(a, b, c) {
  console.log(this, a, b, c);
}

// 6. 请设计一个算法。将两个有序数组合并为一个数组。请不要使用concat以及sort方法。

function concat1(left, right) {
  let al = 0;
  let ar = 0;
  let res = [];
  //[1,3,5,7]
  //[2,4]
  /*
  */
  while (al < left.length && ar < right.length) {
    if (left[al] > right[ar]) {
      res.push(right[ar++]);
    } else {
      res.push(left[al++]);
    }
    //都是从0开始
  }
  res.push(left[al] ? left.slice(al) : right.slice[ar]);
  res = res.join(",").split(",");

  return res;
}

console.log(concat1([11, 22, 33, 44, 55], [23, 43]));
f.bind(window, 2, 3)(4);
f.bindCopy(window, 2, 3)(4);

// document.querySelector(".maina").addEventListener(
//   "click",
//   debouncess(2000, function() {
//     console.log("click");
//   })
// );
function debouncess(delay, fn, imediate) {
  //节流函数和防抖
  //节流函数是 一次事件在一个delay时间段内只触发一次
  //防抖函数是 一次事件在触发了一次之后 再下一次delay之后才可以触发
  var timer = null;

  /*return function() {
    //节流
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };*/

  return function() {
    const args = arguments;
    if (imediate) {
      if (!timer) {
        fn.apply(this, args);
      } else {
        clearTimeout(timer);
      }
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
function a() {
  var b = {};
  console.log(Object.prototype.toString.call(arguments));
  return Array.prototype.slice.call(arguments);
}
var aa = a();
console.log(Object.prototype.toString.call(aa));
function debounce(fn, delay) {
  //防抖
  var timer = null;
  return function() {
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
debounce(function(a, b) {
  console.log(a, b);
}, 2000)();

function debounces(fn, delay, immediate) {
  var timer = null;
  return function() {
    timer && clearTimeout(timer);
    if (imediate) {
      if (!timer) {
        fn.apply(this, arguments);
      } else {
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    }
  };
}

function jieliu(fn, delay) {
  var timer = null;
  return function() {
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

/*

    从一个无序，不相等的数组中，选取N个数，使其和为M实现算法

*/
function createArray() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    // arr.push(parseInt(Math.random() * 100));
    arr.push(i);
  }
  return arr;
}

// Function.prototype.bind = function(_this, context) {
//   return function() {
//     return this.apply(this, arguments);
//   };
// };

// var module = {
//   x: 81,
//   getX: function() {
//     return this.x;
//   }
// };
// module.getX();

// var retrieveX = module.getX;
// retrieveX();
// var boundGetX = retrieveX.bind(module);
// boundGetX(); // 返回 81

function findNum(nums, target) {
  let numsA = [],
    numsB = [],
    numsC = nums.slice();
  //[1,2,3,4,5,6,7,8,9,0]
  for (let j = 0; j < numsC.length - 1; j++) {
    numsB = [nums[j]];
    if (nums.indexOf(target - nums[j]) != "-1") {
      numsB.push(target - nums[j]);
      numsA.push(numsB);
      //去重
    }
  }
  return numsA;
}
var twoSum = function(nums, target) {
  let numsA = [],
    numsB = [],
    numsC = nums.slice(),
    count = 0,
    one,
    two;
  for (let j = 0; j <= nums.length - 1; j++) {
    two = numsC.shift();
    if (one !== nums[j]) {
      console.log(two, "1231", nums.length);
      count++;
      console.log(target - two, nums, nums.indexOf(target - two));
      if (nums.indexOf(target - two) === 0 || nums.indexOf(target - two)) {
        numsB.push(nums.indexOf(target - two));
        numsB.push(nums.indexOf(target - two));
      }
    }
    one = two;
    // numsB = [nums.indexOf(nums[j])];
    // if (nums.indexOf(target - nums[j]) != "-1"&&nums.indexOf(target - nums[j])!==nums.indexOf(nums[j])) {
    //   numsB.push(nums.indexOf(target - nums[j]));
    //   numsA.push(numsB);
    //   //去重
    // }
  }
  return numsB;
};
console.log(twoSum([3, 3, 3, 2, 4], 6));
console.log(createArray());
console.log(findNum(createArray(), 2, 7));
</script>

<style lang="scss">
.div2 {
  position: absolute;
  left: 0;
  top: 0;
  height: 200px;
  width: 200px;
  background: yellow;
  margin: 10px;
  padding: 10px;
  border: 10px solid black;
}
// .middle {
//   width: 100%;
//   height: 200px;
//   background-color: deeppink;
//   float: left;
// }
// .left {
//   width: 200px;
//   height: 200px;
//   background-color: blue;
//   float: left;
// }
// .right {
//   width: 200px;
//   height: 200px;
//   background-color: darkorchid;
//   float: left;
// }
.maina {
  height: 400px;
  width: 100%;
  padding: 0 200px;
  //   overflow: hidden;
  .left {
    float: left;
    height: 400px;
    width: 200px;
    background: red;
    margin-left: -200px;
    position: relative;
    right: -200px;
  }
  .mid {
    float: left;
    width: 100%;
    height: 400px;
    background: yellow;
  }
  .right {
    width: 200px;
    float: left;
    height: 400px;
    margin-left: -100%;
    background: green;
    position: relative;
    left: -200px;
    top: 0;
  }
}

.container {
  width: 40%;
  background: black;
}
.container_mini {
  width: 100%;
  padding-top: 100%;
  position: relative;
  background: black;
  color: red;
}
.abc {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
}
.diva {
  width: 30%;
  padding-bottom: 30%;
  height: 0;
  background: yellow;
}
.div {
  width: 30vw;
  height: 30vw;
  background: green;
}
.span {
  width: 100px;
  height: 100px;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  background: red;
}
// .div {
//   width: 100%;
//   height: 400px;
//   position: relative;
//   background: green;
//   .div1 {
//     background: red;
//     position: relative;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
// }

// .div {
//   display: flex;
//   width: 100%;
//   height: 400px;
//   background: green;
//   justify-content: center;
//   align-items: center;
//   .div1 {
//     background: red;
//   }
// }

// .div {
//   width: 100%;
//   height: 400px;
//   background: green;
//   .div1 {
//     width: 50%;
//     margin: 0 auto;
//   }
// }
</style>
