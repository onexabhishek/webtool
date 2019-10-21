let inp = $('.adp-validate');
 $.each(inp,(e,v) =>{
       v.after(document.createElement('span'));
    });
$('.adp-validate-form .adp-submit').on('click',(e)=>{
	e.preventDefault();
let proceed = true;
	let err_msg = `<span class="text-danger err_msg"></span>`;
	
	let regBundle = {notEmpty:/([^\s])/,name:/^[a-zA-Z ]+$/,email:/^\w+([-+.']\w+)*@\w+([-. ]\w+)*\.\w+([-. ]\w+)*$/,password:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/};
	for(let i=0;i<inp.length;i++){

		if(inp.eq(i).val() == ''){
			if($('#validationErr'+i).length != 0){
				$('#validationErr'+i).html(`<span class="text-danger"> * Field is Required </span>`);
			}else{
				gen_err_container(inp,i);
				$('#validationErr'+i).html(`<span class="text-danger"> * Field is Required </span>`);
			}
			proceed = false;
      		e.preventDefault();
		}
		else if(!inp.eq(i).val().match(new RegExp(regBundle[inp.eq(i).attr('data-validate')]))){

			if($('#validationErr'+i).length != 0){
				$('#validationErr'+i).html(`<span class="text-danger">* Please Enter a valid ${typeof inp.eq(i).attr('placeholder') != 'undefined' ? inp.eq(i).attr('placeholder') : 'data'} </span>`);
			}else{
				gen_err_container(inp,i);
				$('#validationErr'+i).html(`<span class="text-danger"> * Please Enter a valid ${typeof inp.eq(i).attr('placeholder') != 'undefined' ? inp.eq(i).attr('placeholder') : 'data'} </span>`);
			}
			proceed = false;
      			e.preventDefault();
		}else{
      		$('#validationErr'+i).empty();
		      // proceed = true;
		}
	}
if(proceed){
	console.log('ok');
   $('.adp-validate-form').submit();
}
});
function gen_err_container(dom,i){
dom.eq(i).after(`<div class="adp_error_container" id="validationErr${i}"></div>`);
}


// Unique Element Initial Value Container
let unique_values = {};
$.each($('.unique'),(index,value)=>{
	unique_values[$('.unique').eq(index).attr('id')] = $('.unique').eq(index).val();

})
// console.log(unique_values);
$('.unique').on('blur',function(e){
	console.log($(this));
	check_unique(e);
});
function check_unique(e){
	console.log(e);
	e.preventDefault();
	let table = e.target.getAttribute('unique-in');
	let feild = e.target.getAttribute('name');
	let value = e.target.value;
	let id = e.target.id;
	if(value != unique_values[id]){
	$.post(siteUrl('admin/adp/validate'),{table:table,feild:feild,value:value},(success)=>{
		console.log(success);
		if(success.trim() == '1'){
			// $('#'+id).hide();
			form_alert(id,'danger',value+' already taken');
			$('.adp-submit').addClass('disabled');
		}else{
			form_alert(id,'','');
			$('.adp-submit').removeClass('disabled');
		}
	})
}

}


function form_alert(id,priority,msg){
	if(!($('#alert'+id).length > 0)){
		$('#'+id).after(`<div class="adp-form-alert" id="alert${id}"></div>`);
	}
	$('#alert'+id).html(`<p class="text-${priority}">${msg}</p>`);
}
