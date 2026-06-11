/* ════════════════════════════════════════════════════════
   ZINNIA ALL DAY — app.js v4
   • Real Zinnia TV video data + CDN thumbnails
   • Distinct per-playlist colors (12-color palette)
   • Scheduled items visually greyed-out in Available panel
   • Queue + Calendar are ONE data source (playQueue)
   • No Vimeo API config
════════════════════════════════════════════════════════ */

// ─────────────────────────────────── CONSTANTS

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const GENRES = [
  'Animals','Caregiver Support','Daily Living',
  'Fun & Games','Holidays','Interests','Languages',
  'Messages','Nature','Nostalgia','Sing-Alongs','Travel',
];

// 12 visually distinct colors — each new playlist gets the next one
const PL_COLORS = [
  '#3a7dc9', // blue
  '#2ea07b', // teal
  '#d46b2f', // amber
  '#8b4fba', // purple
  '#c94040', // red
  '#4a9e5c', // green
  '#b05090', // pink
  '#4e7ab5', // steel blue
  '#c8882a', // gold
  '#5a6ea8', // indigo
  '#3a9e9e', // cyan
  '#a05a30', // brown
];

const GENRE_BG = {
  'Animals':          '#cff0d8',
  'Caregiver Support':'#fce0c8',
  'Daily Living':     '#cfe0f5',
  'Fun & Games':      '#ffd6e0',
  'Holidays':         '#d6f0fa',
  'Interests':        '#e8f5d0',
  'Languages':        '#f0e8d8',
  'Messages':         '#e8d6f5',
  'Nature':           '#c8f0e0',
  'Nostalgia':        '#f5e8d0',
  'Sing-Alongs':      '#fce0f0',
  'Travel':           '#d0e8f8',
};

// ─────────────────────────────────── REAL ZINNIA VIDEO DATA
// Thumbnails from Zinnia's public CDN (vhx.imgix.net)

// ─────────────────────────────────── REAL ZINNIA VIDEO DATA
// 12 categories matching spreadsheet; durations fixed (MM:SS)

