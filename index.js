const PORT = 3001;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const electron = require('electron');
const { app: electronApp, BrowserWindow, screen } = electron;
const cacheTime = 86400000 * 30;
const interiors = require(path.join(__dirname, 'data/interiors.js'));
const interiors2 = require(path.join(__dirname, 'data/interiors2.js'));
const locales = require(path.join(__dirname, 'data/locales/index.js'));

// APP Routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/tablet/dist/index.html');
});
app.get('/viewer', (req, res) => {
  res.sendFile(__dirname + '/signage/dist/index.html');
});
app.get('/interiors', (req, res) => {
  res.send(interiors);
});
app.get('/interiors2', (req, res) => {
  res.send(interiors2);
});
app.get('/locales', (req, res) => {
  res.send(locales);
});

// APP Asset Setup
const assetOption = {
  maxAge: process.env.NODE_ENV !== 'production' ? 0 : cacheTime,
};
app.use(express.static(path.join(__dirname, "tablet/dist"), assetOption));
app.use(express.static(path.join(__dirname, "assets"), assetOption));
app.use(express.static(path.join(__dirname, "data"), assetOption));
app.use(express.static(path.join(__dirname, "signage/dist"), assetOption));

// Socket setup
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  perMessageDeflate: false,
});

io.on("connection", (socket) => {
  // Bespoke Studio
  socket.on("init", (data) => socket.broadcast.emit("init", data));
  socket.on("moveToInteriorList", (data) => socket.broadcast.emit("moveToInteriorList", data)); // 인테리어 스크롤
  socket.on("scrollInterior", (data) => socket.broadcast.emit("scrollInterior", data)); // 인테리어 스크롤
  socket.on("setInterior", (data) => socket.broadcast.emit("setInterior", data)); // 선택한 인테리어
  socket.on("setInteriorList", (data) => socket.broadcast.emit("setInteriorList", data)); // 인테리어 리스트
  socket.on("setProducts", (data) => socket.broadcast.emit("setProducts", data)); // 냉장고 데이터
  socket.on("setProductList", (data) => socket.broadcast.emit("setProductList", data)); // 냉장고 제외 나머지 제품
  socket.on("showProduct", (data) => socket.broadcast.emit("showProduct", data)); // 제품 크게보기에서 냉장고 선택
  socket.on("showResultPage", (data) => socket.broadcast.emit("showResultPage", data)); // preview 페이지
  socket.on("closeLandingPage", (data) => socket.broadcast.emit("closeLandingPage", data)); // 랜딩영상 닫는거
  socket.on("setPreviewMode", (data) => socket.broadcast.emit("setPreviewMode", data)); // 제품 크게보기, 인테리어랑 같이보기 토글
  socket.on("paging", (data) => socket.broadcast.emit("paging", data)); // 제품 모델리스트 페이징
  socket.on("totalPage", (data) => socket.broadcast.emit("totalPage", data)); // 제품 모델리스트 총 페이지 갯수
  socket.on("isKitchen", (data) => socket.broadcast.emit("isKitchen", data)); // 키친인지, 리빙인지 구분
  socket.on("useProductType", (data) => socket.broadcast.emit("useProductType", data)); // 키친인지, 리빙인지 구분
  socket.on("previewMode", (data) => socket.broadcast.emit("previewMode", data));
  socket.on("moveProductStep", (data) => socket.broadcast.emit("moveProductStep", data));
  socket.on("productPreviewMode", (data) => socket.broadcast.emit("productPreviewMode", data));
  socket.on("setIsColor", (data) => socket.broadcast.emit("setIsColor", data)); // 선택한 인테리어
  socket.on("isSmallAirDresser", (data) => socket.broadcast.emit("isSmallAirDresser", data)); // 450mm 에어드레서 선택한 경우

  // Smart Things
  socket.on("turnOnHood", (data) => socket.broadcast.emit("turnOnHood", data));
  socket.on("turnOnTV", (data) => socket.broadcast.emit("turnOnTV", data));
  socket.on("musicPlay", (data) => socket.broadcast.emit("musicPlay", data));
  socket.on("chartInit", (data) => socket.broadcast.emit("chartInit", data));
  socket.on("chartStart", (data) => socket.broadcast.emit("chartStart", data));
  socket.on("chartEnd", (data) => socket.broadcast.emit("chartEnd", data));
  socket.on("energyInit", (data) => socket.broadcast.emit("energyInit", data));
  socket.on("energySaving", (data) => socket.broadcast.emit("energySaving", data));
  socket.on("saveModeStart", (data) => socket.broadcast.emit("saveModeStart", data));
  socket.on("aiSavingMode", (data) => socket.broadcast.emit("aiSavingMode", data));
  socket.on("aiSavingModeEnd", (data) => socket.broadcast.emit("aiSavingModeEnd", data));
  socket.on("playVideo", (data) => socket.broadcast.emit("playVideo", data));
  socket.on("playAirCareVideo", (data) => socket.broadcast.emit("playAirCareVideo", data));
  socket.on("playClothingCareVideo", (data) => socket.broadcast.emit("playClothingCareVideo", data));
  socket.on("enteredGuidedCooking", (data) => socket.broadcast.emit("enteredGuidedCooking", data));
  socket.on("playCookingVideo", (data) => socket.broadcast.emit("playCookingVideo", data));
  socket.on("playCookingVideo2", (data) => socket.broadcast.emit("playCookingVideo2", data));
  socket.on("playCookingVideo3", (data) => socket.broadcast.emit("playCookingVideo3", data));
  socket.on("playCookingVideo4", (data) => socket.broadcast.emit("playCookingVideo4", data));
  socket.on("playCookingVideo5", (data) => socket.broadcast.emit("playCookingVideo5", data));
  socket.on("playCookingVideo6", (data) => socket.broadcast.emit("playCookingVideo6", data));
  socket.on("playCookingVideo7", (data) => socket.broadcast.emit("playCookingVideo7", data));
  socket.on("playCookingVideo8", (data) => socket.broadcast.emit("playCookingVideo8", data));
  socket.on("LandingPage", (data) => socket.broadcast.emit("LandingPage", data));
  socket.on("TabPetCarePageIndex", (data) => socket.broadcast.emit("TabPetCarePageIndex", data));
  socket.on("TabPetCarePage1", (data) => socket.broadcast.emit("TabPetCarePage1", data));
  socket.on("TabPetCarePage2", (data) => socket.broadcast.emit("TabPetCarePage2", data));
  socket.on("TabPetCarePage3", (data) => socket.broadcast.emit("TabPetCarePage3", data));
  socket.on("TabPetCarePage4", (data) => socket.broadcast.emit("TabPetCarePage4", data));
  socket.on("TabPetCarePage5", (data) => socket.broadcast.emit("TabPetCarePage5", data));
  socket.on("TabPetCarePage6", (data) => socket.broadcast.emit("TabPetCarePage6", data));
  socket.on("TabEnergyPageIndex", (data) => socket.broadcast.emit("TabEnergyPageIndex", data));
  socket.on("TabEnergyPage1", (data) => socket.broadcast.emit("TabEnergyPage1", data));
  socket.on("TabEnergyPage2", (data) => socket.broadcast.emit("TabEnergyPage2", data));
  socket.on("TabEnergyPage3", (data) => socket.broadcast.emit("TabEnergyPage3", data));
  socket.on("TabEnergyPage4", (data) => socket.broadcast.emit("TabEnergyPage4", data));
  socket.on("TabEnergyPage5", (data) => socket.broadcast.emit("TabEnergyPage5", data));
  socket.on("TabCookingPageIndex", (data) => socket.broadcast.emit("TabCookingPageIndex", data));
  socket.on("TabCookingPage1", (data) => socket.broadcast.emit("TabCookingPage1", data));
  socket.on("TabCookingPage2", (data) => socket.broadcast.emit("TabCookingPage2", data));
  socket.on("TabCookingPage3", (data) => socket.broadcast.emit("TabCookingPage3", data));
  socket.on("TabCookingPage5", (data) => socket.broadcast.emit("TabCookingPage5", data));
  socket.on("TabCookingPage6", (data) => socket.broadcast.emit("TabCookingPage6", data));
  socket.on("TabCookingPage7", (data) => socket.broadcast.emit("TabCookingPage7", data));
  socket.on("TabCookingPage8", (data) => socket.broadcast.emit("TabCookingPage8", data));
  socket.on("TabCookingPage9", (data) => socket.broadcast.emit("TabCookingPage9", data));
  socket.on("TabCookingPage10", (data) => socket.broadcast.emit("TabCookingPage10", data));
  socket.on("TabCookingPage11", (data) => socket.broadcast.emit("TabCookingPage11", data));
  socket.on("TabAirCarePageIndex", (data) => socket.broadcast.emit("TabAirCarePageIndex", data));
  socket.on("TabAirCarePage1", (data) => socket.broadcast.emit("TabAirCarePage1", data));
  socket.on("TabAirCarePage2", (data) => socket.broadcast.emit("TabAirCarePage2", data));
  socket.on("TabAirCarePage3", (data) => socket.broadcast.emit("TabAirCarePage3", data));
  socket.on("TabAirCarePage4", (data) => socket.broadcast.emit("TabAirCarePage4", data));
  socket.on("TabAirCarePage5", (data) => socket.broadcast.emit("TabAirCarePage5", data));
  socket.on("TabAirCarePage6", (data) => socket.broadcast.emit("TabAirCarePage6", data));
  socket.on("TabClothingCarePageIndex", (data) => socket.broadcast.emit("TabClothingCarePageIndex", data));
  socket.on("TabClothingCarePage1", (data) => socket.broadcast.emit("TabClothingCarePage1", data));
  socket.on("TabClothingCarePage2", (data) => socket.broadcast.emit("TabClothingCarePage2", data));
  socket.on("TabClothingCarePage3", (data) => socket.broadcast.emit("TabClothingCarePage3", data));
  socket.on("TabClothingCarePage4", (data) => socket.broadcast.emit("TabClothingCarePage4", data));
  socket.on("TabClothingCarePage5", (data) => socket.broadcast.emit("TabClothingCarePage5", data));
  socket.on("TabClothingCarePage6", (data) => socket.broadcast.emit("TabClothingCarePage6", data));
  socket.on("TabHomeCarePageIndex", (data) => socket.broadcast.emit("TabHomeCarePageIndex", data));
  socket.on("TabHomeCarePage1", (data) => socket.broadcast.emit("TabHomeCarePage1", data));
  socket.on("showHomeCareMark", (data) => socket.broadcast.emit("showHomeCareMark", data));
  socket.on("useHomeCareMark", (data) => socket.broadcast.emit("useHomeCareMark", data));
  socket.on("hideHomeCareMark", (data) => socket.broadcast.emit("hideHomeCareMark", data));
  socket.on("TabHomeCarePage2", (data) => socket.broadcast.emit("TabHomeCarePage2", data));
  socket.on("TabHomeCarePage3", (data) => socket.broadcast.emit("TabHomeCarePage3", data));
  socket.on("TabHomeCarePage4", (data) => socket.broadcast.emit("TabHomeCarePage4", data));
  socket.on("TabHomeCarePage5", (data) => socket.broadcast.emit("TabHomeCarePage5", data));
  socket.on("TabHomeCarePage6", (data) => socket.broadcast.emit("TabHomeCarePage6", data));
});

