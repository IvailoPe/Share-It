# Share-It
<h3>Share-it</h3>
"Share it" is social media like threads. The idea of "Share it" is to share your opinion with others. People can like your post, comment on your post, like other peoples comments. You can send friend requests to others and accept friend requests. You can chat with your friends wiht live connection. When someone does something on your post you get notification about it. You can change your profile settings. You can see peoples profile and you can see all of their posts there. Overall share it acts as small normal social media.

<h3>Project architecture</h3>
The app is divided into modules. Each module is lazy loaded and each module corresponds to different page. The modules(pages) are general, friends, chat, notifications, profile and shared. The navigation module is not lazy loaded. All of the modules keep components and functionalities which are mandatory for the page of the module. Each module has one component which is an wrapper and other components which are used inside the wrapper. There are 3 services, one for user requests, one for post requests and one for authentications. The api is kept inside the environment-vars.ts file. All of the interfaces are kept inside the interface folder from which almost all components get their interfaces for vars. The shared module holds the post UI and its comment UI which is used in multiple places and because of that it accepts many variables as states and results from functions. The chat page uses websocket (Subject) which fires when the page is open. There is also an authguard file which guards for unauthorized access. Guests of the site can access the / page and they can login or register, Registered users can access everything except login and register. The registered users can do all of the CRUD operaions.

<h2>How to run</h2>
<h3>Angular</h3>
Open the front end folder then open share-it with vs code, in vs codes terminal type ng serve or build.

<h3>Express</h3>
Open the back end folder in vs code and type npm start to run it with nodemoon or node index.js

<h2>Some pictures from the app</h2>

![image](https://github.com/IvailoPe/Share-It/assets/123314052/5faa27f5-0dee-4b4e-b547-7bc0281e4c47)

![image](https://github.com/IvailoPe/Share-It/assets/123314052/4c0ae331-9702-48c5-99a4-6fe5813a4164)

![image](https://github.com/IvailoPe/Share-It/assets/123314052/1c9bbb82-b1a0-432a-9bfb-d9f6176a094e)

![image](https://github.com/IvailoPe/Share-It/assets/123314052/86e6dfc4-6782-45f4-8527-31f8162d0f50)

![image](https://github.com/IvailoPe/Share-It/assets/123314052/6712aa6a-c877-4166-8c07-ef5e266640a9)