const ZINNIA_VIDEOS = [
  {id:'v001', title:'Garden', duration:'5:52', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v002', title:'Golf', duration:'5:46', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v003', title:'How to Use Fun & Games', duration:'2:50', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v004', title:'Alaska', duration:'9:58', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/d39a2fba-8e31-4b96-877e-a40418208d11?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v005', title:'Amsterdam', duration:'9:56', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/b52c9427-162d-4a0a-b1f4-64d6541de21c?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v006', title:'Antique Toys', duration:'9:59', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v007', title:'Antiques', duration:'9:50', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v008', title:'Aurora Borealis', duration:'6:34', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/78320e14-aa24-4add-af42-bdd62f57bb57?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v009', title:'Austria', duration:'9:58', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/76e20c4f-60fd-45c9-aa25-38ade81514b8.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v010', title:'Babies', duration:'9:44', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v011', title:'Baking', duration:'8:06', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/109933a3-0804-4699-8611-ff56aebd626f.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v012', title:'Baseball', duration:'9:58', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/e1689fdb-9760-4e1d-a190-eaffcdbf4609?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v013', title:'Basketball', duration:'9:37', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/e1689fdb-9760-4e1d-a190-eaffcdbf4609?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v014', title:'Birds', duration:'9:33', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/66fd8faa-f7c9-48a4-983b-12b444bde8bf.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v015', title:'Bunnies', duration:'9:34', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/c6105d0f-32cc-4634-8d1b-02e427bacfcd.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v016', title:'Butterflies', duration:'9:28', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/4d277361-5de5-4b6e-9ee1-a09856d133a2.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v017', title:'Cats', duration:'9:00', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/07c17c08-dbde-414f-91bf-524338348f98.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v018', title:'Churches', duration:'10:01', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/960f3045-e5a1-4d27-af96-f1e03bcb77f0.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v019', title:'Classic Cars', duration:'9:59', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v020', title:'Coffee', duration:'9:58', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/209f5a2f-f728-4a06-a3ea-b2466dc78dc9.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v021', title:'Dogs', duration:'7:54', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/49bb7752-9fd0-4e0e-9762-e0e83a0d6b09?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v022', title:'Dolphins', duration:'9:29', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/faa9af9c-fa10-4780-9ac8-7c54e94350c6?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v023', title:'Elephants', duration:'8:06', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/7450b166-eaa3-45f9-9bb4-6829fc935ad3?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v024', title:'Equestrian', duration:'9:37', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/faf30e9a-20b3-440c-88c3-84a47684faac?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v025', title:'Fall Leaves', duration:'7:52', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/5ffda705-2a1a-4905-bc71-e431806c3ade?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v026', title:'Famous Faces (Trivia)', duration:'8:07', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/4d35e4a9-7ed7-4ae3-965c-362ffdf5fc25.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v027', title:'Famous Places', duration:'5:46', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/6753773c-f20d-4cee-a4d2-9b9307fa3e8a.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v028', title:'Famous Places (Trivia)', duration:'9:55', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/6753773c-f20d-4cee-a4d2-9b9307fa3e8a.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v029', title:'Farm', duration:'10:12', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v030', title:'Florence', duration:'9:46', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/19e6d5be-3878-4ad6-a4a8-67459a3d70e2.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v031', title:'Florida', duration:'10:01', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/65a60621-b8e5-4d56-be29-b6354f35c016.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v032', title:'Flowers', duration:'9:43', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/62de1a59-7eb1-44c8-991b-891c016d1360.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v033', title:'Fresh Air', duration:'9:03', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v034', title:'Going for Gold', duration:'9:58', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v035', title:'Golf Swing', duration:'5:33', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v036', title:'Greece', duration:'10:01', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/258d0530-3ac2-491a-81b0-dd4b6726332e.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v037', title:'Grilling', duration:'8:02', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v038', title:'Growing Veggies', duration:'9:56', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v039', title:'Hawaii', duration:'10:00', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/25c9d22a-d9d0-4c7d-8226-3876b26bfeeb.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v040', title:'Hockey', duration:'7:33', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v041', title:'Holiday Flavors', duration:'6:03', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/1317303d-7e06-4a06-8cfa-bc368c3afca1?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v042', title:'Holiday Tree', duration:'7:36', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/acc4e7b5-ecaa-4b53-a177-42e1cce69a3e?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v043', title:'Ice Cream', duration:'9:59', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v044', title:'Just Fun', duration:'10 mins', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/561ebf77-a4fd-4887-851b-dbf90a4ee40c?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v045', title:'Let\'s Dance', duration:'7:35', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v046', title:'Let\'s Talk About a Sunday Drive', duration:'9:56', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v047', title:'Let\'s Talk About Fine Art', duration:'9:57', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v048', title:'Let\'s Talk About Picnics', duration:'9:48', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v049', title:'Let\'s Talk About Thanksgiving', duration:'9:57', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/77f7d0ac-8b13-418d-aaae-a0e7ba3a4564?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v050', title:'Let\'s Talk About the Farm', duration:'9:54', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v051', title:'Light Aircraft', duration:'7:51', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v052', title:'London', duration:'9:56', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/507791ea-512a-4b24-916a-5135c0d00879?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v053', title:'Making Art', duration:'1:32', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v054', title:'Malaysia', duration:'10:02', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/df876192-e299-4f10-9e66-9e81a94df0d0.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v055', title:'Mexico', duration:'10:00', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/8143ba38-529c-4f5a-9ce4-6dc7e2cef084.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v056', title:'More Fun', duration:'9:55', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/0965c4ee-1289-4e22-98c5-e4b6a5db9949.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v057', title:'Mountains', duration:'9:58', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/5bade8c6-6e42-4903-b9fa-1eb33d4497d5.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v058', title:'National Parks', duration:'9:54', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3dc30ba0-564b-4efa-a17f-9f58c46208af?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v059', title:'Needlecraft', duration:'9:53', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v060', title:'Nesting Hummingbirds - short (Featured contributor)', duration:'12:05', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v061', title:'Nesting Hummingbirds - long (Featured contributor)', duration:'1:37:00', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v062', title:'New York', duration:'9:58', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/0dfa7af6-6402-4cfe-a622-ab2aad14c1f6.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v063', title:'Night Sky', duration:'4:41', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/d8c5efac-2bc8-4cd0-aa4e-903b2325a144?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v064', title:'Painting', duration:'9:48', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v065', title:'Paris', duration:'3:27', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/170d0b4e-8342-42af-940f-062785a9893f?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v066', title:'Picnic', duration:'8:34', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v067', title:'Prairie Life', duration:'9:59', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v068', title:'Running Free', duration:'9:44', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/a5bf3e51-2512-4c47-8118-527034aacf90?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v069', title:'San Francisco', duration:'9:44', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/333cfb47-c592-4b19-8a91-9f9b818ed2c7.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v070', title:'Seattle', duration:'6:52', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/a330c5ac-b477-406c-be2e-999e0ca88965?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v071', title:'Shoes (with trivia)', duration:'9:52', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/b335f5f0-9a4d-4289-a977-7df800cc272d.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v072', title:'Skiing', duration:'8:02', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v073', title:'Sunday Drive', duration:'5:03', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v074', title:'Sunrise', duration:'9:59', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/cc041308-7636-4f0a-a338-cf4c82f8da3b.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v075', title:'Thanksgiving', duration:'9:57', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/2602d382-902d-4bfa-9751-2424847c752e?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v076', title:'The \'50s', duration:'9:59', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v077', title:'The \'50s with Trivia', duration:'9:59', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v078', title:'The Charge  (misc. sports)', duration:'5:16', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v079', title:'Tokyo', duration:'9:53', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/b1163cf4-6c83-4434-84ad-21ad3223b7b1?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v080', title:'Tools', duration:'9:18', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v081', title:'Trains', duration:'9:53', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/960f3045-e5a1-4d27-af96-f1e03bcb77f0.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v082', title:'Trees', duration:'5:10', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v083', title:'Ukraine', duration:'10:00', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v084', title:'Ukranian Food', duration:'9:55', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v085', title:'Underwater', duration:'10:02', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v086', title:'Valentine\'s Day', duration:'9:25', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/1cbf4d47-5a93-472f-a8c5-04195e511ccc?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v087', title:'Vancouver', duration:'9:56', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v088', title:'Venice', duration:'9:55', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/099ff8ac-4db3-4515-a7e7-aaffdb4aadb8?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v089', title:'Vineyard', duration:'9:56', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v090', title:'Waterfalls', duration:'9:03', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v091', title:'Waterways', duration:'8:34', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v092', title:'Whales', duration:'9:57', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b449486-2865-4c44-8b4f-65e91337f9ee?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v093', title:'What Do I Like?', duration:'14:44', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v094', title:'Sailing', duration:'7:22', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v095', title:'(biking) - Bike Jumps & Tricks', duration:'8:53', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v096', title:'(biking) - Mountain Biking', duration:'32:42', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v097', title:'(biking) - Road Biking', duration:'32:18', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v098', title:'4th of July', duration:'11:12', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/960f3045-e5a1-4d27-af96-f1e03bcb77f0.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v099', title:'African Safari', duration:'1:03:06', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/62450d11-dc78-40fd-aed2-76cbeebe50d3?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v100', title:'Animal Families', duration:'16:05', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/62450d11-dc78-40fd-aed2-76cbeebe50d3?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v101', title:'Babies Eating', duration:'11:59', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v102', title:'Babies Playing', duration:'41:13', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v103', title:'Baby\'s First Year', duration:'11:13', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v104', title:'Baking (made by Kalee)', duration:'—', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v105', title:'Ballgame', duration:'10:21', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v106', title:'Ballgame with Sing-Along', duration:'10:21', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v107', title:'Barbershop', duration:'21:01', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v108', title:'Be Mine  (love/ Valentine\'s Day)', duration:'11:51', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/1cbf4d47-5a93-472f-a8c5-04195e511ccc?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v109', title:'Beloved Poetry Read-Along', duration:'7:41', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v110', title:'Bloom', duration:'11:38', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/fbd1f4df-1507-4427-88e1-ac346a3afc4e.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v111', title:'Breakfast', duration:'29:24', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v112', title:'Breakfast - with audio descriptions', duration:'30:38', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v113', title:'Busy Bee', duration:'1:03:27', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v114', title:'California Road Trip', duration:'21:12', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/060d61c8-ef3c-41ff-a90c-5c47cb3a8e8e?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v115', title:'Candy', duration:'13:44', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v116', title:'Cars', duration:'5:18', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v117', title:'Cats at Christmas', duration:'13:11', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v118', title:'Cat Friends (made by Ariful)', duration:'—', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/298e3e30-16f2-4643-8d1e-ead35ee01e95-b5fc0c74.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v119', title:'Celebrate Sakura Season 桜の季節を祝う', duration:'11:13', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v120', title:'Chinese New Year', duration:'14:22', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/50cac579-1d55-43b6-be27-715674c7b6f8-eecd60cc.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v121', title:'Chocolate', duration:'29:11', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v122', title:'Cliffs of Moher (in Ireland)', duration:'8 min', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/1366633e-d2e2-4d4d-9a5c-470c7a2d1135.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v123', title:'Dog Friends', duration:'10:06', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/298e3e30-16f2-4643-8d1e-ead35ee01e95-b5fc0c74.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v124', title:'Dogs at Christmas', duration:'15:10', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v125', title:'Dumplings Around the World', duration:'41 mins', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v126', title:'Easter Fun', duration:'18:47', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/50cac579-1d55-43b6-be27-715674c7b6f8-eecd60cc.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v127', title:'Exotic Animals', duration:'10:31', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/298e3e30-16f2-4643-8d1e-ead35ee01e95-b5fc0c74.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v128', title:'Faith and Gratitude', duration:'3:21', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v129', title:'Farm Visit', duration:'9:52', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v130', title:'Fishing', duration:'7:51', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v131', title:'Flower Fields', duration:'11:32', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/674fc8a8-f77e-4a50-85c0-559991fda355?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v132', title:'Forest', duration:'2:19', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v133', title:'Freshwater Fishing', duration:'10:11', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v134', title:'Fun Colors', duration:'21:44', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v135', title:'Fun Puns - with Erin', duration:'5 mins', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v136', title:'Halloween', duration:'10:09', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/50cac579-1d55-43b6-be27-715674c7b6f8-eecd60cc.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v137', title:'Hanukkah', duration:'12:00', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v138', title:'Having Fun', duration:'11:44', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v139', title:'Hawaiian Breeze', duration:'21:37', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/1982a963-2518-42fd-9870-27d1e28a1edf?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v140', title:'Horse Racing', duration:'8:43', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v141', title:'In Flanders Fields - Read-Along Poem', duration:'3:11', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/960f3045-e5a1-4d27-af96-f1e03bcb77f0.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v142', title:'Indian Food', duration:'17:25', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v143', title:'International Airshow', duration:'13:00', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v144', title:'Ireland', duration:'50 min', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v145', title:'It\'s Your Birthday!', duration:'11:04', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/acc4e7b5-ecaa-4b53-a177-42e1cce69a3e?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v146', title:'Japanese Food', duration:'11:10', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v147', title:'Kittens', duration:'10:03', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/cfce66a7-4864-4a80-967e-5306144a2b44?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v148', title:'Lakefront Cottage', duration:'10:12', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v149', title:'Let\'s Hike', duration:'20:55', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v150', title:'Let\'s Swim', duration:'6:48', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v151', title:'Let’s Talk About Christmas', duration:'11:04', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v152', title:'Let\'s Talk About Hanukkah', duration:'9:48', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/d8626979-25e8-4159-8f0b-7120952d09d6?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v153', title:'Let\'s Talk About Winter Fun', duration:'12:16', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/1e1584de-348a-4f71-918a-59a09c0f5863?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v154', title:'Life of the Butterfly', duration:'16:16', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/1de8c4e3-9263-4eb0-bdb8-afc15caba7c9.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v155', title:'Lily Pond', duration:'14:28', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/7337f049-b071-47a9-b163-51596145e280?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v156', title:'Motorcycles', duration:'30:32', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v157', title:'Name That Bird', duration:'10:24', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/ce021426-c3df-43fa-8d8a-c67fe45094d7.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v158', title:'Name That Dog Breed', duration:'10:58', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/dce85ccc-a23b-4e21-b20a-7fa0f1555592.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v159', title:'Name that Exotic Animal', duration:'10:11', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/215af82a-4674-467e-ad62-c4f5a24886fe.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v160', title:'Name That Spring Flower', duration:'11:14', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/3afa9897-6b60-4403-890e-fb88af8e360d.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v161', title:'Navy', duration:'3:43', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v162', title:'Northern India', duration:'44:43', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/fa47b555-c792-4bb4-95f1-e040710de522?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v163', title:'Outdoor Recreation (hiking, camping etc)', duration:'16:00', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3feb6099-caf6-4d57-960b-b599282a4b07.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v164', title:'Pacific Forest Walk', duration:'39:45', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/6390c8fe-8509-4c69-9efe-ff5729d84c87?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v165', title:'People and Pets', duration:'10:00', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/f7174d07-2d65-4cc2-adc5-6b20aac1cc01?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v166', title:'Personal Grooming', duration:'10:24', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/5e81ebcf-d45e-4121-b59e-f6a9322b993c.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v167', title:'Playing Outside', duration:'10:58', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v168', title:'Popcorn Facts', duration:'8:08', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/2d8f35f3-e72c-4f1f-a93e-6e0ac28c680a?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v169', title:'Primp & Polish', duration:'13:35', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v170', title:'Puppies', duration:'9:58', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/9ab17c8f-a932-4bf9-92ae-0b29de60285c?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v171', title:'Riding Horses', duration:'15:17', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/298e3e30-16f2-4643-8d1e-ead35ee01e95-b5fc0c74.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v172', title:'Roses', duration:'10:42', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/4bb91587-498f-4015-b648-4595c33b2ac4.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v173', title:'Seattle Hot Spots', duration:'11:54', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v174', title:'Sewing', duration:'10 & 50 mins', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v175', title:'Silly Jokes', duration:'8:10', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/4e9507f0-afd8-423e-a240-b9a967339604.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v176', title:'Sleepy Animals', duration:'34:44', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/39d9c0ed-5a1c-4ec4-8865-8b12488c10f4?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v177', title:'Soccer', duration:'13:00', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v178', title:'Southern India', duration:'34:36', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v179', title:'Spring Flowers', duration:'17:23', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/6166cae7-1b63-4fda-a0a1-1fa72b826463?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v180', title:'Steve the Cat', duration:'20:49', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/298e3e30-16f2-4643-8d1e-ead35ee01e95-b5fc0c74.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v181', title:'Steve the Cat - facts with Allyson', duration:'21:57', genre:'Animals', thumb:'https://vhx.imgix.net/zinniatv1/assets/298e3e30-16f2-4643-8d1e-ead35ee01e95-b5fc0c74.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v182', title:'Steve the Cat is Thinking', duration:'20:49', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v183', title:'Stone Balancing', duration:'32:12', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/2c04126e-7541-4bb5-b009-212c2014b97f?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v184', title:'Thanksgiving Day', duration:'9:52', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/1be929a4-e0cc-46bc-a66e-dc07cb93850b?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v185', title:'Thanksgiving Day Read-Along', duration:'9:52', genre:'Holidays', thumb:'https://vhx.imgix.net/zinniatv1/assets/1be929a4-e0cc-46bc-a66e-dc07cb93850b?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v186', title:'The Heart of Paris', duration:'53 mins', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v187', title:'Toddlers Playing', duration:'29:32', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v188', title:'Tree Blossoms', duration:'17 mins', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v189', title:'Undersea Creatures', duration:'10:27', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/c143e815-aee2-46da-a46c-e8727661a3ba?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v190', title:'Venetian Views', duration:'14:39', genre:'Travel', thumb:'https://vhx.imgix.net/zinniatv1/assets/552399a5-dd17-4a4a-b176-70817c5db218.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v191', title:'West Coast Beach', duration:'10:55', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3feb6099-caf6-4d57-960b-b599282a4b07.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v192', title:'What is That?', duration:'9:52', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v193', title:'White Cliffs', duration:'2 mins', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v194', title:'Wildlife Nature Walk', duration:'19:52', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/7416f7ac-74f5-4129-9aa8-b8c252736f1f?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v195', title:'Winter Fun', duration:'12:19', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v196', title:'World Waterfalls', duration:'10:22', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/3b09f058-4f2f-4faa-bc4a-d223126cf18f-457c2765.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v197', title:'Steamboat Willy', duration:'7:27', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v198', title:'Audiobook: Winnie-the-Pooh', duration:'2:48:30', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/9c93234f-b7be-42ae-a63b-c866c191460f-1111d37b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v199', title:'Vintage Commercials', duration:'23:28', genre:'Nostalgia', thumb:'https://vhx.imgix.net/zinniatv1/assets/960f3045-e5a1-4d27-af96-f1e03bcb77f0.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v200', title:'1960\'s Rock and Roll Quiz', duration:'11:55', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v201', title:'1960\'s Rock and Roll Quiz (Easier)', duration:'12:16', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v202', title:'All About Dogs Quiz', duration:'13 mins', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v203', title:'American Literature Quiz', duration:'11:55', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v204', title:'Birds of New England Quiz', duration:'11:28', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v205', title:'Car Maintenance Quiz', duration:'12:08', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v206', title:'Christmas Traditions Around the World Quiz', duration:'12:52', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v207', title:'Classic Fairy Tales and Folklore Quiz', duration:'9:49', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v208', title:'Cuckoo about Clocks Quiz', duration:'10:56', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v209', title:'Fish Quiz', duration:'12:17', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v210', title:'Gardening Quiz', duration:'11:51', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v211', title:'Greek Mythology Quiz', duration:'8:52', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v212', title:'Halloween Quiz', duration:'12:33', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v213', title:'Hunting Safety Quiz', duration:'11:11', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v214', title:'Italian Food Quiz', duration:'8:37', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v215', title:'Japanese Food Quiz', duration:'9:46', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v216', title:'Las Vegas Quiz', duration:'8:36', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v217', title:'Let\'s Cook Quiz', duration:'13:38', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v218', title:'Mexican Food Quiz', duration:'10:10', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v219', title:'Napoleonic Wars Quiz', duration:'12:22', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v220', title:'New Testament Quiz', duration:'12:47', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v221', title:'New Year\'s Quiz', duration:'13:20', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v222', title:'Nuts about Squirrels Quiz', duration:'14:13', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v223', title:'Old Testament Quiz', duration:'12:42', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v224', title:'Pirates and Privateers Quiz', duration:'12:15', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v225', title:'Revolutionary War Heroes Quiz', duration:'11:31', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v226', title:'Thanksgiving Quiz (Easier)', duration:'12:45', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v227', title:'Thanksgiving Quiz (Harder)', duration:'11:37', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v228', title:'US Presidents Quiz', duration:'16:49', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v229', title:'Valentine\'s Day Quiz', duration:'11:33', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v230', title:'Zeppelins, Airships, and Early Aviation Quiz', duration:'11:37', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v231', title:'Brush Your Teeth', duration:'6:18', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/8f41ae2d-6889-4d91-9e56-17d97d4733ae?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v232', title:'Brush Your Teeth with Erin', duration:'2:45', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/8f41ae2d-6889-4d91-9e56-17d97d4733ae?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v233', title:'Drink Water', duration:'8:27', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/a43eb938-98a3-4499-9260-443992bea252.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v234', title:'Drink Water with Friendly Messages', duration:'8:21', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/dc3524c7-e190-42d9-80c3-4b26d0397875.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v235', title:'Get Ready for Lunch', duration:'20:20', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/c5318b4c-edf1-421f-a6b8-b6891df476f6?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v236', title:'Get Ready to Shower', duration:'19:21', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/8f368a6f-e1bd-4b89-9b08-3cdad0b2736f?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v237', title:'Let\'s Brush Our Teeth', duration:'7:05', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/8f41ae2d-6889-4d91-9e56-17d97d4733ae?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v238', title:'Let\'s Move', duration:'14:15', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/bd1f78da-4cf7-43e5-85b4-5989f8db7e78?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v239', title:'Go Back to Sleep', duration:'4:27', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/2f8312bb-0f83-4e0f-91ed-4ca334c12a73?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v240', title:'Good Morning with Friendly Messages', duration:'22:27', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/2126c742-61b6-410a-ac6a-ba2ea1bd01bd.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v241', title:'Good Night with Friendly Messages', duration:'15:14', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/90295927-7499-4205-983e-c4f368e50977.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v242', title:'Men Get Dressed', duration:'9:15', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/f91d1533-646f-4db6-a98f-b4c56b03962d?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v243', title:'Time for Medications', duration:'12:49', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/1d3a10ad-ab5a-4705-a25b-ddf279f52f64?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v244', title:'Use the Toilet', duration:'7:16', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/fca31297-3196-4e93-8c52-40ef7d8b141d.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v245', title:'Use the Toilet - 2 Mins', duration:'2:16', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/fca31297-3196-4e93-8c52-40ef7d8b141d.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v246', title:'Women Get Dressed', duration:'16:36', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v247', title:'Let\'s Drink Water', duration:'9:51', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/3ed3a437-64e0-4141-95d3-1771cd95281c.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v248', title:'Let\'s Eat Lunch', duration:'6:32', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/d36af2de-1891-4fe0-bba0-25cf0f5e0c1c?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v249', title:'Let\'s Eat Lunch with Friendly Messages', duration:'7:17', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/d36af2de-1891-4fe0-bba0-25cf0f5e0c1c?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v250', title:'Let\'s Get Clean', duration:'9:30', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b8bb75c-964b-4dc4-be33-9fd44a3cfe12?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v251', title:'Let\'s Get Dressed', duration:'8:24', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/e46196c5-0be9-461f-82cd-1e62297196d2?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v252', title:'Good Morning', duration:'5:13', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/20aeb1e5-f36d-4a88-93f5-c738493d9949?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v253', title:'Good Night', duration:'8:56', genre:'Daily Living', thumb:'https://vhx.imgix.net/zinniatv1/assets/fda6300e-7821-441e-9359-c66fd00a1242?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v254', title:'Coping with Repetition', duration:'7:00', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v255', title:'Caregiver Self-Care', duration:'6:18', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v256', title:'Dementia and the Holidays', duration:'7:05', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v257', title:'Dementia and Communication', duration:'9:58', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v258', title:'Dementia and Emotions', duration:'5:00', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v259', title:'Depression and Apathy', duration:'6:35', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v260', title:'Fostering Security', duration:'5:44', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v261', title:'Slowing Progression', duration:'5:34', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v262', title:'Successful Bathing', duration:'6:00', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v263', title:'Sucessful Eating & Drinking', duration:'6:33', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v264', title:'Sucessful Toileting', duration:'6 mins', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v265', title:'Helping with Hydration', duration:'5:17', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v266', title:'Helping with Hallucinations', duration:'4:54', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v267', title:'Home Security', duration:'5 mins', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v268', title:'Misperceptions', duration:'5:30', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v269', title:'Successful Toothbrushing', duration:'7:00', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v270', title:'Sundowning', duration:'5:31', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v271', title:'Therapeutic Fibbing', duration:'5:25', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v272', title:'Tips for Medication Refusal', duration:'5:23', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v273', title:'When to Stop Driving', duration:'8:08', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v274', title:'Breathe in Nature', duration:'4:40', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/6390c8fe-8509-4c69-9efe-ff5729d84c87?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v275', title:'Forest - Guided Relaxation (Caregiver Self-Care)', duration:'2 mins', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/6390c8fe-8509-4c69-9efe-ff5729d84c87?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v276', title:'Forest - Guided Relaxation - with Captions (Caregiver Self-Care)', duration:'2 mins', genre:'Nature', thumb:'https://vhx.imgix.net/zinniatv1/assets/6390c8fe-8509-4c69-9efe-ff5729d84c87?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v277', title:'Meditation with Allyson', duration:'7:36', genre:'Interests', thumb:'https://vhx.imgix.net/zinniatv1/assets/6390c8fe-8509-4c69-9efe-ff5729d84c87?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v278', title:'West Coast Beach - body scan meditation (Caregiver Self-Care)', duration:'8:50', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/3feb6099-caf6-4d57-960b-b599282a4b07.jpeg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v279', title:'Communication and Dementia - Webinar', duration:'—', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v280', title:'Creating a Dementia Friendly Environment - Webinar', duration:'—', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v281', title:'Dementia and the Holidays  - Webinar', duration:'—', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v282', title:'Staying in Their Reality - Webinar', duration:'—', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v283', title:'Why We Made Zinnia - Webinar intro', duration:'—', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v284', title:'Helping with Daily Activities  (ZINNIA user Education)', duration:'2:21', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v285', title:'How to Choose What to Watch (ZINNIA user Education)', duration:'2:22', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v286', title:'Helping Reduce Anxiety  (ZINNIA user Education)', duration:'4:24', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v287', title:'Helping Start Conversations (ZINNIA user Education)', duration:'4 mins', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v288', title:'How Professional Caregivers Use Zinnia', duration:'24:34', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v289', title:'How to Use Fun & Games', duration:'2:50', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v290', title:'Sample Conversation - Watching Hockey', duration:'1:27', genre:'Caregiver Support', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v291', title:'CANTONESE: Chinese New Year with Friendly Greetings in Cantonese and English', duration:'15:02', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v292', title:'CANTONESE: Cantonese and English - Drink Water', duration:'7:18', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v293', title:'CANTONESE: Cantonese - Drink Water', duration:'6:46', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v294', title:'CANTONESE: Cantonese - Use the Toilet', duration:'7:16', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v295', title:'FRENCH: Name that Exotic Animal', duration:'10:11', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v296', title:'FRENCH: Le Coeur de Paris', duration:'53 mins', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v297', title:'JAPANESE: Itadakimasu 頂きます (Japanese Food)', duration:'14:05', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v298', title:'GERMAN: German and English Drink Water', duration:'9:22', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v299', title:'MALAY: What is that Word?', duration:'10:12', genre:'Languages', thumb:'https://vhx.imgix.net/zinniatv1/assets/42d98e8d-3960-4a6e-8bff-a1333f8197c5.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v300', title:'Bible Reading - Three Wise Men', duration:'3:05', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v301', title:'The Hail Mary', duration:'32:00', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v302', title:'Hail Holy Queen', duration:'1:06', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v303', title:'Glory Be', duration:'0:20', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v304', title:'Fatima Prayer (O My Jesus)', duration:'0:30', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v305', title:'The Prayer of St. Francis', duration:'1:31', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v306', title:'The Lord’s Prayer', duration:'1 min', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v307', title:'The Lord’s Prayer with captions', duration:'1 min', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v308', title:'Beatitudes', duration:'2 Mins', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v309', title:'Pray the Rosary - Joyful Mysteries', duration:'43:43', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v310', title:'The Apostles\' Creed', duration:'1:19', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v311', title:'Irish Blessing', duration:'0:50', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v312', title:'Concluding Prayer', duration:'0:45', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v313', title:'Creation', duration:'7:42', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v314', title:'The Serenity Prayer', duration:'1:30', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v315', title:'Shema Yisrael', duration:'0:36', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v316', title:'Hinei Ma Tov', duration:'1:30', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v317', title:'Bim Bam', duration:'1:40', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v318', title:'Mourner\'s Kaddish קדיש אבלים', duration:'1:04', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v319', title:'Shabbat שַׁבָּת', duration:'2:33', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v320', title:'Adon olam - אֲדוֹן עוֹלָם', duration:'2:03', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v321', title:'Dradel Songs for Hanukkah', duration:'1:26', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v322', title:'8th night of Hannukah', duration:'2:06', genre:'Messages', thumb:'https://vhx.imgix.net/zinniatv1/assets/4b685078-4182-4330-aff5-04a4a1ec372b-a43f8e2e.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v323', title:'Ballgame - just Sing-Along section', duration:'2:47', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/e1689fdb-9760-4e1d-a190-eaffcdbf4609?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v324', title:'Happy Birthday Sing-Along', duration:'1:05', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/acc4e7b5-ecaa-4b53-a177-42e1cce69a3e?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v325', title:'American Patriot Sing-Along', duration:'5:56', genre:'Fun & Games', thumb:'https://vhx.imgix.net/zinniatv1/assets/e60e3665-7649-4f33-a3af-2920c6926b5b.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v326', title:'Bridgetown Music Therapy - Blue Suede Shoes', duration:'2:47', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v327', title:'Bridgetown Music Therapy - Breathing In Breathing Out', duration:'5:39', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v328', title:'Bridgetown Music Therapy - Hymns #1', duration:'26:52', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v329', title:'Bridgetown Music Therapy - Hymns #2', duration:'27:41', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v330', title:'Bridgetown Music Therapy - On The Road Again', duration:'3:49', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v331', title:'Bridgetown Music Therapy - You Are My Sunshine', duration:'3:08', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v332', title:'Christmas Sing Along (Paul Delorme)', duration:'7:26', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/50cac579-1d55-43b6-be27-715674c7b6f8-eecd60cc.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v333', title:'Christmas Sing-Along with Mary Sue Wilkerson', duration:'18:18', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/50cac579-1d55-43b6-be27-715674c7b6f8-eecd60cc.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v334', title:'Folk Music Sing-Along', duration:'16:21', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v335', title:'Hymn Sing-Along with Mary Sue Wilkerson', duration:'13:23', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/ac266bc3-a5a7-4f0e-8755-45224d1d7dd6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v336', title:'Older Oldies Sing-Along with Miriam Pico', duration:'12:22', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v337', title:'Sing-Along with Frank', duration:'11:10', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'},
  {id:'v338', title:'SPANISH: Spanish Sing Along with Miriam', duration:'11:22', genre:'Sing-Alongs', thumb:'https://vhx.imgix.net/zinniatv1/assets/20a9222b-6f09-4ef9-8275-c58cee52f641-ad0ab3e6.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640'}
];


// ─────────────────────────────────── STATE

const state = {
  videos:           ZINNIA_VIDEOS,
  filteredVideos:   [...ZINNIA_VIDEOS],
  selectedVideoIds: new Set(),
  playlists:    JSON.parse(localStorage.getItem('zinnia_playlists') || '[]'),
  activePlaylistId: null,
  currentGenre: 'All',
  // Single source of truth for BOTH queue view and calendar view
  // Each item: { plId?, videoId?, day: '' | '0'–'6', time: 'HH:MM' | '', type: 'playlist'|'video' }
  playQueue:    JSON.parse(localStorage.getItem('zinnia_queue_v4') || '[]'),
  currentWeekStart: getWeekStart(new Date()),
  editingPlaylistId: null,
  editVideos:   [],
  queue:        [], // flat video list for player
  currentPlayerIdx: 0,
  isPlaying:    false,
  progressTimer: null,
  progressPct:  0,
  timePickerIdx: null,
};

// ─────────────────────────────────── BOOT

document.addEventListener('DOMContentLoaded', () => {
  migrateOldQueue();
  renderVideoGrid();
  renderPlaylists();
  renderBrowsePage();
  renderQueueSchedule();
  renderSchedule();
});

function migrateOldQueue() {
  // Migrate from v3 key if present
  const oldV3 = localStorage.getItem('zinnia_queue_v3');
  if (oldV3 && !localStorage.getItem('zinnia_queue_v4')) {
    localStorage.setItem('zinnia_queue_v4', oldV3);
    state.playQueue = JSON.parse(oldV3);
  }
  // Migrate legacy day/time/days fields -> slots array
  let dirty = false;
  state.playQueue.forEach(item => {
    if (!item.slots) {
      item.slots = [];
      const legacyDays = item.days && item.days !== '' ? item.days.split(',') : (item.day !== undefined ? [item.day] : []);
      if (item.time && legacyDays.length) {
        legacyDays.forEach(d => item.slots.push({ day: d, time: item.time }));
      } else if (item.time) {
        item.slots.push({ day: '', time: item.time });
      }
      delete item.day; delete item.days; delete item.time; delete item.durationMins;
      dirty = true;
    }
  });
  if (dirty) saveQueue();
}

// ─────────────────────────────────── PAGE NAVIGATION

function showPage(name) {
  // Reset play-now queue when navigating away from player
  if (name !== 'player') state.queue = [];
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name)?.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === name) a.classList.add('active');
  });
  // Always refresh both schedule views from shared state
  if (name === 'schedule')       { renderSchedule(); renderQueueSchedule(); }
  if (name === 'queue-schedule') { renderQueueSchedule(); renderDayCols(); }
  if (name === 'player')         { renderPlayerPage(); }
  if (name === 'browse')         { renderBrowsePage(); }
  if (name === 'playlists')      { renderPlaylists(); renderVideoGrid(); }
}

