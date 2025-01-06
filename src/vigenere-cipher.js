const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i += 1) {
      const messageChar = message[i];

      if (/[A-Z]/.test(messageChar)) {
        const keyChar = key[keyIndex % key.length];
        const shift = keyChar.charCodeAt(0) - 65;

        const encryptedChar = String.fromCharCode(((messageChar.charCodeAt(0) - 65 + shift) % 26) + 65);
        encryptedMessage += encryptedChar;

        keyIndex += 1;
      } else {
        encryptedMessage += messageChar;
      }
    }

    if (!this.isDirect) {
      encryptedMessage = encryptedMessage.split('').reverse().join('');
    }

    return encryptedMessage;
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i += 1) {
      const encryptedChar = encryptedMessage[i];

      if (/[A-Z]/.test(encryptedChar)) {
        const keyChar = key[keyIndex % key.length];
        const shift = keyChar.charCodeAt(0) - 65;

        const decryptedChar = String.fromCharCode(((encryptedChar.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        decryptedMessage += decryptedChar;

        keyIndex++;
      } else {
        decryptedMessage += encryptedChar;
      }
    }

    if (!this.isDirect) {
      decryptedMessage = decryptedMessage.split('').reverse().join('');
    }

    return decryptedMessage;
  }
}

module.exports = {
  VigenereCipheringMachine
};
