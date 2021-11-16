"use strict";
const Factory = use("Factory");

class EventSeeder {
  async run() {
    await Factory.model("App/Models/Event").createMany(3, [
      {
        dateTimeEvent: "2021-12-30 22:00:00",
        dateTimeStartRegistration: "2021-11-01 00:00:00",
        dateTimeEndRegistration: "2021-12-25 00:00:00",
        description:
          "Teatro Univates is resuming in-person cultural programming. With its doors closed for events of this type due to the covid-19 pandemic, the concert hall has not received cultural attractions open to the general public since December 2019.<br>"+
          "The reopening of Teatro Univates for cultural programming will be with one of the biggest bands in Latin America in tribute to Queen, which brings to Lajeado the Queen Celebration in Concert event. The event takes place on November 5th, starting at 9:30 pm.",
        title: "Tribute to Queen",
        local: "St. Patrick's Museum",
        image: "https://efemeridesdoefemello.files.wordpress.com/2016/08/9ago16a.jpg",
        slug: "tribute-to-queen",
        template: "black"
      },
      {
        dateTimeEvent: "2021-12-10 21:00:00",
        dateTimeStartRegistration: "2021-11-01 00:00:00",
        dateTimeEndRegistration: "2021-12-10 00:00:00",
        description:
          "Rock and Roll Over performed their first show in Ft. Worth, TX on Aug. 31, 2010. Even before that initial debut, the goal was for the band to take the act National! Within 7 months that goal was reached when we took our maiden sojourn to Chicago, Cleveland and Cincinnati House of Blues.<br>"+ 
          "In 2012 Rock and Roll Over were named in the top 4 tributes by KISS themselves! We flew to Las Vegas and performed for KISS at the Hard Rock Hotel in Las Vegas and were extended the opportunity to come backstage to “Say hello” to the band.",
        title: "Tribute to Kiss",
        local: "Legacy Hall",
        image: "https://townsquare.media/site/295/files/2018/04/kiss.jpg?w=980&q=75",
        template: "blue"
      },
      {
        dateTimeEvent: "2021-12-01 22:00:00",
        dateTimeStartRegistration: "2021-11-01 00:00:00",
        dateTimeEndRegistration: "2021-11-30 00:00:00",
        description:
          "To say that Led Zeppelin are one of the greatest rock bands in all of history is even a little obvious. Over the years, several bands and artists have paid tribute to the quartet, but the one that took place in 2012 has certainly stood out.<br>"+
          "The group was honored at the annual Kennedy Center Honors event, and received a fanatical and hilarious speech by actor and musician Jack Black. <br>"+
          "The night also featured attractions such as Kid Rock singing 'Ramble On', Lenny Kravitz singing 'Whole Lotta Love' - with ex-president Obama accompanying very excited - and Foo Fighters, with Dave Grohl on drums and Taylor Hawkins on vocals, playing 'Rock and Roll'",
        title: "Led Zeppelin in Celebration Day",
        local: "Buenos Aires",
        image: "https://ligadoamusica.com.br/wp-content/uploads/2020/05/ledzeppelin_celebrationday_rosshalfin_20121124.jpg",
        slug: "led-zeppelin-in-celebration-day",
        template: "black"
      },
    ]);
  }
}

module.exports = EventSeeder;