// ─────────────────────────────────── VIDEO GRID

function renderVideoGrid() {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';
  if (state.filteredVideos.length === 0) {
    const d = document.createElement('div');
    d.className = 'empty-card';
    d.innerHTML = '<p style="color:var(--muted)">No videos match your search. Try a different word.</p>';
    grid.appendChild(d);
    return;
  }
  state.filteredVideos.forEach(v => grid.appendChild(createVideoCard(v)));
}

function createVideoCard(video) {
  const sel = state.selectedVideoIds.has(video.id);
  const card = document.createElement('div');
  card.className = 'video-card' + (sel ? ' selected' : '');
  card.onclick = () => toggleVideoSelect(video);
  card.innerHTML = `
    <div class="video-thumb">
      <img src="${esc(video.thumb)}" alt="${esc(video.title)}" loading="lazy"
           onerror="this.style.display='none'" />
      <div class="thumb-overlay">
        <div class="thumb-play">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#072843"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        ${sel ? `<div class="selected-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>` : ''}
      </div>
    </div>
    <div class="video-meta">
      <h4>${esc(video.title)}</h4>
      <p class="duration">${video.duration}</p>
      <span class="genre-tag">${esc(video.genre)}</span>
    </div>`;
  return card;
}

function toggleVideoSelect(video) {
  if (state.selectedVideoIds.has(video.id)) state.selectedVideoIds.delete(video.id);
  else state.selectedVideoIds.add(video.id);
  updateSelectedUI();
  renderVideoGrid();
}

function removeFromSelection(id) {
  state.selectedVideoIds.delete(id);
  updateSelectedUI();
  renderVideoGrid();
}

function updateSelectedUI() {
  const count = state.selectedVideoIds.size;
  document.getElementById('selectedBadge').style.display = count ? 'inline-flex' : 'none';
  document.getElementById('selectedCount').textContent = count;

  // Show/hide Play Now button
  const playNowBtn = document.getElementById('playNowBtn');
  if (playNowBtn) playNowBtn.style.display = count ? 'inline-flex' : 'none';

  const list = document.getElementById('selectedVideosList');
  const msg  = document.getElementById('noSelectionMsg');
  list.innerHTML = '';
  const selected = state.videos.filter(v => state.selectedVideoIds.has(v.id));
  msg.style.display = selected.length ? 'none' : '';
  selected.forEach(v => {
    const d = document.createElement('div');
    d.className = 'sel-vid-item';
    d.innerHTML = `
      <img src="${esc(v.thumb)}" alt="" onerror="this.style.display='none'" />
      <span style="flex:1;line-height:1.3">${esc(v.title)}</span>
      <button class="remove-btn" onclick="event.stopPropagation();removeFromSelection('${v.id}')">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Remove
      </button>`;
    list.appendChild(d);
  });
}

// Play Now — immediately plays the current selection
function playNow() {
  if (!state.selectedVideoIds.size) { showToast('Pick at least one video first'); return; }
  const selected = state.videos.filter(v => state.selectedVideoIds.has(v.id));
  state.queue = selected;
  state.currentPlayerIdx = 0;
  showPage('player');
}

// ─────────────────────────────────── GENRE FILTER

function selectGenre(btn, genre) {
  document.querySelectorAll('#genrePills .pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  state.currentGenre = genre;
  filterVideos();
}

function filterVideos() {
  const q = (document.getElementById('videoSearch')?.value || '').toLowerCase();
  state.filteredVideos = state.videos.filter(v => {
    const genreOk = state.currentGenre === 'All' || v.genre === state.currentGenre;
    const textOk  = !q || v.title.toLowerCase().includes(q) || v.genre.toLowerCase().includes(q);
    return genreOk && textOk;
  });
  renderVideoGrid();
}

// ─────────────────────────────────── PLAYLISTS

function openSaveModal() {
  document.getElementById('playlistNameInput').value = '';
  document.getElementById('saveModal').classList.add('open');
  setTimeout(() => document.getElementById('playlistNameInput').focus(), 40);
}
function closeSaveModal() { document.getElementById('saveModal').classList.remove('open'); }

function savePlaylist() {
  const name = document.getElementById('playlistNameInput').value.trim();
  if (!name) { showToast('Please enter a playlist name'); return; }
  if (!state.selectedVideoIds.size) { showToast('Select at least one video first'); return; }
  const videos = state.videos.filter(v => state.selectedVideoIds.has(v.id));
  const color  = PL_COLORS[state.playlists.length % PL_COLORS.length];
  const pl = { id: 'pl_' + Date.now(), name, videos, color, createdAt: new Date().toISOString() };
  state.playlists.push(pl);
  persistPlaylists();
  renderPlaylists();
  closeSaveModal();
  state.selectedVideoIds.clear();
  updateSelectedUI();
  renderVideoGrid();
  showToast(`"${name}" saved with ${videos.length} video${videos.length !== 1 ? 's' : ''}! 🎉`);
}

function persistPlaylists() {
  localStorage.setItem('zinnia_playlists', JSON.stringify(state.playlists));
}

function renderPlaylists() {
  const list = document.getElementById('playlistList');
  list.innerHTML = '';
  if (!state.playlists.length) {
    list.innerHTML = '<p class="empty-msg" style="padding:6px 0">No playlists yet. Select videos above and save.</p>';
    return;
  }
  state.playlists.forEach(pl => {
    const qItem = state.playQueue.find(i => i.plId === pl.id);
    const inQueueNow = !!qItem;
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.style.background = pl.color;
    item.onclick = () => loadPlaylistIntoSelection(pl.id);
    item.innerHTML = `
      <div style="flex:1;min-width:0">
        <div class="pl-name">${esc(pl.name)}</div>
        <div class="pl-meta">${pl.videos.length} video${pl.videos.length !== 1 ? 's' : ''}
          ${inQueueNow ? `<span class="pl-scheduled-badge" style="margin-left:5px">In queue</span>` : ''}
        </div>
      </div>
      <div class="pl-actions">
        <button class="pl-btn" onclick="event.stopPropagation();openEditModal('${pl.id}')">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </button>
        <button class="pl-btn" onclick="event.stopPropagation();deletePlaylist('${pl.id}')">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          Delete
        </button>
      </div>`;
    list.appendChild(item);
  });
}

function loadPlaylistIntoSelection(id) {
  const pl = state.playlists.find(p => p.id === id);
  if (!pl) return;
  state.selectedVideoIds = new Set(pl.videos.map(v => v.id));
  updateSelectedUI();
  renderVideoGrid();
  showToast(`"${pl.name}" loaded into selection`);
}

function deletePlaylist(id) {
  const pl = state.playlists.find(p => p.id === id);
  if (!pl || !confirm(`Delete "${pl.name}"?`)) return;
  state.playlists  = state.playlists.filter(p => p.id !== id);
  state.playQueue  = state.playQueue.filter(i => i.plId !== id);
  persistPlaylists();
  saveQueue();
  renderPlaylists();
  renderQueueSchedule();
  renderDayCols();
  renderSchedulePlaylists();
  showToast('Playlist deleted');
}

// ─────────────────────────────────── EDIT MODAL

let editDragSrcIdx = null;

function openEditModal(id) {
  const pl = state.playlists.find(p => p.id === id);
  if (!pl) return;
  state.editingPlaylistId = id;
  state.editVideos = pl.videos.map(v => ({ ...v }));
  document.getElementById('editModalDot').style.background = pl.color;
  document.getElementById('editPlaylistName').value = pl.name;
  renderEditList();
  renderEditAvailable();
  document.getElementById('editModal').classList.add('open');
}
function closeEditModal() {
  document.getElementById('editModal').classList.remove('open');
  state.editingPlaylistId = null;
  state.editVideos = [];
}

function renderEditList() {
  const el = document.getElementById('editPlaylistVideos');
  el.innerHTML = '';
  const count = state.editVideos.length;
  document.getElementById('editVideoCount').textContent = `${count} video${count !== 1 ? 's' : ''}`;
  if (!count) { el.innerHTML = '<p class="empty-msg">No videos yet.</p>'; return; }
  state.editVideos.forEach((v, idx) => {
    const row = document.createElement('div');
    row.className = 'ev-item';
    row.draggable = true;
    row.dataset.idx = idx;
    row.innerHTML = `
      <span class="ev-handle" title="Drag to reorder">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
      </span>
      <img src="${esc(v.thumb)}" alt="" onerror="this.style.display='none'" />
      <span class="ev-title">${esc(v.title)}</span>
      <span class="ev-dur">${v.duration}</span>
      <button class="ev-remove" onclick="removeFromEditList(${idx})">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Remove
      </button>`;
    row.addEventListener('dragstart', e => { editDragSrcIdx = idx; row.classList.add('dragging-ev'); e.dataTransfer.effectAllowed='move'; });
    row.addEventListener('dragend',   () => { row.classList.remove('dragging-ev'); editDragSrcIdx = null; });
    row.addEventListener('dragover',  e => { e.preventDefault(); row.classList.add('drag-over-ev'); });
    row.addEventListener('dragleave', () => row.classList.remove('drag-over-ev'));
    row.addEventListener('drop', e => {
      e.preventDefault(); row.classList.remove('drag-over-ev');
      if (editDragSrcIdx !== null && editDragSrcIdx !== idx) {
        const moved = state.editVideos.splice(editDragSrcIdx, 1)[0];
        state.editVideos.splice(idx, 0, moved);
        renderEditList();
      }
    });
    el.appendChild(row);
  });
}

function removeFromEditList(idx) { state.editVideos.splice(idx,1); renderEditList(); renderEditAvailable(); }

function renderEditAvailable() {
  const el = document.getElementById('editAvailableVideos');
  const q  = (document.getElementById('editSearch')?.value || '').toLowerCase();
  el.innerHTML = '';
  const inIds = new Set(state.editVideos.map(v => v.id));
  const filtered = state.videos.filter(v => !q || v.title.toLowerCase().includes(q));
  if (!filtered.length) { el.innerHTML = '<p class="empty-msg">No videos found.</p>'; return; }
  filtered.forEach(v => {
    const already = inIds.has(v.id);
    const row = document.createElement('div');
    row.className = 'ev-add-item' + (already ? ' already-in' : '');
    row.innerHTML = `
      <img src="${esc(v.thumb)}" alt="" onerror="this.style.display='none'" />
      <span class="ev-title">${esc(v.title)}</span>
      <span class="ev-dur">${v.duration}</span>
      <button class="ev-add-btn" ${already ? 'disabled' : ''} onclick="addToEditList('${v.id}')">
        ${already
          ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Added`
          : `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add`}
      </button>`;
    el.appendChild(row);
  });
}

