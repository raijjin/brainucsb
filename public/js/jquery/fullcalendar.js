var popovers = {};

$(document).ready(function() {
	$('#calendar').fullCalendar({
		header: {
			left: 'prev, next today',
			center: 'title',
			right: 'month, agendaWeek'
		},
		googleCalendarApiKey: 'AIzaSyA8tBMThIynh_vJVVgydBDoDrkjs0t2TEM',
		events: {
			googleCalendarId: 'invepqcvuhsi0alugtasabi69o@group.calendar.google.com'
		},
		eventAfterRender: function(event, jsEvent, view) {
			// if (popovers[event.id]) { return; }
			console.log(event);
			var popoverHTML = `
				<div id="popover-${event.id}" class="hover-title">
					${event.title}
					
					<div class="hover-date">
						${moment(event.start).format('LLL')}
					</div>
					<div class="hover-location">
						${event.location}
					</div>
				</div>
				<div id="popover-${event.id}" class="hover-over">
					${event.description}
				</div>
			`;
			var popoverContainer = new Drop({
				target: jsEvent[0],
				content: popoverHTML,
				position: 'bottom left',
				openOn: 'hover',
				constrainToWindow: true,
				constrainToScrollContainer: true,
				remove: true,
				classes: 'drop-theme-arrows drop-pop',
				tetherOptions: {
					constraints: [
						{
							to: 'window',
							attachment: 'together',
							pin: true,
						}
					]
				}
			});

			// popovers[event.id] = popoverContainer;
		},
		eventMouseout: function(event, jsEvent, view) {
			// $(`#popover-${event.id}`).remove();
		}
	});

});


