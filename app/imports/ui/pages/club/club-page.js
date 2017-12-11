import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';

const stopwords = require('stopwords').english;
const natural = require('natural');

const mimir = require('mimir');
const brain = require('brain');

const tfidf = mimir.tfidf;
const net = new brain.NeuralNetwork();

const trainingset = [
  //game
  'Ninjas Play Free A thirdperson coop focused action game at its core Warframe situates players as members of the Tenno race newly awoken after years of cryosleep into a Solar System at war Go it alone or assemble a member squad and raid the Solar System to develop your Warframes abilities and destroy enemy forces Download FREE on PC PS and Xbox One and play today',
  'Our games are sprinkled with a whirlwind of smileinducing awesomeness and polished to a shiny sheen that keeps the world coming back again and again And best of all youll find our games on mobile console PC and many other devices you may even be able to play them on the moon',
  'Kongregate has free games that you can play online Choose from thousands of free flash games Complete online game achievements to win badges',
  'Play free online Flash games retro games arcade games puzzles games action games skill games and more fun games',
  'Play over free online games Including arcade games puzzle games funny games sports games shooting games and more New free games every day at AddictingGames',
  'Ninja Kiwi creators of the worlds most awesome original free games including Bloons Bloons Tower Defense and SAS Zombie Assault games and so much more',
  'Play the best collection of Super Mario games online',
  'Free games are added everyday with over free games with categories such as fighting games racing games dressup games and shooting games',
  'Enter our free online sweepstakes and contests for your chance to take home a fortune Will you become our next big winner Register now',
  'Amanita Design small independent game developing studio based in Czech Republic',
  'Featuring the best Free Online Games with new games added every Thursday on Not Doppler',
  'Play over free online games Shockwavecom offers the best puzzle games cooking games dress up games car racing games and more New games every day',
  'Find free online games interesting articles Weve collected and ranked them from all around the web so no need for you to get bored',
  'Playable games created using Flash with interactive components',
    //shopping
  'Online shopping from the earths biggest selection of books magazines music DVDs videos electronics computers software apparel accessories shoes jewelry tools hardware housewares furniture sporting goods beauty personal care broadband dsl gourmet food just about anything else',
  'Shop for brands you love on sale Discounted shoes clothing accessories and more at pmcom Score on the Style Score on the Price',
  'Shop the mens and womens ready to wear collection New monthly Lookbooks music and film Free shipping on orders over and free US returns',
  'Flattering dresses and skirts perfectfitting pants beautiful blouses and more Feminine Modern Thoughtful Elegant Shop Ann Taylor for a timelessly edited wardrobe',
  'Discover womens fashion online with ASOS The latest clothing shoes accessories beauty all with Free Delivery at ASOS',
  'Barnes Nobles online bookstore for books NOOK ebooks magazines Shop music movies toys games too FREE shipping on or more',
  'Get the latest womens fashion online at boohoocom With s of new styles every day from dresses onesies heels coats shop womens clothing now',
  'Forever is the authority on fashion the goto retailer for the latest trends musthave styles the hottest deals Shop dresses tops tees leggings more',
  'Free People Clothing Boutique The Official Site for Free People Apparel Accessories and Shoes Free Shipping Worldwide See site for details',
  'Shop online for all your home improvement needs appliances bathroom decorating ideas kitchen remodeling patio furniture power tools bbq grills carpeting lumber concrete lighting ceiling fans and more at The Home Depot',
  'Shop ladies fashion at Missguided USA With hundreds of new styles hitting our shelves every week theres no better place to shop womens clothes online',
  'Providing computer parts and hardware hard drives cameras and software as well as electronics tools appliances sporting goods jewelry watches gaming and much more With fastshipping Once you know you Newegg',
  'See whats on sale today Shop Piercom for a great selection of furniture seasonal decorations home decor more Any order over ships free',
  'Shop the latest womens fashion at PrettyLittleThing USA from Offering thousands of musthave looks trends Students get off',
  'RayBan is the global leader in premium eyewear market Discover the collections of sunglasses and eyeglasses for women men and kids',
  'SeatGeek is the Webs largest event ticket search engine Discover events you love search all ticket sites see seat locations and get the best deals on tickets',
  'Showpo is a fun forward Australian online fashion clothing store shipping to USA and the world We feature the best in dresses rompers skirts two piece sets and much more',
  'Free shipping or free sameday store pickup plus free and easy returns Save every day with your Target REDcard',
  'ThinkGeek creates unique products that stimulate the imagination Shop for apparel home and office gadgets collectibles and more Free shipping available',
  'Torrid is all about the Fashion Find PlusSize Style and Trendy Clothes youre looking for whether its Jeans Tees Dresses and more ',
  //news
  'Breaking News Latest News and Current News from FOXNewscom Breaking news and video Latest Current News US World Entertainment Health Business Technology Politics Sports',
  'The Weather Channel and weathercom provide a national and local weather forecast for cities as well as weather radar report and hurricane coverage',
  'View the latest news and breaking news today for US world weather entertainment politics and health at CNNcom',
  'Read the latest headlines news stories and opinion from Politics Entertainment Lifestyle blogs and more',
  'Your trusted source for breaking news analysis exclusive interviews headlines and videos at ABCNewscom',
  'The New York Times Find breaking news multimedia reviews opinion on Washington business sports movies travel books jobs education real estate cars more at nytimescom',
  'CBS News dedicated to providing the best in journalism under standards it pioneered at the dawn of radio and television and continue in the digital age',
  'The latest news and headlines from Yahoo News Get breaking news stories and indepth coverage with videos and photos',
  'USA TODAY delivers current local and national news sports entertainment finance technology and more through awardwinning journalism photos videos and VR',
  'Go to NBCNewscom for breaking news videos and the latest top stories in world news business politics health and pop culture',
  'Breaking news and analysis on politics business world national news entertainment more Indepth DC Virginia Maryland news coverage including traffic weather crime education restaurant reviews and more',
  'The LA Times is a leading source of breaking news entertainment sports politics and more for Southern California and the world',
  'Find breaking US news local New York news coverage sports entertainment news celebrity gossip autos videos and photos at nydailynewscom',
  'Chicago Tribune Your source for Chicago breaking news sports business entertainment weather and traffic',
  'Your source for breaking news news about New York sports business entertainment opinion real estate culture fashion and more',
  'SFGATE Local news information updated weather traffic entertainment celebrity news sports scores and more',
  'Comprehensive uptodate news coverage aggregated from sources all over the world by Google News',
  'NPR delivers breaking national and world news Also top stories from business politics health science technology music arts and culture Subscribe to podcasts and RSS feeds',
  'Visit ESPN to get uptotheminute sports news coverage scores highlights and commentary for NFL MLB NBA College Football NCAA Basketball and more',
  'Comprehensive uptodate news coverage aggregated from sources all over the world by Google News',
];

