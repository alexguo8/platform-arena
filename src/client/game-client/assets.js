const ASSET_NAMES = [
  'ship.svg',
  'bullet.svg',
  "greenBullet.png",
  "pandaRight.png",
  "pandaLeft.png",
  "explosion.png",
  "drillRight.png",
  "bomb.png",
  "mine.png",
  "drillPowerup.png",
  "minePowerup.png",
  "bombPowerup.png",
  "reflectPowerup.png"
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
