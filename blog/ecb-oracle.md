---
layout: default
title: ECB Oracle
---

# Cryptohack - ECB Oracle

```
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


KEY = ?
FLAG = ?


@chal.route('/ecb_oracle/encrypt/<plaintext>/')
def encrypt(plaintext):
    plaintext = bytes.fromhex(plaintext)

    padded = pad(plaintext + FLAG.encode(), 16)
    cipher = AES.new(KEY, AES.MODE_ECB)
    try:
        encrypted = cipher.encrypt(padded)
    except ValueError as e:
        return {"error": str(e)}

    return {"ciphertext": encrypted.hex()}
```

In this challenge, the flag is appended to the user input. The resulting plaintext is padded to blocks of 16 and then encrypted using AES in Electronic Code Book (ECB) mode. The user must leverage the determistic nature of ECB mode encryption (since there's no IV to provide randomness) to obtain the flag by bruteforcing each individual byte, such that the ciphertext for each block matches the output given by the program. 

Remember that in Eletronic Code Book (ECB) mode, blocks are encrypted independently. So, for plaintext consisting of 42 bytes, bytes 1-16 will always be encrypted in  the first block of the ciphertext, 17-32 in the second block, and 33-42 will be padded to 48 and encrypted in the third block of the ciphertext.

In our challenge, the flag is being appended to the user input. Therefore, we can bruteforce each byte by isolating it within a block. For an example, if we give the program an input consisting of 15 `'a'` characters, the first block to be encrypted will consist of:

$P1 = aaaaaaaaaaaaaaa + \text{1st byte of the flag}$

To which the first ciphertext block will consist of:

`82b3d9c4d0dd50e9004096c317b89012`

To guess the first byte of the flag, we can just try to fill in the last byte of the block ourselves with characters until we find the ciphertext that matches its first block to ours. In this case, the matching character will be `'c'`, which we already knew since flags follow a `crypto{<leetspeak>}` pattern.

To bruteforce the second byte, the user can then just remove a byte from his/her input. As we now have 14 `'a'` characters, the second byte of the flag (`'r'`) will be included within the first block, which will give us the ciphertext block to be found. 

$P1 = aaaaaaaaaaaaaac + \text{2nd byte of the flag}$

We can just add the characters found thus far to the string being bruteforced and repeat the process until it is complete.

