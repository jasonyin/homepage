## Redux
---
### some background info

I used an MVVM pattern for my previouse front end project which is samilar like most frameworks today with data binding.

There are two major issues with it:

1. relation of your app state become complicated with more and more feature;

    ![Issue with MVC](https://cdn.infoq.com/statics_s1_20170228-0434_4/resource/news/2014/05/facebook-mvc-flux/en/resources/flux-react-mvc.png)

2. app become un-predicable which turns to be hard to maintain and more bugs;

    > Your UI can be updated via model, model can trigger changes to other model which change another UI, etc...

Facebook released a pattern called [Flux](https://facebook.github.io/flux/) to solve this problem to make web app more predicable.

  ![flux](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)

### what's redux

Redux is a implementation of Flux pattern with some differences:

1. single source of truth (one state tree or one store)

    > Only one store in Redux, mutiple stores in Flux;

2. state change via action (pure js function)

    > state change via pure js function in Reudx, you can do anything in Flux;

3. State change dispatched to all components in Redux vs to subscribers in Flux;

### why redux and these principles

Let's take a look at three principles in Redux:

#### single source of truth

Single state tree of app can helps:

1. reduce the duplication of data and keep the data consistant cross mutiple API calls, caches, etc...
2. easy debug;

#### state is read only

This improve the perf of redux since only shadow diff check required;

#### state change via action with pure js functions

This makes app more predicable;