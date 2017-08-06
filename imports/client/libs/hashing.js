const SHA1 = require('crypto-js/sha1');
const SHA256 = require('crypto-js/sha256');
const MD5 = require('crypto-js/md5');


export default Hasing = (files) => {
  const reader = new FileReader();

  function process() {
    const hash = [];
    const data = files[0];
    if (data === undefined) { return; }
    reader.readAsBinaryString(files[0]);
    reader.onloadend = function () {
      hash.sha1 = SHA1(reader.result).toString();
      hash.sha256 = SHA256(reader.result).toString();
      hash.md5 = MD5(reader.result).toString();
      // //console.log('1 Checksum', hash1);
      // //console.log('MD5 Checksum', hash);
    };
    return hash;
  }
  process();
};
