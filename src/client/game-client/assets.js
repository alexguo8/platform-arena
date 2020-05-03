const ASSET_NAMES = [
  'ship.svg',
  'bullet.svg',
  "greenBullet.png",
  "blueBullet.png",
  "redBullet.png",
  "yellowBullet.png",
  "pandaRight.png",
  "pandaLeft.png",
  "sealLeft.png",
  "sealRight.png",
  "dinoLeft.png",
  "dinoRight.png",
  "eagleLeft.png",
  "eagleRight.png",
  "explosion.png",
  "shield.png",
  "drillRight.png",
  "bomb.png",
  "mine.png",
  "drillPowerup.png",
  "minePowerup.png",
  "bombPowerup.png",
  "reflectPowerup.png",
  "crown.png",
  "bamboo.png",
  "laser.png",
  "fireCloud.png",
  "teleportBulletRight.png",
  "teleportBulletLeft.png",
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
            console.log(`Downloaded ${assetName}`);
            assets[assetName] = asset;
            resolve();
        };
        asset.src = `/assets/${assetName}`;
    });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];

// const ASSET_NAMES = [
//     'ship.svg',
//     'bullet.svg',
//     "greenBullet.png",
//     "pandaRight.png",
//     "pandaLeft.png",
//     "explosion.png",
//     "drillRight.png",
//     "bomb.png",
//     "mine.png",
//     "drillPowerup.png",
//     "minePowerup.png",
//     "bombPowerup.png",
//     "reflectPowerup.png"
//   ];
  
//   export class AssetsHandler {
//       constructor() {
//           this.assets = {};
//           this.downloadPromise = Promise.all(ASSET_NAMES.map(this.downloadAsset));
//       }
  
//       downloadAsset(assetName) {
//           return new Promise(resolve => {
//               const asset = new Image();
//               asset.onload = () => {
//                   console.log(`Downloaded ${assetName}`);
//                   this.assets[assetName] = asset;
//                   resolve();
//               };
//               asset.src = `/assets/${assetName}`;
//           });
//       }
      
//       downloadAssets = () => this.downloadPromise;
  
//       getAsset = assetName => this.assets[assetName];
  
//   }
  