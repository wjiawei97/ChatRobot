$(function () {
    var $main=$('.main');
    var $list=$('.talk_list');
    var $drager=$('.drager');
    var $mainh=$main.outerHeight(false);
    var $listh=$list.outerHeight(false);

    var $rate=$mainh/$listh;
    $dragh = $mainh*$rate;
    var $top = 0;
    $drager.css({'height':$dragh});
    resetui();

    function resetui() {
        $mainh=$main.outerHeight(false);  
        $listh=$list.outerHeight(false);
        //$rate = $mainh/$listh: 主页面占所有列表数据的比例
        //$dragh = $mainh*$rate: 拖动框在main主页面中相应的长度
        var $dragh=$mainh*$mainh/$listh;  
        $drager.css({ 'height': $dragh });
        if ($listh<=$mainh){
            //1.隐藏drag_bar和drager
            $('.drag_bar').hide();
            $drager.hide();
            //2.设置list到顶部距离
            $list.css({'top':0});
        }else{
            //1.显示drag_bar和drager
            $('.drag_bar').show();
            $drager.show();
            //2.设置list到顶部距离
            $list.css({'top':-($listh-$mainh)});
            //2.设置drager到顶部距离
            $drager.css({'top':$mainh-$dragh});
        }
    }
    

    var flag=false; //节流阀原理
    //给页面绑定鼠标滚动事件
    $main.mousewheel(function (ev,delta) {
        if (flag) return;
        flag=true;
        setTimeout(function () {  //每300ms就关上
            flag=false;
        },300);

        if($listh<=$mainh){
            return;
        }else {
            if (delta>0){
                //1.向上滚动,先获取每次走的值
                $top=$top-60;
                if($top<0){
                    $top=0;
                }
                //2.list往上走
                $list.animate({'top':-$top/$rate},200);
                //3.dragger离顶部距离
                $drager.animate({'top':$top},200);
            }else {
                //1.向下滚动,先获取每次走的值
                $top=$top+60;
                if($top>($mainh-$dragh)){
                    $top=parseInt($mainh-$dragh);
                }
                //2.list往上走
                $list.animate({'top':-parseInt($top/$rate)},200);
                //3.dragger离顶部距离
                $drager.animate({'top':$top},200);
            }
        }
    })
    if ($listh <= $mainh) {
        $('.drag_bar').hide();
        $('.drager').hide();
    }
    
    // $(window).resize(function () {
    //     resetui();
    // });

    //给拖拽框绑定拖拽事件
    $drager.draggable({
        containment:"parent",
        drag:function (ev,ui) {
            $top=ui.position.top;
            $list.css({'top':-$top/$rate});
        }
    })
    window.resetui=resetui;
})