const testSet = [
    // game 4
  'Heavy offers the best PC games with free download games added daily Find hundreds of heartpounding challenging games across a variety of genres including action adventure racing simulation strategy and RPG',
  ' years of Flash Games and HTML games including many exclusives and suitable for all ages',
  'Play all the best stick flash games here From xiao games to matrix games',
  'OneMorelevel is your daily source for free addictive Flash games Action puzzle RPG sports and more Visit One More Level Now',
  // shopping 3
  'Always open always awesome Clothing accessories and apartment items for men and women',
  ' Shop UNIQLOcom for the latest essentials for women men kids babies Clothing with innovation and real value engineered to enhance your life every day all year round UNIQLO US',
  'Discover a wide array of products by the best Italian and international designers on YOOX Fast delivery and secure payments',
    // news 3
  'WSJ online coverage of breaking news and current headlines from the US and around the world Top stories photos videos detailed analysis and indepth reporting',
  'Forbes is a global media company focusing on business investing technology entrepreneurship leadership and lifestyle',
  'Breaking news sport TV radio and a whole lot more The BBC informs educates and entertains wherever you are whatever your age'];

const ANN_Classes = {
      GAME: 0,
      SHOPPING: 1,
      NEWS: 2,
    },
    classes_array = Object.keys(ANN_Classes);
/*
function tfidfRun(textlist) {
  console.log(textlist);
  textlist.forEach(function (t, index) {
    console.log('Most important words in document', index + 1);
    let scores = {};
    t.split(' ').forEach(function (word) {
      scores[word] = tfidf(word, t, textlist);
    });
    scores = Object.keys(scores).map(function (word) {
      return {
        word: word,
        score: scores[word],
      };
    });
    scores.sort(function (a, b) {
      return a.score < b.score ? 1 : -1;
    });
    console.log(scores.splice(0, 3));
    return scores;
  });
}
*/
function vec_result(res, num_classes) {
  let i = 0;
  let vec = [];
  for (i; i < num_classes; i += 1) {
    vec.push(0);
  }
  vec[res] = 1;
  return vec;
}

function stopWords(data){
  //const element = document.getElementById('e');
  //const data = element.innerText;
  let textWithoutStopwords =
      data.split(/\W+/)
          .filter((w)=> { return stopwords.indexOf(w.toLowerCase()) < 0 })
  .join(' ').trim();

  // console.log(textWithoutStopwords);
  return textWithoutStopwords;
}

function stopWordsAndStemp(data){
  //const element = document.getElementById('e');
  //const data = element.innerText;
  let textWithoutStopwords =
      data.split(/\W+/)
          .filter((w)=> { return stopwords.indexOf(w.toLowerCase()) < 0 })
.map( (word)=> {
    return natural.PorterStemmer.stem(word);
}).join(' ').trim();

  // console.log(textWithoutStopwords);
  return textWithoutStopwords;
}

