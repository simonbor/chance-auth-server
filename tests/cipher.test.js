describe('cipher module test', () => {

    test('flat password is should be match the decrypted password', () => {
        const crypt = require('../src/cipher');
        
        const flatPassword = 'tEsTpAsSwOrD';
        const encPassword = crypt.encrypt(flatPassword);
        const decPassword = crypt.decrypt(encPassword);
        
        // to create a new password uncomment next lines and run the test
        // console.log(`the pass: ${decPassword}`);
        // console.log(`enc pass: ${encPassword}`);

        // for creation the new encryption key uncomment the next line
        // console.log(crypt.generateKey());

        expect(flatPassword).not.toMatch(encPassword);
        expect(flatPassword).toMatch(decPassword);
      });
    
});