		onStart: {
			duration: 50,
			render: function (url, $container)  {
				_act.dispatch(_PRE, window.location, $container)//*a
				$('#content-wrapper').fadeTo(100,.2)
			}
		},
		onReady: {
			duration: 100,
			render: function ($container, $newContent) {
				$container.html($newContent) // VIEW!!!

				$('#content-wrapper').fadeTo(200,1)

				_act.dispatch(_ACT, window.location, $newContent)//*a

			}//ren
		}//ready()

