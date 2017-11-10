// 自己的用户名称
var userName = '帅阳';
// 朋友圈页面的数据
var data = [{
  user: {
    name: '阳和', 
    avatar: './img/avatar2.png'
  }, 
  content: {
    type: 0, // 多图片消息
    text: '华仔真棒，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    share: {},
    timeString: '3分钟前'
  }, 
  reply: {
    hasLiked: false,
    likes: ['Guo封面', '源小神'],
    comments: [{
      author: 'Guo封面',
      text: '你也喜欢华仔哈！！！'
    },{
      author: '喵仔zsy',
      text: '华仔实至名归哈'
    }]
  }
}, {
  user: {
    name: '伟科大人',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 分享消息
    text: '全面读书日',
    pics: [],
    share: {
      pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
      text: '飘洋过海来看你'
    },
    timeString: '50分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['阳和'],
    comments: []
  }
}, {
  user: {
    name: '深圳周润发',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '很好的色彩',
    pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
    share: {},
    timeString: '一小时前'
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}, {
  user: {
    name: '喵仔zsy',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '以后咖啡豆不敢浪费了',
    pics: [],
    share: {},
    timeString: '2个小时前'
  }, 
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}];

// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');
/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  if (likes.length) {
    htmlText.push(' <a class="reply-who" href="#">' + likes[0] + '</a>');
  }
  for(var i = 1, len = likes.length; i < len; i++) {
    htmlText.push('，<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-comment">'];
  for(var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
  var htmlText = [];
  htmlText.push('<div class="reply-zone">');
  htmlText.push(likesHtmlTpl(replyData.likes));
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}
//分享消息模板
function shareTpl(shareContent){
  var htmlText=[];
  htmlText.push('<div class="item-share">');
  htmlText.push('<img class="share-img" src="' + shareContent.pic + '">');
  htmlText.push('<div class="share-tt">'+ shareContent.text +'</div>');
  htmlText.push('</div>');
  return htmlText.join('');
}
//单图文模板
function onlyPicTpl(onlyImg){
  var htmlText=[];
  htmlText.push('<img class="item-only-img" src="' + onlyImg + '">');
  return htmlText.join('');
}
/**
 * 循环：消息体 
 * @param {Object} messageData 对象
 */ 
function messageTpl(messageData,i) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index='+i+'>');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边内容
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表 
  var contentHtml = '';
  switch(content.type) {
      // 多图片消息
    case 0:
      contentHtml = multiplePicTpl(content.pics);
      break;
    case 1:
      // TODO: 实现分享消息
      contentHtml = shareTpl(content.share);
      break;
    case 2:
      // TODO: 实现单张图片消息
      contentHtml = onlyPicTpl(content.pics);
      break;
    case 3:
      // TODO: 实现无图片消息
      contentHtml = multiplePicTpl(content.pics);
      break;
  }
  htmlText.push(contentHtml);
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  //弹窗模板
  htmlText.push('<div class="reply-pop">');
  htmlText.push('<div class="pop-like">');   
  htmlText.push('<img src="./img/like.png" alt="" class="like-img" height="18px" width="18px">');
  htmlText.push('<span class="like-text">点赞</span>');
  htmlText.push('</div>');
  htmlText.push('<div class="pop-comment">');
  htmlText.push('<img src="./img/comment.png" class="comment-img" height="18px" width="18px">');
  htmlText.push('<span>评论</span>');
  htmlText.push('</div></div></div></div>'); 
  // 消息回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div></div>');
  return htmlText.join('');
}
/**
 * 页面渲染函数：render
 */
function render() {
  var messageHtml ='';
  for(var i=0,dataLen=data.length;i<dataLen;i++){
    messageHtml += messageTpl(data[i],i);
    $momentsList.html(messageHtml); 
  }
  var name = $('.header-user').find('.user-name');
  $(name).html(userName);

}
/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() { 
  /*
   *评论弹窗  
   */
  function popReply(){
    $('.item-reply-btn').on('click', function(e){
      var self = $(this).find('.reply-pop'); 
      var a = $('.reply-pop').hasClass('repop-ani');
      if(a){
        $('.reply-pop').removeClass('repop-ani');
      }   
      else{
        $(self).toggleClass('repop-ani');
      }
      e.stopPropagation();
      
    })
  }
  popReply();

  // 点击外部隐藏回复面板
  $(window).on('click', function(event) {
    var target = event.target;
    var a = $('.reply-pop').hasClass('repop-ani');
    var b = target.className !== 'item-reply-btn';
    if(a && b){
      $('.reply-pop').removeClass('repop-ani');
    }
  });

  function popComment(){
    $(".pop-comment").click(function(){
      var index = $(this).parents('.moments-item').attr('data-index'); 
      var len = data.length;
      for(i = 0; i < len; i++){
        if(i == index){
          $('.moments-item').eq(index).append(insertPop());
        }
      }
      function insertPop(){
        var htmlText = [];
        htmlText.push('<div class="reply-input"><div class="input-main">');
        htmlText.push('<input class="input-text" type="text">');
        htmlText.push('<button class="input-send">发送</button></div></div>');
        return htmlText.join('');
      }    
      $(".reply-input").on('keyup', '.input-text', function(){
        //输入框内容不为空，则发送按钮可点击，否则不可点击          
        var textVal = $(this).val().trim();
        var $btn = $(this).siblings('.input-send');
        if(textVal !== ''){
          $btn.css("background-color","#00cd00");        
          $btn.css("color","white");
          $btn.prop("disabled", false)
        }else{
          $btn.css("background-color","rgba(0,0,0,0.1)");
          $btn.prop("disabled", true);
        }
      });
      //添加新评论
      $('.input-send').on('click',function(){
        var textVal = $('.input-text').val().trim();
        var $btn = $('.input-send');
        textVal !== '' ? $btn.prop("disabled", false) : $btn.prop("disabled", true);
        if($(this).prop("disabled") == false){
          var commentText = this.previousSibling.value;
          var newComment = {
            author:userName,
            text:commentText
          } 
          data[index].reply.comments.push(newComment);
          var htmlText = commentsHtmlTpl(data[index].reply.comments);
          $('.moments-item').eq(index).find('.reply-comment').remove();
          $('.moments-item').eq(index).find('.reply-zone').append(htmlText);
          $('.moments-item').eq(index).find('.reply-input').remove();
        }
      });

    });
  }

  popComment();

  // 点赞  
    $('.pop-like').on('click', function() {
      var index = $(this).parents('.moments-item').attr('data-index');
      if ($(this).children('.like-text').html()=="点赞" ) {
        $(this).children('.like-text').html('取消');
        data[index].reply.likes.push(userName);
      }  
      else{
        $(this).children('.like-text').html("点赞");
        data[index].reply.likes.pop(userName);
      }
      var htmlText = likesHtmlTpl(data[index].reply.likes); 
      $('.reply-like').eq(index).remove();
      $('.reply-zone').eq(index).prepend(htmlText);
    }); 

  //查看大图.
  function showBig(){
    $('.outdiv').hide();
    $smallImg = $('.pic-item,.item-only-img');
    $smallImg.on('click',function(){
      $bigImg = $('.bigimg')
      var src = $(this).attr('src');
      $bigImg.attr('src',src);
      $('.outdiv').fadeIn("fast");
      $('.outdiv').click(function(){
        $(this).fadeOut("fast");
      });   
    });
  }
  showBig();
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
  // 渲染页面
  render();
  bindEvent();
}
init();