define(function(require,exports,module){
    var $ = require('$'),
    body = 'body';
    formSubmit = function( options ){
        var formTar = '';
        // 写这一步主要是因为有一些特殊情况不走iframe的onload事件
        $('#tsh-ifm,form[target="tsh-ifm"]').remove();
        if( options.param ){
            if( !options.action ){
                throw new Error( 'form action is undefined' );
            }
            options.form = $('<form action="'+options.action+'" method="'+((options.method+'').toLowerCase()=='post'?'post':'get')+'" target="tsh-ifm" style="position:absolute;left:-1000px;top:-1000px;width:1px;height:1px;overflow:hidden"></form>');
            
            if( Array.isArray(options.param) ){
                options.param.forEach(function(item,i){
                    typeof (item.name||item.key)==='undefined'||options.form.append( '<input type="hidden" name="'+(item.name||item.key)+'" value="'+item.value+'">' );
                })
            }else{
                for(var i in options.param){
                    options.form.append( '<input type="hidden" name="'+i+'" value="'+options.param[i]+'">' );
                }
            };
            options.form.appendTo(body);
            
        }else if( options.form ){
            options.form = $(options.form);
            if( !options.form.length ){
                throw new Error('form is undefined');
            }
            formTar = options.form.attr('target');
            options.form.attr('target', 'tsh-ifm');
        }
        var ifm = $('<iframe src="about:blank" '+(options.enctype===true?'enctype="multipart/form-data"':'')+' id="tsh-ifm" name="tsh-ifm"><iframe>');
        ifm.css({position:'absolute',left:'-1000px',top:'-1000px',width:1,height:1,overflow:'hidden'});
        
        ifm.appendTo(body).on('load', function(){
            
            if( typeof options.callback === 'function' ){
                var res = ifm.contents().text().replace(/^\s+|\s+$/mg,'');
                try{res=$.parseJSON(res)}catch(e){}
                options.callback.apply(options.form,[ifm,res]);
            }
            setTimeout(function(){
                ifm.remove();
                ifm = null;
                options.param && (options.form.remove(),options.form=null);
            },30)
            
        })
        
        options.form.trigger('submit');
        options.param||options.form[formTar?'attr':'removeAttr']('target',formTar);
        return options.form;
        
    };
    
    module.exports = formSubmit;
})