function addToEditList(videoId) {
  if (state.editVideos.find(v => v.id === videoId)) { showToast('This video is already in the playlist'); return; }
  const v = state.videos.find(v => v.id === videoId);
  if (v) { state.editVideos.push({ ...v }); renderEditList(); renderEditAvailable(); }
}
function filterEditVideos() { renderEditAvailable(); }

function saveEditedPlaylist() {
  const pl = state.playlists.find(p => p.id === state.editingPlaylistId);
  if (!pl) return;
  pl.name   = document.getElementById('editPlaylistName').value.trim() || pl.name;
  pl.videos = state.editVideos;
  persistPlaylists();
  renderPlaylists();
  renderSchedulePlaylists();
  renderQueueSchedule();
  closeEditModal();
  showToast(`"${pl.name}" updated`);
}

// ─────────────────────────────────── QUEUE SCHEDULE (PRIMARY VIEW)

let qsDragFromPlId   = null;
let qsDragFromQueueIdx = null;

function renderQueueSchedule() {
  renderQsAvailable();
  renderQsVideos();
  renderQsQueue();
  renderQsSummary();
}

function switchQsTab(btn, tab) {
  document.querySelectorAll('#page-queue-schedule .qs-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('qsTabPlaylists').style.display = tab === 'playlists' ? '' : 'none';
  document.getElementById('qsTabVideos').style.display    = tab === 'videos'    ? '' : 'none';
  if (tab === 'videos') renderQsVideos();
}

function switchCalTab(btn, tab) {
  document.querySelectorAll('#page-schedule .qs-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('calTabPlaylists').style.display = tab === 'playlists' ? '' : 'none';
  document.getElementById('calTabVideos').style.display    = tab === 'videos'    ? '' : 'none';
  if (tab === 'videos') renderCalVideos();
}

// Helper: get video item label for queue display
function getQueueItemLabel(item) {
  if (item.type === 'video' || item.videoId) {
    const v = state.videos.find(v => v.id === item.videoId);
    return v ? v.title : 'Video';
  }
  const pl = state.playlists.find(p => p.id === item.plId);
  return pl ? pl.name : 'Playlist';
}

// Helper: get queue item color
function getQueueItemColor(item) {
  if (item.type === 'video' || item.videoId) {
    const v = state.videos.find(v => v.id === item.videoId);
    return GENRE_BG[v?.genre] ? darkenColor(GENRE_BG[v.genre]) : '#3a7dc9';
  }
  const pl = state.playlists.find(p => p.id === item.plId);
  return pl?.color || '#3a7dc9';
}

function darkenColor(hex) {
  // Shift pastel genre bg to a richer tone for chips
  const map = {
    '#cff0d8':'#2e9e6a','#fce0c8':'#c96a28','#cfe0f5':'#2e6db4',
    '#ffd6e0':'#c04070','#d6f0fa':'#2090c0','#e8f5d0':'#5a9020',
    '#f0e8d8':'#b07040','#e8d6f5':'#7a4ab0','#c8f0e0':'#2a9a70',
    '#f5e8d0':'#a06030','#fce0f0':'#c03880','#d0e8f8':'#2070b0',
  };
  return map[hex] || '#3a7dc9';
}

// Render individual videos in queue available panel
function renderQsVideos() {
  const el = document.getElementById('qsVideoList');
  if (!el) return;
  const q = (document.getElementById('qsVideoSearch')?.value || '').toLowerCase();
  const videos = q ? state.videos.filter(v =>
    v.title.toLowerCase().includes(q) || v.genre.toLowerCase().includes(q)
  ) : state.videos;

  el.innerHTML = '';
  videos.forEach(v => {
    const inQueue = state.playQueue.some(i => i.videoId === v.id);
    const chip = document.createElement('div');
    chip.className = 'qs-chip qs-video-chip' + (inQueue ? ' already-queued' : '');
    chip.style.background = darkenColor(GENRE_BG[v.genre] || '#cfe0f5');
    chip.draggable = !inQueue;
    chip.title = inQueue ? 'Already in queue' : 'Drag or click + Add';
    chip.innerHTML = `
      <img src="${esc(v.thumb)}" alt="" onerror="this.style.display='none'"
           style="width:38px;height:26px;object-fit:cover;border-radius:4px;flex-shrink:0;opacity:0.9" />
      <div style="flex:1;min-width:0;overflow:hidden">
        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.79rem">${esc(v.title)}</div>
        <div style="font-size:0.68rem;font-weight:400;opacity:0.85;margin-top:1px">${esc(v.genre)} · ${v.duration}${inQueue ? ' · in queue' : ''}</div>
      </div>
      <button class="qs-chip-add" ${inQueue ? 'disabled' : ''} onclick="event.stopPropagation();addVideoToQueue('${v.id}')">
        ${inQueue
          ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Added`
          : `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add`}
      </button>`;

    if (!inQueue) {
      chip.addEventListener('dragstart', e => {
        chip.classList.add('dragging');
        e.dataTransfer.setData('qsVideoId', v.id);
      });
      chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
    }
    el.appendChild(chip);
  });
}

// Render individual videos in calendar sidebar
function renderCalVideos() {
  const el = document.getElementById('calVideoList');
  if (!el) return;
  const q = (document.getElementById('calVideoSearch')?.value || '').toLowerCase();
  const videos = q ? state.videos.filter(v =>
    v.title.toLowerCase().includes(q) || v.genre.toLowerCase().includes(q)
  ) : state.videos;

  el.innerHTML = '';
  videos.forEach(v => {
    const qItem = state.playQueue.find(i => i.videoId === v.id);
    const slots = qItem?.slots || [];
    const inQueue = slots.length > 0;
    const chip = document.createElement('div');
    chip.className = 'schedule-playlist-chip';
    chip.style.background = darkenColor(GENRE_BG[v.genre] || '#cfe0f5');
    chip.draggable = true;
    chip.title = inQueue
      ? `Scheduled ${slots.length} time${slots.length > 1 ? 's' : ''} — drag to add another slot`
      : 'Drag onto the calendar to pick a time';
    chip.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
        <img src="${esc(v.thumb)}" alt="" onerror="this.style.display='none'"
             style="width:36px;height:24px;object-fit:cover;border-radius:4px;flex-shrink:0;opacity:0.9" />
        <div style="min-width:0">
          <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.79rem">${esc(v.title)}</div>
          <div class="chip-meta">${esc(v.genre)} · ${v.duration}${inQueue ? ` · ${slots.length}× scheduled` : ''}</div>
        </div>
      </div>
      ${inQueue
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>`}`;

    chip.addEventListener('dragstart', e => {
      chip.classList.add('dragging');
      e.dataTransfer.setData('calVideoId', v.id);
    });
    chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
    el.appendChild(chip);
  });
}

function addVideoToQueue(videoId) {
  if (state.playQueue.some(i => i.videoId === videoId)) { showToast('This video is already in your queue'); return; }
  const v = state.videos.find(v => v.id === videoId);
  if (!v) return;
  state.playQueue.push({ videoId, type: 'video', day: '', time: '' });
  saveQueue();
  renderQueueSchedule();
  showToast(`"${v.title}" added to your queue`);
}

function renderQsAvailable() {
  const el   = document.getElementById('qsAvailable');
  const noEl = document.getElementById('qsNoPlaylists');
  if (!el) return;
  el.innerHTML = '';
  if (!state.playlists.length) { if (noEl) noEl.style.display = ''; return; }
  if (noEl) noEl.style.display = 'none';

  state.playlists.forEach(pl => {
    const qItem = state.playQueue.find(i => i.plId === pl.id);
    const inQueue = !!qItem;
    const chip = document.createElement('div');
    chip.className = 'qs-chip' + (inQueue ? ' already-queued' : '');
    chip.style.background = pl.color;
    chip.draggable = !inQueue;
    chip.title = inQueue ? 'Already in queue — use Set Time to schedule days' : 'Drag or tap + Add';
    const schedLabel = (qItem && qItem.slots && qItem.slots.length)
      ? (() => {
          const isEveryDay = qItem.slots.some(s => s.day === '');
          const dayLabel = isEveryDay ? 'Every Day' : [...new Set(qItem.slots.map(s => DAYS[parseInt(s.day)].slice(0,3)))].join(', ');
          const timePart = [...new Set(qItem.slots.map(s => formatTime12(s.time)))].join(', ');
          return `<span style="font-size:0.68rem;opacity:0.9;margin-top:2px;display:block">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-1px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${esc(dayLabel)} · ${esc(timePart)}
          </span>`;
        })()
      : '';

    chip.innerHTML = `
      <svg class="qs-chip-drag" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="2">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      </svg>
      <div style="flex:1;min-width:0;overflow:hidden">
        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(pl.name)}</div>
        <div style="font-size:0.7rem;font-weight:400;opacity:0.85;margin-top:1px">${pl.videos.length} video${pl.videos.length !== 1 ? 's' : ''}${inQueue ? ' · in queue' : ''}</div>
        ${schedLabel}
      </div>
      <button class="qs-chip-add" ${inQueue ? 'disabled' : ''} onclick="event.stopPropagation();addToQueue('${pl.id}')">
        ${inQueue
          ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Added`
          : `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add`}
      </button>`;

    if (!inQueue) {
      chip.addEventListener('dragstart', e => {
        qsDragFromPlId = pl.id; qsDragFromQueueIdx = null;
        chip.classList.add('dragging');
        e.dataTransfer.setData('qsPlId', pl.id);
      });
      chip.addEventListener('dragend', () => { chip.classList.remove('dragging'); qsDragFromPlId = null; });
    }
    el.appendChild(chip);
  });
}

