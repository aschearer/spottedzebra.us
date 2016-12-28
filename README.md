How to Build
===

Prerequisites
---

  1. [Node & NPM](https://nodejs.org/)
  1. [Ruby](https://rubyinstaller.org/)
  1. [Jekyll](https://jekyllrb.com/)
  1. [AWS Command Line Interface](http://aws.amazon.com/cli/)

Make sure all of the above is available via the `PATH` environment variable.

From PowerShell run:

  1. `node install -g gulp` to install gulp.
  1. `gem install jekyll bundler` to install Jekyll and Bundler.

Building and Running
---

  1. Navigate to the project in `cmd` or PowerShell.
  1. Run `npm install`.
  1. Run `gulp` to build the site.
  1. Navigate to `_site/` and launch `index.html` in the browser.

Running in IIS
---
  1. Go to the "Turn Windows features on or off" app from the Start Menu.
  1. Enable "Internet Information Services" (IIS).
  1. Open the IIS Manager. Navigate to the Sites folder in the left-hand tree menu.
  1. Right click on Sites and add a new site.
  1. Set the "Physical Path" to the project's `_site/` folder.
  1. Navigate to the `_site/` folder in Explorer.
  1. Right click on `_site/`, go to Properties, select the Security tab, edit users, and finally click Add.
  1. Enter "IUSR" then click "Check Names" and "OK".
  1. Press "OK" to close all the pop ups.
  1. IIS will now serve the web site.

How to Publish
===
At this point it's assumed you have an AWS account.

How to Publish a New Site
---

TBD

# Create the S3 bucket, CloudFront site, and Route53 configuration using Stout
Open PowerShell in the project directory. Ensure `deploy.yaml` points to the correct target bucket and local source directory. From the command line enter:

`.\tools\stout\stout-windows.exe create --key {AWS KEY} --secret {AWS SECRET}`

Make sure to replace the key and secret with your AWS account's information. This will create a default configuration suitable for deployment and emit a new user's key and secret for future updates. Be sure to copy the key and secret somewhere safe.

# Configure CloudFront
Navigate to AWS CloudFront, select the newly created site, and edit its details. Under "SSL Certificate" select "Custom SSL Certificate" and save your changes. Next navigate to the Behaviors tab and edit the default behavior. Under "Viewer Protocol Policy" select "Redirect HTTP to HTTPS" and save changes.
Finally, navigate to the Error Pages tab and configure error pages as necessary for the web page.

How to Publish an Update to an Existing Site
---

Stout generated a user to upload updates. Use the new user's AWS key and secret.

  1. Set the environment variable `AWS_KEY`.
  1. Set the environment variable `AWS_SECRET`.
  1. Run `gulp deploy` to deploy `_site/` to AWS.