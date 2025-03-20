import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TokenTable from "./tokenTable";
import { useAccount, useBalance, useChainId } from "wagmi";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

function TokenView() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId,
  });

  const getTokens = async () => {
    try {
      await Moralis.start({
        // can move to .env
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjcxMTM5OWU3LTRmYzgtNDUwMC1hZWY2LWMxNjc1MmM5YjUyMSIsIm9yZ0lkIjoiNDM3MTE5IiwidXNlcklkIjoiNDQ5NjgzIiwidHlwZUlkIjoiOGZmYTA0YjgtMTg5Mi00Yzg5LThhZGMtYjAzYjFlMTRkZjIxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDIzOTczNDUsImV4cCI6NDg5ODE1NzM0NX0.UX2DiwUJndPFHFZGwgyNOpoZaZMsIQg2Hp2DUefQkMM",
      });

      /** We can map network for supporting more networks. or find another solution */
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        // chain: EvmChain.BASE, // specify your chain for test
        chain: chainId,
        address,
      });

      const _tokens = response.jsonResponse.filter(
        (token) => token.verified_contract
      );
      if (balance) {
        _tokens.push({
          name: "ETH",
          token_address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          balance: balance.value,
          decimals: balance.decimals,
        });
      }
      setTokens(_tokens);
    } catch (e) {
      console.error("debug er ", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isConnected && !!address && !isBalanceLoading) {
      getTokens();
    }
  }, [isConnected, address, isBalanceLoading]);

  return (
    <div className='font-[RobotoMono] flex flex-col gap-5'>
      <div>
        <h1 className='lg:text-[23px] text-lg font-extrabold   bg-gradient-to-r from-[#5AB0FF] to-[#01FFC2] inline-block text-transparent bg-clip-text'>
          Tokens ({tokens.length})
        </h1>
      </div>
      <div className='w-full border border-slate-500 rounded-xl lg:px-6 px-3 py-5 relative bg-black bg-opacity-75 flex flex-col gap-5'>
        {isConnected ? (
          <TokenTable tokens={tokens} isLoading={isLoading} />
        ) : (
          <div className='flex flex-col items-center justify-center w-full h-full py-10 gap-3'>
            <img
              src='./assets/images/icon/crypto_wallet.png'
              alt='None'
              className='md:h-24 h-16 w-auto'
            />
            <h1 className='text-center text-xl font-semibold text-gray-100'>
              Please connect wallet
            </h1>

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div>
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            className='w-[170px] clipButton font-[Nippo] h-[40px] text-[15px]'
                            onClick={openConnectModal}
                            type='button'
                          >
                            Connect Wallet
                          </button>
                        );
                      }
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenView;