function addToQueue(plId) {
  if (state.playQueue.some(i => i.plId === plId)) { showToast('This playlist is already in your queue'); return; }
  state.playQueue.push({ plId, day: '', time: '' });
  saveQueue();
  renderQueueSchedule();
  const pl = state.playlists.find(p => p.id === plId);
  showToast(`"${pl?.name}" added to your queue`);
}

function renderQsQueue() {
  const list     = document.getElementById('qsQueueList');
  const emptyEl  = document.getElementById('qsEmptyMsg');
  const clearBtn = document.getElementById('clearQueueBtn');
  list.innerHTML = '';
  if (clearBtn) clearBtn.style.display = state.playQueue.length ? 'inline-flex' : 'none';

  if (!state.playQueue.length) {
    if (emptyEl) { list.appendChild(emptyEl); emptyEl.style.display = ''; }
    setupQsDropzone(list);
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  setupQsDropzone(list);

  state.playQueue.forEach((item, idx) => {
    const isVideo = item.type === 'video' || item.videoId;
    const label   = getQueueItemLabel(item);
    const color   = getQueueItemColor(item);

    let subLabel = '';
    if (isVideo) {
      const v = state.videos.find(v => v.id === item.videoId);
      subLabel = v ? `${v.genre} · ${v.duration}` : '1 video';
    } else {
      const pl = state.playlists.find(p => p.id === item.plId);
      if (!pl) return;
      subLabel = `${pl.videos.length} video${pl.videos.length !== 1 ? 's' : ''}`;
    }

    const row = document.createElement('div');
    row.className = 'qs-queue-item';
    row.style.background = color;
    row.draggable = true;
    row.dataset.idx = idx;

    let timeBadge = '';
    if (item.slots && item.slots.length) {
      const isEveryDay = item.slots.some(s => s.day === '');
      let dayLabel = '';
      if (isEveryDay) {
        dayLabel = 'Every Day';
      } else {
        const uniqueDays = [...new Set(item.slots.map(s => s.day))];
        dayLabel = uniqueDays.map(d => DAYS[parseInt(d)].slice(0,3)).join(', ');
      }
      const uniqueTimes = [...new Set(item.slots.map(s => formatTime12(s.time)))].join(', ');
      const parts = [dayLabel, uniqueTimes].filter(Boolean).join(' · ');
      if (parts) {
        timeBadge = `<span class="qs-item-time-badge">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${esc(parts)}
        </span>`;
      }
    }

    row.innerHTML = `
      <span class="drag-handle" title="Drag to reorder">⠿</span>
      <div class="qs-item-icon">
        ${isVideo
          ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="opacity:0.8"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
          : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="opacity:0.8"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>`}
      </div>
      <div class="qs-item-info">
        <div class="qs-item-name">${esc(label)}</div>
        <div class="qs-item-meta">
          <span>${subLabel}</span>
          ${timeBadge}
        </div>
      </div>
      <div class="qs-item-actions">
        <button class="qs-item-btn" onclick="event.stopPropagation();openTimePicker(${idx})" title="Pick a day &amp; time">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Set Time
        </button>
        <button class="qs-item-btn remove" onclick="event.stopPropagation();removeFromQueue(${idx})" title="Remove">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Remove
        </button>
      </div>`;

    row.addEventListener('dragstart', e => {
      qsDragFromQueueIdx = idx; qsDragFromPlId = null;
      row.classList.add('dragging');
      e.dataTransfer.setData('qsQueueIdx', idx);
    });
    row.addEventListener('dragend', () => { row.classList.remove('dragging'); qsDragFromQueueIdx = null; });
    row.addEventListener('dragover', e => {
      e.preventDefault();
      document.querySelectorAll('.qs-queue-item').forEach(r => r.style.borderTop = '');
      row.style.borderTop = '3px solid rgba(255,255,255,0.75)';
    });
    row.addEventListener('dragleave', () => row.style.borderTop = '');
    row.addEventListener('drop', e => {
      e.preventDefault();
      row.style.borderTop = '';
      const fromPlId    = e.dataTransfer.getData('qsPlId');
      const fromVideoId = e.dataTransfer.getData('qsVideoId');
      const fromIdx     = e.dataTransfer.getData('qsQueueIdx');
      if (fromPlId) {
        if (!state.playQueue.some(i => i.plId === fromPlId)) {
          state.playQueue.splice(idx, 0, { plId: fromPlId, type: 'playlist', day: '', time: '' });
          saveQueue(); renderQueueSchedule();
        }
      } else if (fromVideoId) {
        if (!state.playQueue.some(i => i.videoId === fromVideoId)) {
          state.playQueue.splice(idx, 0, { videoId: fromVideoId, type: 'video', day: '', time: '' });
          saveQueue(); renderQueueSchedule();
        }
      } else if (fromIdx !== '') {
        const fi = parseInt(fromIdx);
        if (!isNaN(fi) && fi !== idx) {
          const moved = state.playQueue.splice(fi, 1)[0];
          state.playQueue.splice(idx, 0, moved);
          saveQueue(); renderQsQueue(); renderQsSummary();
        }
      }
    });
    list.appendChild(row);
  });
}

function setupQsDropzone(list) {
  list.addEventListener('dragover', e => { e.preventDefault(); list.classList.add('drag-over'); });
  list.addEventListener('dragleave', e => { if (!list.contains(e.relatedTarget)) list.classList.remove('drag-over'); });
  list.addEventListener('drop', e => {
    e.preventDefault(); list.classList.remove('drag-over');
    const plId    = e.dataTransfer.getData('qsPlId');
    const videoId = e.dataTransfer.getData('qsVideoId');
    if (plId && !state.playQueue.some(i => i.plId === plId)) {
      state.playQueue.push({ plId, type: 'playlist', day: '', time: '' });
      saveQueue(); renderQueueSchedule();
    } else if (videoId && !state.playQueue.some(i => i.videoId === videoId)) {
      state.playQueue.push({ videoId, type: 'video', day: '', time: '' });
      saveQueue(); renderQueueSchedule();
    }
  });
}

function removeFromQueue(idx) {
  state.playQueue.splice(idx, 1);
  saveQueue();
  renderQueueSchedule();
  renderDayCols();
  renderSchedulePlaylists();
  renderCalVideos();
}

function clearQueue() {
  if (!state.playQueue.length || !confirm('Clear all items from the queue?')) return;
  state.playQueue = [];
  saveQueue();
  renderQueueSchedule();
  renderDayCols();
  renderSchedulePlaylists();
  renderCalVideos();
  showToast('Queue cleared');
}

function saveQueue() {
  localStorage.setItem('zinnia_queue_v4', JSON.stringify(state.playQueue));
}

function renderQsSummary() {
  const el = document.getElementById('qsSummary');
  if (!state.playQueue.length) { el.innerHTML = '<p class="empty-msg">Your queue summary will appear here.</p>'; return; }

  let totalVideos = 0, totalSecs = 0;
  state.playQueue.forEach(item => {
    if (item.type === 'video' || item.videoId) {
      const v = state.videos.find(v => v.id === item.videoId);
      if (v) { totalVideos++; totalSecs += durationToSeconds(v.duration); }
    } else {
      const pl = state.playlists.find(p => p.id === item.plId);
      if (pl) { totalVideos += pl.videos.length; totalSecs += playlistTotalSeconds(pl); }
    }
  });

  const withTime = state.playQueue.filter(i => i.slots && i.slots.length).length;

  el.innerHTML = `
    <div class="summary-stats">
      <div class="summary-stat"><div class="summary-num">${state.playQueue.length}</div><div class="summary-label">Items</div></div>
      <div class="summary-stat"><div class="summary-num">${totalVideos}</div><div class="summary-label">Videos</div></div>
      <div class="summary-stat"><div class="summary-num" style="font-size:1.1rem">${formatDuration(totalSecs)}</div><div class="summary-label">Total Time</div></div>
    </div>
    ${withTime ? `<p style="font-size:0.74rem;color:var(--muted);margin-bottom:10px">${withTime} item${withTime > 1 ? 's' : ''} with scheduled time</p>` : ''}
    ${state.playQueue.map((item, i) => {
      const isVideo = item.type === 'video' || item.videoId;
      const label   = getQueueItemLabel(item);
      const color   = getQueueItemColor(item);
      const timeStr = (() => {
        if (!item.slots || !item.slots.length) return '';
        const isEveryDay = item.slots.some(s => s.day === '');
        const dayLabel = isEveryDay
          ? 'Every Day'
          : [...new Set(item.slots.map(s => DAYS[parseInt(s.day)].slice(0,3)))].join(', ');
        const timePart = [...new Set(item.slots.map(s => formatTime12(s.time)))].join(', ');
        return [dayLabel, timePart].filter(Boolean).join(' · ');
      })();
      let durSecs = 0;
      if (isVideo) {
        const v = state.videos.find(v => v.id === item.videoId);
        if (v) durSecs = durationToSeconds(v.duration);
      } else {
        const pl = state.playlists.find(p => p.id === item.plId);
        if (pl) durSecs = playlistTotalSeconds(pl);
      }
      return `<div class="summary-pl-row">
        <span style="width:18px;font-size:0.69rem;color:var(--muted);font-weight:700;flex-shrink:0">${i+1}</span>
        <span style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;display:inline-block"></span>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(label)}</span>
        <span style="font-size:0.69rem;color:var(--muted);white-space:nowrap;flex-shrink:0;margin-left:4px">${formatDuration(durSecs)}</span>
        ${timeStr ? `<span style="font-size:0.69rem;color:var(--muted);white-space:nowrap;flex-shrink:0">${esc(timeStr)}</span>` : ''}
      </div>`;
    }).join('')}`;
}

// ─────────────────────────────────── TIME PICKER

function openTimePicker(idx) {
  state.timePickerIdx = idx;
  const item = state.playQueue[idx];
  if (!item) return;
  const label = getQueueItemLabel(item);
  document.getElementById('timePickerPlName').textContent = label;

  // Use earliest existing slot as the default time, or blank
  const firstSlot = item.slots && item.slots.length ? item.slots[0] : null;
  document.getElementById('timePickerTime').value = firstSlot ? firstSlot.time : '';

  // Populate day chips from existing slots
  const dayChips = document.querySelectorAll('#dayChipRow .day-chip');
  const activeDays = item.slots && item.slots.length
    ? item.slots.map(s => s.day)
    : [''];
  const isEveryDay = activeDays.includes('');

  dayChips.forEach(chip => {
    const v = chip.dataset.day;
    chip.classList.remove('active','every-day-active');
    if (v === '' && isEveryDay) chip.classList.add('active','every-day-active');
    else if (v !== '' && !isEveryDay && activeDays.includes(v)) chip.classList.add('active');
  });

  document.getElementById('timePickerModal').classList.add('open');
}
function toggleDayChip(chip) {
  const val = chip.dataset.day;
  const dayChips = Array.from(document.querySelectorAll('#dayChipRow .day-chip'));
  const everyDayChip = dayChips.find(c => c.dataset.day === '');

  if (val === '') {
    // "Every Day" selected — deselect all others, toggle every day
    dayChips.forEach(c => c.classList.remove('active','every-day-active'));
    chip.classList.add('active','every-day-active');
  } else {
    // Deselect "Every Day" chip first
    everyDayChip.classList.remove('active','every-day-active');
    chip.classList.toggle('active');
    // If nothing selected, default back to every day
    const anySelected = dayChips.some(c => c.dataset.day !== '' && c.classList.contains('active'));
    if (!anySelected) {
      everyDayChip.classList.add('active','every-day-active');
    }
  }
}
function closeTimePicker() { document.getElementById('timePickerModal').classList.remove('open'); state.timePickerIdx = null; }

function applyQueueItemTime() {
  if (state.timePickerIdx === null) return;
  const idx  = state.timePickerIdx;
  const time = document.getElementById('timePickerTime').value;
  const item = state.playQueue[idx];
  if (!item) return;

  // Collect selected day chips
  const dayChips = Array.from(document.querySelectorAll('#dayChipRow .day-chip'));
  const selectedDays = dayChips.filter(c => c.classList.contains('active')).map(c => c.dataset.day);
  const isEveryDay = selectedDays.includes('');

  // Build new slots: one slot per selected day (or one every-day slot)
  if (isEveryDay) {
    item.slots = time ? [{ day: '', time }] : [];
  } else {
    item.slots = time
      ? selectedDays.map(d => ({ day: d, time }))
      : [];
  }

  saveQueue();
  closeTimePicker();
  sortQueueByTime();
  renderQsQueue(); renderQsSummary(); renderQsAvailable(); renderQsVideos();
  renderDayCols(); renderSchedulePlaylists(); renderCalVideos(); renderPlaylists();

  if (time) {
    const dayLabel = isEveryDay ? 'Every Day' : selectedDays.map(d => DAYS[parseInt(d)]).join(', ');
    showToast(`Set to play: ${dayLabel} at ${formatTime12(time)}`);
  }
}
function clearQueueItemTime() {
  if (state.timePickerIdx === null) return;
  const item = state.playQueue[state.timePickerIdx];
  if (item) item.slots = [];
  saveQueue();
  closeTimePicker();
  renderQsQueue(); renderQsSummary(); renderQsAvailable(); renderQsVideos();
  renderDayCols(); renderSchedulePlaylists(); renderCalVideos(); renderPlaylists();
  showToast('Play time cleared — still in your queue');
}
// ─────────────────────────────────── CALENDAR VIEW

function getWeekStart(d) {
  const day = new Date(d);
  day.setDate(day.getDate() - day.getDay());
  day.setHours(0,0,0,0);
  return day;
}
function changeWeek(dir) {
  state.currentWeekStart = new Date(state.currentWeekStart);
  state.currentWeekStart.setDate(state.currentWeekStart.getDate() + dir * 7);
  renderSchedule();
}

function renderSchedule() {
  renderWeekHeader();
  renderTimeCol();
  renderDayCols();
  renderSchedulePlaylists();
  const mid = new Date(state.currentWeekStart);
  mid.setDate(mid.getDate() + 3);
  const el = document.getElementById('scheduleMonthTitle');
  if (el) el.textContent = mid.toLocaleDateString('en-US', { month:'long', year:'numeric' });
}

function renderWeekHeader() {
  const el = document.getElementById('weekHeader');
  if (!el) return;
  const today = new Date(); today.setHours(0,0,0,0);
  el.innerHTML = '<div></div>';
  for (let i = 0; i < 7; i++) {
    const d = new Date(state.currentWeekStart);
    d.setDate(d.getDate() + i);
    const isToday = d.getTime() === today.getTime();
    const div = document.createElement('div');
    div.className = 'day-head' + (isToday ? ' today' : '');
    div.innerHTML = `${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]}<span class="day-num">${d.getDate()}</span>`;
    el.appendChild(div);
  }
}

function renderTimeCol() {
  const el = document.getElementById('timeCol');
  if (!el) return;
  el.innerHTML = '';
  for (let h = 6; h < 22; h++) {
    for (let m = 0; m < 60; m += 30) {
      const slot = document.createElement('div');
      slot.className = 'time-slot';
      if (m === 0) {
        const hh = h > 12 ? h - 12 : (h === 0 ? 12 : h);
        slot.textContent = `${hh}${h < 12 ? 'am' : 'pm'}`;
      }
      el.appendChild(slot);
    }
  }
}

// Sort queue items by their earliest slot time, unscheduled at end
function sortQueueByTime() {
  const withSlots    = state.playQueue.filter(i => i.slots && i.slots.length);
  const withoutSlots = state.playQueue.filter(i => !i.slots || !i.slots.length);
  withSlots.sort((a, b) => {
    const aMin = Math.min(...a.slots.map(s => { const [h,m] = s.time.split(':').map(Number); return h*60+m; }));
    const bMin = Math.min(...b.slots.map(s => { const [h,m] = s.time.split(':').map(Number); return h*60+m; }));
    return aMin - bMin;
  });
  state.playQueue = [...withSlots, ...withoutSlots];
  saveQueue();
}

// Helper: get duration minutes for a queue item
function getItemDurationMins(item) {
  if (item.type === 'video' || item.videoId) {
    const v = state.videos.find(v => v.id === item.videoId);
    return v ? Math.ceil(durationToSeconds(v.duration) / 60) : 5;
  }
  const pl = state.playlists.find(p => p.id === item.plId);
  return pl ? Math.ceil(playlistTotalSeconds(pl) / 60) : 30;
}

// Calendar: return all {item, qIdx, slotIdx} for a given day-of-week
// Slots with day==='' appear on ALL days
function queueItemsForDOW(dow) {
  const results = [];
  state.playQueue.forEach((item, qIdx) => {
    if (!item.slots) return;
    item.slots.forEach((slot, slotIdx) => {
      if (!slot.time) return;
      const matchAll = slot.day === '' || slot.day === undefined;
      const matchDay = !matchAll && parseInt(slot.day) === dow;
      if (matchAll || matchDay) results.push({ item, qIdx, slotIdx, slot });
    });
  });
  return results;
}

function timeToSlot(timeStr) {
  const [hStr, mStr] = timeStr.split(':');
  const h = parseInt(hStr), rawM = parseInt(mStr);
  const m = rawM < 15 ? 0 : rawM < 45 ? 30 : 0;
  return { h: rawM >= 45 ? h + 1 : h, m };
}

function renderDayCols() {
  const el = document.getElementById('dayCols');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(state.currentWeekStart);
    d.setDate(d.getDate() + i);
    el.appendChild(buildDayCol(d));
  }
}

function buildDayCol(date) {
  const col = document.createElement('div');
  col.className = 'day-col';
  const dow = date.getDay();

  // Build slot → queue items map for this day-of-week
  const slotMap = {};
  queueItemsForDOW(dow).forEach(({ item, qIdx, slotIdx, slot }) => {
    const { h, m } = timeToSlot(slot.time);
    const key = `${h}_${m}`;
    if (!slotMap[key]) slotMap[key] = [];
    slotMap[key].push({ item, qIdx, slotIdx, slot });
  });

  for (let h = 6; h < 22; h++) {
    for (let m = 0; m < 60; m += 30) {
      const cell = document.createElement('div');
      cell.className = 'day-cell';

      cell.addEventListener('dragover', e => { e.preventDefault(); cell.classList.add('drag-over'); });
      cell.addEventListener('dragleave', () => cell.classList.remove('drag-over'));
      cell.addEventListener('drop', e => {
        e.preventDefault(); cell.classList.remove('drag-over');
        const plId    = e.dataTransfer.getData('playlistId') || e.dataTransfer.getData('qsPlId');
        const videoId = e.dataTransfer.getData('calVideoId');
        const moveData = e.dataTransfer.getData('calMoveSlot'); // "qIdx:slotIdx"
        const timeVal = `${pad(h)}:${pad(m)}`;
        const dayStr  = String(dow);

        if (plId) {
          // Find or create queue entry for this playlist
          let qIdx = state.playQueue.findIndex(i => i.plId === plId);
          if (qIdx < 0) {
            state.playQueue.push({ plId, type: 'playlist', slots: [] });
            qIdx = state.playQueue.length - 1;
          }
          const item = state.playQueue[qIdx];
          if (!item.slots) item.slots = [];
          // Add this day+time slot only if not already present
          const dup = item.slots.some(s => s.day === dayStr && s.time === timeVal);
          if (!dup) item.slots.push({ day: dayStr, time: timeVal });
          const pl = state.playlists.find(p => p.id === plId);
          sortQueueByTime();
          saveQueue(); renderDayCols(); renderQueueSchedule(); renderSchedulePlaylists(); renderPlaylists();
          showToast(`"${pl?.name}" added to ${DAYS[dow]} at ${formatTime12(timeVal)}`);

        } else if (videoId) {
          // Find or create queue entry for this video
          let qIdx = state.playQueue.findIndex(i => i.videoId === videoId);
          if (qIdx < 0) {
            state.playQueue.push({ videoId, type: 'video', slots: [] });
            qIdx = state.playQueue.length - 1;
          }
          const item = state.playQueue[qIdx];
          if (!item.slots) item.slots = [];
          const dup = item.slots.some(s => s.day === dayStr && s.time === timeVal);
          if (!dup) item.slots.push({ day: dayStr, time: timeVal });
          const v = state.videos.find(v => v.id === videoId);
          sortQueueByTime();
          saveQueue(); renderDayCols(); renderQueueSchedule(); renderSchedulePlaylists();
          showToast(`"${v?.title}" added to ${DAYS[dow]} at ${formatTime12(timeVal)}`);

        } else if (moveData) {
          // Moving an existing slot to a new day/time
          const [qIdxStr, slotIdxStr] = moveData.split(':');
          const qIdx = parseInt(qIdxStr), slotIdx = parseInt(slotIdxStr);
          if (!isNaN(qIdx) && !isNaN(slotIdx) && state.playQueue[qIdx]?.slots?.[slotIdx]) {
            state.playQueue[qIdx].slots[slotIdx] = { day: dayStr, time: timeVal };
            sortQueueByTime();
            saveQueue(); renderDayCols(); renderQueueSchedule(); renderSchedulePlaylists(); renderPlaylists();
          }
        }
      });

      // Render events from slots
      const key = `${h}_${m}`;
      if (slotMap[key]) {
        slotMap[key].forEach(({ item, qIdx, slotIdx, slot }) => {
          const isVideo = item.type === 'video' || item.videoId;
          let blockLabel = '', blockColor = getQueueItemColor(item);
          const dMins = getItemDurationMins(item);

          if (isVideo) {
            const v = state.videos.find(v => v.id === item.videoId);
            blockLabel = v?.title || 'Video';
          } else {
            const pl = state.playlists.find(p => p.id === item.plId);
            blockLabel = pl?.name || 'Playlist';
          }

          const block = document.createElement('div');
          block.className = 'event-block';
          block.style.background = blockColor;
          block.draggable = true;
          block.title = `${blockLabel} — ${slot.day === '' ? 'Every Day' : DAYS[dow]} ${formatTime12(slot.time)}`;

          const slotHeight = 38;
          const blockH = Math.max(slotHeight - 4, Math.round((dMins / 30) * slotHeight) - 4);
          block.style.height = `${blockH}px`;
          block.style.top    = '2px';
          block.style.bottom = 'auto';
          block.style.zIndex = '2';

          const durLabel = dMins >= 60
            ? `${Math.floor(dMins/60)}h${dMins%60 ? ' '+dMins%60+'m' : ''}`
            : `${dMins}m`;

          block.innerHTML = `
            <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1;display:flex;flex-direction:column;gap:1px">
              <span>${esc(blockLabel)}</span>
              ${dMins > 30 ? `<span style="font-size:0.58rem;opacity:0.8">${durLabel}</span>` : ''}
            </span>
            <button class="event-remove" onclick="event.stopPropagation();removeSlotFromQueue(${qIdx},${slotIdx})" title="Remove from calendar">✕</button>`;

          // Pass qIdx:slotIdx so the drop handler knows which slot is moving
          block.addEventListener('dragstart', e => {
            e.dataTransfer.setData('calMoveSlot', `${qIdx}:${slotIdx}`);
            block.classList.add('dragging');
          });
          block.addEventListener('dragend', () => block.classList.remove('dragging'));
          cell.appendChild(block);
        });
      }
      col.appendChild(cell);
    }
  }
  return col;
}
// Remove one slot from a queue item. If no slots remain, remove the item entirely.
function removeSlotFromQueue(qIdx, slotIdx) {
  const item = state.playQueue[qIdx];
  if (!item || !item.slots) return;
  const label = getQueueItemLabel(item);
  item.slots.splice(slotIdx, 1);
  if (item.slots.length === 0) {
    // No more scheduled slots — keep item in queue but unscheduled
    // (user can re-schedule or remove manually from queue view)
  }
  saveQueue();
  renderDayCols(); renderQueueSchedule(); renderSchedulePlaylists(); renderPlaylists();
  showToast(`"${label}" removed from this time slot`);
}

// Schedule sidebar chips (greyed out when already scheduled on calendar)
function renderSchedulePlaylists() {
  const el    = document.getElementById('schedulePlaylists');
  const empty = document.getElementById('scheduleNoPlaylists');
  if (!el) return;
  el.innerHTML = '';
  if (!state.playlists.length) { if (empty) empty.style.display = ''; return; }
  if (empty) empty.style.display = 'none';

  state.playlists.forEach(pl => {
    const qItem = state.playQueue.find(i => i.plId === pl.id);
    const slots = qItem?.slots || [];
    const scheduled = slots.length > 0;
    const chip = document.createElement('div');
    chip.className = 'schedule-playlist-chip';
    chip.style.background = pl.color;
    chip.draggable = true;

    let slotSummary = '';
    if (scheduled) {
      const isEveryDay = slots.some(s => s.day === '');
      const dayLabel = isEveryDay ? 'Every Day' : [...new Set(slots.map(s => DAYS[parseInt(s.day)].slice(0,3)))].join(', ');
      const timePart = [...new Set(slots.map(s => formatTime12(s.time)))].join(', ');
      slotSummary = `${dayLabel} · ${timePart}`;
    }

    chip.title = scheduled
      ? `Playing: ${slotSummary} — drag to add another slot`
      : 'Drag onto the calendar to set a play time';

    chip.innerHTML = `
      <div>
        <div>${esc(pl.name)}</div>
        <div class="chip-meta">
          ${pl.videos.length} video${pl.videos.length !== 1 ? 's' : ''}
          ${scheduled ? ` · ${slots.length} slot${slots.length > 1 ? 's' : ''}` : ''}
        </div>
      </div>
      ${scheduled
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>`}`;

    chip.addEventListener('dragstart', e => { e.dataTransfer.setData('playlistId', pl.id); chip.classList.add('dragging'); });
    chip.addEventListener('dragend',   () => chip.classList.remove('dragging'));
    el.appendChild(chip);
  });
}

