const getEndpoint = (port) => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.dev')) {
        const portRegex = /-[0-9]+\.app\.github\.dev/
        return `https://${window.location.hostname.replace(portRegex, `-${port}.app.github.dev`)}`
    }
    return `http://localhost:${port}`;
}

export const chainInfo = {
    chainId: "samplechain-1",
    chainName: "Sample Chain",
    rpc: getEndpoint(26657),
    rest: getEndpoint(1317),
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "cosmosvalconspub",
    },
    currencies: [
        {
            coinDenom: "SAMPLE",
            coinMinimalDenom: "usample",
            coinDecimals: 6,
            coinGeckoId: "unknown",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "SAMPLE",
            coinMinimalDenom: "usample",
            coinDecimals: 6,
            coinGeckoId: "unknown",
            gasPriceStep: {
                low: 0.01,
                average: 0.025,
                high: 0.04,
            },
        },
    ],
    stakeCurrency: {
        coinDenom: "SAMPLE",
        coinMinimalDenom: "usample",
        coinDecimals: 6,
        coinGeckoId: "unknown",
    },
};
