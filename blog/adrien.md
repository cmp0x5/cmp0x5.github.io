---
layout: default
title: Adrien's Signs
---

# Cryptohack - Adrien's Signs
We are given two files, `source.py` and `output.txt`.

`source.py` shows the source code that Adrien used to hide the flag, and is given as:
```python
from random import randint

a = 288260533169915
p = 1007621497415251

FLAG = b'crypto{????????????????????}'


def encrypt_flag(flag):
    ciphertext = []
    plaintext = ''.join([bin(i)[2:].zfill(8) for i in flag])
    for b in plaintext:
        e = randint(1, p)
        n = pow(a, e, p)
        if b == '1':
            ciphertext.append(n)
        else:
            n = -n % p
            ciphertext.append(n)
    return ciphertext


print(encrypt_flag(FLAG))
```

The `encrypt_flag` function iterates through each byte of the flag and converts it to its 8-bit binary representation. Then, the function iterates through each bit and generates a number based on whether that bit is '1' or '0', appending said number to the ciphertext array. For each bit:

- If the bit is '1', the number appended to the ciphertext is $n \equiv a^e \pmod{p}$, where $p$ is a prime number satisfying $p \equiv 3 \pmod{4}$, $\gcd(a, p) = 1$ and `e = randint(1, p)`.
- If the bit is a '0', the number appended to the ciphertext instead is the additive inverse of $a^e \pmod{p}$: $-a^e \pmod{p}$.

`output.txt` contains the 224-element array generated from `source.py`.

Therefore, for each of the numbers in the ciphertext that represent a bit of the flag, we need to  find a way to distinguish numbers representing $a^e$ from their additive inverses.

Note that due to $p$ being a prime number, we can use the Legendre Symbol to check if $a$ is a quadractic residue mod $p$. The definition of a quadractic residue is:

- $q$ is a quadractic residue modulo $n$ if there exists $x$ such that $x^2 \equiv q \pmod{n}$.

Legendre's Symbol states that, for a prime number $p$:

- $a^\frac{p-1}{2} \equiv 1 \pmod{p}$, if $a$ is a quadractic residue modulo $p$

- $a^\frac{p-1}{2} \equiv -1 \pmod{p}$, if $a$ is a quadractic non-residue modulo $p$.

Since $288260533169915^\frac{1007621497415250}{2} \equiv 1 \pmod{1007621497415251}$, we can confirm that $a$ is a quadractic residue mod $p$.

Remember that $p \equiv 3 \pmod{4}$. From the first supplement of quadractic reciprocity, we know that the negative of a quadractic residue modulo $p$ will always be a non-residue and vice-versa. This means we can use Legendre's Symbol to differentiate between a number and its additive inverse mod p. 

However, the numbers in the ciphertext are powers of $a$ in the range $(1, p)$. 
Note that, for a quadractic residue $a$, there exists a value $x$ such that $x^2 \equiv a \pmod{p}$.

If we exponentiate $a$ to a value $k$; $k > 0$:

$(x^2)^k \equiv a^k \pmod{p}$

$ x^{2k} \equiv a^k \pmod{p}$

Therefore, the quadractic residue property holds for powers of $a$, and thus we can use Legendre's Symbol to differentiate between the 1 and 0 bits in the ciphertext.
Calculate Legendre's Symbol for each element in the array, and replace it with the 1 or 0 bit accordingly:

```python
flag = ""
leg_exp = int((p-1) / 2)

for bit in ciphertext:
    legendre = pow(bit, leg_exp, p)
    if legendre == 1:
        flag += "1"
    else:
        flag += "0"

```
Which converts the ciphertext back into the bits of our flag despite the randomness of `e`.