// ─────────────────────────────────── PLAYER

function renderPlayerPage() {
  // Build queue from playQueue if not already set by playNow()
  if (!state.queue || !state.queue.length) {
    const queueVideos = [];
    state.playQueue.forEach(item => {
      if (item.type === 'video' || item.videoId) {
        const v = state.videos.find(v => v.id === item.videoId);
        if (v) queueVideos.push(v);
      } else {
        const pl = state.playlists.find(p => p.id === item.plId);
        if (pl) queueVideos.push(...pl.videos);
      }
    });
    if (!queueVideos.length) {
      const selected = state.videos.filter(v => state.selectedVideoIds.has(v.id));
      state.queue = selected.length ? selected : state.videos.slice(0, 8);
    } else {
      state.queue = queueVideos;
    }
  }
  state.currentPlayerIdx = 0;

  const queueEl = document.getElementById('queueList');
  queueEl.innerHTML = '';
  state.queue.forEach((v, idx) => {
    const item = document.createElement('div');
    item.className = 'queue-item' + (idx === 0 ? ' active' : '');
    item.onclick = () => playVideoAtIdx(idx);
    item.innerHTML = `
      <img src="${esc(v.thumb)}" alt="" onerror="this.style.display='none'" />
      <span style="line-height:1.3">${esc(v.title)}</span>`;
    queueEl.appendChild(item);
  });

  if (state.queue.length) loadPlayerVideo(state.queue[0]);
}

