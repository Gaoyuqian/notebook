export default{
     taozi:function(last,day){
         day--;
         if(day==--1){
             console.log(last);
              return;
            }
             return taozi((last+1)*2,day)
        }
}
