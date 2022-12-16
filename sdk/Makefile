
build:
	anchor build && npm run build
.PHONY: build

test:
	make build && anchor test
.PHONY: test

airdrop:
	solana airdrop 2 6prwtH1kuDmy6MDtcRs9h3EaUL3xiDcgiiHdCMpnVLFD
.PHONY: test

deploy:
	make build && anchor deploy --provider.cluster devnet
.PHONY: deploy
