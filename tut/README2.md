
## Required Lab 3: App-Shell, pre-processor and SPA
#### and Markdown(md) = html.

Lab details are here:
<http://cekvenich.site44.com/post/app-shell>


So lets imagine that you have to do several pages - and each page has a header and footer, just the middle is different. We will use Pug(Jade) to help pre-process.

In the old times, we used PHP/JSP/ASP to do this server side. The benefit of 'server-less' or 'static' is that it allows for focus on UI. And also entire site can be deployed to CDN - at the edge, close to the user (and avoid DDOS). But main part is focus on UI.

So in addition to Sass pre-processor, we will use Pug for HTML. Also w/ Pug we can do complex things like cominge MD. MD is a nice clean format that non-developers can use to add content.
And use the app-shell concept:
<br>
<img src='./links/shell.png?raw=true' width = '70%' >
<br>

Here is what the app shell looks like in pug.

		extends  ../../_part/_shellA-base
		block head

		block content
			include story1.md

		block footer
			include  ../../_part/_footer

We put all the assets in one folder so page is self sufficient.


- Remember the 2 md files you made in Lab1? Put one in /post/one and other in post/two. Also if you have images. We will now pre-process them via Pug.Also you can combine and inject pug files into each other.
Pug makes HTML, similar to how Sass makes CSS.
- md files represent content, even web apps have content, such as 'About us'. And we need a header and footer, and top menu and side
 menu for each md page. Glance at the 2 files in /_par/ header and footer.
 <br><br>

- The app shell is ... the shell around the page. You can have more than one app shell (for example low end AMP w/o any .js) per md file.
But our shell is PWA, and has a slider/burger menu. Using IDE, in /post edit one/index.pug and two/index.pug. In general, use Pug to make HTML,
 think of it like Sass to CSS. It allows some of the same functionality that sass has, such as imports and more. If you know Sass, Pug should be easy. Also in general you should be using BEM naming of dom elements in CSS and HTML (Sass and Pug)
<br><br>

- in each folder, post/one and post/two after editing each index.pug, from terminal run: 'node _sync'. Edit each _sync.js file as needed. You should now have a web site. Make sure you check on mobile browser.

- You can edit routes by renaming post/one folder to routeSub/routeName. Make sure you edit the app shell to match.

- Most important: make sure you understand index.pug - how it calls app-shell to make html. And that we use Pug to combine Sass w/ md content.
- Also, the navigation, a href action.
- And recreate each html from pug (using _sync). md + sass via pug = html. The user actions are a href.

You'll see the team productivity jump w/ markdown and markup. Also no more indent or close tag issues.

IMPORTANT: YOU ARE DEVELOPING MOBILE FIRST - then port to desktop.
Recommended: FTP your web app to CDN77's FTP store - and then set up the CDN.

Lab time: 1 hour  - to review all the pug files in the project and the user navigation.


## Optional Lab 4 - SEO  netops
<br>
<img src='./links/seo.png?raw=true' width = '60%' >
<br>

This lab is here:
<https://cekvenich.site44.com/post/seo>

- Review _js/main.js. It shows a SPA based on SmoothState
- Edit sitemap and submit to search engine. It takes about an hour using google webmaster tools.
- Make sure you can text search the site.
- Take most of the head code out and place in load.js in _js.
- Insert code in head per page: so that you can do twitter tags

- Optional, make a second app shell for each page. (either i18n or AMP)

Lab time: at least a few days.


## Required Lab 5: API / Middleware.

The lab:

<http://murder.site44.com/home/fetch>

There are many APIs, ex 'programmable web'.
- Call an API from Firebase, after a user action. (look at setup.js)

Optional: Sign in users via API.
People don't want to enter their email.
- In members /sign on: sign in a user using Firebase API - good docs on their site.
You can use jquery.cookie to store the login info.

Optional: Add UI to the API: Display a data grid. When clicked on a row, show a graph, Morris JS.
Use jsForm for data binding.

Recommended: deploy app to CDN

## Recommended Lab 6: App store

- Edit /index.html in route (via web IDE) to redirect to http://siteName.site44.com/posts/one. Full url instead of relative.
- Create an account on build.phonegap.com. Upload only the root /index.html file.
- For android, you'll be able to download the .apk file. Email that file to you mobile email and open it the app in your mobile device.
- This method would work for IOS app store, android app store, windows app store, OSX app store.
- For chrome app store - it is a bit different - you can do that later.

There are other Cordova based tools in the cloud - again, no need to set up local tools like they did in the 80's. You can even
develop on your tablet - if it has a keyboard. You don't need OSX to have an IOS app in the Apple app store.

Lab time: 30 minutes.


## Recommend Lab 7: Fullpage

- Review the members signOn form.
See how it uses M.ui validation - on submit.

- Implement 'fullpage .js' - already in main.js loder.

Optional:
- Create several GSAP animations that you trigger manually on-click as you scroll.
- Replace on-click w/ jquery.inview.js
Note: Any animation has 2 parts: animation and trigger. Each has to be debugged separate, the trigger via console.log

Est time: 3 hours

## Recommend Lab 8: Pro work.

When doing professional work, you should obfuscate .js.
- Upload main.js to jscrambler and download the obfuscated version.

- And port your mobile app to desktop.

- Recommended: part of the interactive design is 'touch gestures'!
<http://github.com/zingchart/zingtouch> is in lib.


## Optional 9: Final

- You can make the /_pre/rec.js into a file watcher module so it auto compiles on save (and your IDE should auto save) http://docs.npmjs.com/getting-started/creating-node-modules


Review that you know what all files in 'murder' best practice DIY architecture.
Looping back to the start, image heavy is important. Each page should be image heavy. There are some links in this project that will help you find images - hopefully related to the content.

Also, you should be able to see that developing a mobile SEO web site is much more cost effective - by doing these best practices.


Optional:
Place an ad banner: <http://murder.site44.com/home/usead>
Sell something, anything: <http://cekvenich.site44.com/home/pay/>




# The end.

Congrats. You should be able to do continuous re-design and maintenance of your webapps at 90% effort savings. You are done. There is more images and CSS to learn: some links are included in here.

<img src='./links/ani.jpg?raw=true' width = '70%' >

Now go back to step 1 and do it again - but faster.
Optional: Record a screen capture (ex: Camtasia) video of you improvising/doing  one of the labs and publish online someplace. Optional - link that from Behance.

With the skills you have, you can make components and apps shell. Also I recommend using GSAP, and you can make any UX.

# Next
You are now a killer. The software project/ architecture Murder is open source, but the training materials you just went over are licensed under CCAA: attribution assurance, you can derive, but
you are required a to attribute the original author. Anyone who derives from you must also attribute you. And so on - a chain of attribution.

<br><br>
(Why Murder?: a flock of smart birds, crows is called what?. One person, may people, one crow, murder. Or Sting: Murder by the #s, or 'Murder on the Dance floor' song
 or to kill your competition via your award winning webapp )
