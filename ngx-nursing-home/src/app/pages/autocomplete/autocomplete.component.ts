import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sample-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  constructor() { }

  public placeholder: string = "Odaberite";
  public keyAttribute: string = "id";
  public attributesToShow: string[] = ['name', 'lastname'];
  public attributesToFilter: string[] = ['id', 'name', 'lastname', 'email'];
  public selectedItems: any = [
    { "id": 1, "name": "Adelind", "lastname": "Paragreen", "email": "aparagreen0@nbcnews.com" },
    { "id": 5, "name": "Marna", "lastname": "McOrkill", "email": "mmcorkill4@blogspot.com" },
    { "id": 6, "name": "Jamal", "lastname": "Hughes", "email": "jhughes5@yelp.com" },
    { "id": 7, "name": "Lamont", "lastname": "Spargo", "email": "lspargo6@w3.org" },
    { "id": 8, "name": "Arleyne", "lastname": "Van Bruggen", "email": "avanbruggen7@icq.com" },
    { "id": 9, "name": "Bartholomew", "lastname": "Cord", "email": "bcord8@gov.uk" },
    { "id": 10, "name": "Shaylyn", "lastname": "Scamal", "email": "sscamal9@businesswire.com" },
    { "id": 11, "name": "Raffarty", "lastname": "Balke", "email": "rbalkea@baidu.com" },
    { "id": 12, "name": "Beltran", "lastname": "Hardage", "email": "bhardageb@unc.edu" },
    { "id": 13, "name": "Jeramie", "lastname": "Silburn", "email": "jsilburnc@bloomberg.com" },
    { "id": 14, "name": "Winston", "lastname": "Scurfield", "email": "wscurfieldd@imdb.com" },
    { "id": 15, "name": "Piper", "lastname": "Paton", "email": "ppatone@nbcnews.com" }
  ];

  public selectedItemsByKey: any = [];

  public keys1 = [1, 4, 5, 8];
  public keys2 = [1, 2];

  ngOnInit(): void {
  }

  public onSelectionChanged(event: any): void {
    console.log(event);
  }

  public source = [{ "id": 1, "name": "Adelind", "lastname": "Paragreen", "email": "aparagreen0@nbcnews.com" },
  { "id": 2, "name": "Tamqrah", "lastname": "Bangle", "email": "tbangle1@oracle.com" },
  { "id": 3, "name": "Clim", "lastname": "Beining", "email": "cbeining2@dropbox.com" },
  { "id": 4, "name": "Cathy", "lastname": "Haselhurst", "email": "chaselhurst3@xing.com" },
  { "id": 5, "name": "Marna", "lastname": "McOrkill", "email": "mmcorkill4@blogspot.com" },
  { "id": 6, "name": "Jamal", "lastname": "Hughes", "email": "jhughes5@yelp.com" },
  { "id": 7, "name": "Lamont", "lastname": "Spargo", "email": "lspargo6@w3.org" },
  { "id": 8, "name": "Arleyne", "lastname": "Van Bruggen", "email": "avanbruggen7@icq.com" },
  { "id": 9, "name": "Bartholomew", "lastname": "Cord", "email": "bcord8@gov.uk" },
  { "id": 10, "name": "Shaylyn", "lastname": "Scamal", "email": "sscamal9@businesswire.com" },
  { "id": 11, "name": "Raffarty", "lastname": "Balke", "email": "rbalkea@baidu.com" },
  { "id": 12, "name": "Beltran", "lastname": "Hardage", "email": "bhardageb@unc.edu" },
  { "id": 13, "name": "Jeramie", "lastname": "Silburn", "email": "jsilburnc@bloomberg.com" },
  { "id": 14, "name": "Winston", "lastname": "Scurfield", "email": "wscurfieldd@imdb.com" },
  { "id": 15, "name": "Piper", "lastname": "Paton", "email": "ppatone@nbcnews.com" },
  { "id": 16, "name": "Shayne", "lastname": "Brandenburg", "email": "sbrandenburgf@ucsd.edu" },
  { "id": 17, "name": "Joeann", "lastname": "Raise", "email": "jraiseg@stumbleupon.com" },
  { "id": 18, "name": "Gwendolyn", "lastname": "Schelle", "email": "gschelleh@tripadvisor.com" },
  { "id": 19, "name": "Ezri", "lastname": "Musson", "email": "emussoni@fastcompany.com" },
  { "id": 20, "name": "Rosa", "lastname": "Allston", "email": "rallstonj@aol.com" },
  { "id": 21, "name": "Barret", "lastname": "Bettridge", "email": "bbettridgek@ucoz.com" },
  { "id": 22, "name": "Abbey", "lastname": "Pott", "email": "apottl@nih.gov" },
  { "id": 23, "name": "Gabbi", "lastname": "Kares", "email": "gkaresm@so-net.ne.jp" },
  { "id": 24, "name": "Orelle", "lastname": "Pynner", "email": "opynnern@pen.io" },
  { "id": 25, "name": "Jeanie", "lastname": "MacCarrane", "email": "jmaccarraneo@hibu.com" },
  { "id": 26, "name": "Kiri", "lastname": "Foxley", "email": "kfoxleyp@so-net.ne.jp" },
  { "id": 27, "name": "Gray", "lastname": "Stebbings", "email": "gstebbingsq@dailymail.co.uk" },
  { "id": 28, "name": "Jeannie", "lastname": "Scouler", "email": "jscoulerr@shutterfly.com" },
  { "id": 29, "name": "Vincents", "lastname": "Smurthwaite", "email": "vsmurthwaites@homestead.com" },
  { "id": 30, "name": "Alaric", "lastname": "St Pierre", "email": "astpierret@last.fm" },
  { "id": 31, "name": "Bryn", "lastname": "Iacobetto", "email": "biacobettou@google.nl" },
  { "id": 32, "name": "Guthrey", "lastname": "Emmanuele", "email": "gemmanuelev@gnu.org" },
  { "id": 33, "name": "Benedick", "lastname": "Joel", "email": "bjoelw@fema.gov" },
  { "id": 34, "name": "Jamal", "lastname": "Meckiff", "email": "jmeckiffx@google.com" },
  { "id": 35, "name": "Gavra", "lastname": "Rizzardini", "email": "grizzardiniy@ihg.com" },
  { "id": 36, "name": "Roseann", "lastname": "Faers", "email": "rfaersz@economist.com" },
  { "id": 37, "name": "Trixy", "lastname": "Cordingley", "email": "tcordingley10@deviantart.com" },
  { "id": 38, "name": "Marlo", "lastname": "Mattiello", "email": "mmattiello11@newsvine.com" },
  { "id": 39, "name": "Donovan", "lastname": "Crannell", "email": "dcrannell12@usnews.com" },
  { "id": 40, "name": "Valentijn", "lastname": "Ravenscroftt", "email": "vravenscroftt13@yolasite.com" },
  { "id": 41, "name": "Worden", "lastname": "Linton", "email": "wlinton14@taobao.com" },
  { "id": 42, "name": "Heida", "lastname": "Isaq", "email": "hisaq15@weebly.com" },
  { "id": 43, "name": "Eloise", "lastname": "Hairon", "email": "ehairon16@senate.gov" },
  { "id": 44, "name": "Maxy", "lastname": "Ingerfield", "email": "mingerfield17@biglobe.ne.jp" },
  { "id": 45, "name": "Ethelind", "lastname": "Cluderay", "email": "ecluderay18@comcast.net" },
  { "id": 46, "name": "Phillis", "lastname": "Gorring", "email": "pgorring19@ask.com" },
  { "id": 47, "name": "Glennie", "lastname": "Coleyshaw", "email": "gcoleyshaw1a@telegraph.co.uk" },
  { "id": 48, "name": "Corabel", "lastname": "Dumper", "email": "cdumper1b@tamu.edu" },
  { "id": 49, "name": "Dexter", "lastname": "Stapylton", "email": "dstapylton1c@house.gov" },
  { "id": 50, "name": "Heloise", "lastname": "Banbury", "email": "hbanbury1d@washingtonpost.com" },
  { "id": 51, "name": "Farrah", "lastname": "Ikringill", "email": "fikringill1e@google.de" },
  { "id": 52, "name": "Rinaldo", "lastname": "Drescher", "email": "rdrescher1f@prnewswire.com" },
  { "id": 53, "name": "Frederico", "lastname": "Orneblow", "email": "forneblow1g@bandcamp.com" },
  { "id": 54, "name": "Symon", "lastname": "Cleen", "email": "scleen1h@google.cn" },
  { "id": 55, "name": "Barb", "lastname": "Guess", "email": "bguess1i@shinystat.com" },
  { "id": 56, "name": "Casi", "lastname": "Cushion", "email": "ccushion1j@ehow.com" },
  { "id": 57, "name": "Josefina", "lastname": "Shilliday", "email": "jshilliday1k@engadget.com" },
  { "id": 58, "name": "Lanni", "lastname": "Wheelband", "email": "lwheelband1l@acquirethisname.com" },
  { "id": 59, "name": "Lorelei", "lastname": "Rayment", "email": "lrayment1m@fda.gov" },
  { "id": 60, "name": "Luciano", "lastname": "Izakson", "email": "lizakson1n@wunderground.com" },
  { "id": 61, "name": "Tonnie", "lastname": "Paxforde", "email": "tpaxforde1o@blogtalkradio.com" },
  { "id": 62, "name": "Garrik", "lastname": "Leece", "email": "gleece1p@netscape.com" },
  { "id": 63, "name": "Helena", "lastname": "Boardman", "email": "hboardman1q@amazon.co.jp" },
  { "id": 64, "name": "Madel", "lastname": "Staley", "email": "mstaley1r@photobucket.com" },
  { "id": 65, "name": "Ulises", "lastname": "Wickins", "email": "uwickins1s@cbslocal.com" },
  { "id": 66, "name": "Anestassia", "lastname": "Yve", "email": "ayve1t@ow.ly" },
  { "id": 67, "name": "Ezri", "lastname": "Leyfield", "email": "eleyfield1u@netvibes.com" },
  { "id": 68, "name": "Illa", "lastname": "Crumley", "email": "icrumley1v@soundcloud.com" },
  { "id": 69, "name": "Dallon", "lastname": "Brothers", "email": "dbrothers1w@gravatar.com" },
  { "id": 70, "name": "Tris", "lastname": "Possell", "email": "tpossell1x@springer.com" },
  { "id": 71, "name": "Antonin", "lastname": "Kewley", "email": "akewley1y@squarespace.com" },
  { "id": 72, "name": "Tully", "lastname": "Liell", "email": "tliell1z@storify.com" },
  { "id": 73, "name": "Wade", "lastname": "Papworth", "email": "wpapworth20@redcross.org" },
  { "id": 74, "name": "Norrie", "lastname": "Speariett", "email": "nspeariett21@hostgator.com" },
  { "id": 75, "name": "Monah", "lastname": "Oakeshott", "email": "moakeshott22@comsenz.com" },
  { "id": 76, "name": "Gibby", "lastname": "Oddboy", "email": "goddboy23@howstuffworks.com" },
  { "id": 77, "name": "Augustine", "lastname": "Askie", "email": "aaskie24@chicagotribune.com" },
  { "id": 78, "name": "Mireielle", "lastname": "Bowsher", "email": "mbowsher25@umich.edu" },
  { "id": 79, "name": "Elston", "lastname": "Breazeall", "email": "ebreazeall26@marketwatch.com" },
  { "id": 80, "name": "Shannon", "lastname": "Whittock", "email": "swhittock27@g.co" },
  { "id": 81, "name": "Maisie", "lastname": "Emanuelli", "email": "memanuelli28@ehow.com" },
  { "id": 82, "name": "Emilee", "lastname": "Prover", "email": "eprover29@paginegialle.it" },
  { "id": 83, "name": "Kitti", "lastname": "Wards", "email": "kwards2a@wordpress.com" },
  { "id": 84, "name": "Corty", "lastname": "Gobell", "email": "cgobell2b@yellowpages.com" },
  { "id": 85, "name": "Job", "lastname": "Folbigg", "email": "jfolbigg2c@weather.com" },
  { "id": 86, "name": "Cherianne", "lastname": "Leveret", "email": "cleveret2d@list-manage.com" },
  { "id": 87, "name": "Raleigh", "lastname": "Gallahue", "email": "rgallahue2e@goo.ne.jp" },
  { "id": 88, "name": "Arlene", "lastname": "Dunnico", "email": "adunnico2f@marketwatch.com" },
  { "id": 89, "name": "Nikolas", "lastname": "Sterley", "email": "nsterley2g@unc.edu" },
  { "id": 90, "name": "Fay", "lastname": "Sineath", "email": "fsineath2h@uol.com.br" },
  { "id": 91, "name": "Lee", "lastname": "Caroll", "email": "lcaroll2i@blinklist.com" },
  { "id": 92, "name": "Gabie", "lastname": "Snepp", "email": "gsnepp2j@ebay.co.uk" },
  { "id": 93, "name": "Tyrone", "lastname": "Islep", "email": "tislep2k@angelfire.com" },
  { "id": 94, "name": "Orelia", "lastname": "Croxford", "email": "ocroxford2l@ucoz.ru" },
  { "id": 95, "name": "Gustav", "lastname": "Darridon", "email": "gdarridon2m@guardian.co.uk" },
  { "id": 96, "name": "Larissa", "lastname": "Jacmar", "email": "ljacmar2n@intel.com" },
  { "id": 97, "name": "Buck", "lastname": "Briskey", "email": "bbriskey2o@discovery.com" },
  { "id": 98, "name": "Gaynor", "lastname": "Boor", "email": "gboor2p@amazonaws.com" },
  { "id": 99, "name": "Melvin", "lastname": "Doylend", "email": "mdoylend2q@deliciousdays.com" },
  { "id": 100, "name": "Brooke", "lastname": "Bielefeld", "email": "bbielefeld2r@usnews.com" }];
}
