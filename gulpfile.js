var gulp = require("gulp");
var exec = require('child_process').exec;

// Compile the site using jekyll
gulp.task("default", function() {
     exec('jekyll build --config _config.yml', function(err, stdtmp, stderr) {
         if (err)
         {
             console.log(err.message);
         }
         
         console.log(stdtmp);
     });
});