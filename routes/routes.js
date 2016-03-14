module.exports = function (app, db, passport) {
    
    // function to check if user is logged in
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}
    
    // direct user to correct app if logged in or anon
    app.route('/')
        .get(function (request, response) {
    		if (request.isAuthenticated()) {
    			response.sendFile(process.cwd() + '/public/app/loggedin.html');
    		} else {
    			response.sendFile(process.cwd() + '/public/app/index.html');
    		}
            
        });
        
    // ANON APIS

        
    // LOGGED IN APIS
    app.route('/api/user')
        .get(isLoggedIn, function(req, res) {
			res.json(req.user);
        });

        
    // authentication routes (FIRST LOG IN)
        
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	app.route('/auth/facebook')
	    .get(passport.authenticate('facebook'));
	    
	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	
	// authorize routes (CONNECT ADDITIONAL ACCOUNT)
	// put the logic in the above authentication routes, in future could have seperate strategy as per passport docs

	
	// LOG OUT
		
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
		
};