import { Component, OnInit } from '@angular/core';
import { SelectGridColumn } from 'shared-components/lib/models/select-grid.model';

@Component({
  selector: 'sample-grid-select',
  templateUrl: './grid-select.component.html',
  styleUrls: ['./grid-select.component.scss']
})
export class GridSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public selectedKeys = 1;
  public selectedKeys2 = [];

  public columns: SelectGridColumn[] = [{
    name: "ime",
    title: 'Ime',
    attributeName: "name",
  },
  {
    name: "Prezime",
    title: 'Prezime',
    attributeName: "lastname",
  },
  {
    name: "Email",
    title: "Email",
    attributeName: "email",
  }];

  public onSelectionChange(event: any): void {
    console.log(event);
  }

  public source: any[] = [{ "id": 1, "name": "Agneta", "lastname": "Van Rembrandt", "email": "avanrembrandt0@instagram.com" },
  { "id": 2, "name": "Sylvester", "lastname": "Favell", "email": "sfavell1@wordpress.org" },
  { "id": 3, "name": "Orel", "lastname": "Sabattier", "email": "osabattier2@bizjournals.com" },
  { "id": 4, "name": "Tull", "lastname": "Sears", "email": "tsears3@fda.gov" },
  { "id": 5, "name": "Adolph", "lastname": "Drewett", "email": "adrewett4@adobe.com" },
  { "id": 6, "name": "Alyson", "lastname": "Macci", "email": "amacci5@virginia.edu" },
  { "id": 7, "name": "Laird", "lastname": "Cuttle", "email": "lcuttle6@walmart.com" },
  { "id": 8, "name": "Roxana", "lastname": "Clash", "email": "rclash7@nymag.com" },
  { "id": 9, "name": "Rudiger", "lastname": "Jeffress", "email": "rjeffress8@baidu.com" },
  { "id": 10, "name": "Denyse", "lastname": "Scobbie", "email": "dscobbie9@wikia.com" },
  { "id": 11, "name": "Adrienne", "lastname": "Borrill", "email": "aborrilla@deliciousdays.com" },
  { "id": 12, "name": "Kendrick", "lastname": "Assaf", "email": "kassafb@seesaa.net" },
  { "id": 13, "name": "Noah", "lastname": "Huntley", "email": "nhuntleyc@stumbleupon.com" },
  { "id": 14, "name": "Lishe", "lastname": "Shovelin", "email": "lshovelind@chicagotribune.com" },
  { "id": 15, "name": "Jeanne", "lastname": "Abyss", "email": "jabysse@ucoz.com" },
  { "id": 16, "name": "Chicky", "lastname": "Vala", "email": "cvalaf@archive.org" },
  { "id": 17, "name": "Harper", "lastname": "Testro", "email": "htestrog@networksolutions.com" },
  { "id": 18, "name": "Becky", "lastname": "Sevin", "email": "bsevinh@hugedomains.com" },
  { "id": 19, "name": "Arte", "lastname": "Launder", "email": "alaunderi@fc2.com" },
  { "id": 20, "name": "Amara", "lastname": "Tarver", "email": "atarverj@facebook.com" },
  { "id": 21, "name": "Donn", "lastname": "Crambie", "email": "dcrambiek@taobao.com" },
  { "id": 22, "name": "Bianca", "lastname": "Collymore", "email": "bcollymorel@amazon.co.uk" },
  { "id": 23, "name": "Ramon", "lastname": "Bottrill", "email": "rbottrillm@weather.com" },
  { "id": 24, "name": "Debera", "lastname": "Crees", "email": "dcreesn@gizmodo.com" },
  { "id": 25, "name": "Chas", "lastname": "Toomey", "email": "ctoomeyo@blogtalkradio.com" },
  { "id": 26, "name": "Marlene", "lastname": "Simonsson", "email": "msimonssonp@google.fr" },
  { "id": 27, "name": "Forrester", "lastname": "Camilli", "email": "fcamilliq@berkeley.edu" },
  { "id": 28, "name": "Patrica", "lastname": "Kyndred", "email": "pkyndredr@mlb.com" },
  { "id": 29, "name": "Kristo", "lastname": "Nickless", "email": "knicklesss@discuz.net" },
  { "id": 30, "name": "Godfree", "lastname": "Yushachkov", "email": "gyushachkovt@dropbox.com" },
  { "id": 31, "name": "Vassily", "lastname": "Licciardello", "email": "vlicciardellou@bbc.co.uk" },
  { "id": 32, "name": "Vicky", "lastname": "Fulleylove", "email": "vfulleylovev@addthis.com" },
  { "id": 33, "name": "Karisa", "lastname": "Birth", "email": "kbirthw@springer.com" },
  { "id": 34, "name": "Decca", "lastname": "Bontoft", "email": "dbontoftx@slashdot.org" },
  { "id": 35, "name": "Freddy", "lastname": "Seater", "email": "fseatery@amazon.co.uk" },
  { "id": 36, "name": "Alaric", "lastname": "Eady", "email": "aeadyz@google.nl" },
  { "id": 37, "name": "Nobie", "lastname": "Scarlin", "email": "nscarlin10@google.co.uk" },
  { "id": 38, "name": "Pearl", "lastname": "Crichton", "email": "pcrichton11@alexa.com" },
  { "id": 39, "name": "Griswold", "lastname": "Bollini", "email": "gbollini12@ustream.tv" },
  { "id": 40, "name": "Bard", "lastname": "Mettetal", "email": "bmettetal13@ihg.com" },
  { "id": 41, "name": "Hildegarde", "lastname": "Lanfranconi", "email": "hlanfranconi14@printfriendly.com" },
  { "id": 42, "name": "Mellie", "lastname": "Balaizot", "email": "mbalaizot15@github.com" },
  { "id": 43, "name": "Jourdain", "lastname": "Titchener", "email": "jtitchener16@nydailynews.com" },
  { "id": 44, "name": "Althea", "lastname": "Guillet", "email": "aguillet17@topsy.com" },
  { "id": 45, "name": "Clare", "lastname": "Howorth", "email": "choworth18@samsung.com" },
  { "id": 46, "name": "Margalo", "lastname": "Benedek", "email": "mbenedek19@acquirethisname.com" },
  { "id": 47, "name": "Kenna", "lastname": "Gay", "email": "kgay1a@yahoo.co.jp" },
  { "id": 48, "name": "Jocelyne", "lastname": "Capstaff", "email": "jcapstaff1b@example.com" },
  { "id": 49, "name": "Rabbi", "lastname": "Daughtrey", "email": "rdaughtrey1c@jalbum.net" },
  { "id": 50, "name": "Caty", "lastname": "O' Flaherty", "email": "coflaherty1d@mysql.com" },
  { "id": 51, "name": "Beret", "lastname": "Kees", "email": "bkees1e@lulu.com" },
  { "id": 52, "name": "Forester", "lastname": "Eve", "email": "feve1f@arstechnica.com" },
  { "id": 53, "name": "Teri", "lastname": "Duffer", "email": "tduffer1g@weibo.com" },
  { "id": 54, "name": "Jania", "lastname": "Oldknow", "email": "joldknow1h@unblog.fr" },
  { "id": 55, "name": "Ruthe", "lastname": "Mill", "email": "rmill1i@webeden.co.uk" },
  { "id": 56, "name": "Lanita", "lastname": "Blagdon", "email": "lblagdon1j@w3.org" },
  { "id": 57, "name": "Marsh", "lastname": "Leverentz", "email": "mleverentz1k@patch.com" },
  { "id": 58, "name": "Geneva", "lastname": "Schooling", "email": "gschooling1l@elpais.com" },
  { "id": 59, "name": "Ty", "lastname": "Bollini", "email": "tbollini1m@studiopress.com" },
  { "id": 60, "name": "Patrica", "lastname": "Reape", "email": "preape1n@va.gov" },
  { "id": 61, "name": "Sauveur", "lastname": "Adran", "email": "sadran1o@canalblog.com" },
  { "id": 62, "name": "Darrelle", "lastname": "Mulvin", "email": "dmulvin1p@trellian.com" },
  { "id": 63, "name": "Atlanta", "lastname": "Dugget", "email": "adugget1q@fc2.com" },
  { "id": 64, "name": "Zahara", "lastname": "Brockherst", "email": "zbrockherst1r@ustream.tv" },
  { "id": 65, "name": "Branden", "lastname": "Iglesiaz", "email": "biglesiaz1s@guardian.co.uk" },
  { "id": 66, "name": "Inglebert", "lastname": "Sherlock", "email": "isherlock1t@drupal.org" },
  { "id": 67, "name": "Philippe", "lastname": "Atwater", "email": "patwater1u@cisco.com" },
  { "id": 68, "name": "Kirbee", "lastname": "Matuszak", "email": "kmatuszak1v@go.com" },
  { "id": 69, "name": "Clary", "lastname": "Eliaz", "email": "celiaz1w@va.gov" },
  { "id": 70, "name": "Dirk", "lastname": "Newcomen", "email": "dnewcomen1x@cyberchimps.com" },
  { "id": 71, "name": "Drucy", "lastname": "Keaveny", "email": "dkeaveny1y@stumbleupon.com" },
  { "id": 72, "name": "Garret", "lastname": "Batstone", "email": "gbatstone1z@vistaprint.com" },
  { "id": 73, "name": "Devora", "lastname": "Naptine", "email": "dnaptine20@symantec.com" },
  { "id": 74, "name": "Kayley", "lastname": "Hailey", "email": "khailey21@berkeley.edu" },
  { "id": 75, "name": "Prentiss", "lastname": "Reavey", "email": "preavey22@eventbrite.com" },
  { "id": 76, "name": "Gal", "lastname": "Edward", "email": "gedward23@cbslocal.com" },
  { "id": 77, "name": "Natalee", "lastname": "Rehme", "email": "nrehme24@tinypic.com" },
  { "id": 78, "name": "Liesa", "lastname": "Rankin", "email": "lrankin25@toplist.cz" },
  { "id": 79, "name": "Babbette", "lastname": "Meldon", "email": "bmeldon26@webnode.com" },
  { "id": 80, "name": "Trudy", "lastname": "Edmett", "email": "tedmett27@canalblog.com" },
  { "id": 81, "name": "Kassie", "lastname": "Bartosch", "email": "kbartosch28@ustream.tv" },
  { "id": 82, "name": "Octavia", "lastname": "Beedom", "email": "obeedom29@ebay.co.uk" },
  { "id": 83, "name": "Georg", "lastname": "Janatka", "email": "gjanatka2a@indiegogo.com" },
  { "id": 84, "name": "Zacharie", "lastname": "Flea", "email": "zflea2b@jiathis.com" },
  { "id": 85, "name": "Lindsey", "lastname": "Friend", "email": "lfriend2c@netscape.com" },
  { "id": 86, "name": "Kathy", "lastname": "Idale", "email": "kidale2d@goo.ne.jp" },
  { "id": 87, "name": "Richmound", "lastname": "Limeburner", "email": "rlimeburner2e@harvard.edu" },
  { "id": 88, "name": "Elroy", "lastname": "Bigby", "email": "ebigby2f@jalbum.net" },
  { "id": 89, "name": "Thomas", "lastname": "Putson", "email": "tputson2g@deliciousdays.com" },
  { "id": 90, "name": "Gasparo", "lastname": "Broszkiewicz", "email": "gbroszkiewicz2h@themeforest.net" },
  { "id": 91, "name": "Trixi", "lastname": "Adenot", "email": "tadenot2i@myspace.com" },
  { "id": 92, "name": "Randa", "lastname": "Martinet", "email": "rmartinet2j@bbc.co.uk" },
  { "id": 93, "name": "Nils", "lastname": "Marriot", "email": "nmarriot2k@wisc.edu" },
  { "id": 94, "name": "Kale", "lastname": "Janoschek", "email": "kjanoschek2l@cloudflare.com" },
  { "id": 95, "name": "Eleen", "lastname": "Jane", "email": "ejane2m@pinterest.com" },
  { "id": 96, "name": "Lori", "lastname": "Powderham", "email": "lpowderham2n@newyorker.com" },
  { "id": 97, "name": "Briggs", "lastname": "Halling", "email": "bhalling2o@about.me" },
  { "id": 98, "name": "Berthe", "lastname": "Besemer", "email": "bbesemer2p@dailymotion.com" },
  { "id": 99, "name": "Erminie", "lastname": "Elcom", "email": "eelcom2q@ehow.com" },
  { "id": 100, "name": "Jeramie", "lastname": "Letessier", "email": "jletessier2r@dedecms.com" }];
}
