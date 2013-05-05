(function($) { 				
	jQuery.fn.unwrap = jQuery.fn.unwrap || function (el) {
		return this.each( function(){
			$(this.childNodes).appendTo(this.parentNode );
		});
	};
	
	$.fn.makeCols = function(options){
		/*!
		 * jQuery Grid Plugin
		 * Copyright (c) 2013 J. Morris
		 * Version: 1 (01-MAY-2013)
		 * Dual licensed under the MIT license.
		 * Requires: jQuery v1.7.1 or later
		 */
		
		var defaults = { cols: 1 },
			self = this,
			options =  $.extend(defaults, options);
			
		return this.each(function() {
			var o = options,
				tagName = self.get(0).tagName.toLowerCase(),
				colsizes = [],
				el = self.find('li'),
				a = $.makeArray(el),
				size = a.length,
				itemcount = 1,
				mod = size % o.cols,
				colcount=0,
				colsizebase = size / o.cols,
				newstruct = [],
				htmlstruc = '',
				w = parseInt(100/o.cols);
										
			colsizes.push(Math.ceil(colsizebase));
			
			for(i=0; i< o.cols-1; ++i){
				if(mod - 1 != 0){
					colsizes.push(Math.ceil(colsizebase));
					mod -= 1;
				} else {
					colsizes.push(Math.floor(colsizebase));
				}
			}
			
			colsizes.reverse(); //reverse the order because we want the remainders added to the rear
			
			newstruct.push('<'+tagName+' class="col'+ parseInt(o.cols) +'">');
			for( var i=0; i < size; i++ ) {
				newstruct.push('<li>'+$(a[i]).html()+'</li>');
				//cycle thru li's			
				
				if((itemcount == colsizes[colcount]) && (i != (size-1))){ 
					itemcount = 1;
					++colcount;
					newstruct.push('</'+tagName+'>');
					newstruct.push('<'+tagName+' class="col'+ parseInt(o.cols) +'">');
				} else {
					itemcount++;
					//console.log('itemcount: '+itemcount);
				}
			}
			newstruct.push('</'+tagName+'>');
			
			for( i=0; i < newstruct.length; i++ ) {
				htmlstruc = htmlstruc + newstruct[i];
			};

			self.parent().html(htmlstruc);
		});
	};
})(jQuery);

