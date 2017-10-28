// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// 遍历整个数组，移除匹配item的元素，使用强比较===，给第二个参数的话就从头开始找到第一个匹配item元素移除后返回；
// 如有找到元素返回处理后的数组自身，如果没有找到过就返回undefined;
Array.prototype.Remove = function(item, all) {
    var result, isType = Object.prototype.toString,
        i, len, start, hasLast = arguments[2];
    start = 0, len = this.length;
    for (i = start; i < len;) {
        var isPass = true,
            inx;
        if (!hasLast) {
            inx = i;
        } else {
            inx = len - 1;
        }
        if (isType.call(item) == '[object Array]') {
            for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
                if (this[inx] === item[ii]) {
                    isPass = false;
                    break;
                }
            }
        } else if (this[inx] === item) {
            isPass = false;
        }
        if (!isPass) {
            result = true;
            this.splice(inx, 1);
            if (all) {
                break;
            }
        } else if (!hasLast) {
            len = this.length;
            i++;
        } else {
            len--;
        }
    }
    return result ? this : void 0;
}

// 同上面的Rmove,从尾部开始查找，找到后删除第一个匹配的立刻返回；
// 如有找到元素返回处理后的数组自身，如果没有找到过就返回undefined;
Array.prototype.LastRemove = function(item) {
    /* var result = [], isType = Object.prototype.toString.call,isFrist;
     for (var i = this.length - 1; i >= 0; i--) {
     var isPass = true;
     if (Object.prototype.toString.call(item) == '[object Array]') {
     for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
     if (this[i] === item[ii]) {
     isPass = false;
     break;
     }
     }
     } else if (this[i] === item) {
     isPass = false;
     }
     if (!isPass) {
     if(isFrist && !all){
     break ;
     }
     isFrist = true;
     this.splice(i, 1);
     }
     }*/
    return this.Remove(item, true, true);
}

// 效果同上面的，遍历整个数组，区别是于 返回的是个新的数组，是原数组的引用；
Array.prototype.RemoveAt = function(item) {
    var result = [],
        isType = Object.prototype.toString,
        isPass, val;
    for (var inx = 0, len = this.length; inx < len; inx++) {
        isPass = true;
        val = this[inx];
        if (isType.call(item) == '[object Array]') {
            for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
                if (val === item[ii]) {
                    isPass = false;
                    break;
                }
            }
        } else if (val === item) {
            isPass = false;
        }
        if (isPass) {
            result.push(val);
        }
    }
    return result;
}





module.exports = {};