function loadPlayerVideo(video) {
  document.getElementById('playerVideoTitle').textContent    = video.title;
  document.getElementById('playerVideoDuration').textContent = video.duration;
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('timeDisplay').textContent  = '0:00';
  state.progressPct = 0;
  clearInterval(state.progressTimer);
  state.isPlaying = false;
  const icon = document.getElementById('playPauseIcon');
  if (icon) icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';

  const embed = document.getElementById('playerEmbed');
  // Show thumbnail as preview
  embed.innerHTML = `
    <img src="${esc(video.thumb)}" alt="${esc(video.title)}"
         style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;opacity:0.7" />
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">
      <button onclick="togglePlay()" style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.92);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#072843"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
      <p style="color:white;font-size:0.82rem;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,0.5)">${esc(video.title)}</p>
    </div>`;
}

function playVideoAtIdx(idx) {
  if (!state.queue?.length || idx >= state.queue.length) return;
  state.currentPlayerIdx = idx;
  document.querySelectorAll('.queue-item').forEach((el, i) => el.classList.toggle('active', i === idx));
  loadPlayerVideo(state.queue[idx]);
}
function prevVideo() { playVideoAtIdx(Math.max(0, state.currentPlayerIdx - 1)); }
function nextVideo() { playVideoAtIdx(Math.min((state.queue?.length || 1) - 1, state.currentPlayerIdx + 1)); }

