import { Fetcher, Route, Pair, Token } from 'uniswap/sdk';
import {chainID, erc20, getPairName, project} from "./config";
import {ethers} from "ethers";
import {getProvider, NewReadContract} from "./wallet";
import { PledgeContract } from '../utils/ContractAddresses';
import { Decimals, PAIR_NAME } from 'utils/global';
// const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json');
const IUniswapV2Pair = require('uniswap/v2-core/build/IUniswapV2Pair.json');

export type TokenStat = {
    priceInDAI: string;
    totalSupply: string;
};

export type TreasuryAllocationTime = {
    prevAllocation: Date;
    nextAllocation: Date;
}

type IPriceParams = {
    token: string,
    USDT: string
}

type IPriceParamsFast = {
    token: string,
    USDT: string,
    pair: string,
    tokenDecimal: number,
    USDTDecimal: number,
}

type IPairParams = {
    token0Address: string,
    token1Address: string
}

type LPPriceParams = {
    token0Address: string,
    token1Address: string,
    USDT: string
}

type LPPriceParamsFast = {
    token0Name: string,
    token1Name: string,
}

export default {
    async getUniswapPair(params: IPairParams): Promise<string> {
        const {token0Address, token1Address} = params;
        let provider = getProvider();
        await provider.ready;

        let token0Contract = NewReadContract(token0Address, erc20);
        let token0Decimal = await token0Contract.decimals();
        let token1Contract = NewReadContract(token1Address, erc20);
        let token1Decimal = await token1Contract.decimals();
        console.log('token',Token)
        const token0 = new Token(chainID, token0Address, token0Decimal);
        const token1 = new Token(chainID, token1Address, token1Decimal);

        try {
            let pair = Pair.getAddress(token0, token1);
            console.log(`[${token0Address}]-[${token1Address}]pair: ${pair}`);
            return pair;
        } catch (err) {
            console.error(`Failed to fetch pair of [${token1Address}]-[${token1Address}], error ${err}`);
            return "error";
        }
    },

    async getTokenPriceFromUniswapFast(params: IPriceParamsFast):Promise<string> {
        const {token, USDT, pair, tokenDecimal, USDTDecimal} = params;
        let provider = getProvider();
        await provider.ready;
        console.log('token',Token)
        const USDTModel = new Token(chainID, USDT, USDTDecimal);
        const tokenModel = new Token(chainID, token, tokenDecimal);

        try {
            if (USDT === token) {
                return "1";
            }

            const USDTToToken = await Fetcher.fetchPairData(USDTModel, tokenModel, provider, pair);
            const priceInUSDT = new Route([USDTToToken], tokenModel);
            console.log(`price of [${token}] = ${priceInUSDT.midPrice.toSignificant(3)} USDT`);
            return priceInUSDT.midPrice.toSignificant(3);
        } catch (err) {
            console.error(`Failed to fetch token price of [${token}]-[${USDT}], error ${err}`);
            return "error";
        }
    },

    async getTokenPriceFromUniswapByToken(address:string,decimals:number) {
        // if (tokenName === "USDT") {
        //     return 1;
        // }

        const WETH = project.contracts.WETH;
        // const token = tokenName === project.chainSymbol ? WETH : project.contracts[tokenName];
        const tokenAddress = address;
        const tokenDecimal = decimals;

        const USDTAddress = project.contracts.USDT.address;
        const USDTDecimal = project.contracts.USDT.decimals;

        const pairName = PAIR_NAME;
        const pairAddress = PledgeContract.Pair;
        const price = await this.getTokenPriceFromUniswapFast({
            token: tokenAddress,
            USDT: USDTAddress,
            pair: pairAddress,
            tokenDecimal: tokenDecimal,
            USDTDecimal: USDTDecimal,
        });
        return Number(price);
    },

    async getLPTokenPriceFast(params?:LPPriceParamsFast): Promise<number> {
        console.log('pairPrice')
        let token0Address = PledgeContract.Usdt;
        let token1Address = PledgeContract.Geta;
        let USDT = project.contracts.USDT.address;
        let lpToken = PledgeContract.Pair;
        let token0Decimal = Decimals;
        let token1Decimal = Decimals;
        let LPDecimal = Decimals;

        let provider = getProvider();   
        let pairContract = new ethers.Contract(lpToken, IUniswapV2Pair.abi, provider);

        let reserves0 = 0;
        let reserves1 = 0;
        let K = 0;
        let totalSupply = 0;

        //(获取token-USDT交易对)
        let results = await Promise.all([
            pairContract.getReserves(),
            pairContract.totalSupply(),
        ]);
        reserves0 = results[0][0];
        reserves1 = results[0][1];
        totalSupply = results[1];
        K = reserves0 * reserves1;
        //获取token价格
        let token0Price = 0;
        let token1Price = 0;
        let R = 0;
        let x2 = 0;
        let y2 = 0;
        let lpTokenPrice = 0;
        let prices = await Promise.all([
            this.getTokenPriceFromUniswapByToken(token0Address,token0Decimal),
            this.getTokenPriceFromUniswapByToken(token1Address, token1Decimal),
        ]);
        if (token0Address === USDT) {
            token0Price = 1;
        } else {
            token0Price = Number(prices[0]);
        }

        if (token1Address === USDT) {
            token1Price = 1;
        } else {
            token1Price = Number(prices[1]);
        }

        R = token0Price / token1Price;
        x2 = K * R;
        y2 = R / K;
        lpTokenPrice = 2 * Math.sqrt(K/Math.pow(10, token0Decimal)/Math.pow(10, token1Decimal)) * Math.sqrt(token0Price * token1Price)/(totalSupply/Math.pow(10, LPDecimal));

        return lpTokenPrice;
    },

}
