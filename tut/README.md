(To find out more about what this project is for: <http://github.com/cekvenich/what> )

## Best Practices 'Architecture from scratch'

This is a 'starter architecture' for advanced / creator level.
 Once you move
 beyond fundamentals to the next level - this is the reduced(minimal?) tech you should know.
This start kit is for hands on principal designer | developer, our motto is: you won't master a dance by reading about it.
The labs here should be only done by one person per company, the lead as 'train-the-trainer'.
It should let you make your own architecture based on best practices. It exceed at managing complexity - the point of development
(D.R.) and makes it easier to maintain, debug and on-board.
One use of this is to build award winning interactive web apps that are more maintainable. And allow you to be creative.

We will go over what each file is so you know each part of this and can build on it.

An alternative to this is (not quite best practice)
is http://shop.polymer-project.org related to Google PWA. But here we let you make your own architecture for your team - focused on Customer, UI, interactivity, and large scale
 webapps.

For lab support: user group is here
<http://gitter.im/murder-best/Lobby>


## Required (Home Work) Lab 0: Creative control/ WebMaster
(You should try and do this lab ahead of the class - if you can or if you are not sure you are ready for the class.)
- Install or update prepros.io (should be at least version 6.0.10 - we will use that as our web server.

- Check out http://materialpalette.com

- Bring USB cable for your mobile - so you can connect your mobile to
the laptop

- Make sure you have Dropbox installed - we will be using it.

- Find some award winning sites that you like from Awwwards or GSAP or more. Spend at least 15 minutes and find the site you think are from the future. (You can do this faster by just downloading github project 'what' and watch the vids in /asite, sites such as http://www.makemepulse.com )

- Create md(markdown) files - I use Dillinger.io for md (since it links to Dropbox so I can work with a team). Lorem ipsum txt is OK, write at least a few paragraphs - a story. (Bonus if you write some story, ex: I like dogs). Split the file into 2: part 1 and part 2. Maybe get a few images to support your story. If you have no hobby, then this app is about puppies :-)

- Create account on site44.com. Pick a NAME.
- Download the zip of 'Murder' from Github and unzip.
- Replace the index.html created by site44.com. above in Dropbox w/ contents of the download in 'murder... ' folder, the first folder in download that has 'index.html' - that is the root. It should look like (but NAME instead of 'murder')
<br>
<img src='./directory.png?raw=true' width = '100%' >
<br>
- Open browser to http://NAME.site44.com. You should see what you downloaded from github.

- Create Web IDE account on Codeanywhere ( works on tablets and chromebooks - quick to setup, or http://code.visualstudio.com if you need second option - it lets you autosave). And using it open the site44/NAME folder. Get familiar w/ it - it's handy when machine you are on is
less than perfect, so you can work right away. (Such as taking a lesson and not having to setup up plugins).

Remember that when you work w/ site44, and you edit the file, it must be pinged 2 times for it to be seen in the browser. I do that via view source.

- Now, lets setup your mobile device. In your browser developer tools click 'more tools': inspect a device.
- Connect your mobile phone to the USB cable and make sure the PC browser can see the console log of you mobile phone. You start w/ your browsers dev mode, and set your phone in dev mode. Then the browser can discover your phone. What you see on phone can now be inspected in your desktop.

- Tip: From your phone go to mydevices.io to see your css size. Also, other common screen sizers are there.

This Lab 1 should take about 45 minutes, including looking at award winning sites and generating a sample .md file - that we will use later.

Congrats, you are now a web master.
(In production, you would warp a CDN and security around your origin/website))

## Required Lab 1: Web component & Data Binding
(For Dev. enviroment: Web Server for Chrome may make your local dev faster. Also Auto-Save in IDE - and always open dev tools in browser - to avoid stale.)

Glance docs on <https://www.polymer-project.org/1.0/docs/devguide/quick-tour>

Complete the lab steps:  <http://cekvenich.site44.com/post/comp>

<br>
<img src='./links/BEM.png?raw=true' width = '60%' >
<br>
And you can use Block (of B of BEM DOM naming convention) to decide what should be a component.

Lab time: 45 minutes

## Required Lab 2: Sass Pre-processor gauntlet
Now we have to preprocess Sass into CSS. 
If you new to 'build scripts' start w/ GUI like PrePros.i
(Later we can also write build scripts in .js)

Lets just do a test hello world of a simple Sass file  just to make sure our pre processor works. Also look at

- Got to site44.com/NAME/_pre and view the test.sass file there - using the IDE (CodeAnywhere, VS Code). Also in same folder check out pre.js.

- Next for the entire project, we will use w/ a documented Material Sass Framework called 'MUI'(muicss.com). Download it from github.

- In 'murder' _sass/sass delete the sass folder (not _sass but one under). From MUI copy the sass folder there - where you deleted it.
 We just want to show no magic.

- In (web) IDE, look at main.sass. Note how we edited the Sass defaults via '$' - you can do same)

- Make the main.css.

This likely is the hardest lab, about an hour to get .js/node to build as we need - build using .js.
Later we can make the 'pre.js' to be a file watcher that will auto compile. (You can also make browser auto refresh, and your IDE auto save.)

Estimated lab time: 1 hour

That is end of first half. We can do pre-process Sass and do Components - best practice vs


Ahead of second half watch this video. The way we do 'app-shell' <http://youtube.com/watch?v=wzAWI9h3q18> is in Pug(aka Jade).  For a quick intro to pug go to <http://html2jade.org> .

<img src='./links/SPA.png?raw=true' width = '70%' >


# Halftime for labs
You should know how to pre-process, do mobile dev, Sass, pug and 'app-shell' - including combining and injecting pug. If you needed, you can create more than one app shell per page (ex: SEO, AMP, no-script, older browsers).


Part II:

[Link to part 2](README2.md)
