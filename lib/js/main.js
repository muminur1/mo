jQuery(document).ready(function($){
	function resizeEvent() {
		var windowWidth = $(window).width();

		if( windowWidth > 767 ) {
			$('.testimonial .content').css('height', 'auto');
			
			$('.testimonial .content').css({
			    'height': $('.testimonial .picture').height()
			});
		} else {
			$('.testimonial .content').css('height', 'auto');
		}

		var aspectContain = $('.maintain-aspect'),
			aspectWidth = aspectContain.width();

		aspectContain.css('height', aspectWidth);

		$('.textfill').textfill({ maxFontPixels: 28 });
	}
	resizeEvent();

	$('.enlarge').click(function(e){
		e.preventDefault();
		var modal = $('.modal.energy');

		modal.html( '<img src="'+$(this).attr('href')+'">' );
		modal.modal('show');
	});

	$(window).resize(resizeEvent);

	$('.entry-content').fitVids();

	$('form.validate').validate();

	$('.textfill').textfill({ maxFontPixels: 28 });

	$("head").append("<link rel='stylesheet' type='text/css' href='https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css' />");

	$('.selectpicker').selectpicker();

	$('#shareme').sharrre({
		share: {
			twitter: true,
			facebook: true
		},
		enableHover: false,
		enableTracking: true,
		template: '<div class="box"><div class="middle"><div class="twitter"><a class="button" href="#">t</a><a class="count" href="#"><span>123</span></a></div><div class="facebook"><a class="button" href="#" >f</a><a class="count" href="#"><span>234234</span></a></div></div>',
		render: function(api, options){
			$(api.element).on('click', '.twitter', function() {
				api.openPopup('twitter');
			});
			$(api.element).on('click', '.facebook', function() {
				api.openPopup('facebook');
			});
			$('.facebook .count span').html( options.count.facebook );
			$('.twitter .count span').html( options.count.twitter );
		}
	});

	var testimonials = $('.testimonials .picture img');
	var contents = $('.testimonials .content .wrap');
	var current = 0;

	function slide(){
		intv = setInterval(function() {
		var testimonial = $(testimonials[current]);
		var content = $(contents[current]);

		if( typeof testimonials[current+1] != 'undefined') {
				current += 1;
				
		} else {
			current = 0;
		}

		testimonial.fadeOut('slow', function(){
			$(testimonials[current]).fadeIn('slow');
		});

		content.fadeOut('slow', function(){
			$(contents[current]).fadeIn('slow', function() {
				$('.textfill').textfill({ maxFontPixels: 28 });
			});
		});

	}, 8000 );       
	}
	
	if( testimonials.length > 1 ) {
		slide();
	}

	$('.testimonial').hover(function(){
		clearInterval(intv);
	}, function(){
		slide();
	});

	function existThenRemove(ele) {
		if( typeof ele !== 'undefined' ) {
			ele.remove();
		}
	}

	function getModal (header, cta, cta2, width, image, entrypoint, campaignId ) {
		cta = typeof cta !== 'undefined' ? cta : '';
		cta2 = typeof cta2 !== 'undefined' ? cta2 : '';
		campaignId = typeof campaignId !== 'undefined' ? campaignId : 'nFpy';
		width = typeof width !== 'undefined' ? width : 580;
		image = typeof image !== 'undefined' ? image : '';
		entrypoint = typeof entrypoint !== 'undefined' ? entrypoint : '';

		var html = '<div id="subscribe-modal" class="modal fade" tabindex="-1" data-focus-on="input:first" data-backdrop="static" data-keyboard="false" data-width="'+width+'" style="display: none;">' +
			'<div class="modal-header">' +
				'<h3>'+header+'</h3><button type="button" class="close close-modal" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>' +
			'</div>' +
			'<div class="modal-body">';
				// '<h3>'+header+'</h3>';

				if( image !== '' ) {
					html += '<img src="'+image+'" class="aligncenter">';
				}

				if( cta2 !== '' ) {
					html += '<div class="row"><div class="col-sm-12"><p>'+cta+'</p></div></div>';
				}

				if( cta2 !== '' ) {
					html += '<div class="row"><div class="col-sm-12"><p>'+cta2+'</p></div></div>';
				}

				html += '<form class="subscribeMe" action="'+posturl+'" method="POST">' +
					
					'<div class="row">' +
						'<div class="col-sm-6 form-group">' +
							'<input type="text" name="name" placeholder="FIRST NAME" required>' +
						'</div>' +

						'<div class="col-sm-6 form-group">' +
							'<input type="email" name="email" placeholder="EMAIL ADDRESS" required>' +
						'</div>' +
					'</div>';

					if( entrypoint !== '' ) {
						html += '<input type="hidden" name="entrypoint" value="'+entrypoint+'">';
					}

					html += '<input type="hidden" name="campaign" value="'+campaignId+'">' +
						'<button class="nick-button aligncenter"><i class="fa fa-envelope-o"></i>&nbsp;&nbsp;&nbsp; Get Updates</button>' +
				'</form>' +
			'</div>' +
		'</div>';

		return html;
	}

	function successModal() {
		html = "<h3>Request Pending: One More Step Required</h3>"

		html += "<img class='aligncenter' src='"+themeUrl+"/assets/img/nick_stop.png'>";

		html += "<p>Confirm your email <strong>within <span class='countdown'>5:00</span> minutes.</strong></p>\
		<p>Hey! I’m stoked to share the Online Business Bootcamp with you but you’ve got to complete 1 more step.</p>\
		<p>I think you’ll love this course, but I’ve found 80% of people confirm their email within the first 5 minutes…</p>\
		<p>…and the rest never get a chance to see the Online Business Bootcamp.</p>\
		<p>So don’t wait, head on over to your email, find my message, and confirm your email.\
		Then we can get into the good stuff that will help you grow your business.</p>";

		return html;
	}

	function startCountdown(){
		countdown = setInterval(function() {
			var counter = $('.countdown'),
				time = counter.html();
				splitMe = time.split(':'),
				minutes = parseInt(splitMe[0]),
				seconds = parseInt(splitMe[1]),
				newTime = '';

			if ( seconds == 0 && minutes == 0) {
				clearInterval(countdown);
			} else if ( seconds == 0 && minutes > 0 ) {
				newTime = (minutes-1) + ':' + '59';
			} else if( seconds > 10 && minutes > 0 ) {
				newTime = minutes + ':' + (seconds-1);
			} else if( seconds <= 10 && minutes > 0 ) {
				newTime = minutes + ':0' + (seconds-1);
			}

			counter.html(newTime);

		}, 1000 );       
	}

	$('.launch-modal').click(function() {
		var header = $(this).data('header');
		var cta = $(this).data('cta');
		var cta2 = $(this).data('cta-2');
		var campaignId = $(this).data('list');
		var width = $(this).data('width');
		var image = $(this).data('image');
		var entrypoint = $(this).data('entrypoint');

		console.log(cta2);
		
		if( typeof entrypoint != 'undefined' && entrypoint != '' ) {
			$.cookie('entrypoint', entrypoint, { expires: 30, path: '/' });
		}

		existThenRemove( $('#subscribe-modal') );

		html = getModal(header, cta, cta2, width, image, entrypoint, campaignId );
		$('body').append(html);
		var modal = $('#subscribe-modal');
		modal.modal();

		$('.subscribeMe').submit(function(e){
			// e.preventDefault();	// do not submit form if javascript enabled

			var validator = $(this).validate();

			if ( validator.form() === false )	// validate form
				return false;

			formdata = $(this).serialize();

			$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : ajaxurl,
				data : 'action=susbcribe_reader&'+formdata,
				success: function(response) {
					console.log(response);
					if( typeof response.redirect != 'undefined' ) {
						window.location.href = response.redirect;
					}

					modal.find('.modal-body').html( successModal() );

					startCountdown();

					$('.close-modal').click(function(){
						modal.modal('hide');
						$.cookie('popup-cookie', 1, { expires: 30, path: '/' })
					});
					
					e.preventDefault();
				},
				error: function(xhr, status, error) {
					e.preventDefault();
					console.log(error);
					return true;
				}
			});
		});
	});

	var pageViewCount = $.cookie('page-views');
	if( typeof pageViewCount == 'undefined' ) {
		$.cookie('page-views', 1,  { expires: 45, path: '/' })
		pageViewCount = 1;
	} else {
		pageViewCount++;
		$.cookie('page-views', pageViewCount,  { expires: 45, path: '/' })
	}

	if( pageViewCount > 5 ) {
		$('.cta .pulse').removeClass('pulse');
	}

	// JS Popup
	$(window).scroll( function(){
		var footerPosition = $('.comments').offset(); //gets the top of comments
		if ( typeof footerPosition == 'undefined' ) {
			return;
		}

		footerPosition = footerPosition.top;
		var scrollPosition = $(window).scrollTop(); // current scroll position
		
		if( $('body').hasClass('single')  && scrollPosition > (footerPosition - 400) && typeof $.cookie('popup-cookie') == 'undefined' ) {
			$.cookie('popup-cookie', 1, { expires: 45, path: '/' })

			existThenRemove( $('#subscribe-modal') );
			html = getModal('Get More Leads and Sales');
			$('body').append(html);
			var modal = $('#subscribe-modal');
			modal.modal();
		}
  	});

  	$('.gform_wrapper.wide-label_wrapper ul.gfield_radio label, .gform_wrapper.wide-label_wrapper ul.gfield_radio input[type="radio"]').click(function(){
  		var parentLi = $(this).closest('li');
  		parentLi.siblings('.selected').removeClass('selected');
  		parentLi.addClass('selected');
  	});
});


