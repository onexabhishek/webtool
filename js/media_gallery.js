let add = window.location.protocol+'//'+window.location.hostname+'/diet/';
// $(document).ready(function(){
  console.log('divs.length');
  let divs = $('.media-init');
  console.log(divs.length);
  for(let i=0;i<divs.length;i++){
    divs.eq(i).after('<div class="media-thumb-wrapper"></div>');
  }
  // console.log('divs.length');
// });
  var bundle = [];
$('.media-init').click(function(e){
  e.preventDefault();
  // let divs = document.querySelectorAll('.media-init');
    let images = $('.adp-thumb');
    $.each(images,(i,e)=>{
        $(e).attr('src',$(e).attr('data-src'));
    });
  if($(this).attr('type') == 'multiple'){
    $('#adpModal').modal('show').attr('data-rel',$(this).attr('id')).attr('type','multiple').addClass('multiple');
    // if(data){
      if($(this).val() != ''){
      bundle = $(this).val().split(',');
      console.log(bundle);
      let imgs = $('.adp-thumb');
      for(let i=0;i<imgs.length;i++){
        for(let s=0;s<bundle.length;s++){
          if(imgs.eq(i).attr('data-src').substring(imgs.eq(i).attr('src').lastIndexOf('upload')) == bundle[s]){
          imgs.eq(i).addClass('multiple');
        }
        }
        
      }
    // }
  }
  }else{
    $('#adpModal').modal('show').attr('data-rel',$(this).attr('id')).attr('type','').removeClass('multiple');
  }
    
    // $('.main-box,.sub-box').optiscroll();
});

// function adp_agllery_init(data = false){
$('.adp-thumb').click(function(){
  let body = $(this).parents().eq(6);
let href = $(this).attr('src').substring($(this).attr('src').lastIndexOf('upload'));
  if(body.attr('type') == "multiple"){
    $(this).toggleClass('multiple');
    $('.multiple .insert').show();
   
    if(bundle.length == 0){
      bundle = [href];
    }else{
      bundle_push = true;
      for(let i=0;i<bundle.length;i++){
        // console.log(bundle[i].lastIndexOf(href));
      if(bundle[i].lastIndexOf(href) == 0){
        // console.log(bundle[i].lastIndexOf(href));
        bundle.splice(i,1);
        bundle_push = false;
      }
    }
    if(bundle_push){
      bundle.push(href);
    }
    }
    
  }else{
    $('.insert').hide();
    if(typeof $('#'+body.attr('data-rel')).attr('data-target') != 'undefined'){
      let target_arrays = $('.'+$('#'+body.attr('data-rel')).attr('data-target'));
      console.log(target_arrays);
      $.each(target_arrays,(i,v)=>{
        if(target_arrays.eq(i).prop('nodeName') == 'IMG'){
          target_arrays.eq(i).attr('src',siteUrl(href)).parent().show();
        }else if(target_arrays.eq(i).prop('nodeName') == 'INPUT'){
        target_arrays.eq(i).val(href);
        }else{
          target_arrays.eq(i).text(href);
        }
      })
       
    }else{
      $('#'+body.attr('data-rel')).val(href);
      str = `<ul class="adp-media-thumb "><li><img class="img-thumbnail" src='${siteUrl(href)}'></li></ul>`;
    $('#'+body.attr('data-rel')).siblings().eq(1).html(str);
    }
  body.modal('hide');

  // console.log($('#'+body.attr('data-rel')).siblings());
   
  }

$('.insert').unbind('click').click(function(e){
  e.preventDefault();
      body.modal('hide');
      let tar = body.attr('data-rel');
      console.log(window);
      let str_bundle = bundle.join(',');
    $('#'+tar).val(str_bundle);

    // $('#slide_img').on('keyup',()=>{    
    // let field_data = $(this).val();
    let datas = str_bundle.split(',');
    // console.log(datas);
    
    let str='';
    str='<ul class="adp-media-thumb ">';
    for(let i=0;i<datas.length;i++){
      str += `<li><img class="img-thumbnail" src='${siteUrl(datas[i])}'></li>`;
    }
    str += '</ul>';
    // $('#'+tar).after(str);
    $('#'+tar).siblings().html(str);
    // console.log($('#'+tar).siblings().html('dfg'));
    // });

    });

})
// }
$('.thumb-close').click(function(e){
  e.preventDefault();
  $.post(siteUrl('admin/adp/delete'),{action:"del",file:$(this).attr('href')},function(data){
    console.log(data);
    if(data.trim() == 'success'){
            
      $('.adp-alert').addClass('alert-success').fadeIn().html('File Deleted Successfully').delay(500).fadeOut(250).delay(500);
    }
  });
  $(this).parents().eq(0).fadeOut(500);
})
media_gallery_init();
function media_gallery_init(){
  let media_divs = $('.media-init');
  for (let md=0;md<media_divs.length;md++) {
    if(media_divs.eq(md).attr('type') == 'multiple'){
      if(media_divs.eq(md).val() != ''){
        let str='';
        let datas = media_divs.eq(md).val().split(',');
        str='<ul class="adp-media-thumb ">';
        for(let i=0;i<datas.length;i++){
          str += `<li><img class="img-thumbnail" src='${siteUrl(datas[i])}'></li>`;
        }
        str += '</ul>';
        media_divs.eq(md).siblings().html(str);
      }
      }
      
  }
}
$('.doUpload').on('submit',(e)=>{
    e.preventDefault();
    // $.post(siteUrl+'admin/adp/doupload',{data})
})
  $('.mkdir').click(function(){
    $('#adpModal2').modal('show');
  })
