$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();


    $('#btnSend').on('click', function () {
        var user_text = $('#ipt').val().trim();
        if (user_text.length <= 0) {
            return $('#ipt').val('');
        }
        // $('.talk_list').append('<li class="left_word"><img src="img/person02.png" alt=""> <span>你好</span></li>')
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" alt=""> <span>' + user_text + '</span></li>');
        resetui();
        $('#ipt').val('');
    })

    //获取Ajax请求数据
    
})