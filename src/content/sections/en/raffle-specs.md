---
title: Specs
pages: ['raffle-auction']
---

### Security

- The smart contracts for the Auction & Raffle can be viewed [here](https://github.com/TrueFiEng/devcon-raffle).
- The contracts were audited by Trail of Bits, and the Audit Report can be viewed [here](https://drive.google.com/file/d/1I3A0Kf-CrPdFRjZaZ8lOvbfN49moyki2/view?usp=sharing)

### Randomness

The contract uses a series of random numbers to draw the raffle winners. As there is no secure random number generator on Arbitrum, those numbers will be provided to the contract in a transaction after the bidding window closes. Hashes of 10 future Ethereum mainnet blocks will be used as a source of randomness, with each of them drawing 8 raffle winners, thus 80 in total. To prevent miners tampering with the blocks in order to set the contest to their advantage, we’ll salt the hashes using a secret number **S**. This means that for the random numbers we’ll use the hashes of block hashes and the number **S**:

**random_number_1 = keccak256(block_hash_1, S)**

**random_number_2 = keccak256(block_hash_2, S)**

…

For transparency reasons, we commit to use a secret number **S** which hash equals to:
**keccak256(S) = [insert hash here]**

After the raffle is settled, we will reveal the secret number **S** so that anyone can verify that the random numbers were not tampered with. The following Ethereum mainnet blocks will be used as a source of randomness: **[insert block numbers of future mainnet blocks].**

Please read the Auction & Raffle Terms & Conditions prior to participating [here](https://docs.google.com/document/d/1pVU-G8mpPD33EwOwE96MTB_4AZrYa2TNWXLSfkOPCJQ/edit?usp=sharing).