require('dns').lookup(require('os').hostname(), (err, ip, fam) => {
  http.listen(PORT, () => {
    const domain = `http://${ip}:${PORT}`;
    console.log(`
      -------------------------------------------------
      server running on ${domain}

      ${domain} = simulator control page
      ${domain}/viewer = simulator signage viewer
      -------------------------------------------------
    `);
  });
});

// electron setup
let controllerWindow = null;
let viewerWindow = null;
const options = {
  fullscreen: true,
  autoHideMenuBar: true,
  kiosk: true,
  alwaysOnTop: process.env.NODE_ENV === 'production',
};

const BASE_URL = `http://localhost:${PORT}`;

electronApp && electronApp.on('ready', () => {
  const openBespokeWindow = () => {
    const displays = electron.screen.getAllDisplays();
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const externalDisplay = displays.find((display) => display.bounds.x !== 0 || display.bounds.y !== 0);

    if (displays.length !== 2) {
      viewerWindow?.close();
      viewerWindow = new BrowserWindow({
        width,
        height,
        ...options,
      });

      viewerWindow.loadURL(`${BASE_URL}/viewer#/setup`);
      viewerWindow.maximize();

      return;
    }

    if (externalDisplay) {
      viewerWindow?.close();
      viewerWindow = new BrowserWindow({
        x: externalDisplay.bounds.x,
        y: externalDisplay.bounds.y,
        width: externalDisplay.workArea.width,
        height: externalDisplay.workArea.height,
        ...options,
      });
    }
    
    controllerWindow = new BrowserWindow({
      ...options,
      width,
      height,
    });

    controllerWindow.loadURL(BASE_URL);
    controllerWindow.maximize();

    viewerWindow.loadURL(`${BASE_URL}/viewer`);
    viewerWindow.maximize();
  }

  openBespokeWindow();

  screen.on('display-added', () => {
    const displays = electron.screen.getAllDisplays();

    if (displays.length === 2) openBespokeWindow();
  });

  screen.on('display-removed', () => {
    const displays = electron.screen.getAllDisplays();
    if (displays.length !== 2) {
      controllerWindow?.close();

      openBespokeWindow();
    }
  });
});