function stopWordsAndStempUniq(data){
  //const element = document.getElementById('e');
  //const data = element.innerText;
  let textWithoutStopwords =
      data.split(/\W+/)
          .filter((w)=> { return stopwords.indexOf(w.toLowerCase()) < 0 })
.map( (word)=> {
    return natural.PorterStemmer.stem(word);
});

  _.uniq(textWithoutStopwords).join(' ').trim();
  // console.log(_.uniq(textWithoutStopwords).join(' ').trim());
  return _.uniq(textWithoutStopwords).join(' ').trim();
}

function maxarg(array) {
  return array.indexOf(Math.max.apply(Math, array));
}

Template.Club_Page.onCreated(function onCreated() {
});

Template.Club_Page.helpers({
});

Template.Club_Page.events({
  'click .huge.green.button': function () {
    console.log('apply');
    FlowRouter.route('/');
  },
  'click .save': function () {
    /*const traindata = [
      [tfidfRun(stopWordsAndStemp(amazon)), ANN_Classes.SHOPPING],
      [tfidfRun(stopWordsAndStemp(fox)), ANN_Classes.NEWS],
      [tfidfRun(stopWordsAndStemp(warframe)), ANN_Classes.GAME],
    ];*/
    const validatedTexts = trainingset.map(function (text) {
      return (stopWordsAndStemp(text));
    });

    const validatedUniqTexts = trainingset.map(function (text) {
      return (stopWordsAndStempUniq(text));
    });

    const dict = mimir.dict(validatedTexts);
    const uniqDict = mimir.dict(validatedUniqTexts);

    const traindata = [
      [mimir.bow(validatedTexts[0], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[1], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[2], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[3], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[4], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[5], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[6], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[7], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[8], dict), ANN_Classes.GAME],
      [mimir.bow(validatedTexts[9], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[10], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[11], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[12], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[13], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[14], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[15], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[16], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[17], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[18], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[19], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[20], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[21], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[22], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[23], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[24], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[25], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[26], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[27], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedTexts[28], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[29], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[30], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[31], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[32], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[33], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[34], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[35], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[36], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[37], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[38], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedTexts[39], dict), ANN_Classes.NEWS],
    ];

    const uniqTraindata = [
      [mimir.bow(validatedUniqTexts[0], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[1], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[2], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[3], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[4], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[5], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[6], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[7], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[8], dict), ANN_Classes.GAME],
      [mimir.bow(validatedUniqTexts[9], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[10], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[11], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[12], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[13], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[14], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[15], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[16], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[17], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[18], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[19], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[20], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[21], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[22], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[23], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[24], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[25], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[26], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[27], dict), ANN_Classes.SHOPPING],
      [mimir.bow(validatedUniqTexts[28], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[29], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[30], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[31], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[32], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[33], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[34], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[35], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[36], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[37], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[38], dict), ANN_Classes.NEWS],
      [mimir.bow(validatedUniqTexts[39], dict), ANN_Classes.NEWS],
    ];

    const ann_train = traindata.map(function (pair) {
      return {
        input: pair[0],
        output: vec_result(pair[1], 3),
      };
    });

    const ann_train_uniq = uniqTraindata.map(function (pair) {
      return {
        input: pair[0],
        output: vec_result(pair[1], 3),
      };
    });
    console.time('net.train(ann_train)');
    console.log(net.train(ann_train),{
      errorThresh: 0.05,  // error threshold to reach
          iterations: 20000,   // maximum training iterations
          log: true,           // console.log() progress periodically
          logPeriod: 10,       // number of iterations between logging
          learningRate: 0.001    // learning rate
    });
    console.timeEnd('net.train(ann_train)');

    let predict = net.run(mimir.bow(stopWordsAndStemp(testSet[0]), dict));
    console.log(predict);
    console.log("Prediction percent of Game, Shopping, and News " , classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[1]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[2]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[3]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[4]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[5]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[6]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[7]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[8]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStemp(testSet[9]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);

    console.time('net.train(ann_train_uniq)');
    console.log(net.train(ann_train_uniq),{
      errorThresh: 0.05,  // error threshold to reach
      iterations: 20000,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 10,       // number of iterations between logging
      learningRate: 0.001    // learning rate
    });
    console.timeEnd('net.train(ann_train_uniq)');

    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[0]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[1]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[2]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[3]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[4]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[5]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[6]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[7]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[8]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
    predict = net.run(mimir.bow(stopWordsAndStempUniq(testSet[9]), dict));
    console.log(predict);
    console.log(classes_array[maxarg(predict)]);
  },
});
