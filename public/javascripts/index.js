(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');              // done <ul>

    var listdata;


    var lock = false;

    $(addButton).click(function(){

      if(lock == false){
        lock = true;
        $(tmpl).prependTo(mainUl).addClass("is-editing").find('input').focus();
        mainUl.on('keyup', 'input', function(e){
          if(e.which === 13){
            var input = $(this),li = input.parents('li');
            if(input.val() != null)
            {
              console.log('cool!!')
              li.find('span').text(input.val());
              li.removeClass('is-editing');
              save();
              lock = false;
            }
            
          }
        })
      }
    })

    load();

    function save(){
    	
    	var arr = [];
    	mainUl.find("span").each(function(){
    		arr.push({"done":($(this).parent('li').hasClass("is-done"))?true:false,"text":$(this).text()});
    	})

    	localStorage.todoItems = JSON.stringify(arr); 

    }

    function load()
    {	
      var arr = JSON.parse( localStorage.todoItems ), i;

    	for(i=0; i<arr.length; i +=1){
        if(arr[i].done == true){
        $(tmpl).appendTo(mainUl).find('span').text(arr[i].text).parent('li').addClass('is-done')
        }
        else{
        $(tmpl).appendTo(mainUl).find('span').text(arr[i].text)
        }
        
  		}
  	}

  	$('.main, .done, .delete').sortable({
  		connectWith: '.connected', 
  		tolerance: "pointer",
  		start: function(){
  			$(placeholder).addClass("is-dragging");
  		},
  		stop: function(){
  			$(placeholder).removeClass("is-dragging");
  			save();
  		},

  	});

  	$(".delete").on( "sortreceive", function(e, ui){
  		ui.item.remove();
  	});
  	$(".done").on( "sortreceive", function(e, ui){
  		$(ui.item).prependTo(mainUl).addClass("is-done");
  	});
}());