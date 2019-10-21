// let siteUrl = window.location.protocol+'//'+window.location.hostname+'/archana/';
$(document).ready(function(){
    $.get(siteUrl('ip'),function(data,error){
        console.log(data);
    });
})
$(".form-create-question").on('submit',(e)=>{
		e.preventDefault();
		// console.log(e.target.action);
		insert_form(e.target,$(".form-create-question").serializeArray(),e.target.getAttribute('next-step'));
});



$(".form-insert").on('submit',(e)=>{
		e.preventDefault();
		// console.log(e.target.action);
		insert_form(e.target,$(".form-insert").serializeArray());
	});


$(".form-update").on('submit',function(e){
		e.preventDefault();
// 		console.log($(this).serializeArray())
		// console.log(e.target.action);
		let data = $(".form-update").serializeArray();
		// if(typeof $(".form-update").attr('data-rel') != 'undefined'){
		// 	data += '&id='+$(".form-update").attr('data-rel');
		// }
		update_form(e.target,data);
});
$(".form-update-alt").on('submit',function(e){
		e.preventDefault();
// 		console.log($(this).serializeArray())
		// console.log(e.target.action);
		let data = $(this).serialize();
// 		let data = $(".form-update-alt").serializeArray();
		// if(typeof $(".form-update").attr('data-rel') != 'undefined'){
		// 	data += '&id='+$(".form-update").attr('data-rel');
		// }
		update_form(e.target,data);
});


function insert_form(e,data,next=false){
	$.ajax({
		type:e.method,
		url:e.action+'?form_insert=true&table='+e.getAttribute('data-target'),
		data:data,
		success:(success)=>{
			if(success.trim() == 1){
				// init_alert();
				if(next){
					window.location.href = window.location.href+'/'+next;
				}else{
				window.location.href = window.location.href;
			}
			}else if(success.trim() == 0){
				init_alert();
			}
			console.log(success);
		},
		error:(err)=>{
			console.log(err);
		}
	})
}
function update_form(e,data){
	$.ajax({
		type:e.method,
		url:e.action+'?form_update=true&table='+e.getAttribute('data-target')+'&id='+e.getAttribute('data-rel'),
		data:data,
		success:(success)=>{
			if(success.trim() == 1){
				// init_alert();
				// window.location.reload();
				window.location.href = window.location.href;
			}else if(success.trim() == 0){
				init_alert();
			}
			console.log(success);
		},
		error:(err)=>{
			console.log(err);
		}
	})
}

function init_alert(){
	$.ajax({
		type:'POST',
		url:siteUrl('admin/adp/init_alert'),
		success:(success)=>{
		let data = JSON.parse(success);
			alert_msg(data.type,data.msg);
		console.log(data);
		},
		error:(err)=>{
			alert_msg('danger',err);
		}
	})	
}

function json_to_params(val){
	Object.keys(val).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(val[k])
}).join('&')
}

// Question Controoler
$('.question_type').on('change',()=>{
	if($(this).val() == 'check'){
		// $('.answer-container').html('');
	}else if($(this) == 'radio'){
		$('.answer-container').html('<button class="btn btn-default" data-type="radio">Add Option</button>');
	}else{
		$('.answer-container').html('<button class="btn btn-default" data-type="check">Add Option</button>');
	}
});


// ######## Url Encoded ##########
$('.url_encoded').blur((e)=>{
	e.target.value=e.target.value.split(' ').join('-').toLowerCase();
	check_unique(e);
})
// $('#summernote').summernote("code"); 
// $('#summernote').summernote("code",`<?=isset($respage->des) ? $respage->des : '';?>`); 


//######### Search Appeariance #########
$('.metaTitle').on('keyup',function(){
	$('#metaTitle').text($(this).val());
})
$('.metaDes').on('keyup',function(){
	$('#metaDes').text($(this).val());
})
$('.post_slug').blur(function(){
	$('#metaSlug').text(siteUrl($(this).val()));
})