function togglePlay() {
  state.isPlaying = !state.isPlaying;
  const icon = document.getElementById('playPauseIcon');
  if (state.isPlaying) {
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    runProgress();
  } else {
    icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    clearInterval(state.progressTimer);
  }
}

function runProgress() {
  clearInterval(state.progressTimer);
  state.progressTimer = setInterval(() => {
    state.progressPct = Math.min(state.progressPct + 0.08, 100);
    document.getElementById('progressFill').style.width = state.progressPct + '%';
    // Fake time display from duration
    const video = state.queue?.[state.currentPlayerIdx];
    if (video) {
      const parts = video.duration.split(':').map(Number);
      const totalSecs = parts.length === 3 ? parts[0]*3600 + parts[1]*60 + parts[2] : parts[0]*60 + parts[1];
      const elapsed = Math.floor(totalSecs * state.progressPct / 100);
      document.getElementById('timeDisplay').textContent = formatDuration(elapsed);
    }
    if (state.progressPct >= 100) { clearInterval(state.progressTimer); state.isPlaying = false; nextVideo(); }
  }, 200);
}

function seekProgress(e) {
  const bar = e.currentTarget;
  const pct = (e.offsetX / bar.offsetWidth) * 100;
  state.progressPct = pct;
  document.getElementById('progressFill').style.width = pct + '%';
}

// ─────────────────────────────────── BROWSE

function renderBrowsePage() {
  const el = document.getElementById('browseGenres');
  if (!el) return;
  el.innerHTML = '';
  GENRES.forEach(g => {
    const card = document.createElement('div');
    card.className = 'browse-genre-card';
    card.style.background = GENRE_BG[g] || '#e0eaf5';
    card.innerHTML = `<span>${esc(g)}</span>`;
    card.onclick = () => { showPage('playlists'); selectGenreByName(g); };
    el.appendChild(card);
  });
}

function selectGenreByName(genre) {
  document.querySelectorAll('#genrePills .pill').forEach(p => {
    if (p.textContent.trim() === genre) { selectGenre(p, genre); }
  });
}

// ─────────────────────────────────── UTILITIES

function formatTime12(timeStr) {
  if (!timeStr) return '';
  const [hStr, mStr] = timeStr.split(':');
  const h = parseInt(hStr), m = parseInt(mStr);
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${pad(m)} ${ampm}`;
}

function formatDuration(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}

function durationToSeconds(durStr) {
  if (!durStr) return 0;
  const parts = String(durStr).split(':').map(Number);
  if (parts.length === 3) return parts[0]*3600 + parts[1]*60 + parts[2];
  if (parts.length === 2) return parts[0]*60 + parts[1];
  return 0;
}

function playlistTotalSeconds(pl) {
  if (!pl) return 0;
  return pl.videos.reduce((s, v) => s + durationToSeconds(v.duration), 0);
}

function pad(n) { return String(n).padStart(2,'0'); }

function esc(str) {
  return String(str||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ─────────────────────────────────── KEYBOARD / MODAL CLOSE

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeSaveModal(); closeEditModal(); closeTimePicker();
});
['saveModal','editModal','timePickerModal'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', function(e) {
    if (e.target !== this) return;
    if (id === 'saveModal')       closeSaveModal();
    if (id === 'editModal')       closeEditModal();
    if (id === 'timePickerModal') closeTimePicker();
  });
});